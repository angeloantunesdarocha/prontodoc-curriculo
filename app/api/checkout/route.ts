import { getMercadoPagoToken } from "../../../lib/mercadopago";
import { insertOrder, updateOrderByExternalReference } from "../../../lib/supabase-admin";
import { createAccessToken } from "../../../lib/order-access";
import { isPlanId, plans, SITE_URL, type PlanId } from "../../../lib/plans";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { plan?: unknown; email?: unknown };
    if (!isPlanId(payload.plan)) {
      return Response.json({ error: "Plano inválido." }, { status: 400 });
    }

    const token = getMercadoPagoToken();
    if (!token) {
      return Response.json(
        { error: "O pagamento ainda não está configurado para produção." },
        { status: 503 },
      );
    }

    const planId: PlanId = payload.plan;
    const plan = plans[planId];
    const email =
      typeof payload.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
        ? payload.email.trim().slice(0, 160)
        : null;

    const externalReference = `prontodoc_${planId}_${crypto.randomUUID()}`;
    const { token: accessToken, hash: accessTokenHash } = createAccessToken();

    await insertOrder({
      plan_id: planId,
      customer_email: email,
      amount: plan.amount,
      external_reference: externalReference,
      access_token_hash: accessTokenHash,
    });

    const successUrl = new URL("/sucesso", SITE_URL);
    successUrl.searchParams.set("order", externalReference);
    successUrl.searchParams.set("access_token", accessToken);

    const preferenceResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Idempotency-Key": externalReference,
        },
        body: JSON.stringify({
          items: [
            {
              id: plan.id,
              title: plan.title,
              description: plan.description,
              quantity: 1,
              currency_id: "BRL",
              unit_price: plan.amount,
            },
          ],
          payer: email ? { email } : undefined,
          external_reference: externalReference,
          metadata: { order_id: externalReference, plan: planId },
          back_urls: {
            success: successUrl.toString(),
            pending: successUrl.toString(),
            failure: `${SITE_URL}/?pagamento=cancelado#precos`,
          },
          auto_return: "approved",
          notification_url: `${SITE_URL}/api/mercadopago/webhook`,
          statement_descriptor: "PRONTODOC",
        }),
      },
    );

    if (!preferenceResponse.ok) {
      const detail = await preferenceResponse.text();
      console.error("Mercado Pago preference error", preferenceResponse.status, detail);
      await updateOrderByExternalReference(externalReference, { status: "rejected" });
      return Response.json(
        { error: "Não foi possível abrir o pagamento. Tente novamente em instantes." },
        { status: 502 },
      );
    }

    const preference = (await preferenceResponse.json()) as {
      id?: string;
      init_point?: string;
    };

    if (!preference.init_point) {
      await updateOrderByExternalReference(externalReference, { status: "rejected" });
      throw new Error("Checkout não retornado.");
    }

    await updateOrderByExternalReference(externalReference, {
      status: "pending_payment",
      mercado_pago_preference_id: preference.id ?? null,
    });

    return Response.json({
      mode: "checkout_pro",
      orderId: externalReference,
      checkoutUrl: preference.init_point,
    });
  } catch (error) {
    console.error("Checkout error", error);
    return Response.json(
      { error: "Não foi possível iniciar o pagamento. Tente novamente." },
      { status: 500 },
    );
  }
}
