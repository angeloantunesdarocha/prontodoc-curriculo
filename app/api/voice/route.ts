import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RateEntry = { count: number; resetAt: number };

type VoiceGlobal = typeof globalThis & {
  prontodocVoiceRate?: Map<string, RateEntry>;
};

const voiceGlobal = globalThis as VoiceGlobal;
const rateBuckets = voiceGlobal.prontodocVoiceRate ?? new Map<string, RateEntry>();
voiceGlobal.prontodocVoiceRate = rateBuckets;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 24;
const MAX_TEXT_LENGTH = 500;

function clientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const requestHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
    return !requestHost || originHost === requestHost;
  } catch {
    return false;
  }
}

function consumeRateLimit(key: string) {
  const now = Date.now();
  const current = rateBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT) return false;
  current.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Origem não autorizada." }, { status: 403 });
  }

  if (!consumeRateLimit(clientKey(request))) {
    return NextResponse.json(
      { error: "Limite temporário de voz atingido. Tente novamente em alguns minutos." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "A voz principal ainda não foi ativada no servidor." },
      { status: 503 },
    );
  }

  let body: { text?: unknown };
  try {
    body = await request.json() as { text?: unknown };
  } catch {
    return NextResponse.json({ error: "Solicitação inválida." }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.replace(/\s+/g, " ").trim() : "";
  if (text.length < 2 || text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json(
      { error: `O texto deve conter entre 2 e ${MAX_TEXT_LENGTH} caracteres.` },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        voice: "cedar",
        input: text,
        instructions: "Fale exclusivamente em português brasileiro. Use uma voz masculina adulta, bonita, acolhedora e confiante, como um recrutador profissional respeitoso. Pronuncie com naturalidade, clareza e pequenas pausas. Evite soar robótico, exagerado, sedutor ou apressado.",
        response_format: "mp3",
        speed: 0.96,
      }),
      signal: request.signal,
    });

    if (!response.ok) {
      const upstreamMessage = (await response.text()).slice(0, 300);
      console.error("Falha ao gerar Voz ProntoDoc", response.status, upstreamMessage);
      return NextResponse.json(
        { error: "A voz principal está temporariamente indisponível." },
        { status: 502 },
      );
    }

    const audio = await response.arrayBuffer();
    return new NextResponse(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, no-store, max-age=0",
        "Content-Disposition": "inline; filename=voz-prontodoc.mp3",
        "X-Content-Type-Options": "nosniff",
        "X-ProntoDoc-Voice": "cedar",
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return new NextResponse(null, { status: 499 });
    }
    console.error("Erro inesperado na Voz ProntoDoc", error);
    return NextResponse.json(
      { error: "A voz principal está temporariamente indisponível." },
      { status: 502 },
    );
  }
}
