"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type PlanId = "pdf" | "versions" | "kit" | "interview" | "vacancy" | "journey";
type Mode = "primeiro" | "atendimento" | "administrativo" | "vendas" | "operacional" | "lideranca";
type RecognitionResult = { results: ArrayLike<{ 0: { transcript: string } }> };
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: RecognitionResult) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

const baseQuestions = [
  "Fale sobre você e sobre o momento profissional que está vivendo.",
  "Por que você se interessou por esta vaga?",
  "Qual experiência, projeto ou atividade mais prepara você para este trabalho?",
  "Conte uma situação em que precisou resolver um problema.",
  "Como você organiza prioridades quando há várias tarefas?",
  "Qual é um ponto forte seu? Dê um exemplo verdadeiro.",
  "Que habilidade você ainda está desenvolvendo e o que faz para melhorar?",
  "Conte uma situação em que precisou trabalhar em equipe.",
  "Como você atenderia uma pessoa insatisfeita?",
  "Por que a empresa deveria contratar você?",
  "Onde você pretende estar profissionalmente nos próximos anos?",
  "Que pergunta você faria ao recrutador antes de encerrar?",
];

const modeQuestions: Record<Mode, string[]> = {
  primeiro: [
    "Mesmo sem experiência formal, que atividade demonstra sua responsabilidade?",
    "O que você espera aprender no primeiro emprego?",
  ],
  atendimento: [
    "Como você agiria com um cliente irritado sem prometer o que não pode cumprir?",
    "Conte uma situação em que ouviu alguém com atenção e encontrou uma solução.",
  ],
  administrativo: [
    "Como você evita erros ao organizar documentos, prazos e informações?",
    "Que ferramentas de escritório você já utilizou de verdade?",
  ],
  vendas: [
    "Como você descobriria a necessidade do cliente antes de oferecer um produto?",
    "Como reage quando não alcança uma meta?",
  ],
  operacional: [
    "Como você mantém segurança, qualidade e pontualidade em uma rotina repetitiva?",
    "Conte como aprendeu um procedimento novo.",
  ],
  lideranca: [
    "Como você oferece uma orientação difícil a alguém da equipe?",
    "Conte uma decisão que tomou com informação incompleta.",
  ],
};

const labels: Record<Mode, string> = {
  primeiro: "Primeiro emprego / Jovem Aprendiz",
  atendimento: "Atendimento / Recepção / Caixa",
  administrativo: "Administrativo / RH",
  vendas: "Vendas / Comércio",
  operacional: "Motorista / Serviços / Operação",
  lideranca: "Liderança / Supervisão",
};

