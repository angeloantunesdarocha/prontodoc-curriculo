import { isPlanId, plans, type PlanId } from "./plans";

type MercadoPagoPayment = {
  id?: number | string;
  status?: string;
  external_reference?: string;
  transaction_amount?: number;
  payer?: { email?: string };
};

export function getMercadoPagoToken() {
  return process.env.MERCADO_PAGO_ACCESS_TOKEN?.trim() ?? "";
}

export async function fetchMercadoPagoPayment(paymentId: string) {
  const token = getMercadoPagoToken();
  if (!token) throw new Error("Mercado Pago ainda não está conectado.");

  const response = await fetch(
    `https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!response.ok) throw new Error("Não foi possível consultar o pagamento.");
  return (await response.json()) as MercadoPagoPayment;
}

export async function reconcilePayment(paymentId: string) {
  const payment = await fetchMercadoPagoPayment(paymentId);
  const orderId = payment.external_reference?.trim() ?? "";
  const match = orderId.match(
    /^prontodoc_(pdf|versions|kit|interview|vacancy|journey)_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  );
  const planId = match?.[1];
  if (!isPlanId(planId)) return null;

  const plan = plans[planId as PlanId];
  const amountMatches =
    typeof payment.transaction_amount === "number" &&
    Math.abs(payment.transaction_amount - plan.amount) < 0.001;
  const approved = payment.status === "approved" && amountMatches;

  return {
    orderId,
    plan: planId as PlanId,
    approved,
    paymentStatus: payment.status ?? "unknown",
  };
}
