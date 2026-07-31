export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  intro: string;
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
  faqs: { question: string; answer: string }[];
};

export const guides: Guide[] = [
  {
    slug: "como-fazer-curriculo-pelo-celular",
    title: "Como fazer um currículo pelo celular: guia completo",
    description: "Aprenda a criar, revisar e salvar um currículo profissional em PDF usando somente o celular.",
    category: "Guia prático",
    readingTime: "6 min",
    intro: "Você não precisa de computador ou programa complicado para preparar uma candidatura profissional. Com as informações certas e uma ferramenta adaptada ao celular, é possível montar, revisar e salvar o currículo em PDF em poucos minutos.",
    sections: [
      {
        title: "Separe as informações antes de começar",
        paragraphs: ["Tenha em mãos seu telefone, e-mail, cidade, formação, cursos e histórico profissional. Para cada experiência, anote o cargo, o nome da empresa, o período e duas ou três atividades realmente realizadas.", "Se você ainda não trabalhou, reúna projetos escolares, trabalhos voluntários, cursos, conhecimentos de informática e atividades informais que demonstrem responsabilidade."],
        bullets: ["Use um e-mail profissional", "Confira telefone e cidade", "Dê preferência a informações relacionadas à vaga"],
      },
      {
        title: "Escreva de forma clara e objetiva",
        paragraphs: ["Evite parágrafos longos e palavras usadas apenas para impressionar. O recrutador precisa encontrar rapidamente o cargo desejado, a formação e as experiências relevantes.", "Revise nomes de empresas, datas e ortografia. Nunca invente cursos, habilidades ou experiências: adapte a forma de apresentar apenas aquilo que é verdadeiro."],
      },
      {
        title: "Salve e envie em PDF",
        paragraphs: ["O PDF preserva a aparência do documento em diferentes aparelhos. Antes de enviar, abra o arquivo e confira se nenhuma informação ficou cortada. Use um nome fácil de identificar, como Curriculo-Ana-Souza.pdf.", "No ProntoDoc, você preenche pelo celular, vê a prévia na hora e escolhe entre uma versão ATS e uma versão visual."],
      },
    ],
    faqs: [
      { question: "Preciso instalar um aplicativo?", answer: "Não. O ProntoDoc funciona diretamente no navegador do celular." },
      { question: "Qual formato devo enviar?", answer: "PDF é o formato mais seguro, salvo quando a empresa pedir outro tipo de arquivo." },
    ],
  },
  {
    slug: "curriculo-para-primeiro-emprego",
    title: "Currículo para primeiro emprego: o que colocar",
    description: "Veja como montar um currículo forte para o primeiro emprego, mesmo sem experiência registrada.",
    category: "Primeiro emprego",
    readingTime: "7 min",
    intro: "Não ter experiência formal não significa não ter nada para apresentar. No primeiro emprego, o currículo deve mostrar formação, disposição para aprender, habilidades reais e atividades que comprovem responsabilidade.",
    sections: [
      {
        title: "Comece por um objetivo específico",
        paragraphs: ["Informe a área ou o cargo procurado. Em vez de escrever apenas “à disposição da empresa”, prefira algo como “Busco oportunidade como jovem aprendiz na área administrativa”.", "Um objetivo específico ajuda o recrutador a entender onde seu perfil pode ser aproveitado."],
      },
      {
        title: "Valorize formação, cursos e projetos",
        paragraphs: ["Informe o nível de escolaridade, nome da instituição e situação atual. Cursos de atendimento, informática, vendas, segurança ou idiomas podem ganhar destaque quando tiverem relação com a vaga.", "Projetos escolares, participação em eventos, grêmio, igreja, associação, esporte em equipe e voluntariado podem demonstrar organização, comunicação e compromisso."],
        bullets: ["Formação acadêmica", "Cursos concluídos ou em andamento", "Projetos e voluntariado", "Habilidades que você consegue demonstrar"],
      },
      {
        title: "Não crie experiências falsas",
        paragraphs: ["Mentir pode eliminar a candidatura e prejudicar sua reputação. Trabalhos informais verdadeiros, como atendimento em comércio familiar, vendas, cuidados ou apoio administrativo, podem ser apresentados com clareza, identificando que foram atividades autônomas ou informais.", "Revise o documento para mantê-lo em uma página sempre que possível."],
      },
    ],
    faqs: [
      { question: "Posso deixar a experiência em branco?", answer: "Sim, mas use o espaço para destacar cursos, projetos, voluntariado e habilidades relevantes." },
      { question: "Devo colocar todos os documentos pessoais?", answer: "Não. Evite CPF, RG e outros documentos, salvo quando a empresa solicitar em uma etapa segura." },
    ],
  },
  {
    slug: "curriculo-para-quem-nunca-trabalhou",
    title: "Como fazer currículo para quem nunca trabalhou",
    description: "Modelo e orientações para criar um currículo profissional quando você ainda não possui experiência.",
    category: "Sem experiência",
    readingTime: "6 min",
    intro: "O currículo de quem nunca trabalhou deve responder a uma pergunta simples: quais sinais mostram que essa pessoa pode aprender e cumprir bem as responsabilidades da vaga?",
    sections: [
      {
        title: "Mostre o que você já sabe fazer",
        paragraphs: ["Pense em tarefas que você executa na escola, em casa, em projetos ou para outras pessoas. Organização de documentos, uso de planilhas, atendimento, redes sociais, manutenção e colaboração em eventos são exemplos que podem indicar competências.", "Liste apenas habilidades verdadeiras e que você conseguiria explicar em uma entrevista."],
      },
      {
        title: "Transforme atividades em evidências",
        paragraphs: ["Em vez de escrever somente “boa comunicação”, explique uma situação real: apresentação de trabalhos, atendimento em atividade familiar ou participação em equipe. Isso torna o perfil mais confiável.", "Cursos gratuitos também ajudam, mas informe corretamente instituição, tema, duração e ano."],
      },
      {
        title: "Mantenha a apresentação profissional",
        paragraphs: ["Use uma versão simples, sem excesso de cores e elementos gráficos. Para plataformas de seleção, prefira a versão ATS sem foto. Uma versão visual pode ser útil para envio direto, mas a clareza continua sendo mais importante que a decoração."],
      },
    ],
    faqs: [
      { question: "Trabalho informal conta?", answer: "Conta quando é verdadeiro. Descreva a atividade, o período e o que você fazia, indicando que foi autônomo ou informal." },
      { question: "Posso usar referências pessoais?", answer: "Normalmente não é necessário. Forneça referências apenas quando a empresa pedir e com autorização da pessoa." },
    ],
  },
  {
    slug: "curriculo-auxiliar-administrativo",
    title: "Currículo para auxiliar administrativo: modelo e dicas",
    description: "Aprenda a destacar organização, atendimento, documentos e informática no currículo administrativo.",
    category: "Por profissão",
    readingTime: "7 min",
    intro: "Para vagas administrativas, o currículo precisa demonstrar organização, cuidado com informações, comunicação e domínio das ferramentas realmente utilizadas pelo candidato.",
    sections: [
      {
        title: "Use um objetivo alinhado ao cargo",
        paragraphs: ["Informe se procura vaga de auxiliar, assistente, aprendiz ou estágio administrativo. Caso o anúncio mencione um setor, como financeiro, recepção ou logística, adapte o objetivo somente quando isso combinar com sua trajetória."],
      },
      {
        title: "Descreva atividades, não apenas o cargo",
        paragraphs: ["Explique de forma curta o que você fazia: organização e digitalização de documentos, atualização de planilhas, atendimento telefônico, lançamento de dados, apoio a agendas ou controle de arquivos.", "Quando possível, informe volume, frequência ou resultado sem divulgar informações confidenciais."],
        bullets: ["Pacote Office ou ferramentas que realmente utiliza", "Atendimento ao público", "Organização de arquivos", "Comunicação escrita", "Controle de prazos"],
      },
      {
        title: "Adapte às palavras da vaga",
        paragraphs: ["Cole o anúncio no analisador do ProntoDoc e confira quais requisitos aparecem em seu currículo. Se algo estiver faltando, confirme primeiro se você realmente possui aquela experiência antes de acrescentar.", "A compatibilidade melhora pela relevância e pela clareza, não pela repetição artificial de palavras."],
      },
    ],
    faqs: [
      { question: "Preciso conhecer Excel?", answer: "Depende da vaga. Informe seu nível real e as tarefas que consegue executar." },
      { question: "Qual versão usar na Gupy?", answer: "Prefira uma versão ATS, com estrutura simples e sem foto." },
    ],
  },
  {
    slug: "curriculo-para-motorista",
    title: "Currículo para motorista: como destacar sua experiência",
    description: "Organize habilitação, categorias, rotas, segurança e atendimento em um currículo para motorista.",
    category: "Por profissão",
    readingTime: "7 min",
    intro: "O currículo de motorista deve mostrar mais que tempo ao volante. Segurança, pontualidade, conhecimento de rotas, cuidado com o veículo e relacionamento com passageiros ou clientes são informações importantes.",
    sections: [
      {
        title: "Informe habilitação de forma objetiva",
        paragraphs: ["Inclua a categoria da CNH e cursos relevantes, como transporte de passageiros, cargas ou direção defensiva, quando verdadeiros e válidos. Não coloque o número completo da habilitação no currículo público.", "Se a vaga exigir disponibilidade para viagens ou horários específicos, informe somente quando puder cumprir."],
      },
      {
        title: "Demonstre responsabilidade e atendimento",
        paragraphs: ["Descreva tipos de rotas, passageiros, veículos ou entregas atendidas. Motoristas de aplicativo também podem apresentar a atividade como experiência autônoma, destacando atendimento, planejamento de rotas e cuidado com o veículo.", "Evite divulgar placas, dados de clientes, documentos ou informações confidenciais."],
        bullets: ["Direção segura", "Pontualidade", "Conhecimento regional", "Atendimento ao cliente", "Conferência e cuidado com o veículo"],
      },
      {
        title: "Ajuste para cada tipo de vaga",
        paragraphs: ["Uma vaga de transporte de passageiros valoriza atendimento e segurança; uma vaga de entregas pode valorizar conferência, rotas e cumprimento de prazos. Gere uma versão direcionada sem inventar qualificações."],
      },
    ],
    faqs: [
      { question: "Experiência em aplicativo pode entrar?", answer: "Sim. Identifique como atividade autônoma e descreva responsabilidades e período." },
      { question: "Devo colocar foto?", answer: "Use foto apenas quando solicitada. Para sistemas de seleção, a versão sem foto é mais segura." },
    ],
  },
  {
    slug: "curriculo-atendente-de-loja",
    title: "Currículo para atendente de loja: exemplos práticos",
    description: "Veja como destacar atendimento, vendas, caixa e organização em vagas de comércio.",
    category: "Por profissão",
    readingTime: "6 min",
    intro: "Vagas de comércio costumam valorizar comunicação, disposição, organização e capacidade de entender a necessidade do cliente. O currículo deve apresentar exemplos reais dessas competências.",
    sections: [
      {
        title: "Destaque o contato com clientes",
        paragraphs: ["Informe experiências com recepção, orientação, vendas, trocas, pedidos ou atendimento por telefone e WhatsApp. Trabalhos informais ou familiares podem ser incluídos quando forem verdadeiros.", "Evite adjetivos soltos. Em vez de “excelente vendedor”, descreva produtos atendidos, rotina e responsabilidades."],
      },
      {
        title: "Inclua rotinas da loja",
        paragraphs: ["Organização de prateleiras, reposição, etiquetagem, caixa, inventário e apoio à limpeza podem ser relevantes. Não liste uma tarefa que você nunca executou apenas porque aparece no anúncio."],
        bullets: ["Atendimento presencial", "Vendas e pós-venda", "Organização de produtos", "Operação de caixa", "Trabalho em equipe"],
      },
      {
        title: "Mostre disponibilidade corretamente",
        paragraphs: ["Algumas vagas exigem finais de semana ou horários alternados. Coloque essa informação somente se for verdadeira. Não é necessário informar questões pessoais que não tenham relação com a função."],
      },
    ],
    faqs: [
      { question: "Preciso colocar metas atingidas?", answer: "Se tiver números verdadeiros e puder compartilhá-los, resultados ajudam. Caso contrário, descreva suas responsabilidades." },
      { question: "Currículo colorido ajuda?", answer: "Uma apresentação discreta pode funcionar no envio direto, mas uma versão simples é melhor para plataformas automáticas." },
    ],
  },
  {
    slug: "curriculo-com-foto-ou-sem-foto",
    title: "Currículo com foto ou sem foto? Veja quando usar",
    description: "Entenda quando a foto é necessária e como escolher uma imagem profissional para o currículo.",
    category: "Boas práticas",
    readingTime: "6 min",
    intro: "Para a maioria das vagas no Brasil, a opção mais segura é enviar currículo sem foto. A imagem deve ser incluída quando a empresa solicitar ou quando houver uma razão profissional clara.",
    sections: [
      {
        title: "Quando não colocar foto",
        paragraphs: ["Em plataformas de recrutamento e processos baseados em competências, a foto normalmente não acrescenta informação sobre a capacidade profissional. Ela também pode ocupar espaço e dificultar a leitura por alguns sistemas.", "A versão ATS do ProntoDoc remove a foto automaticamente para priorizar o conteúdo."],
      },
      {
        title: "Quando a foto pode ser usada",
        paragraphs: ["Se o anúncio solicitar expressamente, siga a orientação. Uma apresentação visual com foto também pode ser escolhida para envio direto, desde que a imagem mantenha aparência profissional e não substitua informações importantes."],
      },
      {
        title: "Padrão de uma foto profissional",
        paragraphs: ["Prefira uma imagem atual, com rosto e ombros visíveis, iluminação uniforme, fundo claro ou neutro e expressão natural. Evite filtros, óculos escuros, recortes de festas, outras pessoas e elementos que desviem a atenção.", "Não é obrigatório reproduzir uma fotografia documental 3×4. O enquadramento deve apenas ser limpo, nítido e adequado ao contexto profissional."],
      },
    ],
    faqs: [
      { question: "A empresa pode exigir foto?", answer: "Alguns processos podem solicitar. Leia o anúncio e, em caso de dúvida, confirme com o canal oficial da empresa." },
      { question: "Selfie pode ser usada?", answer: "Prefira uma foto planejada, com câmera na altura dos olhos, fundo neutro e bom enquadramento." },
    ],
  },
  {
    slug: "curriculo-compativel-com-gupy-ats",
    title: "Como fazer um currículo compatível com Gupy e ATS",
    description: "Crie um currículo simples, legível e preparado para sistemas de recrutamento e seleção.",
    category: "ATS e plataformas",
    readingTime: "8 min",
    intro: "ATS é o nome dado a sistemas usados para organizar candidaturas. Um currículo compatível deve permitir que informações como cargo, formação, experiências e habilidades sejam identificadas com facilidade.",
    sections: [
      {
        title: "Prefira estrutura simples",
        paragraphs: ["Use títulos conhecidos, como Objetivo, Formação, Experiência e Habilidades. Evite colocar informações importantes dentro de imagens, gráficos ou elementos decorativos difíceis de interpretar.", "A versão ATS deve ter leitura linear, contraste adequado e texto selecionável."],
      },
      {
        title: "Use palavras da vaga com honestidade",
        paragraphs: ["Leia os requisitos e compare com sua experiência. Se o anúncio pede atendimento ao cliente e você realmente fez isso, use uma descrição clara e compatível. Não repita termos de forma artificial nem acrescente algo que não sabe fazer.", "O analisador do ProntoDoc serve como uma verificação inicial, não como garantia de aprovação."],
      },
      {
        title: "Preencha também os campos da plataforma",
        paragraphs: ["Algumas plataformas solicitam cadastro manual além do arquivo. Complete os campos com atenção e mantenha datas e cargos consistentes com o PDF.", "Antes de concluir, revise contatos, respostas obrigatórias e requisitos eliminatórios."],
        bullets: ["Sem foto na versão ATS", "Sem tabelas complexas", "Títulos claros", "Datas consistentes", "Arquivo PDF legível"],
      },
    ],
    faqs: [
      { question: "ATS elimina automaticamente todo currículo?", answer: "Cada empresa configura seu processo. Um documento claro ajuda na leitura, mas não substitui os requisitos da vaga." },
      { question: "Preciso repetir palavras muitas vezes?", answer: "Não. Use termos relevantes naturalmente e apenas quando representarem sua experiência." },
    ],
  },
  {
    slug: "como-adaptar-curriculo-para-uma-vaga",
    title: "Como adaptar o currículo para cada vaga sem mentir",
    description: "Aprenda a comparar seu perfil com a vaga e destacar experiências verdadeiras e relevantes.",
    category: "Estratégia",
    readingTime: "7 min",
    intro: "Enviar exatamente o mesmo currículo para qualquer oportunidade pode esconder experiências importantes. Adaptar não significa inventar: significa selecionar e explicar melhor aquilo que tem relação com a vaga.",
    sections: [
      {
        title: "Leia responsabilidades e requisitos separadamente",
        paragraphs: ["Responsabilidades mostram o que será feito no dia a dia. Requisitos indicam conhecimentos, formação ou disponibilidade esperados. Marque o que você realmente possui e identifique o que não pode afirmar.", "Requisitos obrigatórios merecem atenção especial; se estiverem ausentes, verifique se o processo permite candidatura mesmo assim."],
      },
      {
        title: "Reorganize as informações relevantes",
        paragraphs: ["Dê mais destaque às experiências relacionadas ao cargo e resuma atividades pouco relevantes. Ajuste o objetivo para mencionar a função correta e descreva resultados ou responsabilidades compatíveis.", "Mantenha empresas, datas, formação e qualificações sempre verdadeiras."],
      },
      {
        title: "Faça uma revisão final",
        paragraphs: ["Compare novamente a vaga com o documento, confirme contatos e leia como se fosse o recrutador. O currículo deve mostrar rapidamente por que sua trajetória merece ser considerada.", "O ProntoDoc identifica correspondências e pontos a confirmar, mas a decisão sobre o que acrescentar permanece com você."],
      },
    ],
    faqs: [
      { question: "Posso mudar o objetivo em cada candidatura?", answer: "Sim. Ajustar o cargo desejado é recomendado quando corresponde à vaga." },
      { question: "Posso esconder experiências?", answer: "Você pode resumir experiências menos relevantes, mas não deve criar períodos ou informações enganosas." },
    ],
  },
  {
    slug: "mensagem-para-enviar-curriculo-whatsapp",
    title: "Mensagem para enviar currículo pelo WhatsApp",
    description: "Copie uma estrutura profissional e aprenda a abordar empresas ao enviar currículo por WhatsApp.",
    category: "Candidatura",
    readingTime: "5 min",
    intro: "Uma mensagem curta e educada aumenta a chance de o arquivo ser entendido e encaminhado corretamente. Antes de enviar, confirme se o número pertence à empresa e se o canal aceita currículos.",
    sections: [
      {
        title: "O que a mensagem precisa informar",
        paragraphs: ["Apresente seu nome, mencione a vaga ou área de interesse, diga que está encaminhando o currículo e coloque-se à disposição. Evite áudios longos, abreviações excessivas e cobranças por resposta.", "Exemplo: “Olá! Meu nome é Ana Souza. Tenho interesse na vaga de auxiliar administrativo e encaminho meu currículo para avaliação. Fico à disposição para conversar. Obrigada!”"],
      },
      {
        title: "Cuidados antes de anexar",
        paragraphs: ["Nomeie o PDF de forma profissional e confira se é o arquivo correto. Não envie documentos pessoais, fotos de identidade ou dados bancários nessa primeira abordagem.", "Respeite horários comerciais e não faça vários envios seguidos."],
        bullets: ["Confirme o número oficial", "Mencione a vaga", "Anexe um PDF identificado", "Use linguagem profissional", "Proteja seus dados"],
      },
      {
        title: "Acompanhe sem pressionar",
        paragraphs: ["Se a empresa não informar prazo, aguarde alguns dias úteis antes de perguntar educadamente sobre o processo. Nem todas as empresas conseguem responder individualmente a cada candidatura.", "O Kit Candidatura do ProntoDoc gera uma mensagem baseada no cargo e nas informações preenchidas."],
      },
    ],
    faqs: [
      { question: "Posso mandar áudio?", answer: "Só quando o canal solicitar. Texto curto facilita o encaminhamento interno." },
      { question: "Qual horário é melhor?", answer: "Prefira o horário comercial e siga qualquer orientação publicada pela empresa." },
    ],
  },
  {
    slug: "perguntas-entrevista-primeiro-emprego",
    title: "Perguntas de entrevista para primeiro emprego",
    description: "Conheça perguntas comuns e prepare respostas verdadeiras mesmo sem experiência formal.",
    category: "Entrevista",
    readingTime: "7 min",
    intro: "Na primeira entrevista, o recrutador procura sinais de responsabilidade, interesse e capacidade de aprender. Você não precisa inventar experiência: precisa explicar bem o que já viveu.",
    sections: [
      { title: "O que costuma ser perguntado", paragraphs: ["Prepare uma apresentação curta, o motivo do interesse pela vaga e exemplos de escola, cursos, projetos, voluntariado ou atividades informais.", "Perguntas sobre pontos fortes, trabalho em equipe e planos profissionais verificam como você pensa e se comunica."], bullets: ["Fale sobre você", "Por que quer esta vaga?", "Como aprende algo novo?", "Conte uma responsabilidade que assumiu"] },
      { title: "Como responder sem experiência", paragraphs: ["Use situações reais. Explique o contexto, o que precisava fazer, sua atitude e o resultado. Um trabalho escolar organizado ou uma responsabilidade familiar pode demonstrar competências, desde que apresentado com honestidade.", "Treine em voz alta para reduzir respostas vagas e controlar o tempo."] },
    ],
    faqs: [{ question: "Posso dizer que nunca trabalhei?", answer: "Sim. Em seguida, mostre atividades reais que desenvolveram responsabilidade e disposição para aprender." }, { question: "Preciso decorar?", answer: "Não. Prepare ideias e exemplos, mas responda de forma natural." }],
  },
  {
    slug: "como-responder-fale-sobre-voce",
    title: "Como responder “fale sobre você” na entrevista",
    description: "Monte uma apresentação profissional curta, relevante e fácil de lembrar.",
    category: "Entrevista",
    readingTime: "6 min",
    intro: "Essa pergunta abre muitas entrevistas. A melhor resposta não conta toda a sua vida: apresenta seu momento profissional, uma experiência relevante e por que a vaga faz sentido.",
    sections: [
      { title: "Uma estrutura em três partes", paragraphs: ["Comece por quem você é profissionalmente, mencione uma ou duas experiências ou aprendizados ligados ao cargo e encerre mostrando interesse pela oportunidade.", "Uma resposta entre um e dois minutos costuma ser suficiente para dar contexto sem perder o foco."], bullets: ["Momento atual", "Experiência ou formação relevante", "Conexão com a vaga"] },
      { title: "Erros que enfraquecem a apresentação", paragraphs: ["Evite repetir o currículo inteiro, entrar em assuntos pessoais sem relação com o trabalho ou usar adjetivos sem exemplos.", "Não diga que domina algo que ainda está aprendendo. Clareza e coerência são mais valiosas do que uma resposta perfeita."] },
    ],
    faqs: [{ question: "Devo falar minha idade?", answer: "Só se desejar ou se isso for relevante e apropriado. O foco pode permanecer na trajetória profissional." }, { question: "Quanto tempo devo falar?", answer: "Em geral, de um a dois minutos, ajustando ao contexto da conversa." }],
  },
  {
    slug: "qualidades-e-defeitos-na-entrevista",
    title: "Qualidades e defeitos na entrevista: como responder",
    description: "Escolha exemplos honestos e mostre como desenvolve seus pontos de melhoria.",
    category: "Entrevista",
    readingTime: "6 min",
    intro: "O recrutador não espera uma pessoa sem defeitos. Ele busca autoconhecimento, exemplos concretos e sinais de que você trabalha para evoluir.",
    sections: [
      { title: "Apresente qualidades com evidência", paragraphs: ["Escolha uma qualidade relacionada ao cargo e conte uma situação breve que a demonstre. Organização, comunicação e atenção só ganham força quando acompanhadas de comportamento observável.", "Use experiências verdadeiras, mesmo que simples."] },
      { title: "Trate o defeito como desenvolvimento", paragraphs: ["Escolha um ponto real que não inviabilize a função, explique quando ele aparece e qual atitude você toma para melhorar.", "Evite respostas disfarçadas como “sou perfeccionista demais” quando não houver reflexão ou ação concreta."] },
    ],
    faqs: [{ question: "Posso dizer que sou ansioso?", answer: "Pode, se for verdadeiro e você explicar de forma profissional como administra isso, sem expor informações médicas que não deseja compartilhar." }, { question: "Quantas qualidades citar?", answer: "Uma ou duas, com exemplos, costumam ser mais convincentes do que uma lista longa." }],
  },
  {
    slug: "por-que-devemos-contratar-voce",
    title: "Como responder “por que devemos contratar você?”",
    description: "Conecte sua experiência, sua forma de trabalhar e as necessidades reais da vaga.",
    category: "Entrevista",
    readingTime: "6 min",
    intro: "Essa resposta deve mostrar compatibilidade, não superioridade. O objetivo é explicar quais requisitos você atende e como pode contribuir.",
    sections: [
      { title: "Compare a vaga com sua história", paragraphs: ["Selecione dois requisitos que você realmente possui e associe cada um a uma atividade ou resultado. Se ainda estiver aprendendo algo, diga isso com transparência e mostre seu plano.", "Fale da contribuição possível sem garantir resultados que dependem de outras pessoas."] },
      { title: "Termine com interesse concreto", paragraphs: ["Mostre o que atrai você na função, na rotina ou no setor. Evite responder apenas que precisa do emprego, embora essa necessidade seja legítima.", "Uma resposta clara combina capacidade, evidência e motivação."] },
    ],
    faqs: [{ question: "Posso dizer que aprendo rápido?", answer: "Sim, mas conte um exemplo de algo que aprendeu e como aplicou." }, { question: "Preciso conhecer a empresa?", answer: "Conhecer o básico ajuda a tornar a resposta mais específica." }],
  },
  {
    slug: "entrevista-jovem-aprendiz",
    title: "Entrevista para Jovem Aprendiz: como se preparar",
    description: "Veja o que levar, como se apresentar e quais exemplos usar na seleção.",
    category: "Jovem Aprendiz",
    readingTime: "7 min",
    intro: "Programas de aprendizagem valorizam potencial, pontualidade, formação e vontade de aprender. Sua preparação deve demonstrar maturidade sem fingir uma experiência que ainda não possui.",
    sections: [
      { title: "Antes da entrevista", paragraphs: ["Pesquise a empresa, releia a vaga, confirme horário e acesso. Separe documentos apenas quando solicitados por canal seguro.", "Prepare exemplos de escola, curso, esporte, projeto ou atividade comunitária que mostrem compromisso."] },
      { title: "Durante a conversa", paragraphs: ["Ouça a pergunta até o fim, responda com calma e peça esclarecimento quando necessário. Mostre disponibilidade real de horário sem prejudicar os estudos.", "Ao final, pergunte sobre a rotina, o aprendizado e as próximas etapas."] },
    ],
    faqs: [{ question: "Preciso ir de roupa social?", answer: "Use roupa limpa, discreta e adequada ao ambiente; terno raramente é obrigatório." }, { question: "Posso levar o currículo no celular?", answer: "Sim, mas ter o PDF salvo e uma cópia impressa quando possível oferece alternativas." }],
  },
  {
    slug: "como-se-preparar-entrevista-online",
    title: "Como se preparar para entrevista online pelo celular",
    description: "Organize internet, câmera, áudio, ambiente e respostas antes da chamada.",
    category: "Entrevista online",
    readingTime: "6 min",
    intro: "Uma entrevista online exige o mesmo conteúdo de uma conversa presencial e alguns cuidados técnicos. Um teste de poucos minutos evita grande parte dos problemas.",
    sections: [
      { title: "Faça um teste técnico", paragraphs: ["Carregue o celular, verifique internet, câmera e microfone, atualize o aplicativo e entre alguns minutos antes. Apoie o aparelho na altura dos olhos.", "Tenha um contato alternativo para avisar caso a conexão caia."] },
      { title: "Prepare o ambiente e a fala", paragraphs: ["Escolha um local iluminado e silencioso, desligue notificações e deixe o currículo e a vaga acessíveis.", "Olhe para a câmera durante partes da resposta, fale com ritmo natural e não leia textos prontos."] },
    ],
    faqs: [{ question: "Posso usar fone?", answer: "Sim. Teste antes para confirmar que o microfone está funcionando e sem ruído." }, { question: "O que fazer se a conexão cair?", answer: "Retorne à chamada e avise o recrutador pelo canal combinado, com calma e objetividade." }],
  },
  {
    slug: "entrevista-para-motorista",
    title: "Entrevista para motorista: perguntas e preparação",
    description: "Prepare exemplos sobre segurança, pontualidade, rotas, atendimento e cuidado com o veículo.",
    category: "Entrevista por profissão",
    readingTime: "7 min",
    intro: "Vagas de motorista costumam avaliar documentação compatível, segurança, responsabilidade, conhecimento de rotas e relacionamento com passageiros ou clientes.",
    sections: [
      { title: "Experiências que merecem destaque", paragraphs: ["Explique os tipos de veículo e rota que realmente conhece, sua rotina de inspeção, cuidado com documentação e forma de registrar ocorrências.", "Quando possível, dê exemplos de prevenção de riscos, cumprimento de prazo e atendimento respeitoso."] },
      { title: "Perguntas situacionais", paragraphs: ["Prepare-se para explicar o que faria diante de pane, atraso, mudança de rota, carga divergente ou passageiro insatisfeito.", "Priorize segurança, comunicação com a empresa e respeito aos procedimentos."] },
    ],
    faqs: [{ question: "Devo informar pontos na carteira?", answer: "Responda com verdade quando a empresa solicitar informações relevantes para a função." }, { question: "Experiência informal conta?", answer: "Pode ser mencionada com clareza, sem transformar uso pessoal em experiência profissional." }],
  },
  {
    slug: "entrevista-atendente-loja",
    title: "Entrevista para atendente de loja",
    description: "Treine respostas sobre clientes, organização, vendas, caixa e trabalho em equipe.",
    category: "Entrevista por profissão",
    readingTime: "6 min",
    intro: "No comércio, a entrevista costuma observar comunicação, disponibilidade, atenção e comportamento diante de clientes e metas.",
    sections: [
      { title: "Mostre como você atende", paragraphs: ["Conte como identifica a necessidade, explica opções e mantém respeito mesmo quando a pessoa não compra. Atendimento não é pressionar; é ajudar com informação correta.", "Use exemplos de comércio, projetos, eventos ou outras situações de contato com pessoas."] },
      { title: "Prepare situações difíceis", paragraphs: ["Explique como lidaria com fila, divergência de preço, troca ou cliente irritado: ouça, confirme o problema e siga a política da empresa.", "Não prometa uma solução que não está sob sua responsabilidade."] },
    ],
    faqs: [{ question: "Preciso ter experiência com vendas?", answer: "Depende da vaga. Quando não tiver, destaque comunicação, aprendizagem e exemplos de responsabilidade." }, { question: "Como falar de metas?", answer: "Mostre organização e constância, sem prometer números irreais." }],
  },
  {
    slug: "entrevista-auxiliar-administrativo",
    title: "Entrevista para auxiliar administrativo",
    description: "Prepare respostas sobre organização, documentos, atendimento, planilhas e prazos.",
    category: "Entrevista por profissão",
    readingTime: "7 min",
    intro: "A seleção para auxiliar administrativo verifica atenção, organização, comunicação e domínio verdadeiro das ferramentas usadas na rotina.",
    sections: [
      { title: "Demonstre organização na prática", paragraphs: ["Conte como controla tarefas, datas, arquivos ou informações. Um método simples e usado de verdade vale mais que citar sistemas que você não conhece.", "Explique como confere dados antes de enviar ou registrar."] },
      { title: "Fale sobre ferramentas com precisão", paragraphs: ["Diferencie conhecimento básico, intermediário e avançado por tarefas que consegue realizar. Por exemplo: preencher planilhas, usar fórmulas simples ou criar relatórios.", "Se estiver estudando uma ferramenta, informe o curso e o estágio atual sem exagerar."] },
    ],
    faqs: [{ question: "Posso dizer que sei Excel básico?", answer: "Sim, descrevendo tarefas que consegue executar para dar contexto ao nível informado." }, { question: "Como responder sobre erros?", answer: "Conte como percebeu, corrigiu, comunicou e preveniu a repetição." }],
  },
  {
    slug: "como-responder-sem-experiencia",
    title: "Como responder perguntas sem ter experiência",
    description: "Transforme formação, projetos e atividades reais em exemplos profissionais honestos.",
    category: "Primeiro emprego",
    readingTime: "6 min",
    intro: "Quando falta experiência formal, a resposta não precisa terminar em “não sei”. Você pode reconhecer a falta e mostrar uma experiência comparável, o que aprendeu e como pretende se adaptar.",
    sections: [
      { title: "Use a ponte entre experiências", paragraphs: ["Comece com transparência: “Ainda não realizei essa atividade em emprego formal”. Em seguida, apresente uma situação de estudo, projeto, voluntariado ou vida cotidiana que exigiu uma competência semelhante.", "Finalize mostrando como aprenderia o procedimento específico da empresa."] },
      { title: "Escolha exemplos que possam ser explicados", paragraphs: ["Prepare situações sobre prazo, equipe, problema, atendimento, aprendizagem e responsabilidade. Anote apenas palavras-chave e pratique a explicação.", "Nunca transforme um exemplo simples em uma função ou resultado que não existiu."] },
    ],
    faqs: [{ question: "Dizer que não sei me elimina?", answer: "Nem sempre. Transparência acompanhada de capacidade de aprender pode ser melhor do que uma resposta inventada." }, { question: "Projetos escolares contam?", answer: "Sim, quando demonstram comportamentos relevantes e você explica sua contribuição real." }],
  },
  {
    slug: "perguntas-para-fazer-ao-recrutador",
    title: "Perguntas para fazer ao recrutador no fim da entrevista",
    description: "Demonstre interesse e descubra informações importantes sobre rotina, equipe e processo.",
    category: "Entrevista",
    readingTime: "5 min",
    intro: "Quando o recrutador pergunta se você tem dúvidas, uma pergunta bem escolhida mostra atenção e também ajuda você a avaliar a oportunidade.",
    sections: [
      { title: "Perguntas úteis sobre o trabalho", paragraphs: ["Pergunte como é a rotina, quais serão as prioridades dos primeiros meses, como a equipe se organiza ou quais treinamentos existem.", "Escolha duas ou três perguntas e descarte as que já foram respondidas durante a conversa."], bullets: ["Como é um dia comum nesta função?", "Qual é a principal prioridade para quem entrar?", "Como funcionam as próximas etapas?"] },
      { title: "Assuntos que exigem contexto", paragraphs: ["Remuneração, benefícios e horário são importantes e podem ser perguntados com educação, especialmente quando ainda não foram informados. Avalie o momento da conversa.", "Evite perguntas cuja resposta esteja facilmente disponível no anúncio ou no site da empresa."] },
    ],
    faqs: [{ question: "Posso perguntar o salário?", answer: "Sim. Faça de forma objetiva e profissional quando a faixa ainda não estiver clara." }, { question: "E se eu não tiver perguntas?", answer: "Você pode confirmar as próximas etapas, mas preparar pelo menos uma dúvida relevante costuma ser útil." }],
  },
  {
    slug: "o-que-e-curriculo-ats",
    title: "O que é currículo ATS e como funciona em 2026",
    description: "Entenda o que é currículo ATS, como os sistemas de triagem automática funcionam e como passar neles.",
    category: "ATS e plataformas",
    readingTime: "7 min",
    intro: "Currículo ATS é um documento otimizado para ser lido por sistemas de triagem automática (Applicant Tracking Systems) que empresas como Gupy, Kenoby e Vagas.com usam para filtrar candidatos antes da leitura humana.",
    sections: [
      {
        title: "O que é currículo ATS?",
        paragraphs: ["Currículo ATS é um documento otimizado para ser lido por sistemas de triagem automática (Applicant Tracking Systems) que empresas como Gupy, Kenoby e Vagas.com usam para filtrar candidatos antes da leitura humana. Esses sistemas leem seu currículo em segundos e atribuem uma nota de compatibilidade com a vaga baseada em palavras-chave, estrutura e clareza das informações."],
      },
      {
        title: "Como o ATS lê seu currículo?",
        paragraphs: ["O sistema ATS escaneia seu currículo em busca de: palavras-chave da descrição da vaga, estrutura de tópicos clara (sem tabelas ou colunas complexas), datas de experiência formatadas corretamente, e informações de contato identificáveis. Currículos com design muito elaborado, gráficos, ícones ou fotos podem ser ignorados parcial ou totalmente pelo sistema."],
        bullets: ["Palavras-chave específicas da vaga (habilidades, ferramentas, certificações)", "Estrutura simples e legível (sem tabelas, colunas ou elementos gráficos)", "Datas de experiência no formato mês/ano", "Informações de contato completas (nome, e-mail, telefone, LinkedIn)", "Experiências profissionais em ordem cronológica reversa"],
      },
      {
        title: "Como passar no ATS da Gupy e outras plataformas?",
        paragraphs: ["Para passar no ATS, use palavras-chave exatas da descrição da vaga, mantenha o currículo em uma ou duas colunas simples, evite cabeçalhos e rodapés complexos, salve em PDF (não em imagem), e revise se todas as seções estão legíveis. O ProntoDoc ATS já gera seu currículo nesse formato automaticamente."],
      },
    ],
    faqs: [
      { question: "O que é currículo ATS?", answer: "Currículo ATS é um documento otimizado para ser lido por sistemas de triagem automática (Applicant Tracking Systems) que empresas usam para filtrar candidatos. Esses sistemas leem seu currículo em segundos e atribuem uma nota de compatibilidade com a vaga baseada em palavras-chave e estrutura." },
      { question: "Como passar no ATS da Gupy?", answer: "Para passar no ATS da Gupy, use palavras-chave exatas da descrição da vaga, mantenha o currículo em estrutura simples sem tabelas ou colunas complexas, evite elementos gráficos, salve em PDF e revise se todas as seções estão legíveis." },
      { question: "Currículo ATS deve ter foto?", answer: "Não coloque foto em currículos para ATS. Sistemas de triagem automática podem ter dificuldade para ler o documento quando há imagem, e muitas empresas têm políticas de diversidade que recomendam currículo sem foto." },
    ],
  },
  {
    slug: "curriculo-com-ou-sem-foto",
    title: "Currículo com foto ou sem foto: o que os recrutadores preferem",
    description: "Saiba quando usar foto no currículo e qual a preferência dos recrutadores brasileiros.",
    category: "Boas práticas",
    readingTime: "6 min",
    intro: "A regra geral é: não coloque foto no currículo para vagas no Brasil, exceto se a vaga exigir explicitamente ou se for para áreas como modelos, atores ou recepcionista de hotelaria.",
    sections: [
      {
        title: "Currículo deve ter foto ou não?",
        paragraphs: ["A regra geral é: não coloque foto no currículo para vagas no Brasil, exceto se a vaga exigir explicitamente ou se for para áreas como modelos, atores, recepcionista de hotelaria ou cargos que envolvam atendimento ao público com imagem institucional. Para 95% das vagas, currículo sem foto é o padrão profissional e evita viés inconsciente na triagem."],
      },
      {
        title: "Quando colocar foto no currículo?",
        paragraphs: ["Coloque foto apenas quando: o anúncio da vaga solicitar explicitamente, você for trabalhar em áreas que exigem apresentação visual (modelagem, atuação, recepcionista de hotelaria de luxo), ou for candidatura para vagas no exterior onde foto é comum (Alemanha, França, alguns países da Ásia). Mesmo assim, use foto profissional com fundo neutro e roupa adequada."],
        bullets: ["Recepção e hotelaria", "Aviação (comissários)", "Modelagem e atuação", "Marketing e relações públicas (dependendo da vaga)"],
      },
      {
        title: "Setores que geralmente NÃO querem foto",
        paragraphs: ["Administrativo e financeiro, Tecnologia e TI, Engenharia, Vendas e comércio, Educação e Saúde (exceto estética) são setores que normalmente não solicitam foto no currículo."],
        bullets: ["Administrativo e financeiro", "Tecnologia e TI", "Engenharia", "Vendas e comércio", "Educação", "Saúde (exceto estética)"],
      },
      {
        title: "Foto no currículo ATS: pode?",
        paragraphs: ["Não coloque foto em currículos para ATS. Sistemas de triagem automática podem ter dificuldade para ler o documento quando há imagem, e algumas empresas brasileiras têm políticas de diversidade que recomendam currículo sem foto para evitar viés. Use a versão sem foto para candidaturas online e a versão com foto apenas quando solicitado."],
      },
    ],
    faqs: [
      { question: "Quando devo colocar foto no currículo?", answer: "Apenas quando a vaga solicitar explicitamente ou para áreas que exigem apresentação visual como modelagem, atuação ou hotelaria de luxo." },
      { question: "Foto no currículo ATS pode?", answer: "Não. Não coloque foto em currículos para ATS pois os sistemas podem ter dificuldade para ler o documento e muitas empresas têm políticas de diversidade que recomendam currículo sem foto." },
      { question: "Que tipo de foto usar no currículo?", answer: "Use foto profissional com fundo neutro, rosto e ombros visíveis, iluminação uniforme e expressão natural. Evite filtros, óculos escuros e selfies." },
    ],
  },
  {
    slug: "como-fazer-curriculo-primeiro-emprego",
    title: "Como fazer currículo de primeiro emprego sem experiência",
    description: "Aprenda a criar um currículo forte para o primeiro emprego destacando formação, cursos e habilidades.",
    category: "Primeiro emprego",
    readingTime: "7 min",
    intro: "Para primeiro emprego, destaque formação escolar, cursos extracurriculares, trabalhos voluntários, projetos pessoais e habilidades comportamentais em vez de focar em experiência profissional.",
    sections: [
      {
        title: "Como fazer currículo de primeiro emprego?",
        paragraphs: ["Para primeiro emprego, destaque formação escolar, cursos extracurriculares, trabalhos voluntários, projetos pessoais e habilidades comportamentais em vez de focar em experiência profissional. Use um objetivo claro mostrando disposição para aprender, inclua atividades que demonstrem responsabilidade (mesmo que não remuneradas), e mantenha o currículo em uma página com linguagem profissional."],
      },
      {
        title: "O que colocar no currículo sem experiência?",
        paragraphs: ["Sem experiência formal, inclua: objetivo profissional específico (não use 'crescer na empresa'), formação escolar completa (incluindo previsão de conclusão), cursos online ou presenciais (mesmo que gratuitos), participação em grêmio estudantil, projetos acadêmicos relevantes, trabalho voluntário, e habilidades como pacote Office, inglês, comunicação e trabalho em equipe."],
        bullets: ["Formação: Ensino Médio, técnico, graduação (mesmo cursando)", "Cursos: Informática, idiomas, atendimento, vendas (qualquer um conta)", "Atividades: Grêmio, monitoria, projetos sociais, bicos informais", "Habilidades: Digitação, Excel, comunicação, proatividade", "Realizações: Prêmios escolares, competições, certificações"],
      },
      {
        title: "Exemplo de objetivo para primeiro emprego",
        paragraphs: ['"Busco oportunidade como Jovem Aprendiz na área administrativa para aplicar conhecimentos de organização e atendimento, contribuindo com dedicação e aprendizado rápido enquanto desenvolvo competências profissionais."'],
      },
      {
        title: "Primeiro emprego: modelo que funciona",
        paragraphs: ["Use estrutura simples com: dados de contato no topo, objetivo de 2-3 linhas, formação educacional, cursos complementares, habilidades técnicas e comportamentais, e atividades extracurriculares. Não invente experiências e seja honesto sobre seu nível de conhecimento. O ProntoDoc tem modelo específico para primeiro emprego que já inclui essas seções."],
      },
    ],
    faqs: [
      { question: "Como fazer currículo de primeiro emprego?", answer: "Destaque formação escolar, cursos extracurriculares, trabalhos voluntários, projetos pessoais e habilidades comportamentais. Use um objetivo claro e mantenha o currículo em uma página." },
      { question: "O que colocar no objetivo do currículo?", answer: "Use um objetivo profissional específico indicando a área ou cargo desejado. Exemplo: 'Busco oportunidade como Jovem Aprendiz na área administrativa'." },
      { question: "Trabalho informal conta no primeiro currículo?", answer: "Sim. Trabalhos informais verdadeiros podem ser incluídos descrevendo a atividade, período e responsabilidades, indicando que foi autônomo ou informal." },
    ],
  },
  {
    slug: "quantas-paginas-ter-curriculo",
    title: "Quantas páginas deve ter um currículo profissional",
    description: "Descubra o tamanho ideal do currículo e como organizar as informações de forma eficiente.",
    category: "Boas práticas",
    readingTime: "5 min",
    intro: "Um currículo profissional deve ter preferencialmente uma página, especialmente para candidatos com até 10 anos de experiência. Duas páginas são aceitáveis para perfis mais seniores ou com muitas publicações e projetos relevantes.",
    sections: [
      {
        title: "Qual o tamanho ideal do currículo?",
        paragraphs: ["Um currículo profissional deve ter preferencialmente uma página, especialmente para candidatos com até 10 anos de experiência. Duas páginas são aceitáveis para perfis mais seniores ou com muitas publicações e projetos relevantes. Recrutadores gastam em média 6-7 segundos na primeira leitura, então seja direto e relevante."],
      },
      {
        title: "Quando usar duas páginas?",
        paragraphs: ["Use duas páginas apenas se: você tem mais de 10 anos de experiência relevante, possui muitas publicações ou projetos técnicos importantes, ou está candidatando-se para posições acadêmicas ou científicas. Mesmo assim, priorize as informações mais recentes e relevantes."],
        bullets: ["Até 10 anos de experiência: 1 página", "Mais de 10 anos: máximo 2 páginas", "Posições acadêmicas: pode estender para CV completo", "Priorize experiências dos últimos 5-10 anos"],
      },
      {
        title: "Como reduzir o currículo para uma página?",
        paragraphs: ["Elimine experiências muito antigas ou irrelevantes, resuma descrições longas, remova hobbies genéricos, use formatação compacta (margens menores, fonte 10-11pt), e foque apenas nas informações essenciais para a vaga desejada."],
      },
    ],
    faqs: [
      { question: "Quantas páginas deve ter um currículo?", answer: "Preferencialmente uma página para até 10 anos de experiência. Máximo de duas páginas para perfis seniores ou acadêmicos." },
      { question: "Currículo de duas páginas é ruim?", answer: "Não necessariamente. Duas páginas são aceitáveis para profissionais com mais de 10 anos de experiência relevante ou posições acadêmicas." },
      { question: "Como deixar o currículo mais curto?", answer: "Elimine experiências antigas, resuma descrições, remova informações irrelevantes e use formatação compacta com margens menores e fonte 10-11pt." },
    ],
  },
  {
    slug: "como-passar-gupy-ats",
    title: "Como passar no currículo da Gupy e outros ATS",
    description: "Dicas práticas para otimizar seu currículo e aumentar as chances de passar pelos sistemas de triagem.",
    category: "ATS e plataformas",
    readingTime: "8 min",
    intro: "Para passar no ATS da Gupy e outras plataformas, use palavras-chave exatas da descrição da vaga, mantenha estrutura simples e evite elementos que dificultem a leitura automática.",
    sections: [
      {
        title: "Entenda como a Gupy funciona",
        paragraphs: ["A Gupy usa um sistema ATS que analisa seu currículo em busca de compatibilidade com a vaga. O sistema lê palavras-chave, estrutura do documento, datas formatadas corretamente e informações de contato. Currículos com tabelas complexas, gráficos ou imagens podem ter problemas de leitura."],
      },
      {
        title: "Dicas para passar no ATS",
        paragraphs: ["Use palavras-chave exatas da descrição da vaga, mantenha o currículo em uma ou duas colunas simples, evite cabeçalhos e rodapés complexos, salve em PDF (não em imagem), e revise se todas as seções estão legíveis. Preencha também os campos da plataforma manualmente quando solicitado."],
        bullets: ["Copie palavras-chave da descrição da vaga", "Use estrutura simples sem tabelas complexas", "Salve em PDF com texto selecionável", "Preencha campos da plataforma manualmente", "Revise contatos e informações obrigatórias"],
      },
      {
        title: "Erros comuns que eliminam no ATS",
        paragraphs: ["Incluir foto quando não solicitado, usar tabelas ou colunas complexas, salvar como imagem em vez de PDF, ter informações de contato incompletas, e não preencher campos obrigatórios da plataforma são erros que podem eliminar sua candidatura automaticamente."],
      },
    ],
    faqs: [
      { question: "Como passar no ATS da Gupy?", answer: "Use palavras-chave da vaga, estrutura simples sem tabelas, salve em PDF, preencha campos da plataforma e revise informações de contato." },
      { question: "Qual formato de arquivo usar na Gupy?", answer: "PDF com texto selecionável. Não envie imagens ou arquivos em formatos editáveis como DOC quando puder evitar." },
      { question: "Preciso repetir palavras-chave várias vezes?", answer: "Não. Use termos relevantes naturalmente apenas quando representarem sua experiência real. Repetição artificial pode prejudicar." },
    ],
  },
  {
    slug: "o-que-colocar-objetivo-curriculo",
    title: "O que colocar no objetivo do currículo",
    description: "Aprenda a escrever um objetivo profissional claro e específico que atraia recrutadores.",
    category: "Boas práticas",
    readingTime: "5 min",
    intro: "O objetivo do currículo deve ser específico e direto, indicando o cargo ou área desejada. Evite frases genéricas como 'crescer na empresa' e foque no que você pode oferecer.",
    sections: [
      {
        title: "Qual a ordem correta das informações no currículo?",
        paragraphs: ["A ordem correta das informações no currículo é: dados de contato (nome, telefone, e-mail, LinkedIn, cidade), objetivo profissional (2-3 linhas), formação acadêmica, experiências profissionais (da mais recente para a mais antiga), cursos complementares e habilidades técnicas."],
      },
      {
        title: "Como escrever um objetivo eficaz",
        paragraphs: ["Seja específico indicando cargo ou área, mencione 1-2 habilidades relevantes, mostre como pode contribuir e mantenha em 2-3 linhas. Exemplo: 'Busco oportunidade como auxiliar administrativo para aplicar conhecimentos em organização de documentos e atendimento, contribuindo com eficiência e aprendizado constante.'"],
        bullets: ["Indique cargo ou área específica", "Mencione 1-2 habilidades principais", "Mostre como pode contribuir", "Mantenha em 2-3 linhas", "Adapte para cada vaga"],
      },
      {
        title: "Erros comuns no objetivo",
        paragraphs: ["Usar frases genéricas como 'crescer na empresa', colocar objetivos múltiplos ou muito amplos, escrever textos longos demais, e não adaptar o objetivo para a vaga são erros que diminuem o impacto do seu currículo."],
      },
    ],
    faqs: [
      { question: "O que colocar no objetivo do currículo?", answer: "Indique o cargo ou área desejada, mencione 1-2 habilidades relevantes e mostre como pode contribuir. Mantenha em 2-3 linhas específicas." },
      { question: "Qual a ordem correta das informações?", answer: "Dados de contato, objetivo, formação acadêmica, experiências profissionais (cronológica reversa), cursos e habilidades." },
      { question: "Devo mudar o objetivo para cada vaga?", answer: "Sim. Adaptar o objetivo para cada vaga mostra interesse específico e aumenta suas chances de ser selecionado." },
    ],
  },
  {
    slug: "melhor-fonte-para-curriculo",
    title: "Qual fonte usar no currículo profissional",
    description: "Descubra as melhores fontes para currículo e como formatar seu documento de forma profissional.",
    category: "Boas práticas",
    readingTime: "4 min",
    intro: "As melhores fontes para currículo profissional são Arial, Calibri, Helvetica, Times New Roman e Roboto, em tamanho 10-12pt para texto e 14-16pt para títulos.",
    sections: [
      {
        title: "Melhores fontes para currículo",
        paragraphs: ["As melhores fontes para currículo profissional são Arial, Calibri, Helvetica, Times New Roman e Roboto. Estas fontes são amplamente aceitas, fáceis de ler e compatíveis com sistemas ATS. Use tamanho 10-12pt para texto corrido e 14-16pt para títulos e cabeçalhos."],
        bullets: ["Arial - limpa e moderna", "Calibri - padrão Microsoft, muito legível", "Helvetica - profissional e elegante", "Times New Roman - clássica e tradicional", "Roboto - moderna e digital-friendly"],
      },
      {
        title: "Formatação profissional",
        paragraphs: ["Mantenha consistência na formatação: use a mesma fonte em todo o documento, aplique negrito apenas em títulos e cargos, use itálico com moderação para instituições ou datas, e garanta bom contraste entre texto e fundo."],
      },
      {
        title: "O que evitar na formatação",
        paragraphs: ["Evite fontes decorativas ou difíceis de ler (Comic Sans, Papyrus, etc.), cores muito vibrantes, tamanhos menores que 10pt, excesso de negrito ou itálico, e formatação inconsistente entre seções."],
      },
    ],
    faqs: [
      { question: "Qual a melhor fonte para currículo?", answer: "Arial, Calibri, Helvetica, Times New Roman ou Roboto são as melhores opções. Use tamanho 10-12pt para texto e 14-16pt para títulos." },
      { question: "Posso usar fontes diferentes?", answer: "Não. Mantenha a mesma fonte em todo o currículo para garantir consistência e profissionalismo." },
      { question: "Qual tamanho de fonte usar?", answer: "10-12pt para texto corrido e 14-16pt para títulos e cabeçalhos. Nunca use menos que 10pt." },
    ],
  },
  {
    slug: "perguntas-entrevista-emprego",
    title: "Quais perguntas caem na entrevista de emprego",
    description: "Conheça as perguntas mais comuns em entrevistas e aprenda a responder de forma eficaz.",
    category: "Entrevista",
    readingTime: "8 min",
    intro: "As perguntas mais comuns em entrevistas incluem 'Fale sobre você', 'Por que devemos te contratar?', 'Quais seus pontos fortes e fracos?' e questões sobre experiências passadas.",
    sections: [
      {
        title: "Perguntas mais frequentes",
        paragraphs: ["As perguntas mais comuns em entrevistas incluem: 'Fale sobre você', 'Por que devemos te contratar?', 'Quais seus pontos fortes e fracos?', 'Como você lida com pressão?', 'Conte sobre um desafio que superou' e 'Por que quer trabalhar aqui?'. Prepare respostas estruturadas para cada uma."],
        bullets: ["Fale sobre você", "Por que devemos te contratar?", "Pontos fortes e fracos", "Como lida com pressão/conflitos", "Conte sobre um desafio superado", "Por que quer trabalhar aqui", "Onde se vê em 5 anos"],
      },
      {
        title: "Como se preparar para entrevista",
        paragraphs: ["Pesquise sobre a empresa, revise sua experiência e conquistas, prepare exemplos concretos usando o método STAR (Situação, Tarefa, Ação, Resultado), pratique respostas em voz alta, e prepare perguntas para fazer ao recrutador."],
      },
      {
        title: "Dicas para responder bem",
        paragraphs: ["Seja honesto e específico, use exemplos reais, conecte suas respostas às necessidades da vaga, mantenha postura positiva mesmo ao falar de desafios, e demonstre entusiasmo pela oportunidade."],
      },
    ],
    faqs: [
      { question: "Quais perguntas caem na entrevista?", answer: "As mais comuns são: 'Fale sobre você', 'Por que devemos te contratar?', 'Pontos fortes e fracos', 'Como lida com pressão' e 'Por que quer trabalhar aqui?'." },
      { question: "Como se preparar para entrevista?", answer: "Pesquise a empresa, revise sua experiência, prepare exemplos concretos, pratique respostas e prepare perguntas para o recrutador." },
      { question: "O que é o método STAR?", answer: "STAR significa Situação, Tarefa, Ação, Resultado. É uma técnica para estruturar respostas com exemplos concretos de experiências passadas." },
    ],
  },
  {
    slug: "como-fazer-curriculo-profissional",
    title: "Como fazer currículo profissional: guia completo 2026",
    description: "Guia definitivo para criar um currículo profissional que passa em ATS e impressiona recrutadores.",
    category: "Guia completo",
    readingTime: "15 min",
    intro: "Este guia completo ensina tudo sobre como fazer um currículo profissional: desde a estrutura correta até otimização para ATS, passando por dicas de formatação, conteúdo e estratégias para diferentes situações.",
    sections: [
      {
        title: "Estrutura básica do currículo",
        paragraphs: ["Um currículo profissional deve conter: dados de contato completos, objetivo profissional específico, formação acadêmica, experiências profissionais em ordem cronológica reversa, cursos complementares e habilidades técnicas. Mantenha o documento em 1-2 páginas com formatação limpa e profissional."],
        bullets: ["Dados de contato: nome, telefone, e-mail, LinkedIn, cidade", "Objetivo: 2-3 linhas específicas", "Formação: instituição, curso, ano de conclusão", "Experiências: cargo, empresa, período, 3-5 realizações", "Cursos: nome, instituição, carga horária", "Habilidades: ferramentas, idiomas, competências técnicas"],
      },
      {
        title: "Otimização para ATS",
        paragraphs: ["Para passar nos sistemas de triagem automática: use palavras-chave da descrição da vaga, mantenha estrutura simples sem tabelas complexas, evite elementos gráficos excessivos, salve em PDF com texto selecionável, e não use foto a menos que solicitado."],
      },
      {
        title: "Dicas por situação profissional",
        paragraphs: ["Para primeiro emprego: destaque formação, cursos e atividades. Para mudança de área: enfatize habilidades transferíveis. Para seniores: foque em conquistas e liderança. Para desempregados: mantenha currículo atualizado e use rede de contatos."],
      },
      {
        title: "Erros comuns a evitar",
        paragraphs: ["Não inclua informações pessoais desnecessárias (CPF, RG, estado civil), não minta sobre experiências ou habilidades, evite erros de português, não use e-mail não profissional, e não envie o mesmo currículo para todas as vagas sem adaptação."],
      },
    ],
    faqs: [
      { question: "Qual o modelo de currículo os recrutadores preferem?", answer: "Modelo simples, limpo, com estrutura clara e otimizado para ATS. Priorize conteúdo relevante sobre design elaborado." },
      { question: "O que colocar no currículo quando não tem experiência?", answer: "Destaque formação, cursos, projetos, voluntariado, habilidades e atividades que demonstrem responsabilidade e capacidade de aprendizado." },
      { question: "Como adaptar o currículo para cada vaga?", answer: "Leia a descrição da vaga, identifique palavras-chave e requisitos, e ajuste objetivo, experiências e habilidades para destacar o que é mais relevante para aquela posição específica." },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
