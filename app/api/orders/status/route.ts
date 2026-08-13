import { reconcilePayment } from "../../../../lib/mercadopago";
import { findOrderByAccessTokenHash } from "../../../../lib/supabase-admin";
import { hashAccessToken } from "../../../../lib/order-access";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("order")?.trim() ?? "";
  const accessToken = url.searchParams.get("access_token")?.trim() ?? "";
  const paymentId = url.searchParams.get("payment_id")?.trim() ?? "";

  if (!orderId || orderId.length > 90 || !accessToken || accessToken.length < 40) {
    return Response.json({ error: "Pedido inválido." }, { status: 400 });
  }

  try {
    const order = await findOrderByAccessTokenHash(hashAccessToken(accessToken));
    if (!order || order.external_reference !== orderId) {
      return Response.json({ error: "Pedido não encontrado." }, { status: 404 });
    }

    if (paymentId) {
      await reconcilePayment(paymentId);
    }

    const refreshed = await findOrderByAccessTokenHash(hashAccessToken(accessToken));
    const current = refreshed ?? order;

    return Response.json({
      order: current.external_reference,
      plan: current.status === "approved" ? current.plan_id : null,
      status: current.status,
      approved: current.status === "approved",
      paymentStatus: current.status,
    });
  } catch (error) {
    console.error("Order status error", error);
    return Response.json({ error: "Não foi possível consultar o pedido." }, { status: 500 });
  }
}
