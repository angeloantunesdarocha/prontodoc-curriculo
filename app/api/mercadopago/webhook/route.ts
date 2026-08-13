import { createHmac, timingSafeEqual } from "node:crypto";
import { reconcilePayment } from "../../../../lib/mercadopago";

function isValidMercadoPagoSignature(
  signatureHeader: string | null,
  requestId: string | null,
  dataId: string,
) {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET?.trim();
  if (!secret || !signatureHeader || !dataId) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [key, ...value] = part.trim().split("=");
      return [key, value.join("=")];
    }),
  );
  const timestamp = parts.ts;
  const receivedHash = parts.v1;
  if (!timestamp || !receivedHash) return false;

  const timestampNumber = Number(timestamp);
  const timestampMs = timestampNumber > 1_000_000_000_000
    ? timestampNumber
    : timestampNumber * 1000;
  if (!Number.isFinite(timestampMs) || Math.abs(Date.now() - timestampMs) > 5 * 60 * 1000) {
    return false;
  }

  const manifestParts = [
    `id:${dataId.toLowerCase()}`,
    requestId ? `request-id:${requestId}` : "",
    `ts:${timestamp}`,
  ].filter(Boolean);
  const manifest = `${manifestParts.join(";")};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");

  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(receivedHash, "utf8");
  return expectedBuffer.length === receivedBuffer.length
    && timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const body = (await request.json().catch(() => ({}))) as {
    type?: string;
    data?: { id?: string | number };
  };
  const dataId = String(body.data?.id ?? url.searchParams.get("data.id") ?? "");

  if (!isValidMercadoPagoSignature(
    request.headers.get("x-signature"),
    request.headers.get("x-request-id"),
    dataId,
  )) {
    return Response.json({ error: "Notificação não autenticada." }, { status: 401 });
  }

  if (body.type !== "payment" && url.searchParams.get("type") !== "payment") {
    return Response.json({ received: true });
  }

  try {
    await reconcilePayment(dataId);
    return Response.json({ received: true });
  } catch (error) {
    console.error("Mercado Pago webhook error", error);
    return Response.json({ error: "Falha ao processar notificação." }, { status: 500 });
  }
}
