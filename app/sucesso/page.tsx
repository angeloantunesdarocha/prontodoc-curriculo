"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const planNames = {
  pdf: "PDF Profissional",
  versions: "3 versões do currículo",
  kit: "Kit Candidatura",
  interview: "Entrevista Completa",
  vacancy: "Preparação para a Vaga",
  journey: "Jornada de Contratação",
} as const;

type PlanId = keyof typeof planNames;

export default function SuccessPage() {
  const [message, setMessage] = useState("Verificando seu pagamento…");
  const [approved, setApproved] = useState(false);
  const [destination, setDestination] = useState("/#editor");
  const [pendingPlan, setPendingPlan] = useState<PlanId | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const order = params.get("order") ?? "";
    const accessToken = params.get("access_token") ?? "";

    if (!order || !accessToken) {
      setMessage("Não encontramos os dados seguros desta compra. Volte ao ProntoDoc e tente novamente.");
      return;
    }

    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("access_token");
    window.history.replaceState({}, "", cleanUrl);

    let attempts = 0;
    const check = async () => {
      attempts += 1;
      try {
        const query = new URLSearchParams({ order, access_token: accessToken });
        const response = await fetch(`/api/orders/status?${query}`, { cache: "no-store" });
        const result = (await response.json()) as {
          approved?: boolean;
          plan?: PlanId;
          status?: string;
        };

        if (!response.ok) {
          setMessage("Não foi possível confirmar esta compra. Entre em contato com o suporte.");
          return;
        }

        if (result.approved && result.plan) {
          const plan = result.plan;
          window.localStorage.setItem(
            "prontodoc-entitlement",
            JSON.stringify({ plan, order, accessToken, activatedAt: Date.now() }),
          );
          window.localStorage.removeItem("prontodoc-pending-plan");
          setPendingPlan(plan);
          setApproved(true);
          setDestination(["interview", "vacancy", "journey"].includes(plan) ? "/entrevista" : "/#editor");
          setMessage(`${planNames[plan]} liberado com sucesso!`);
          return;
        }

        setMessage(
          result.status === "pending_payment" || result.status === "pending"
            ? "O pagamento está sendo processado. Esta página atualizará automaticamente."
            : "Aguardando a confirmação do Mercado Pago…",
        );
      } catch {
        setMessage("Estamos aguardando a confirmação. Tente novamente em instantes.");
      }

      if (attempts < 20) window.setTimeout(check, 3000);
    };

    void check();
  }, []);

  return (
    <main className="success-page">
      <section className="success-card">
        <span className="success-icon" aria-hidden="true">{approved ? "✓" : "…"}</span>
        <span className="kicker">ProntoDoc</span>
        <h1>{approved ? "Compra confirmada" : "Confirmando pagamento"}</h1>
        <p>{message}</p>

        {approved && (
          <Link className="primary-button" href={destination} style={{ display: "inline-flex", marginTop: "18px" }}>
            {["interview", "vacancy", "journey"].includes(pendingPlan as string) ? "Ir para entrevista" : "Usar meu produto"}
          </Link>
        )}

        {!approved && (
          <Link className="secondary-button" href="/" style={{ display: "inline-flex", marginTop: "18px" }}>
            Voltar ao ProntoDoc
          </Link>
        )}

        <small style={{ display: "block", marginTop: "16px" }}>
          {approved
            ? "Compra validada pelo servidor e liberada neste dispositivo."
            : "Não feche esta página enquanto o pagamento estiver sendo processado."}
        </small>
      </section>
    </main>
  );
}
