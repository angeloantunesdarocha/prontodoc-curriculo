import { ImageResponse } from "next/og";

export const alt = "ProntoDoc — Currículo profissional e entrevista pelo celular";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #eff5ff 0%, #ffffff 52%, #edf9f2 100%)",
          padding: "70px 78px",
          fontFamily: "Arial, sans-serif",
          color: "#14213d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34, fontWeight: 800 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#165dff",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
            }}
          >
            ▤
          </div>
          ProntoDoc
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 960 }}>
          <div style={{ fontSize: 65, lineHeight: 1.05, fontWeight: 850, letterSpacing: -2 }}>
            Currículo profissional e entrevista pelo celular
          </div>
          <div style={{ fontSize: 29, lineHeight: 1.35, color: "#41516f" }}>
            Crie, adapte à vaga, salve em PDF e treine respostas em voz alta.
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 23, color: "#27533d" }}>
          <span>✓ Guias gratuitos</span>
          <span>✓ Versão ATS</span>
          <span>✓ Treino por voz</span>
        </div>
      </div>
    ),
    size,
  );
}
