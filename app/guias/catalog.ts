import { guides as originalGuides, type Guide } from "./data";

const extraGuides: Guide[] = [
  {
    slug: "curriculo-jovem-aprendiz",
    title: "Currículo para Jovem Aprendiz: modelo e passo a passo",
    description: "Veja o que colocar no currículo de Jovem Aprendiz, mesmo sem experiência profissional.",
    category: "Jovem Aprendiz",
    readingTime: "8 min",
    intro: "O currículo de Jovem Aprendiz precisa mostrar formação, responsabilidade, disponibilidade e vontade de aprender. Experiência formal não é obrigatória: atividades escolares, cursos, projetos e participação comunitária podem demonstrar competências importantes.",
    sections: [
      {
        title: "Comece com um objetivo específico",
        paragraphs: ["Informe que procura uma oportunidade como Jovem Aprendiz e, quando souber, mencione a área: administrativa, atendimento, logística ou comércio.", "Evite frases genéricas como “qualquer oportunidade”. Um objetivo claro ajuda a empresa a entender onde você deseja começar."],
        bullets: ["Jovem Aprendiz administrativo", "Jovem Aprendiz em atendimento", "Jovem Aprendiz em logística"],
      },
      {
        title: "Valorize escola, cursos e atividades reais",
        paragraphs: ["Informe escolaridade, instituição e turno de estudo. Acrescente cursos de informática, atendimento, comunicação ou outros temas relacionados à vaga.", "Projetos escolares, esporte em equipe, igreja, associação e voluntariado podem entrar quando mostrarem organização, compromisso ou contato com pessoas."],
      },
      {
        title: "Use uma estrutura simples",
        paragraphs: ["Mantenha nome, contato, cidade, objetivo, formação, cursos, atividades e habilidades em ordem clara. Não coloque CPF, RG, dados bancários ou informações desnecessárias.", "Salve em PDF e use um nome profissional, como Curriculo-Joao-Silva.pdf."],
      },
    ],
    faqs: [
      { question: "Posso fazer currículo sem nenhuma experiência?", answer: "Sim. Destaque escola, cursos, projetos, responsabilidades e habilidades verdadeiras." },
      { question: "Preciso colocar foto?", answer: "Normalmente não. Use foto somente quando a empresa solicitar." },
    ],
  },
  {
    slug: "curriculo-para-estagio",
    title: "Currículo para estágio: como destacar formação e projetos",
    description: "Monte um currículo de estágio com formação, conhecimentos, projetos acadêmicos e disponibilidade.",
    category: "Estágio",
    readingTime: "8 min",
    intro: "Para uma vaga de estágio, a empresa procura sinais de aprendizado, base técnica e interesse pela área. O currículo deve mostrar o curso, o período atual, os conhecimentos aplicáveis e experiências acadêmicas ou pessoais relacionadas.",
    sections: [
      {
        title: "Deixe o curso e o período visíveis",
        paragraphs: ["Informe instituição, nome do curso, semestre ou período e previsão de conclusão. Acrescente o turno quando isso ajudar a explicar sua disponibilidade.", "O objetivo deve citar a área de estágio e não prometer conhecimentos que você ainda não possui."],
      },
      {
        title: "Transforme trabalhos em projetos",
        paragraphs: ["Descreva projetos acadêmicos relevantes com tema, ferramentas utilizadas e sua participação. Trabalhos em equipe podem demonstrar comunicação, organização e cumprimento de prazo.", "Inclua portfólio ou GitHub quando houver material organizado e apropriado para avaliação profissional."],
        bullets: ["Projetos acadêmicos", "Cursos complementares", "Ferramentas realmente utilizadas", "Idiomas com nível verdadeiro"],
      },
      {
        title: "Adapte às exigências da vaga",
        paragraphs: ["Compare o anúncio com sua formação e reorganize o currículo para destacar os conhecimentos mais próximos da oportunidade.", "Não transforme contato básico com uma ferramenta em domínio avançado. Explique o que consegue fazer na prática."],
      },
    ],
    faqs: [
      { question: "Projeto da faculdade conta como experiência?", answer: "Conta como projeto acadêmico. Explique sua contribuição sem apresentar o projeto como emprego." },
      { question: "Currículo de estágio pode ter duas páginas?", answer: "Na maioria dos casos, uma página é suficiente para estudantes no início da carreira." },
    ],
  },
  {
    slug: "curriculo-recepcionista",
    title: "Currículo para recepcionista: modelo, habilidades e exemplos",
    description: "Destaque atendimento, agenda, organização e comunicação no currículo para recepcionista.",
    category: "Por profissão",
    readingTime: "7 min",
    intro: "Recepção exige comunicação clara, organização, atenção e cuidado com informações. O currículo deve mostrar situações reais de atendimento e rotinas administrativas, mesmo quando adquiridas em atividades informais.",
    sections: [
      {
        title: "Mostre os canais de atendimento que conhece",
        paragraphs: ["Informe experiências com atendimento presencial, telefone, WhatsApp, e-mail, cadastro ou orientação de visitantes.", "Descreva o ambiente atendido, como clínica, escritório, comércio, escola ou hotel, sem divulgar informações confidenciais."],
      },
      {
        title: "Inclua organização e apoio administrativo",
        paragraphs: ["Agenda, confirmação de horários, organização de documentos, atualização de cadastros e encaminhamento de solicitações são atividades relevantes.", "Quando tiver resultados verdadeiros, cite redução de atrasos, volume de atendimentos ou melhoria na organização."],
        bullets: ["Atendimento ao público", "Organização de agenda", "Comunicação escrita", "Pacote Office", "Sigilo e atenção"],
      },
      {
        title: "Prepare uma versão ATS",
        paragraphs: ["Use títulos simples e texto selecionável. Evite colocar experiências importantes dentro de imagens ou elementos decorativos.", "Adapte palavras do anúncio somente quando representarem atividades que você realmente executou."],
      },
    ],
    faqs: [
      { question: "Preciso ter curso de recepcionista?", answer: "Depende da vaga. Cursos ajudam, mas experiências reais de atendimento e organização também podem ser relevantes." },
      { question: "Atendimento informal pode entrar?", answer: "Sim, desde que seja verdadeiro e identificado de forma clara como atividade informal ou autônoma." },
    ],
  },
  {
    slug: "curriculo-vendedor",
    title: "Currículo para vendedor: exemplos de atividades e resultados",
    description: "Aprenda a apresentar atendimento, negociação, metas e pós-venda em um currículo comercial.",
    category: "Por profissão",
    readingTime: "8 min",
    intro: "Um bom currículo de vendas apresenta comportamento comercial e evidências. Atendimento, entendimento da necessidade, negociação, organização de carteira e pós-venda são mais convincentes quando acompanhados de exemplos reais.",
    sections: [
      {
        title: "Descreva como você vende",
        paragraphs: ["Explique se atendia presencialmente, por telefone, WhatsApp ou canais digitais. Informe os tipos de produtos ou serviços e as etapas pelas quais era responsável.", "Evite escrever apenas “bom vendedor”. Mostre ações observáveis, como abordagem, demonstração, orçamento, negociação e acompanhamento."],
      },
      {
        title: "Use números somente quando forem verdadeiros",
        paragraphs: ["Metas atingidas, crescimento de carteira, quantidade de atendimentos e taxa de retorno podem fortalecer o currículo quando você conhece os dados e pode explicá-los.", "Não invente percentuais. Quando não tiver números, descreva responsabilidades, frequência e complexidade."],
        bullets: ["Prospecção", "Atendimento consultivo", "Negociação", "Pós-venda", "Organização de clientes"],
      },
      {
        title: "Ajuste ao segmento",
        paragraphs: ["Vendas de varejo, serviços, veículos, imóveis e atendimento interno valorizam experiências diferentes. Reorganize o currículo conforme a vaga.", "Mantenha cargos, datas e resultados consistentes com o que você poderá explicar na entrevista."],
      },
    ],
    faqs: [
      { question: "Comissão deve aparecer no currículo?", answer: "Normalmente não é necessário. Dê prioridade a atividades, resultados e segmentos atendidos." },
      { question: "Posso colocar trabalho autônomo de vendas?", answer: "Sim. Identifique como atividade autônoma e descreva produtos, canais e responsabilidades." },
    ],
  },
  {
    slug: "curriculo-operador-de-caixa",
    title: "Currículo para operador de caixa: o que colocar",
    description: "Organize experiência com caixa, atendimento, conferência e fechamento em um currículo profissional.",
    category: "Por profissão",
    readingTime: "7 min",
    intro: "Operação de caixa exige atenção, honestidade, agilidade e bom atendimento. O currículo deve demonstrar cuidado com valores, conferência, sistemas e relacionamento com clientes.",
    sections: [
      {
        title: "Descreva a rotina do caixa",
        paragraphs: ["Informe recebimentos, emissão de comprovantes, abertura e fechamento, conferência, sangria e apoio ao cliente quando essas atividades fizerem parte da sua experiência.", "Cite os sistemas que utilizou somente quando souber explicar as tarefas realizadas."],
      },
      {
        title: "Destaque precisão e atendimento",
        paragraphs: ["Explique como evita divergências, confere informações e comunica problemas. Situações de fila, troca e diferença de preço também demonstram preparo.", "Não divulgue dados de clientes, valores internos ou informações confidenciais da empresa."],
        bullets: ["Conferência de valores", "Atendimento", "Abertura e fechamento", "Organização", "Trabalho em equipe"],
      },
      {
        title: "Inclua experiências próximas",
        paragraphs: ["Atendimento em comércio familiar, vendas informais e apoio em eventos podem ser apresentados quando envolveram responsabilidade real com pagamentos ou clientes.", "Identifique corretamente o tipo de atividade e o período."],
      },
    ],
    faqs: [
      { question: "Preciso informar que sei dar troco?", answer: "Você pode destacar cálculo e conferência de valores, preferencialmente junto de exemplos de rotina." },
      { question: "Nunca trabalhei em caixa. O que destacar?", answer: "Mostre atendimento, responsabilidade, atenção, matemática básica e experiências comparáveis verdadeiras." },
    ],
  },
  {
    slug: "curriculo-auxiliar-de-producao",
    title: "Currículo para auxiliar de produção: modelo e competências",
    description: "Destaque segurança, qualidade, organização e ritmo de trabalho no currículo de produção.",
    category: "Por profissão",
    readingTime: "7 min",
    intro: "Vagas de produção costumam avaliar disciplina, segurança, atenção a procedimentos, qualidade e trabalho em equipe. O currículo deve mostrar rotinas reais e disponibilidade verdadeira.",
    sections: [
      {
        title: "Apresente tarefas operacionais com clareza",
        paragraphs: ["Descreva abastecimento de linha, separação, montagem, embalagem, inspeção, limpeza, movimentação ou registro quando fizerem parte da sua experiência.", "Informe máquinas e equipamentos somente quando tiver treinamento ou experiência real."],
      },
      {
        title: "Demonstre segurança e qualidade",
        paragraphs: ["Cite uso correto de EPI, conferência, organização do posto e comunicação de desvios. Evite prometer produtividade sem respeitar segurança e procedimento.", "Resultados podem incluir redução de retrabalho, cumprimento de metas ou participação em melhoria, desde que sejam verdadeiros."],
        bullets: ["Segurança", "Controle de qualidade", "Organização", "Pontualidade", "Trabalho em equipe"],
      },
      {
        title: "Informe disponibilidade com honestidade",
        paragraphs: ["Turnos, escala e deslocamento são relevantes, mas devem aparecer somente quando você realmente puder cumprir.", "Não inclua questões pessoais sem relação com a função."],
      },
    ],
    faqs: [
      { question: "Curso de segurança ajuda?", answer: "Pode ajudar quando for verdadeiro, atualizado e relacionado às atividades da vaga." },
      { question: "Trabalho rural ou braçal pode entrar?", answer: "Sim, quando demonstrar responsabilidades transferíveis como ritmo, segurança, organização e resistência." },
    ],
  },
  {
    slug: "curriculo-servicos-gerais",
    title: "Currículo para serviços gerais: atividades e habilidades",
    description: "Crie um currículo claro para limpeza, conservação, apoio e organização de ambientes.",
    category: "Por profissão",
    readingTime: "7 min",
    intro: "Serviços gerais envolvem confiança, organização, cuidado, segurança e cumprimento de rotina. O currículo deve explicar ambientes atendidos, tipos de atividade e responsabilidade com materiais.",
    sections: [
      {
        title: "Informe os ambientes e atividades",
        paragraphs: ["Descreva limpeza e conservação de escritórios, escolas, clínicas, condomínios, lojas ou residências quando isso representar sua experiência.", "Inclua organização, reposição de materiais, coleta, apoio em eventos e outras tarefas realmente realizadas."],
      },
      {
        title: "Mostre cuidado e procedimento",
        paragraphs: ["Destaque uso correto de produtos, separação de materiais, sinalização, equipamentos de proteção e respeito às orientações do local.", "Não diga que conhece um produto ou máquina que nunca utilizou."],
        bullets: ["Organização", "Pontualidade", "Uso responsável de materiais", "Atenção à segurança", "Discrição"],
      },
      {
        title: "Apresente trabalhos informais corretamente",
        paragraphs: ["Serviços prestados por diária ou de forma autônoma podem entrar. Informe o tipo de ambiente, período aproximado e responsabilidades.", "Evite divulgar endereço ou dados pessoais de clientes."],
      },
    ],
    faqs: [
      { question: "Diárias de limpeza contam como experiência?", answer: "Sim. Apresente como atividade autônoma, com período e tarefas verdadeiras." },
      { question: "Preciso colocar referência de cliente?", answer: "Somente quando solicitado e com autorização da pessoa." },
    ],
  },
  {
    slug: "curriculo-cuidador-de-idosos",
    title: "Currículo para cuidador de idosos: experiência e cuidados",
    description: "Organize cursos, rotinas de cuidado, acompanhamento e responsabilidade no currículo de cuidador.",
    category: "Por profissão",
    readingTime: "8 min",
    intro: "O currículo de cuidador deve transmitir responsabilidade, respeito, atenção e limites profissionais. Descreva atividades verdadeiras sem expor informações médicas ou pessoais das pessoas atendidas.",
    sections: [
      {
        title: "Explique as rotinas de acompanhamento",
        paragraphs: ["Informe companhia, auxílio em mobilidade, alimentação, higiene, organização de rotina e acompanhamento a compromissos quando essas tarefas fizerem parte da sua experiência.", "Procedimentos de saúde devem ser mencionados somente quando houver capacitação e autorização adequadas."],
      },
      {
        title: "Proteja a privacidade",
        paragraphs: ["Nunca divulgue diagnóstico, endereço, documentos ou detalhes que identifiquem a pessoa cuidada. Descreva o contexto de forma geral.", "Referências devem ser fornecidas apenas com autorização."],
        bullets: ["Empatia", "Pontualidade", "Comunicação com a família", "Organização de rotina", "Respeito e discrição"],
      },
      {
        title: "Inclua formação e cursos válidos",
        paragraphs: ["Informe curso de cuidador, primeiros socorros e outras capacitações com instituição e ano. Não use certificados inexistentes ou vencidos como se estivessem atuais.", "Diferencie cuidado profissional de ajuda ocasional a familiares, apresentando cada experiência com honestidade."],
      },
    ],
    faqs: [
      { question: "Cuidado de familiar pode entrar?", answer: "Pode ser citado com cuidado, identificando que foi uma experiência familiar e descrevendo competências sem exagerar." },
      { question: "Devo colocar informações de saúde do idoso?", answer: "Não. Preserve totalmente a privacidade da pessoa atendida." },
    ],
  },
  {
    slug: "modelo-curriculo-sem-experiencia",
    title: "Modelo de currículo sem experiência: estrutura pronta",
    description: "Use uma estrutura simples para montar o primeiro currículo sem inventar empregos ou qualificações.",
    category: "Sem experiência",
    readingTime: "7 min",
    intro: "Quem ainda não trabalhou pode criar um currículo profissional. A estrutura deve mostrar objetivo, formação, cursos, projetos, atividades e habilidades comprováveis.",
    sections: [
      {
        title: "Estrutura recomendada",
        paragraphs: ["Organize o documento em nome e contatos, objetivo, formação, cursos, projetos ou atividades, habilidades e idiomas quando aplicável.", "Mantenha o currículo em uma página e priorize informações relacionadas à oportunidade."],
        bullets: ["Nome e contato", "Objetivo específico", "Formação", "Cursos e projetos", "Habilidades verdadeiras"],
      },
      {
        title: "Exemplo de objetivo",
        paragraphs: ["Exemplo: “Busco minha primeira oportunidade como auxiliar administrativo, com interesse em desenvolver atendimento, organização e rotinas de escritório”.", "Adapte o cargo e as competências somente quando combinarem com seu perfil."],
      },
      {
        title: "O que não fazer",
        paragraphs: ["Não invente empresas, datas, cursos ou resultados. Não inclua documentos pessoais, pretensão salarial sem solicitação ou frases longas sem informação.", "Revise ortografia, telefone e e-mail antes de salvar em PDF."],
      },
    ],
    faqs: [
      { question: "Posso usar um modelo pronto?", answer: "Sim, desde que substitua os exemplos por informações verdadeiras e revise todo o documento." },
      { question: "Habilidades pessoais são suficientes?", answer: "Elas ficam mais fortes quando acompanhadas de atividades ou exemplos que demonstrem o comportamento." },
    ],
  },
  {
    slug: "objetivo-profissional-para-curriculo",
    title: "Objetivo profissional para currículo: exemplos por situação",
    description: "Aprenda a escrever um objetivo curto, específico e coerente com a vaga desejada.",
    category: "Boas práticas",
    readingTime: "7 min",
    intro: "O objetivo profissional deve ajudar o recrutador a entender qual função você procura. Ele não precisa contar toda a sua história nem listar qualidades genéricas.",
    sections: [
      {
        title: "Use cargo ou área",
        paragraphs: ["Prefira “Busco oportunidade como recepcionista” ou “Busco estágio em desenvolvimento de software” em vez de “busco crescer junto com a empresa”.", "Quando estiver aberto a funções próximas, mencione uma área coerente, como atendimento e rotinas administrativas."],
      },
      {
        title: "Adapte sem inventar",
        paragraphs: ["Você pode alterar o objetivo para cada candidatura quando o cargo estiver alinhado à sua experiência ou formação.", "Não acrescente habilidades apenas para repetir o anúncio. O restante do currículo deve sustentar o objetivo."],
        bullets: ["Cargo desejado", "Área de interesse", "Momento profissional", "Contribuição realista"],
      },
      {
        title: "Mantenha uma ou duas frases",
        paragraphs: ["Um objetivo curto facilita a leitura e deixa espaço para experiências e formação.", "Evite pretensão salarial, explicações pessoais ou elogios à própria personalidade nesse campo."],
      },
    ],
    faqs: [
      { question: "Posso usar o mesmo objetivo em todas as vagas?", answer: "Pode, mas adaptar o cargo ou a área costuma tornar o currículo mais relevante." },
      { question: "Objetivo é obrigatório?", answer: "Não em todos os casos, mas ajuda especialmente no primeiro emprego ou em mudança de área." },
    ],
  },
  {
    slug: "carta-de-apresentacao-primeiro-emprego",
    title: "Carta de apresentação para primeiro emprego",
    description: "Veja como escrever uma apresentação curta, honesta e relacionada à primeira oportunidade.",
    category: "Candidatura",
    readingTime: "7 min",
    intro: "A carta de apresentação complementa o currículo quando explica seu interesse, formação e sinais de responsabilidade. Ela deve ser personalizada e curta.",
    sections: [
      {
        title: "Apresente a oportunidade e seu momento",
        paragraphs: ["Comece citando a vaga ou área, seu nome e sua situação de estudo ou formação. Evite iniciar com uma história longa.", "Explique por que a oportunidade faz sentido e o que você está preparado para aprender."],
      },
      {
        title: "Use evidências simples",
        paragraphs: ["Mencione curso, projeto, atividade escolar, voluntariado ou responsabilidade que demonstre uma competência relevante.", "Uma experiência pequena e verdadeira é melhor que uma afirmação exagerada."],
        bullets: ["Vaga de interesse", "Formação", "Uma evidência", "Disponibilidade", "Agradecimento"],
      },
      {
        title: "Finalize com ação",
        paragraphs: ["Diga que o currículo está anexado e que você fica à disposição para conversar. Revise o nome da empresa e do cargo.", "Não envie a mesma carta com o nome errado para várias empresas."],
      },
    ],
    faqs: [
      { question: "Carta de apresentação precisa ter uma página?", answer: "Não. Para primeiro emprego, três ou quatro parágrafos curtos costumam ser suficientes." },
      { question: "Posso dizer que não tenho experiência?", answer: "Sim. Em seguida, mostre atividades reais e disposição para aprender." },
    ],
  },
  {
    slug: "como-enviar-curriculo-por-email",
    title: "Como enviar currículo por e-mail: assunto e mensagem",
    description: "Use um assunto claro, uma mensagem profissional e confira o PDF antes de enviar.",
    category: "Candidatura",
    readingTime: "6 min",
    intro: "Um e-mail de candidatura precisa permitir que a empresa identifique rapidamente a vaga, o candidato e o arquivo anexado. Clareza é mais importante que uma mensagem longa.",
    sections: [
      {
        title: "Escreva um assunto identificável",
        paragraphs: ["Use formatos como “Candidatura – Auxiliar Administrativo – Ana Souza” ou siga exatamente o padrão solicitado no anúncio.", "Evite assuntos vazios, apelidos e frases como “preciso de emprego”."],
      },
      {
        title: "Faça uma mensagem curta",
        paragraphs: ["Apresente seu nome, mencione a vaga, informe que o currículo está anexado e coloque-se à disposição.", "Não copie uma carta longa para o corpo do e-mail quando a empresa não solicitar."],
        bullets: ["Saudação", "Nome e vaga", "Currículo anexado", "Disponibilidade", "Assinatura"],
      },
      {
        title: "Revise o anexo",
        paragraphs: ["Abra o PDF antes de enviar, confira contatos e use um nome de arquivo profissional.", "Não anexe documentos pessoais, comprovantes ou dados bancários na primeira candidatura, salvo solicitação legítima em canal seguro."],
      },
    ],
    faqs: [
      { question: "Devo escrever a mensagem no corpo do e-mail?", answer: "Sim. Mesmo curta, ela ajuda a identificar a candidatura e demonstra cuidado." },
      { question: "Posso enviar Word?", answer: "Prefira PDF, a menos que o anúncio solicite outro formato." },
    ],
  },
];

