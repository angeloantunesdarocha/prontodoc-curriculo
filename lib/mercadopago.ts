import { findOrderByExternalReference, updateOrderByExternalReference } from "./supabase-admin";
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
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" },
  );
  if (!response.ok) throw new Error("Não foi possível consultar o pagamento.");
  return (await response.json()) as MercadoPagoPayment;
}

function orderStatus(paymentStatus: string | undefined) {
  switch (paymentStatus) {
    case "approved":
      return "approved" as const;
    case "rejected":
      return "rejected" as const;
    case "cancelled":
      return "cancelled" as const;
    case "refunded":
      return "refunded" as const;
    default:
      return "pending_payment" as const;
  }
}

export async function reconcilePayment(paymentId: string) {
  const payment = await fetchMercadoPagoPayment(paymentId);
  const externalReference = payment.external_reference?.trim() ?? "";
  const match = externalReference.match(
    /^prontodoc_(pdf|versions|kit|interview|vacancy|journey)_[0-9a-f-]{36}$/i,
  );
  const planId = match?.[1];

  if (!isPlanId(planId)) return null;

  const plan = plans[planId as PlanId];
  const order = await findOrderByExternalReference(externalReference);
  if (!order || order.plan_id !== planId) return null;

  const amountMatches =
    typeof payment.transaction_amount === "number" &&
    Math.abs(payment.transaction_amount - plan.amount) < 0.001;

  if (!amountMatches) {
    await updateOrderByExternalReference(externalReference, {
      status: "rejected",
      metadata: { reason: "amount_mismatch", payment_id: String(payment.id ?? paymentId) },
    });
    return null;
  }

  const status = orderStatus(payment.status);
  const updated = await updateOrderByExternalReference(externalReference, {
    status,
    mercado_pago_payment_id: String(payment.id ?? paymentId),
    approved_at: status === "approved" ? new Date().toISOString() : null,
    metadata: {
      payment_status: payment.status ?? "unknown",
      payer_email: payment.payer?.email ?? null,
    },
  });

  return {
    orderId: externalReference,
    plan: planId as PlanId,
    approved: status === "approved",
    paymentStatus: payment.status ?? "unknown",
    accessTokenHash: updated?.access_token_hash ?? order.access_token_hash,
  };
}
