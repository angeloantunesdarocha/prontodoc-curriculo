import { getMercadoPagoToken } from "../../../lib/mercadopago";
import { isPlanId, plans, SITE_URL, type PlanId } from "../../../lib/plans";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { plan?: unknown; email?: unknown };
    if (!isPlanId(payload.plan)) {
      return Response.json({ error: "Plano inválido." }, { status: 400 });
    }

    const planId: PlanId = payload.plan;
    const plan = plans[planId];
    const email =
      typeof payload.email === "string" && payload.email.includes("@")
        ? payload.email.trim().slice(0, 160)
        : null;

    // Todos os produtos usam Links de Pagamento criados diretamente pelo
    // vendedor no Mercado Pago para redirecionamento imediato ao checkout.
    if (plan.fallbackUrl) {
      return Response.json({
        mode: "payment_link",
        checkoutUrl: plan.fallbackUrl,
        message: "Checkout seguro pelo Link de Pagamento.",
      });
    }

    const token = getMercadoPagoToken();

    if (!token) {
      if (!plan.fallbackUrl) {
        return Response.json(
          { error: "O pagamento deste produto está temporariamente indisponível." },
          { status: 503 },
        );
      }
      return Response.json({
        mode: "payment_link",
        checkoutUrl: plan.fallbackUrl,
        message: "Checkout seguro pelo Link de Pagamento.",
      });
    }

    const orderId = `prontodoc_${payload.plan}_${crypto.randomUUID()}`;

    const preferenceResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Idempotency-Key": orderId,
        },
        body: JSON.stringify({
          items: [
            {
              id: payload.plan,
              title: plan.title,
              description: plan.description,
              quantity: 1,
              currency_id: "BRL",
              unit_price: plan.amount,
            },
          ],
          payer: email ? { email } : undefined,
          external_reference: orderId,
          metadata: { order_id: orderId, plan: payload.plan },
          back_urls: {
            success: `${SITE_URL}/sucesso?order=${orderId}`,
            pending: `${SITE_URL}/sucesso?order=${orderId}&pending=1`,
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
      if (plan.fallbackUrl) {
        return Response.json({
          mode: "payment_link",
          checkoutUrl: plan.fallbackUrl,
          message: "Usando o Link de Pagamento seguro.",
        });
      }
      return Response.json(
        { error: "Não foi possível abrir o pagamento. Tente novamente em instantes." },
        { status: 502 },
      );
    }

    const preference = (await preferenceResponse.json()) as {
      id?: string;
      init_point?: string;
    };
    if (!preference.init_point) throw new Error("Checkout não retornado.");

    return Response.json({
      mode: "checkout_pro",
      orderId,
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
