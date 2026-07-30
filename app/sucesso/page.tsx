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
  const [pendingEmail, setPendingEmail] = useState("");

  useEffect(() => {
    // Verifica se há um plano pendente no localStorage
    const storedPending = window.localStorage.getItem("prontodoc-pending-plan");
    if (storedPending) {
      try {
        const parsed = JSON.parse(storedPending) as { plan?: PlanId; email?: string };
        if (parsed.plan && ["pdf", "versions", "kit", "interview", "vacancy", "journey"].includes(parsed.plan)) {
          setPendingPlan(parsed.plan as PlanId);
          setPendingEmail(parsed.email || "");
          
          // Verifica se já existe entitlement liberado
          const storedEntitlement = window.localStorage.getItem("prontodoc-entitlement");
          if (storedEntitlement) {
            try {
              const entitlement = JSON.parse(storedEntitlement) as { plan?: PlanId };
              if (entitlement.plan === parsed.plan) {
                setApproved(true);
                setMessage(`${planNames[parsed.plan]} liberado com sucesso!`);
                setDestination(["interview", "vacancy", "journey"].includes(parsed.plan) ? "/entrevista" : "/#editor");
                return;
              }
            } catch {}
          }
          
          // Aguarda confirmação manual via webhook ou envio de comprovante
          setMessage(`Pagamento iniciado para ${planNames[parsed.plan as PlanId]}. Após concluir o pagamento no Mercado Pago, envie o comprovante para liberação imediata.`);
        }
      } catch {}
    }
    
    // Também verifica parâmetros da URL para checkout tradicional
    const params = new URLSearchParams(window.location.search);
    const order = params.get("order") ?? "";
    const paymentId = params.get("payment_id") ?? "";
    if (order) {
      let attempts = 0;
      const check = async () => {
        attempts += 1;
        try {
          const query = new URLSearchParams({ order });
          if (paymentId) query.set("payment_id", paymentId);
          const response = await fetch(`/api/orders/status?${query}`);
          const result = (await response.json()) as {
            approved?: boolean;
            plan?: PlanId;
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
    }
  }, []);

  const handleSubmitProof = () => {
    const subject = encodeURIComponent(`Comprovante ProntoDoc - ${pendingPlan ? planNames[pendingPlan] : "Pagamento"}`);
    const body = encodeURIComponent(
      `Olá,\n\nSegue meu comprovante de pagamento do ProntoDoc.\n\n` +
      `Plano: ${pendingPlan ? planNames[pendingPlan] : "Não especificado"}\n` +
      `E-mail usado no pagamento: ${pendingEmail || "Não informado"}\n` +
      `Número da operação/Mercado Pago: \n\n` +
      `Anexo o comprovante desta mensagem.\n\nAguardo liberação. Obrigado(a)!`
    );
    window.location.href = `mailto:angeloantunesdarocha@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="success-page">
      <section className="success-card">
        <span className="success-icon" aria-hidden="true">{approved ? "✓" : "…"}</span>
        <span className="kicker">ProntoDoc</span>
        <h1>{approved ? "Compra confirmada" : pendingPlan ? "Quase lá!" : "Estamos confirmando"}</h1>
        <p>{message}</p>
        
        {!approved && pendingPlan && (
          <div style={{ marginTop: "24px", padding: "20px", background: "#f8fbff", borderRadius: "12px", border: "1px solid #b7cff9" }}>
            <h3 style={{ margin: "0 0 12px", color: "#071a40", fontSize: "18px" }}>📧 Envie seu comprovante</h3>
            <p style={{ color: "#52627f", fontSize: "14px", marginBottom: "16px" }}>
              Para liberação imediata, envie o comprovante de pagamento recebido do Mercado Pago.
            </p>
            <button 
              className="primary-button" 
              onClick={handleSubmitProof}
              style={{ width: "100%", justifyContent: "center" }}
            >
              📨 Enviar comprovante agora
            </button>
            <small style={{ display: "block", marginTop: "12px", color: "#52627f" }}>
              O comprovante será enviado para angeloantunesdarocha@gmail.com
            </small>
          </div>
        )}
        
        {approved && (
          <Link className="primary-button" href={destination} style={{ display: "inline-flex", marginTop: "18px" }}>
            {["interview", "vacancy", "journey"].includes(pendingPlan as string) ? "Ir para entrevista" : "Usar meu produto"}
          </Link>
        )}
        
        {!approved && !pendingPlan && (
          <Link className="primary-button" href="/" style={{ display: "inline-flex", marginTop: "18px" }}>
            Voltar ao ProntoDoc
          </Link>
        )}
        
        <small style={{ display: "block", marginTop: "16px" }}>
          {approved 
            ? "Seus produtos foram liberados neste dispositivo." 
            : "Não feche esta página enquanto o pagamento estiver sendo processado."}
        </small>
      </section>
    </main>
  );
}
