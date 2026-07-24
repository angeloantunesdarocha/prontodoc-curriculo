import { reconcilePayment } from "../../../../lib/mercadopago";

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const body = (await request.json().catch(() => ({}))) as {
      data?: { id?: string | number };
    };
    const paymentId = String(body.data?.id ?? url.searchParams.get("data.id") ?? "");
    if (paymentId) await reconcilePayment(paymentId);
    return Response.json({ received: true });
  } catch (error) {
    console.error("Mercado Pago webhook error", error);
    return Response.json({ received: true });
  }
}
