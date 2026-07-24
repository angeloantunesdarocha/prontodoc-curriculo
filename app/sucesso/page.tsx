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

export default function SuccessPage() {
  const [message, setMessage] = useState("Confirmando seu pagamento…");
  const [approved, setApproved] = useState(false);
  const [destination, setDestination] = useState("/");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const order = params.get("order") ?? "";
    const paymentId = params.get("payment_id") ?? "";
    if (!order) {
      queueMicrotask(() => setMessage("Não encontramos a identificação deste pedido."));
      return;
    }

    let attempts = 0;
    const check = async () => {
      attempts += 1;
      try {
        const query = new URLSearchParams({ order });
        if (paymentId) query.set("payment_id", paymentId);
        const response = await fetch(`/api/orders/status?${query}`);
        const result = (await response.json()) as {
          approved?: boolean;
          plan?: keyof typeof planNames;
          status?: string;
        };
        if (result.approved && result.plan) {
          window.localStorage.setItem(
            "prontodoc-entitlement",
            JSON.stringify({ plan: result.plan, order, activatedAt: Date.now() }),
          );
          setApproved(true);
          setDestination(["interview", "vacancy", "journey"].includes(result.plan) ? "/entrevista" : "/#editor");
          setMessage(`${planNames[result.plan]} liberado com sucesso!`);
          return;
        }
        setMessage(
          result.status === "pending"
            ? "O pagamento está sendo processado. Esta página atualizará automaticamente."
            : "Aguardando a confirmação do Mercado Pago…",
        );
      } catch {
        setMessage("Estamos aguardando a confirmação. Tente novamente em instantes.");
      }
      if (attempts < 15) window.setTimeout(check, 2500);
    };
    check();
  }, []);

  return (
    <main className="success-page">
      <section className="success-card">
        <span className="success-icon" aria-hidden="true">{approved ? "✓" : "…"}</span>
        <span className="kicker">ProntoDoc</span>
        <h1>{approved ? "Compra confirmada" : "Estamos confirmando"}</h1>
        <p>{message}</p>
        <Link className="primary-button" href={approved ? destination : "/"}>
          {approved ? "Usar meu produto" : "Voltar ao ProntoDoc"}
        </Link>
        <small>Não feche esta página enquanto o pagamento estiver sendo processado.</small>
      </section>
    </main>
  );
}