function normalize(text: string) {
  return text.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function evaluate(answer: string, vacancy: string) {
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const normalized = normalize(answer);
  const vacancyWords = [...new Set((normalize(vacancy).match(/[a-z]{5,}/g) || []))].slice(0, 20);
  const matched = vacancyWords.filter((word) => normalized.includes(word)).slice(0, 5);
  const evidence = /\b(resultado|consegui|aumentei|reduzi|organizei|resolvi|atendi|entreguei|aprendi|melhorei|%|clientes?|dias?|meses?)\b/.test(normalized);
  const structure = /\b(situacao|tarefa|acao|resultado|primeiro|depois|por isso)\b/.test(normalized);
  const fillers = (normalized.match(/\b(tipo|ne|assim|entao|meio que)\b/g) || []).length;
  let score = Math.min(45, words.length * 1.15);
  if (evidence) score += 24;
  if (structure) score += 15;
  score += Math.min(12, matched.length * 4);
  score -= Math.min(15, fillers * 4);
  score = Math.max(18, Math.min(96, Math.round(score)));
  const tips = [];
  if (words.length < 35) tips.push("Acrescente contexto, sua ação e o resultado.");
  if (!evidence) tips.push("Inclua um exemplo real ou resultado observável.");
  if (!structure) tips.push("Organize em situação, ação e resultado.");
  if (fillers) tips.push(`Reduza palavras de apoio como “tipo”, “né” e “assim” (${fillers} detectada${fillers > 1 ? "s" : ""}).`);
  if (vacancy && !matched.length) tips.push("Conecte sua resposta a uma exigência verdadeira da vaga.");
  if (!tips.length) tips.push("Resposta clara: mantenha esse nível de objetividade.");
  return { score, words: words.length, matched, tips };
}

export default function InterviewSimulator() {
  const [mode, setMode] = useState<Mode>("primeiro");
  const [role, setRole] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<{ question: string; answer: string; score: number; tips: string[] }[]>([]);
  const [recording, setRecording] = useState(false);
  const [notice, setNotice] = useState("");
  const [entitlement, setEntitlement] = useState<PlanId | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<PlanId | null>(null);
  const recognitionRef = useRef<Recognition | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("prontodoc-entitlement") || "{}") as { plan?: PlanId };
      if (stored.plan) setEntitlement(stored.plan);
    } catch { /* armazenamento opcional */ }
  }, []);

  const premium = entitlement === "interview" || entitlement === "vacancy" || entitlement === "journey";
  const questionLimit = premium ? 12 : 3;
  const questions = useMemo(() => {
    const roleQuestion = role.trim()
      ? `O que faz de você uma boa escolha para trabalhar como ${role.trim()}?`
      : baseQuestions[9];
    return [baseQuestions[0], baseQuestions[1], roleQuestion, ...modeQuestions[mode], ...baseQuestions.slice(3)]
      .slice(0, 12);
  }, [mode, role]);
  const complete = started && (index >= questionLimit || index >= questions.length);
  const average = answers.length
    ? Math.round(answers.reduce((sum, item) => sum + item.score, 0) / answers.length)
    : 0;

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  function startInterview() {
    setAnswers([]);
    setIndex(0);
    setStarted(true);
    setAnswer("");
    setNotice("");
    window.setTimeout(() => {
      document.querySelector("#simulador")?.scrollIntoView({ behavior: "smooth", block: "start" });
      speak(questions[0]);
    }, 150);
  }

  function startVoice() {
    const speechWindow = window as typeof window & {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const Constructor = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Constructor) {
      setNotice("Seu navegador não liberou a transcrição. Digite a resposta ou abra no Chrome do Android.");
      return;
    }
    const recognition = new Constructor();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const text = Array.from(event.results).map((result) => result[0].transcript).join(" ");
      setAnswer((current) => `${current} ${text}`.trim());
    };
    recognition.onend = () => setRecording(false);
    recognition.onerror = () => {
      setRecording(false);
      setNotice("Não consegui acessar o microfone. Autorize o Chrome ou use a resposta digitada.");
    };
    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
    setNotice("");
  }

  function stopVoice() {
    recognitionRef.current?.stop();
    setRecording(false);
  }

  function submitAnswer() {
    if (answer.trim().split(/\s+/).length < 4) {
      setNotice("Conte um pouco mais para que a avaliação seja útil.");
      return;
    }
    stopVoice();
    const result = evaluate(answer, vacancy);
    setAnswers((current) => [...current, { question: questions[index], answer: answer.trim(), score: result.score, tips: result.tips }]);
    setAnswer("");
    setNotice("");
    const next = index + 1;
    setIndex(next);
    if (next < questionLimit && next < questions.length) window.setTimeout(() => speak(questions[next]), 180);
  }

  async function checkout(plan: PlanId) {
    setCheckoutLoading(plan);
    setNotice("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const result = await response.json() as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "Pagamento indisponível.");
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível abrir o pagamento.");
      setCheckoutLoading(null);
    }
  }

  return (
    <main className="interview-site">
      <nav className="topbar" aria-label="Navegação principal">
        <Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link>
        <div className="nav-links"><Link href="/">Criar currículo</Link><Link href="/guias">Guias gratuitos</Link><a href="#planos">Planos</a></div>
        <Link className="outline-button compact-button" href="/">Meu currículo</Link>
      </nav>

      <section className="interview-hero">
        <div>
          <span className="eyebrow">🎙️ Entrevista ProntoDoc</span>
          <h1>Treine em voz alta antes de falar com o recrutador</h1>
          <p>A entrevista fala com você, ouve sua resposta e mostra como deixá-la mais clara — adaptada ao cargo e à vaga, sem inventar experiências.</p>
          <div className="trust-row"><span>✓ 3 perguntas grátis</span><span>✓ Funciona no Android</span><span>✓ Áudio não é enviado</span></div>
        </div>
        {!started && (
          <button
            className="voice-orb voice-orb-button"
            onClick={startInterview}
            aria-label="Começar teste gratuito com três perguntas"
          >
            <span className="voice-orb-icon" aria-hidden="true">🎤</span>
            <strong>Começar teste grátis</strong>
            <small>3 perguntas • cerca de 2 minutos</small>
            <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
          </button>
        )}
      </section>

      <section className="interview-workspace" id="simulador">
        {!started ? (
          <div className="interview-setup">
            <span className="kicker">Personalização opcional</span>
            <h2>Comece agora ou adapte o treino à sua vaga</h2>
            <p className="setup-intro">
              Você não precisa preencher nada para experimentar. Toque no botão azul
              e receba imediatamente a primeira pergunta.
            </p>
            <button className="primary-button instant-start-button" onClick={startInterview}>
              🎤 Começar entrevista agora
              <small>3 perguntas grátis • aproximadamente 2 minutos</small>
            </button>
            <details className="customize-interview">
              <summary>Quero personalizar para um cargo ou vaga</summary>
              <div className="customize-fields">
                <label>Área da vaga
                  <select value={mode} onChange={(event) => setMode(event.target.value as Mode)}>
                    {Object.entries(labels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                  </select>
                </label>
                <label>Cargo desejado
                  <input value={role} onChange={(event) => setRole(event.target.value)} placeholder="Ex.: Auxiliar administrativo" />
                </label>
                <label>Descrição da vaga <small>(opcional, mas melhora a preparação)</small>
                  <textarea value={vacancy} onChange={(event) => setVacancy(event.target.value)} placeholder="Cole aqui o anúncio da vaga…" />
                </label>
                <button className="secondary-button" onClick={startInterview}>Começar treino personalizado →</button>
              </div>
            </details>
            <p className="privacy-note">A transcrição e a avaliação acontecem neste aparelho. Revise sempre as sugestões e mantenha somente informações verdadeiras.</p>
          </div>
        ) : complete ? (
          <div className="interview-report">
            <span className="kicker">Seu diagnóstico</span>
            <h2>{premium ? "Relatório completo da entrevista" : "Primeiro treino concluído"}</h2>
            <div className="report-score"><strong>{average}</strong><span>/100</span><p>Índice de preparação</p></div>
            <div className="report-grid">
              <article><b>Clareza</b><span>{average >= 72 ? "Boa base" : "Precisa de exemplos"}</span><p>Respostas objetivas, organizadas e fáceis de acompanhar.</p></article>
              <article><b>Confiança</b><span>{average >= 65 ? "Em evolução" : "Treine em voz alta"}</span><p>Use pausas e comece pela ideia principal.</p></article>
              <article><b>Aderência à vaga</b><span>{vacancy ? "Analisada" : "Sem anúncio informado"}</span><p>Relacione requisitos apenas a experiências que você realmente possui.</p></article>
            </div>
            <div className="answer-review">
              {answers.map((item, answerIndex) => (
                <details key={`${item.question}-${answerIndex}`} open={answerIndex === 0}>
                  <summary>{answerIndex + 1}. {item.question} <span>{item.score}/100</span></summary>
                  <p><b>Sua resposta:</b> {item.answer}</p>
                  <ul>{item.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
                </details>
              ))}
            </div>
            {!premium && (
              <div className="unlock-card">
                <span>Você experimentou 3 perguntas</span>
                <h3>Continue até 12 perguntas e receba o relatório completo</h3>
                <p>Inclui análise das respostas, hábitos de linguagem, aderência à vaga e plano de estudo.</p>
                <button className="primary-button" onClick={() => checkout("interview")} disabled={checkoutLoading !== null}>
                  {checkoutLoading ? "Abrindo Mercado Pago…" : "Liberar por R$ 9,90"}
                </button>
              </div>
            )}
            <button className="secondary-button" onClick={startInterview}>Treinar novamente</button>
          </div>
        ) : (
          <div className="interview-session">
            <div className="session-top"><span>Pergunta {index + 1} de {questionLimit}</span><div className="progress-track"><span style={{ width: `${((index + 1) / questionLimit) * 100}%` }} /></div></div>
            <div className="interviewer-card">
              <span className="interviewer-avatar">P</span>
              <div><small>ENTREVISTADOR PRONTODOC</small><h2>{questions[index]}</h2></div>
              <button className="listen-button" onClick={() => speak(questions[index])} aria-label="Ouvir pergunta novamente">🔊 Ouvir</button>
            </div>
            <label className="answer-field">Sua resposta
              <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Toque no microfone e responda, ou digite aqui…" />
            </label>
            <div className="interview-actions">
              <button className={recording ? "danger-button" : "voice-button"} onClick={recording ? stopVoice : startVoice}>
                {recording ? "■ Parar" : "🎤 Responder por voz"}
              </button>
              <button className="primary-button" onClick={submitAnswer}>Avaliar resposta →</button>
            </div>
            {notice && <p className="site-notice" role="status">{notice}</p>}
            <p className="privacy-note">{recording ? "Ouvindo… fale naturalmente e toque em Parar quando terminar." : "Você também pode digitar. Não buscamos sotaque perfeito; avaliamos clareza e exemplos."}</p>
          </div>
        )}
        {notice && !started && <p className="site-notice" role="status">{notice}</p>}
      </section>

      <section className="journey-section section">
        <div className="section-heading"><span className="kicker">Um produto brasileiro de ponta a ponta</span><h2>Do anúncio da vaga à entrevista</h2><p>O diferencial não é só gerar texto: é treinar a pessoa para explicar sua história com verdade.</p></div>
        <div className="step-grid">
          <article className="step-card"><span>1</span><h3>Leitura da vaga</h3><p>Identifica os temas que merecem preparação, sem inserir habilidades inexistentes.</p></article>
          <article className="step-card"><span>2</span><h3>Currículo alinhado</h3><p>Conecta o que você já fez às exigências reais do anúncio.</p></article>
          <article className="step-card"><span>3</span><h3>Ensaio falado</h3><p>Treina respostas no celular e entrega correções acionáveis.</p></article>
        </div>
      </section>

      <section className="interview-pricing section" id="planos">
        <div className="section-heading"><span className="kicker">Pagamento único</span><h2>Escolha o nível de preparação</h2><p>Sem assinatura e sem cobrança escondida.</p></div>
        <div className="interview-price-grid">
          {[
            { id: "", name: "Treino grátis", price: "R$ 0", text: "3 perguntas e diagnóstico básico", button: "Começar agora" },
            { id: "interview", name: "Entrevista completa", price: "R$ 9,90", text: "Até 12 perguntas e relatório detalhado", button: "Liberar entrevista" },
            { id: "vacancy", name: "Preparação para a vaga", price: "R$ 19,90", text: "Currículo adaptado + entrevista + relatório", button: "Preparar para a vaga" },
            { id: "journey", name: "Jornada de contratação", price: "R$ 29,90", text: "3 entrevistas + currículo + carta + WhatsApp", button: "Comprar jornada" },
          ].map((plan, planIndex) => (
            <article className={`price-card ${planIndex === 2 ? "featured" : ""}`} key={plan.name}>
              {planIndex === 2 && <span className="popular">Mais completo</span>}
              <h3>{plan.name}</h3><strong>{plan.price}</strong><p>{plan.text}</p>
              <button className={plan.id ? "primary-button" : "secondary-button"} onClick={() => plan.id ? checkout(plan.id as PlanId) : startInterview()} disabled={checkoutLoading !== null}>
                {checkoutLoading === plan.id ? "Abrindo Mercado Pago…" : plan.button}
              </button>
            </article>
          ))}
        </div>
        <div className="payment-help">
          <strong>Pagamento realizado?</strong>
          <p>Como estes produtos usam Link de Pagamento, envie o comprovante e o plano escolhido para liberar os recursos neste aparelho.</p>
          <a
            className="secondary-button"
            href="mailto:angeloantunesdarocha@gmail.com?subject=Comprovante%20Entrevista%20ProntoDoc&body=Ol%C3%A1%2C%20segue%20meu%20comprovante.%0A%0APlano%20comprado%3A%0AE-mail%20usado%20no%20Mercado%20Pago%3A%0AN%C3%BAmero%20da%20opera%C3%A7%C3%A3o%3A"
          >
            Enviar comprovante por e-mail
          </a>
        </div>
      </section>

      <section className="faq section">
        <div className="section-heading"><span className="kicker">Uso responsável</span><h2>O que o simulador faz — e o que não faz</h2></div>
        <details><summary>O ProntoDoc inventa uma resposta por mim?</summary><p>Não. Ele ajuda a organizar experiências verdadeiras e sinaliza quando faltam exemplos. Nunca recomendamos inventar empregos, cursos ou resultados.</p></details>
        <details><summary>Meu áudio é armazenado?</summary><p>Não pelo ProntoDoc. O navegador transforma sua fala em texto e a análise desta versão acontece no seu aparelho.</p></details>
        <details><summary>Funciona sem microfone?</summary><p>Sim. Todas as respostas podem ser digitadas; a avaliação e o relatório funcionam da mesma maneira.</p></details>
      </section>
      {!started && (
        <button className="mobile-start-bar" onClick={startInterview}>
          <span aria-hidden="true">🎤</span>
          <strong>Começar entrevista grátis</strong>
          <small>3 perguntas • 2 min</small>
        </button>
      )}
      <footer><Link className="brand" href="/"><span className="brand-mark">▤</span>ProntoDoc</Link><p>Currículo e entrevista para oportunidades reais.</p><span>© 2026 ProntoDoc</span></footer>
    </main>
  );
}
