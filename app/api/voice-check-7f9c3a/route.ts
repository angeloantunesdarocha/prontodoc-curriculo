import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, stage: "environment", error: "OPENAI_API_KEY ausente" }, { status: 503 });
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
        input: "Teste da Voz ProntoDoc.",
        instructions: "Fale em português brasileiro com voz masculina adulta, bonita, acolhedora e profissional.",
        response_format: "mp3",
        speed: 0.96,
      }),
    });

    const contentType = response.headers.get("content-type") || "";
    const body = await response.arrayBuffer();

    if (!response.ok) {
      return NextResponse.json({
        ok: false,
        stage: "openai",
        status: response.status,
        contentType,
        detail: new TextDecoder().decode(body).slice(0, 300),
      }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      stage: "complete",
      model: "gpt-4o-mini-tts",
      voice: "cedar",
      contentType,
      bytes: body.byteLength,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      stage: "request",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }, { status: 502 });
  }
}
