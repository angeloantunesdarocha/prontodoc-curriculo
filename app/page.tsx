"use client";

import { CSSProperties, ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

type Resume = {
  name: string;
  email: string;
  phone: string;
  city: string;
  role: string;
  objective: string;
  education: string;
  courses: string;
  experience: string;
  skills: string;
};

type NameAlignment = "left" | "center" | "right";

type NameLayout = {
  fontSize: number;
  offsetX: number;
  offsetY: number;
  alignment: NameAlignment;
  breakAfter: number;
};

const defaultNameLayout: NameLayout = {
  fontSize: 38,
  offsetX: 0,
  offsetY: 0,
  alignment: "center",
  breakAfter: 0,
};

const initialResume: Resume = {
  name: "Ana Souza",
  email: "ana.souza@email.com",
  phone: "(11) 98765-4321",
  city: "São Paulo, SP",
  role: "Auxiliar administrativo",
  objective:
    "Busco uma oportunidade como Auxiliar administrativo para contribuir com organização, atendimento e apoio às rotinas da equipe, desenvolvendo minhas competências e colaborando com bons resultados.",
  education: "Ensino Médio Completo — E.E. Prof. Carlos Gomes — 2023",
  courses: "Informática básica — concluído\nAtendimento ao cliente — concluído",
  experience:
    "Jovem Aprendiz — Administração\nApoio nas rotinas administrativas e organização de documentos.\nAtendimento e suporte a colaboradores e clientes.",
  skills: "Organização, Comunicação, Pacote Office, Atendimento ao cliente, Trabalho em equipe",
};

const emptyResume: Resume = {
  name: "",
  email: "",
  phone: "",
  city: "",
  role: "",
  objective: "",
  education: "",
  courses: "",
  experience: "",
  skills: "",
};

type PlanId = "pdf" | "versions" | "kit" | "interview" | "vacancy" | "journey";
type ResumeStyle = "ats" | "visual" | "vaga";
type PhotoChoice = "no" | "requested" | "visual";

type SpeechRecognitionEventLike = {
  results: ArrayLike<{ 0: { transcript: string } }>;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

type SmartRule = {
  keywords: string[];
  objective: (role: string) => string;
  skills: string[];
};

function normalizeText(text: string) {
  return text
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const SMART_RULES: SmartRule[] = [
  {
    keywords: ["vigilante", "seguranca", "porteiro", "vigia", "monitoramento"],
    objective: (role) =>
      `Busco uma oportunidade como ${role} para atuar com responsabilidade, atenção preventiva, controle de acesso e proteção de pessoas e patrimônios, cumprindo os procedimentos da empresa com postura profissional.`,
    skills: ["Atenção", "Responsabilidade", "Controle de acesso", "Comunicação", "Trabalho em equipe", "Postura profissional"],
  },
  {
    keywords: ["administrativo", "administrativa", "assistente", "auxiliar", "recepcionista", "rh", "escritorio"],
    objective: (role) =>
      `Busco uma oportunidade como ${role} para contribuir com organização, atendimento, controle de documentos e apoio às rotinas da equipe, desenvolvendo minhas competências e colaborando com bons resultados.`,
    skills: ["Organização", "Comunicação", "Pacote Office", "Atendimento ao cliente", "Gestão de documentos", "Trabalho em equipe"],
  },
  {
    keywords: ["vendedor", "vendas", "comercial", "caixa", "promotor"],
    objective: (role) =>
      `Busco uma oportunidade como ${role} para contribuir com atendimento de qualidade, identificação das necessidades dos clientes e alcance de metas, mantendo organização, cordialidade e foco em resultados.`,
    skills: ["Atendimento ao cliente", "Comunicação", "Negociação", "Organização", "Foco em resultados", "Trabalho em equipe"],
  },
  {
    keywords: ["atendente", "atendimento", "telemarketing", "call center", "suporte"],
    objective: (role) =>
      `Busco uma oportunidade como ${role} para oferecer atendimento claro e respeitoso, solucionar solicitações com agilidade e contribuir para uma boa experiência dos clientes e da equipe.`,
    skills: ["Atendimento ao cliente", "Comunicação", "Empatia", "Agilidade", "Organização", "Resolução de problemas"],
  },
  {
    keywords: ["motorista", "entregador", "logistica", "estoque", "almoxarife", "conferente"],
    objective: (role) =>
      `Busco uma oportunidade como ${role} para contribuir com segurança, pontualidade, organização e cumprimento das rotinas operacionais, cuidando dos materiais, veículos e prazos sob minha responsabilidade.`,
    skills: ["Pontualidade", "Responsabilidade", "Organização", "Atenção", "Trabalho em equipe", "Cumprimento de rotas e prazos"],
  },
  {
    keywords: ["programador", "desenvolvedor", "tecnologia", "ti", "suporte tecnico", "sistemas"],
    objective: (role) =>
      `Busco uma oportunidade como ${role} para aplicar conhecimentos de tecnologia, aprender continuamente e colaborar na solução de problemas, na melhoria de processos e na entrega de resultados para a equipe.`,
    skills: ["Raciocínio lógico", "Resolução de problemas", "Aprendizado contínuo", "Organização", "Comunicação", "Trabalho em equipe"],
  },
  {
    keywords: ["enfermagem", "cuidador", "saude", "farmacia", "clinica"],
    objective: (role) =>
      `Busco uma oportunidade como ${role} para prestar atendimento cuidadoso, humanizado e responsável, seguindo procedimentos de segurança e colaborando com a equipe e o bem-estar das pessoas atendidas.`,
    skills: ["Empatia", "Atenção", "Responsabilidade", "Comunicação", "Organização", "Trabalho em equipe"],
  },
  {
    keywords: ["limpeza", "servicos gerais", "auxiliar de producao", "operador", "manutencao"],
    objective: (role) =>
      `Busco uma oportunidade como ${role} para contribuir com disciplina, organização, produtividade e cumprimento dos padrões de qualidade e segurança da empresa.`,
    skills: ["Organização", "Agilidade", "Responsabilidade", "Atenção aos detalhes", "Disciplina", "Trabalho em equipe"],
  },
];

const EVIDENCE_SKILLS: { keywords: string[]; skill: string }[] = [
  { keywords: ["excel", "word", "office"], skill: "Pacote Office" },
  { keywords: ["informatica", "computador"], skill: "Informática" },
  { keywords: ["primeiros socorros"], skill: "Primeiros socorros" },
  { keywords: ["brigadista", "incendio"], skill: "Prevenção e combate a incêndio" },
  { keywords: ["habilitacao", "cnh", "carteira ab"], skill: "CNH" },
  { keywords: ["atendimento", "cliente", "recepcao"], skill: "Atendimento ao cliente" },
  { keywords: ["lideranca", "supervisor", "encarregado"], skill: "Liderança" },
  { keywords: ["estoque", "almoxarifado"], skill: "Controle de estoque" },
  { keywords: ["caixa"], skill: "Operação de caixa" },
  { keywords: ["vigilancia", "vigilante"], skill: "Vigilância patrimonial" },
  { keywords: ["motorista", "entrega", "rota"], skill: "Direção e cumprimento de rotas" },
];

function buildSmartSuggestions(
  role: string,
  education: string,
  courses: string,
  experience: string,
  jobText: string,
) {
  const cleanRole = role.replace(/\s+/g, " ").trim();
  if (!cleanRole) return { objective: "", skills: "" };

  const normalizedRole = normalizeText(cleanRole);
  const rule = SMART_RULES.find((item) =>
    item.keywords.some((keyword) => normalizedRole.includes(keyword)),
  );

  const selectedRule = rule ?? {
    objective: (desiredRole: string) =>
      `Busco uma oportunidade como ${desiredRole} para aplicar minhas experiências e conhecimentos com responsabilidade, disposição para aprender e compromisso com os resultados da equipe e da empresa.`,
    skills: ["Organização", "Comunicação", "Responsabilidade", "Proatividade", "Aprendizado contínuo", "Trabalho em equipe"],
  };

  const evidence = normalizeText(`${education} ${courses} ${experience} ${jobText}`);
  const skills = [...selectedRule.skills];

  EVIDENCE_SKILLS.forEach(({ keywords, skill }) => {
    if (keywords.some((keyword) => evidence.includes(keyword)) && !skills.includes(skill)) {
      skills.push(skill);
    }
  });

  const distinctSkills = skills.filter((skill) => !evidence.includes(normalizeText(skill)));

  return {
    objective: selectedRule.objective(cleanRole),
    skills: distinctSkills.slice(0, 8).join(", "),
  };
}

function ResumePreview({
  data,
  watermark = false,
  photoUrl = "",
  showPhoto = false,
  visual = false,
  nameLayout = defaultNameLayout,
}: {
  data: Resume;
  watermark?: boolean;
  photoUrl?: string;
  showPhoto?: boolean;
  visual?: boolean;
  nameLayout?: NameLayout;
}) {
  const sourceText = normalizeText([data.education, data.courses, data.experience].join(" "));
  const skills = data.skills
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((skill) => !sourceText.includes(normalizeText(skill)));

  const fullName = (data.name || "Seu nome completo").replace(/\s+/g, " ").trim();
  const nameWords = fullName.split(" ").filter(Boolean);
  const validBreak = nameLayout.breakAfter > 0 && nameLayout.breakAfter < nameWords.length;
  const nameLines = validBreak
    ? [
        nameWords.slice(0, nameLayout.breakAfter).join(" "),
        nameWords.slice(nameLayout.breakAfter).join(" "),
      ]
    : [fullName];

  const nameStyle = {
    "--resume-name-size": `${nameLayout.fontSize}px`,
    "--resume-name-x": `${nameLayout.offsetX}px`,
    "--resume-name-y": `${nameLayout.offsetY}px`,
    "--resume-name-align": nameLayout.alignment,
  } as CSSProperties;

  return (
    <article
      className={`resume-sheet ${watermark ? "free-watermark" : ""} ${visual ? "visual-resume" : ""}`}
      aria-label="Pré-visualização do currículo"
    >
      {watermark && <div className="watermark-text" aria-hidden="true">PRONTODOC GRÁTIS</div>}
      <header className="resume-header">
        {showPhoto && photoUrl && <img className="resume-photo" src={photoUrl} alt={`Foto de ${data.name || "candidato"}`} />}
        <div>
          <h3 className="resume-name-custom" style={nameStyle}>
            {nameLines.map((line, index) => (
              <span className="resume-name-line" key={`${line}-${index}`}>{line}</span>
            ))}
          </h3>
          <p>
            {[data.email, data.phone, data.city].filter(Boolean).join("  •  ") ||
              "email@exemplo.com  •  (00) 00000-0000  •  Sua cidade"}
          </p>
        </div>
      </header>
      <section className="resume-objective">
        <h4>Objetivo</h4>
        <p>
          {data.objective ||
            `Busco uma oportunidade como ${data.role || "profissional"} para contribuir com a equipe e desenvolver minhas habilidades.`}
        </p>
      </section>
      <section className="resume-education">
        <h4>Formação</h4>
        {(data.education || "Informe sua formação acadêmica.")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line, index) => <p key={line + "-" + index}>{line}</p>)}
      </section>
      <section className="resume-courses">
        <h4>Cursos</h4>
        {(data.courses || "Informe seus cursos complementares.")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
      </section>
      <section className="resume-experience">
        <h4>Experiência</h4>
        {(data.experience || "Se ainda não trabalhou, destaque projetos, cursos e trabalhos voluntários.")
          .split("\n")
          .map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
      </section>
      <section className="resume-skills">
        <h4>Habilidades</h4>
        <div className="skill-list">
          {(skills.length ? skills : ["Organização", "Comunicação", "Trabalho em equipe"]).map(
            (skill) => (
              <span key={skill}>{skill}</span>
            ),
          )}
        </div>
      </section>
    </article>
  );
}

export default function Home() {
  const [resume, setResume] = useState<Resume>(initialResume);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [entitlement, setEntitlement] = useState<PlanId | null>(null);
  const [resumeStyle, setResumeStyle] = useState<ResumeStyle>("ats");
  const [checkoutLoading, setCheckoutLoading] = useState<PlanId | null>(null);
  const [notice, setNotice] = useState("");
  const [photoChoice, setPhotoChoice] = useState<PhotoChoice>("no");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoFeedback, setPhotoFeedback] = useState("");
  const [jobText, setJobText] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioText, setAudioText] = useState("");
  const [autoObjective, setAutoObjective] = useState(true);
  const [autoSkills, setAutoSkills] = useState(true);
  const [nameLayout, setNameLayout] = useState<NameLayout>(defaultNameLayout);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("prontodoc-resume");
    const storedSmart = window.localStorage.getItem("prontodoc-smart-auto");

    if (stored) {
      try {
        const parsedResume = JSON.parse(stored) as Partial<Resume>;
        const restored = { ...emptyResume, ...parsedResume };
        queueMicrotask(() => setResume(restored));

        if (!storedSmart) {
          queueMicrotask(() => {
            setAutoObjective(!restored.objective.trim());
            setAutoSkills(!restored.skills.trim());
          });
        }
      } catch {
        window.localStorage.removeItem("prontodoc-resume");
      }
    }

    if (storedSmart) {
      try {
        const parsed = JSON.parse(storedSmart) as { objective?: boolean; skills?: boolean };
        queueMicrotask(() => {
          setAutoObjective(parsed.objective ?? true);
          setAutoSkills(parsed.skills ?? true);
        });
      } catch {
        window.localStorage.removeItem("prontodoc-smart-auto");
      }
    }

    const storedLayout = window.localStorage.getItem("prontodoc-name-layout");
    if (storedLayout) {
      try {
        const parsed = JSON.parse(storedLayout) as Partial<NameLayout>;
        queueMicrotask(() => setNameLayout({ ...defaultNameLayout, ...parsed }));
      } catch {
        window.localStorage.removeItem("prontodoc-name-layout");
      }
    }

    const storedEntitlement = window.localStorage.getItem("prontodoc-entitlement");
    if (storedEntitlement) {
      try {
        const parsed = JSON.parse(storedEntitlement) as { plan?: PlanId };
        if (parsed.plan && ["pdf", "versions", "kit", "interview", "vacancy", "journey"].includes(parsed.plan)) {
          queueMicrotask(() => setEntitlement(parsed.plan ?? null));
        }
      } catch {
        window.localStorage.removeItem("prontodoc-entitlement");
      }
    }
  }, []);

  useEffect(() => {
    if (!editing) return;
    window.localStorage.setItem("prontodoc-resume", JSON.stringify(resume));
  }, [resume, editing]);

  useEffect(() => {
    window.localStorage.setItem(
      "prontodoc-smart-auto",
      JSON.stringify({ objective: autoObjective, skills: autoSkills }),
    );
  }, [autoObjective, autoSkills]);

  useEffect(() => {
    window.localStorage.setItem("prontodoc-name-layout", JSON.stringify(nameLayout));
  }, [nameLayout]);

  const smartSuggestions = useMemo(
    () => buildSmartSuggestions(
      resume.role,
      resume.education,
      resume.courses,
      resume.experience,
      jobText,
    ),
    [resume.role, resume.education, resume.courses, resume.experience, jobText],
  );

  useEffect(() => {
    if (!resume.role.trim()) return;

    setResume((current) => {
      const objective = autoObjective ? smartSuggestions.objective : current.objective;
      const skills = autoSkills ? smartSuggestions.skills : current.skills;

      if (objective === current.objective && skills === current.skills) return current;
      return { ...current, objective, skills };
    });
  }, [resume.role, smartSuggestions, autoObjective, autoSkills]);

  const progress = useMemo(() => {
    const complete = Object.values(resume).filter((value) => value.trim()).length;
    return Math.round((complete / Object.keys(resume).length) * 100);
  }, [resume]);

  function update(field: keyof Resume, value: string, manual = true) {
    setResume((current) => ({ ...current, [field]: value }));

    if (manual && field === "objective") setAutoObjective(false);
    if (manual && field === "skills") setAutoSkills(false);

    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  }

  function applySmartSuggestions() {
    if (!resume.role.trim()) {
      setNotice("Preencha primeiro o cargo desejado para gerar o objetivo e as habilidades.");
      return;
    }

    setAutoObjective(true);
    setAutoSkills(true);
    setResume((current) => ({
      ...current,
      objective: smartSuggestions.objective,
      skills: smartSuggestions.skills,
    }));
    setNotice("Objetivo e habilidades atualizados. Revise e mantenha somente informações verdadeiras.");
  }

  function startNew() {
    setResume(emptyResume);
    setNameLayout(defaultNameLayout);
    setAutoObjective(true);
    setAutoSkills(true);
    setEditing(true);
    window.setTimeout(() => document.querySelector("#editor")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  const jobAnalysis = useMemo(() => {
    const stopWords = new Set(["para", "com", "uma", "das", "dos", "que", "por", "como", "ser", "ter", "sua", "seu", "vaga", "empresa", "trabalho", "experiência"]);
    const normalize = (text: string) =>
      text.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const vacancyWords = normalize(jobText).match(/[a-z0-9+#.]{4,}/g) || [];
    const unique = [...new Set(vacancyWords)].filter((word) => !stopWords.has(word)).slice(0, 30);
    const resumeText = normalize(Object.values(resume).join(" "));
    const matched = unique.filter((word) => resumeText.includes(word));
    const missing = unique.filter((word) => !resumeText.includes(word)).slice(0, 6);
    const score = unique.length ? Math.min(96, Math.round((matched.length / unique.length) * 100) + 22) : 0;
    return { score, matched: matched.slice(0, 6), missing };
  }, [jobText, resume]);

  const displayedResume = useMemo(() => {
    if (resumeStyle !== "vaga" || !jobText.trim()) return resume;
    const strengths = jobAnalysis.matched.length
      ? ` com conhecimentos relacionados a ${jobAnalysis.matched.join(", ")}`
      : "";
    return {
      ...resume,
      objective: `Busco uma oportunidade como ${resume.role || "profissional"}${strengths}. Quero contribuir com responsabilidade, aprendizado contínuo e foco nos resultados da equipe.`,
    };
  }, [resume, resumeStyle, jobText, jobAnalysis.matched]);

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 8 * 1024 * 1024) {
      setPhotoFeedback("Escolha uma imagem JPG, PNG ou WEBP de até 8 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result || "");
      const image = new Image();
      image.onload = () => {
        setPhotoUrl(value);
        setPhotoFeedback(
          image.width >= 400 && image.height >= 400
            ? "Foto pronta. Confira se o rosto está centralizado, com fundo neutro e boa iluminação."
            : "A foto pode perder qualidade. Prefira uma imagem com pelo menos 400 × 400 pixels.",
        );
      };
      image.src = value;
    };
    reader.readAsDataURL(file);
  }

  function startVoice() {
    const speechWindow = window as typeof window & {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setNotice("A gravação por voz não está disponível neste navegador. No Android, tente pelo Chrome.");
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const text = Array.from(event.results).map((result) => result[0].transcript).join(" ");
      setAudioText((current) => `${current} ${text}`.trim());
    };
    recognition.onend = () => setRecording(false);
    recognition.onerror = () => {
      setRecording(false);
      setNotice("Não consegui ouvir. Verifique a permissão do microfone e tente novamente.");
    };
    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
  }

  function stopVoice() {
    recognitionRef.current?.stop();
    setRecording(false);
  }

  function organizeAudio() {
    if (!audioText.trim()) {
      setNotice("Grave ou digite primeiro o seu relato profissional.");
      return;
    }
    update("experience", audioText.trim());
    if (!resume.objective) {
      update(
        "objective",
        `Busco uma oportunidade como ${resume.role || "profissional"} para aplicar minha experiência, aprender e contribuir com bons resultados.`,
        false,
      );
    }
    setNotice("Relato colocado em Experiências. Revise o texto antes de gerar o currículo.");
  }

  const coverLetter = useMemo(
    () =>
      `Olá,\n\nMeu nome é ${resume.name || "candidato(a)"} e gostaria de me candidatar a uma oportunidade como ${resume.role || "profissional"}. ${resume.objective || "Tenho interesse em contribuir com a equipe, aprender e gerar bons resultados."}\n\nMinha formação é ${resume.education || "compatível com a oportunidade"}${resume.courses ? ` e possuo cursos como ${resume.courses.replace(/\n/g, ", ")}` : ""}. Destaco habilidades como ${resume.skills || "organização, comunicação e trabalho em equipe"}.\n\nAgradeço pela atenção e fico à disposição para uma entrevista.\n\nAtenciosamente,\n${resume.name || "Seu nome"}`,
    [resume],
  );

  const whatsappMessage = useMemo(
    () =>
      `Olá! Meu nome é ${resume.name || "seu nome"}. Tenho interesse na oportunidade de ${resume.role || "trabalho"} e gostaria de encaminhar meu currículo para avaliação. Fico à disposição para conversar. Obrigado(a)!`,
    [resume],
  );

  async function startCheckout(plan: PlanId) {
    setCheckoutLoading(plan);
    setNotice("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email: resume.email }),
      });
      const result = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error || "Não foi possível iniciar o pagamento.");
      }
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível iniciar o pagamento.");
      setCheckoutLoading(null);
    }
  }

  function downloadPdf() {
    if (!entitlement) {
      setNotice("A versão gratuita será salva com marca-d’água. Escolha um plano para gerar o PDF limpo.");
    }
    window.setTimeout(() => window.print(), 50);
  }

  async function copyText(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setNotice(`${label} copiada.`);
  }

  const nameWordOptions = resume.name.trim().split(/\s+/).filter(Boolean);

  return (
    <main>
      <nav className="topbar" aria-label="Navegação principal">
        <a className="brand" href="#inicio" aria-label="ProntoDoc — início">
          <span className="brand-mark" aria-hidden="true">▤</span>
          ProntoDoc
        </a>
        <div className="nav-links">
          <a href="#como-funciona">Como funciona</a>
          <a href="/entrevista">Treinar entrevista</a>
          <a href="/guias">Guias gratuitos</a>
          <a href="#precos">Preços</a>
          <a href="#duvidas">Dúvidas</a>
        </div>
        <button className="outline-button" onClick={startNew}>Criar grátis</button>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow">✦ Currículo profissional sem complicação</span>
          <h1>Um currículo diferente para cada oportunidade</h1>
          <p className="hero-text">
            Conte sua história por voz, mostre a vaga e receba uma versão ATS e outra
            visual — com foto somente quando fizer sentido.
          </p>
          <button className="primary-button" onClick={startNew}>
            Criar meu currículo grátis <span aria-hidden="true">→</span>
          </button>
          <div className="trust-row" aria-label="Benefícios">
            <span>✓ Grátis para começar</span>
            <span>✓ Preço claro</span>
            <span>✓ PDF em minutos</span>
          </div>
        </div>
        <div className="hero-preview">
          <div className="ats-badge"><strong>100%</strong><span>formato legível</span></div>
          <ResumePreview data={displayedResume} watermark={!entitlement} nameLayout={nameLayout} />
        </div>
      </section>

      <section className="steps section" id="como-funciona">
        <div className="section-heading">
          <span className="kicker">Feito para funcionar no celular</span>
          <h2>Do zero ao currículo pronto em três passos</h2>
        </div>
        <div className="step-grid">
          {[
            ["1", "Fale ou digite", "Conte sua trajetória pelo microfone ou preencha os dados normalmente."],
            ["2", "Mostre a vaga", "Cole o anúncio e veja quais informações combinam e o que merece atenção."],
            ["3", "Escolha a versão", "Gere uma versão ATS sem foto ou uma apresentação visual profissional."],
          ].map(([number, title, text]) => (
            <article className="step-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="interview-promo section">
        <div className="interview-promo-copy">
          <span className="kicker">Novo • entrevista por voz</span>
          <h2>Seu currículo abre a porta. Sua resposta precisa sustentar a oportunidade.</h2>
          <p>
            Treine pelo celular com perguntas para o cargo, ouça o entrevistador,
            responda por voz e receba uma avaliação prática — sem inventar experiências.
          </p>
          <a className="primary-button" href="/entrevista">Treinar 3 perguntas grátis →</a>
        </div>
        <div className="promo-dialogue" aria-label="Exemplo do simulador">
          <span>ENTREVISTADOR PRONTODOC</span>
          <strong>“Conte uma situação em que você resolveu um problema.”</strong>
          <div><b>82/100</b><p>Boa resposta. Acrescente o resultado alcançado.</p></div>
        </div>
      </section>

      <section className={`builder section ${editing ? "is-open" : ""}`} id="editor">
        <div className="section-heading">
          <span className="kicker">Seu currículo</span>
          <h2>Preencha, revise e baixe</h2>
          <p>{saved ? "Alterações salvas neste aparelho." : `${progress}% preenchido`}</p>
        </div>
        {!editing ? (
          <div className="builder-closed">
            <p>Você pode experimentar sem criar conta e sem informar cartão.</p>
            <button className="primary-button" onClick={startNew}>Começar agora</button>
          </div>
        ) : (
          <div className="builder-grid">
            <form className="resume-form" onSubmit={(event) => event.preventDefault()}>
              <div className="progress-track" aria-label={`${progress}% preenchido`}>
                <span style={{ width: `${progress}%` }} />
              </div>

              <label>
                Nome completo
                <input
                  data-no-voice="true"
                  value={resume.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Ex.: Ana Souza"
                />
              </label>

              <fieldset className="smart-panel name-layout-panel">
                <legend>↔ Ajustar o nome no currículo</legend>
                <p>Altere somente a apresentação do nome. Os dados digitados não serão modificados.</p>
                <label className="name-size-control">
                  Tamanho do nome: <strong>{nameLayout.fontSize}px</strong>
                  <input
                    type="range"
                    min="24"
                    max="52"
                    step="1"
                    value={nameLayout.fontSize}
                    onChange={(event) => setNameLayout((current) => ({
                      ...current,
                      fontSize: Number(event.target.value),
                    }))}
                  />
                </label>
                <div className="name-control-group" role="group" aria-label="Alinhamento do nome">
                  <span>Alinhamento</span>
                  {(["left", "center", "right"] as NameAlignment[]).map((alignment) => (
                    <button
                      type="button"
                      key={alignment}
                      className={nameLayout.alignment === alignment ? "primary-button" : "secondary-button"}
                      onClick={() => setNameLayout((current) => ({ ...current, alignment }))}
                    >
                      {{ left: "Esquerda", center: "Centro", right: "Direita" }[alignment]}
                    </button>
                  ))}
                </div>
                <div className="name-move-controls" role="group" aria-label="Mover nome">
                  <span>Mover o nome</span>
                  <button type="button" onClick={() => setNameLayout((current) => ({ ...current, offsetY: current.offsetY - 4 }))}>↑</button>
                  <button type="button" onClick={() => setNameLayout((current) => ({ ...current, offsetX: current.offsetX - 4 }))}>←</button>
                  <button type="button" onClick={() => setNameLayout((current) => ({ ...current, offsetX: current.offsetX + 4 }))}>→</button>
                  <button type="button" onClick={() => setNameLayout((current) => ({ ...current, offsetY: current.offsetY + 4 }))}>↓</button>
                </div>
                <label>
                  Colocar parte do nome na linha de baixo
                  <select
                    value={nameLayout.breakAfter}
                    onChange={(event) => setNameLayout((current) => ({
                      ...current,
                      breakAfter: Number(event.target.value),
                    }))}
                  >
                    <option value={0}>Manter o nome em uma linha</option>
                    {nameWordOptions.slice(0, -1).map((word, index) => (
                      <option value={index + 1} key={`${word}-${index}`}>
                        Quebrar depois de “{word}”
                      </option>
                    ))}
                  </select>
                </label>
                <div className="inline-actions">
                  <button type="button" className="secondary-button" onClick={() => setNameLayout(defaultNameLayout)}>
                    Restaurar posição
                  </button>
                </div>
              </fieldset>

              <div className="field-row">
                <label>
                  E-mail
                  <input
                    data-no-voice="true"
                    type="email"
                    value={resume.email}
                    onChange={(event) => update("email", event.target.value)}
                    placeholder="voce@email.com"
                  />
                </label>
                <label>
                  Telefone
                  <input
                    data-no-voice="true"
                    inputMode="tel"
                    value={resume.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </label>
              </div>

              <div className="field-row">
                <label>
                  Cidade
                  <input
                    data-no-voice="true"
                    value={resume.city}
                    onChange={(event) => update("city", event.target.value)}
                    placeholder="Cidade, Estado"
                  />
                </label>
                <label>
                  Cargo desejado
                  <input
                    data-no-voice="true"
                    value={resume.role}
                    onChange={(event) => update("role", event.target.value)}
                    placeholder="Ex.: Auxiliar administrativo"
                  />
                </label>
              </div>

              <div className="smart-autofill-card" aria-live="polite">
                <div>
                  <strong>✨ Preenchimento inteligente</strong>
                  <p>
                    Ao informar o cargo, o ProntoDoc personaliza o objetivo e sugere habilidades.
                    Formação, cursos, experiência e descrição da vaga também refinam as sugestões.
                  </p>
                </div>
                <button type="button" className="secondary-button" onClick={applySmartSuggestions}>
                  Atualizar sugestões
                </button>
                <small>
                  Objetivo: {autoObjective ? "automático" : "editado manualmente"} · Habilidades: {autoSkills ? "automáticas" : "editadas manualmente"}.
                  Revise e mantenha apenas informações verdadeiras.
                </small>
              </div>

              <label>
                Objetivo profissional
                <textarea
                  value={resume.objective}
                  onChange={(event) => update("objective", event.target.value)}
                  placeholder="Será personalizado de acordo com o cargo desejado."
                />
              </label>
              <label>
                Formação
                <textarea
                  value={resume.education}
                  onChange={(event) => update("education", event.target.value)}
                  placeholder="Curso, instituição e ano"
                />
              </label>
              <label>
                Cursos
                <textarea
                  value={resume.courses}
                  onChange={(event) => update("courses", event.target.value)}
                  placeholder={"Um curso por linha. Ex.:\nInformática básica — concluído\nPrimeiros socorros — concluído"}
                />
              </label>
              <label>
                Experiências
                <textarea
                  value={resume.experience}
                  onChange={(event) => update("experience", event.target.value)}
                  placeholder="Cargo, empresa e principais atividades"
                />
              </label>
              <label>
                Habilidades
                <input
                  value={resume.skills}
                  onChange={(event) => update("skills", event.target.value)}
                  placeholder="Sugestões automáticas separadas por vírgulas"
                />
              </label>

              <fieldset className="smart-panel">
                <legend>🎙️ Conte sua experiência por voz</legend>
                <p>Fale onde trabalhou, o que fazia, cursos e resultados. Você poderá revisar tudo.</p>
                <textarea value={audioText} onChange={(event) => setAudioText(event.target.value)} placeholder="Seu relato aparecerá aqui…" />
                <div className="inline-actions">
                  <button type="button" className={recording ? "danger-button" : "secondary-button"} onClick={recording ? stopVoice : startVoice}>
                    {recording ? "■ Parar gravação" : "● Começar a falar"}
                  </button>
                  <button type="button" className="secondary-button" onClick={organizeAudio}>Usar no currículo</button>
                </div>
                {recording && <span className="recording-status">Ouvindo… fale naturalmente.</span>}
              </fieldset>

              <fieldset className="smart-panel">
                <legend>📷 Foto no currículo</legend>
                <p>O padrão recomendado é sem foto. Use somente se a empresa pedir ou se você desejar uma apresentação visual.</p>
                <div className="choice-grid">
                  <label><input type="radio" name="photo" checked={photoChoice === "no"} onChange={() => setPhotoChoice("no")} /> Sem foto <small>Recomendado para ATS</small></label>
                  <label><input type="radio" name="photo" checked={photoChoice === "requested"} onChange={() => setPhotoChoice("requested")} /> Empresa solicitou</label>
                  <label><input type="radio" name="photo" checked={photoChoice === "visual"} onChange={() => setPhotoChoice("visual")} /> Currículo visual</label>
                </div>
                {photoChoice !== "no" && (
                  <>
                    <label className="upload-button">Tirar foto ou escolher da galeria<input type="file" accept="image/*" capture="user" onChange={handlePhoto} /></label>
                    {photoFeedback && <p className="field-feedback">{photoFeedback}</p>}
                    <ul className="photo-guide"><li>Rosto e ombros centralizados</li><li>Fundo claro e neutro</li><li>Sem filtros ou outras pessoas</li></ul>
                  </>
                )}
              </fieldset>

              <fieldset className="smart-panel vacancy-panel">
                <legend>✦ Currículo direcionado à vaga</legend>
                <p>Cole o anúncio. Não inventamos qualificações: mostramos correspondências e pontos que você deve confirmar.</p>
                <textarea value={jobText} onChange={(event) => setJobText(event.target.value)} placeholder="Cole aqui a descrição completa da vaga…" />
                {jobText.trim() && (
                  <div className="match-result">
                    <strong>{jobAnalysis.score}% de alinhamento inicial</strong>
                    <div className="score-track"><span style={{ width: `${jobAnalysis.score}%` }} /></div>
                    {jobAnalysis.matched.length > 0 && <p><b>Encontrado:</b> {jobAnalysis.matched.join(", ")}</p>}
                    {jobAnalysis.missing.length > 0 && <p><b>Confirme se você possui:</b> {jobAnalysis.missing.join(", ")}</p>}
                    <button type="button" className="secondary-button" onClick={() => setResumeStyle("vaga")}>Adaptar sem inventar</button>
                  </div>
                )}
              </fieldset>

              <div className="version-switch" role="group" aria-label="Versão do currículo">
                <button type="button" className={resumeStyle === "ats" ? "primary-button" : "secondary-button"} onClick={() => setResumeStyle("ats")}>Versão ATS</button>
                <button type="button" className={resumeStyle === "visual" ? "primary-button" : "secondary-button"} onClick={() => setResumeStyle("visual")}>Versão visual</button>
                {jobText.trim() && <button type="button" className={resumeStyle === "vaga" ? "primary-button" : "secondary-button"} onClick={() => setResumeStyle("vaga")}>Para esta vaga</button>}
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setResume(emptyResume);
                    setNameLayout(defaultNameLayout);
                    setAutoObjective(true);
                    setAutoSkills(true);
                  }}
                >
                  Limpar
                </button>
                <button type="button" className="primary-button" onClick={downloadPdf}>
                  {entitlement ? "Baixar PDF sem marca" : "Baixar PDF grátis"}
                </button>
              </div>
              <p className="privacy-note">
                🔒 Seus dados ficam somente neste aparelho. {!entitlement && "O PDF grátis contém marca-d’água."}
              </p>
            </form>
            <div className="builder-preview">
              <span className="preview-label">
                {resumeStyle === "ats" ? "ATS • sem foto" : resumeStyle === "vaga" ? "Adaptado à vaga" : "Visual profissional"}
              </span>
              <ResumePreview
                data={displayedResume}
                watermark={!entitlement}
                photoUrl={photoUrl}
                showPhoto={resumeStyle !== "ats" && photoChoice !== "no"}
                visual={resumeStyle === "visual"}
                nameLayout={nameLayout}
              />
            </div>
          </div>
        )}
      </section>

      {entitlement && (
        <section className="premium-delivery section" id="meus-produtos">
          <div className="section-heading">
            <span className="kicker">Compra liberada</span>
            <h2>Seus recursos ProntoDoc</h2>
            <p>Plano ativo: {{
              pdf: "PDF Profissional",
              versions: "3 versões",
              kit: "Kit Candidatura",
              interview: "Entrevista Completa",
              vacancy: "Preparação para a Vaga",
              journey: "Jornada de Contratação",
            }[entitlement]}.</p>
          </div>

          {(entitlement === "versions" || entitlement === "kit" || entitlement === "vacancy" || entitlement === "journey") && (
            <div className="delivery-card">
              <h3>Três versões do currículo</h3>
              <p>Escolha o estilo e baixe cada versão em PDF.</p>
              <div className="style-buttons" role="group" aria-label="Estilo do currículo">
                {[
                  ["ats", "ATS sem foto"],
                  ["visual", "Visual com foto opcional"],
                  ["vaga", "Direcionado à vaga"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    className={resumeStyle === value ? "primary-button" : "secondary-button"}
                    onClick={() => setResumeStyle(value as ResumeStyle)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button className="primary-button" onClick={downloadPdf}>Baixar esta versão</button>
            </div>
          )}

          {(entitlement === "kit" || entitlement === "journey") && (
            <div className="delivery-grid">
              <article className="delivery-card">
                <h3>Carta de apresentação</h3>
                <textarea readOnly value={coverLetter} aria-label="Carta de apresentação gerada" />
                <button className="secondary-button" onClick={() => copyText(coverLetter, "Carta")}>Copiar carta</button>
              </article>
              <article className="delivery-card">
                <h3>Mensagem para WhatsApp</h3>
                <textarea readOnly value={whatsappMessage} aria-label="Mensagem para WhatsApp gerada" />
                <button className="secondary-button" onClick={() => copyText(whatsappMessage, "Mensagem")}>Copiar mensagem</button>
              </article>
            </div>
          )}
          {(entitlement === "interview" || entitlement === "vacancy" || entitlement === "journey") && (
            <div className="delivery-card">
              <h3>Entrevista por voz liberada</h3>
              <p>Treine perguntas adaptadas ao cargo e receba seu relatório de preparação.</p>
              <a className="primary-button compact-button" href="/entrevista">Abrir simulador de entrevista</a>
            </div>
          )}
        </section>
      )}

      <section className="knowledge-section section" id="guias">
        <div className="section-heading">
          <span className="kicker">Central do Currículo</span>
          <h2>Informação gratuita para buscar emprego melhor</h2>
          <p>Guias feitos para dúvidas reais de candidatos em todo o Brasil — sem promessas falsas e sem complicação.</p>
        </div>
        <div className="knowledge-grid">
          <a href="/guias/curriculo-para-primeiro-emprego"><span>Primeiro emprego</span><h3>O que colocar quando falta experiência?</h3><p>Aprenda a valorizar formação, projetos e habilidades verdadeiras.</p></a>
          <a href="/guias/curriculo-compativel-com-gupy-ats"><span>ATS e plataformas</span><h3>Currículo compatível com Gupy e ATS</h3><p>Use estrutura simples e palavras relevantes sem repetições artificiais.</p></a>
          <a href="/guias/curriculo-com-foto-ou-sem-foto"><span>Boas práticas</span><h3>Currículo com foto ou sem foto?</h3><p>Entenda quando usar e qual é o padrão profissional.</p></a>
        </div>
        <div className="knowledge-action"><a className="primary-button" href="/guias">Ver todos os guias gratuitos →</a></div>
      </section>

      <section className="pricing section" id="precos">
        <div className="section-heading">
          <span className="kicker">Sem assinatura escondida</span>
          <h2>Escolha só o que você precisa</h2>
          <p>A versão gratuita permite montar, revisar e salvar com marca-d’água. Os planos pagos liberam a entrega profissional.</p>
        </div>
        {notice && <p className="site-notice" role="status">{notice}</p>}
        <div className="price-grid">
          {[
            { id: "", name: "Grátis", price: "R$ 0", text: "Monte, visualize e baixe com marca-d’água", action: "Começar grátis" },
            { id: "pdf", name: "PDF Profissional", price: "R$ 4,90", text: "Uma versão limpa e pronta para enviar", action: "Comprar com Mercado Pago" },
            { id: "versions", name: "3 versões", price: "R$ 9,90", text: "Versões ATS, formal e direta", action: "Comprar com Mercado Pago" },
            { id: "kit", name: "Kit Candidatura", price: "R$ 14,90", text: "Currículo, carta e mensagem para WhatsApp", action: "Comprar o kit" },
          ].map(({ id, name, price, text, action }, index) => (
            <article className={`price-card ${index === 3 ? "featured" : ""}`} key={name}>
              {index === 3 && <span className="popular">Melhor escolha</span>}
              <h3>{name}</h3>
              <strong>{price}</strong>
              <p>{text}</p>
              {id ? (
                <button
                  className="primary-button payment-link"
                  onClick={() => startCheckout(id as PlanId)}
                  disabled={checkoutLoading !== null}
                  aria-label={`${action}: ${name} por ${price}`}
                >
                  {checkoutLoading === id ? "Abrindo pagamento…" : action}
                </button>
              ) : (
                <button className="secondary-button" onClick={startNew}>{action}</button>
              )}
            </article>
          ))}
        </div>
        <div className="payment-help">
          <strong>Já realizou o pagamento?</strong>
          <p>
            Enquanto a confirmação automática está sendo ativada, envie o comprovante
            e o e-mail usado na compra para receber a liberação.
          </p>
          <a
            className="secondary-button"
            href="mailto:angeloantunesdarocha@gmail.com?subject=Comprovante%20ProntoDoc&body=Ol%C3%A1%2C%20segue%20meu%20comprovante%20do%20ProntoDoc.%0A%0APlano%3A%0AE-mail%20usado%20no%20pagamento%3A%0AN%C3%BAmero%20da%20opera%C3%A7%C3%A3o%3A"
          >
            Enviar comprovante por e-mail
          </a>
        </div>
      </section>

      <section className="faq section" id="duvidas">
        <div className="section-heading"><span className="kicker">Dúvidas frequentes</span><h2>Informação clara antes de começar</h2></div>
        <details><summary>Preciso criar uma conta?</summary><p>Não. Na primeira versão, você pode montar o currículo diretamente e os dados ficam salvos no seu aparelho.</p></details>
        <details><summary>Funciona em celular Android?</summary><p>Sim. O formulário, a prévia e os botões foram pensados primeiro para telas de celular.</p></details>
        <details><summary>Como salvo em PDF?</summary><p>Toque em “Baixar em PDF” e escolha “Salvar como PDF” na tela de impressão. O plano gratuito inclui marca-d’água; os planos pagos liberam o PDF limpo.</p></details>
        <details><summary>Quando recebo minha compra?</summary><p>Com o pagamento aprovado pelo Mercado Pago, você volta ao ProntoDoc e os recursos do plano são liberados automaticamente neste aparelho.</p></details>
        <details><summary>Posso treinar uma entrevista?</summary><p>Sim. A Entrevista ProntoDoc oferece três perguntas grátis e planos com até 12 perguntas, análise das respostas e preparação direcionada à vaga.</p></details>
      </section>

      <footer><a className="brand" href="#inicio"><span className="brand-mark">▤</span>ProntoDoc</a><p>Currículos claros para oportunidades reais.</p><span>© 2026 ProntoDoc</span></footer>
    </main>
  );
}
