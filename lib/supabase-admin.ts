type OrderStatus =
  | "pending"
  | "approved"
  | "pending_payment"
  | "rejected"
  | "cancelled"
  | "refunded";

export type ProntoDocOrder = {
  id: string;
  plan_id: string;
  customer_email: string | null;
  amount: number;
  currency: string;
  status: OrderStatus;
  mercado_pago_preference_id: string | null;
  mercado_pago_payment_id: string | null;
  external_reference: string;
  access_token_hash: string;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown>;
};

function getConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) {
    throw new Error("Supabase server credentials are not configured.");
  }
  return { url, key };
}

async function requestSupabase(path: string, init: RequestInit = {}) {
  const { url, key } = getConfig();
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  headers.set("Authorization", `Bearer ${key}`);
  headers.set("Content-Type", "application/json");
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 500);
    console.error("Supabase request failed", response.status, detail);
    throw new Error("Supabase request failed.");
  }

  return response;
}

export async function insertOrder(order: {
  plan_id: string;
  customer_email: string | null;
  amount: number;
  external_reference: string;
  access_token_hash: string;
}) {
  const response = await requestSupabase("prontodoc_orders", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(order),
  });
  const rows = (await response.json()) as ProntoDocOrder[];
  const created = rows[0];
  if (!created) throw new Error("Supabase did not return the created order.");
  return created;
}

export async function findOrderByAccessTokenHash(accessTokenHash: string) {
  const response = await requestSupabase(
    `prontodoc_orders?access_token_hash=eq.${encodeURIComponent(accessTokenHash)}&select=*&limit=1`,
  );
  const rows = (await response.json()) as ProntoDocOrder[];
  return rows[0] ?? null;
}

export async function findOrderByExternalReference(externalReference: string) {
  const response = await requestSupabase(
    `prontodoc_orders?external_reference=eq.${encodeURIComponent(externalReference)}&select=*&limit=1`,
  );
  const rows = (await response.json()) as ProntoDocOrder[];
  return rows[0] ?? null;
}

export async function updateOrderByExternalReference(
  externalReference: string,
  patch: Partial<Pick<ProntoDocOrder, "status" | "mercado_pago_preference_id" | "mercado_pago_payment_id" | "approved_at" | "metadata">>,
) {
  const response = await requestSupabase(
    `prontodoc_orders?external_reference=eq.${encodeURIComponent(externalReference)}`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(patch),
    },
  );
  const rows = (await response.json()) as ProntoDocOrder[];
  return rows[0] ?? null;
}

export async function updateOrderByPaymentId(
  paymentId: string,
  patch: Partial<Pick<ProntoDocOrder, "status" | "approved_at" | "metadata">>,
) {
  const response = await requestSupabase(
    `prontodoc_orders?mercado_pago_payment_id=eq.${encodeURIComponent(paymentId)}`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(patch),
    },
  );
  const rows = (await response.json()) as ProntoDocOrder[];
  return rows[0] ?? null;
}
