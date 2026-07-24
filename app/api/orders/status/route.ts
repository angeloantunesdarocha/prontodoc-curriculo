import { reconcilePayment } from "../../../../lib/mercadopago";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("order")?.trim() ?? "";
  const paymentId = url.searchParams.get("payment_id")?.trim() ?? "";
  if (!orderId || orderId.length > 90) {
    return Response.json({ error: "Pedido inválido." }, { status: 400 });
  }

  try {
    if (!paymentId) {
      return Response.json({
        order: orderId,
        plan: null,
        status: "pending",
        approved: false,
        paymentStatus: "pending",
      });
    }
    const result = await reconcilePayment(paymentId);
    if (!result || result.orderId !== orderId) {
      return Response.json({ error: "Pagamento não corresponde ao pedido." }, { status: 404 });
    }
    return Response.json({
      order: result.orderId,
      plan: result.plan,
      status: result.approved ? "approved" : result.paymentStatus,
      approved: result.approved,
      paymentStatus: result.paymentStatus,
    });
  } catch (error) {
    console.error("Order status error", error);
    return Response.json({ error: "Não foi possível consultar o pedido." }, { status: 500 });
  }
}