export const guides: Guide[] = [...originalGuides, ...extraGuides];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

function normalizedWords(value: string) {
  return value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3);
}

export function getRelatedGuides(guide: Guide, limit = 4) {
  const sourceWords = new Set(normalizedWords(`${guide.title} ${guide.category}`));
  return guides
    .filter((candidate) => candidate.slug !== guide.slug)
    .map((candidate) => {
      const candidateWords = normalizedWords(`${candidate.title} ${candidate.category}`);
      const shared = candidateWords.filter((word) => sourceWords.has(word)).length;
      const categoryBonus = candidate.category === guide.category ? 4 : 0;
      return { candidate, score: shared + categoryBonus };
    })
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title, "pt-BR"))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

const interviewTerms = ["entrevista", "recrutador", "responder", "perguntas"];
const professionTerms = ["motorista", "atendente", "administrativo", "recepcionista", "vendedor", "caixa", "producao", "servicos", "cuidador"];

export const guideCollections = {
  curriculo: guides.filter((guide) => !interviewTerms.some((term) => guide.slug.includes(term))),
  entrevista: guides.filter((guide) => interviewTerms.some((term) => guide.slug.includes(term)) || guide.category.toLocaleLowerCase("pt-BR").includes("entrevista")),
  profissoes: guides.filter((guide) => professionTerms.some((term) => guide.slug.includes(term)) || guide.category.includes("profissão")),
};
