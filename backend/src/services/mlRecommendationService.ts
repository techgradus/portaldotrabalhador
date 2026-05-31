export interface RecomendacaoArtigo {
  slug: string;
  titulo: string;
  categoria: string;
  resumo: string;
  tempo: string;
  score: number;
  motivo: string;
}

interface ArtigoTreino {
  slug: string;
  titulo: string;
  categoria: string;
  resumo: string;
  tempo: string;
  texto: string;
}

const artigos: ArtigoTreino[] = [
  {
    slug: 'direitos-clt',
    titulo: 'Direitos do Trabalhador na CLT',
    categoria: 'Direitos Básicos',
    tempo: '8 min',
    resumo: 'Conheça os principais direitos garantidos pela CLT, do registro em carteira às verbas rescisórias.',
    texto: 'clt direitos trabalhador carteira assinada verbas rescisorias salario ferias decimo terceiro fgts aviso previo contrato',
  },
  {
    slug: 'jornada-horas-extras',
    titulo: 'Jornada de Trabalho e Horas Extras',
    categoria: 'Jornada',
    tempo: '6 min',
    resumo: 'A CLT limita a jornada a 8h diarias e 44h semanais. Saiba como sao calculadas as horas extras.',
    texto: 'jornada trabalho horas extras adicional hora normal salario calculo banco de horas diurno noturno repouso',
  },
  {
    slug: 'ferias-um-terco',
    titulo: 'Férias e o 1/3 Constitucional',
    categoria: 'Férias',
    tempo: '5 min',
    resumo: 'Todo trabalhador tem direito a 30 dias de férias após 12 meses de trabalho com acréscimo de 1/3.',
    texto: 'ferias um terco constitucional salario descanso abono calculo proporcional periodo aquisitivo repouso direitos',
  },
  {
    slug: 'aviso-previo',
    titulo: 'Aviso Prévio: regras e prazos',
    categoria: 'Rescisão',
    tempo: '6 min',
    resumo: 'O aviso prévio pode ser trabalhado ou indenizado. O prazo mínimo é de 30 dias por lei.',
    texto: 'aviso previo rescisao demissao prazo indenizado trabalhado salario contrato desligamento rescisoria',
  },
  {
    slug: 'rescisao-justa-causa',
    titulo: 'Rescisão com e sem Justa Causa',
    categoria: 'Rescisão',
    tempo: '8 min',
    resumo: 'Na demissão sem justa causa, o trabalhador tem direito a aviso prévio, multa FGTS e seguro-desemprego.',
    texto: 'rescisao justa causa sem justa causa demissao saldo salario ferias decimo terceiro aviso previo multa fgts seguro',
  },
  {
    slug: 'seguro-desemprego',
    titulo: 'Seguro-Desemprego: quem tem direito',
    categoria: 'FGTS',
    tempo: '5 min',
    resumo: 'O seguro-desemprego é pago ao trabalhador dispensado sem justa causa. Conheça os requisitos.',
    texto: 'seguro desemprego demissao sem justa causa fgts saque parcelas trabalhador contrato requisitos beneficio',
  },
  {
    slug: 'fgts-direitos',
    titulo: 'FGTS: depósito, saque e multa',
    categoria: 'FGTS',
    tempo: '7 min',
    resumo: 'O empregador deposita mensalmente 8% do salário no FGTS. Saiba quando você pode sacar.',
    texto: 'fgts deposito mensal saque multa rescisoria salario demissao sem justa causa conta vinculada percentual',
  },
  {
    slug: 'decimo-terceiro',
    titulo: 'Décimo Terceiro Salário',
    categoria: 'Direitos Básicos',
    tempo: '5 min',
    resumo: 'O 13º salário é pago em duas parcelas. Entenda o cálculo e a proporcionalidade.',
    texto: 'decimo terceiro salario proporcional parcelas calculo ferias rescisao direitos trabalhador bonus adicional',
  },
  {
    slug: 'adicional-noturno',
    titulo: 'Adicional Noturno: como calcular',
    categoria: 'Jornada',
    tempo: '4 min',
    resumo: 'Trabalho entre 22h e 5h tem adicional de 20% sobre a hora normal. Veja as regras.',
    texto: 'adicional noturno hora extra jornada salario calculo trabalho noite clt percentual compensacao',
  },
  {
    slug: 'inss-contribuicao',
    titulo: 'Contribuição do INSS e Direitos Previdenciários',
    categoria: 'Previdência',
    tempo: '7 min',
    resumo: 'Entenda como funciona a contribuição ao INSS e quais direitos previdenciários você possui.',
    texto: 'inss contribuicao previdencia aposentadoria auxilio doenca pensao salario desconto obrigatorio direitos',
  },
  {
    slug: 'irrf-deducoes',
    titulo: 'IRRF: Impostos e Deduções no Contracheque',
    categoria: 'Direitos Básicos',
    tempo: '6 min',
    resumo: 'Saiba quanto de IRRF desconta do seu salário e quais são as deduções permitidas.',
    texto: 'irrf imposto renda desconto salario liquido bruto dependentes deducoes contribuinte aliquota calculo',
  },
  {
    slug: 'igualdade-salarial',
    titulo: 'Igualdade Salarial e Discriminação no Trabalho',
    categoria: 'Direitos Básicos',
    tempo: '6 min',
    resumo: 'Homens e mulheres devem receber o mesmo salário para trabalho igual. Conheça seus direitos.',
    texto: 'igualdade salarial discriminacao genero mulher homem salario direitos trabalhista acao judicial',
  },
  {
    slug: 'estabilidade-gestante',
    titulo: 'Estabilidade da Gestante no Emprego',
    categoria: 'Direitos Especiais',
    tempo: '5 min',
    resumo: 'Gestante tem proteção especial contra demissão a partir da confirmação da gravidez.',
    texto: 'estabilidade gestante gravidez protecao demissao maternidade direitos especiais mulher trabalhadora',
  },
  {
    slug: 'licenca-maternidade',
    titulo: 'Licença Maternidade e Direitos da Mãe',
    categoria: 'Direitos Especiais',
    tempo: '5 min',
    resumo: 'A mãe tem direito a 120 dias de licença maternidade e proteção no retorno ao trabalho.',
    texto: 'licenca maternidade mae dias direitos trabalhista filhos retorno trabalho beneficio',
  },
  {
    slug: 'terceirizacao',
    titulo: 'Terceirização e Direitos do Terceirizado',
    categoria: 'Relação de Trabalho',
    tempo: '7 min',
    resumo: 'Trabalhador terceirizado tem os mesmos direitos que empregado direto. Saiba como proteger-se.',
    texto: 'terceirizacao terceirizado direitos protecao empresa tomadora intermediaria contrato trabalho',
  },
  {
    slug: 'sindical-contribuicao',
    titulo: 'Direito Sindical e Contribuição Sindical',
    categoria: 'Direitos Coletivos',
    tempo: '5 min',
    resumo: 'Conheça seus direitos sindicais e como funciona a contribuição sindical obrigatória.',
    texto: 'sindicato direito sindical contribuicao obrigatoria associacao trabalhador coletivo negociacao',
  },
  {
    slug: 'assedio-moral',
    titulo: 'Assédio Moral e Ambiente de Trabalho',
    categoria: 'Saúde no Trabalho',
    tempo: '6 min',
    resumo: 'Assédio moral é proibido. Saiba como identificar e proteger seus direitos.',
    texto: 'assedio moral ambiente trabalho hostilidade pressao psicologica direitos protecao denuncia',
  },
  {
    slug: 'acidente-trabalho',
    titulo: 'Acidente de Trabalho e Direitos da Vítima',
    categoria: 'Saúde no Trabalho',
    tempo: '7 min',
    resumo: 'Em caso de acidente, você pode ter direito a indenização e cobertura do INSS.',
    texto: 'acidente trabalho indenizacao auxilio doenca direitos vitima comunicacao empregador seguro',
  },
];


const perfilCalculadoras: Record<string, string> = {
  rescisao: 'rescisao demissao aviso previo multa fgts saldo salario ferias decimo terceiro justa causa',
  ferias: 'ferias um terco constitucional salario descanso abono proporcional periodo aquisitivo repouso',
  'horas-extras': 'jornada horas extras adicional noturno hora normal salario calculo trabalho banco horas',
  salario_liquido: 'salario liquido bruto inss irrf descontos dependentes decimo terceiro direitos irpf',
  'salario-liquido': 'salario liquido bruto inss irrf descontos dependentes decimo terceiro direitos irpf',
  fgts: 'fgts deposito mensal saque multa rescisoria demissao salario conta vinculada percentual',
  maternidade: 'licenca maternidade mae gestante estabilidade protecao filhos direitos especiais',
  previdencia: 'inss contribuicao previdencia aposentadoria auxilio doenca pensao salario direitos',
};

const stopwords = new Set(['a', 'as', 'com', 'da', 'de', 'do', 'e', 'em', 'na', 'no', 'o', 'os', 'para', 'por', 'que', 'um', 'uma']);


function normalizar(texto: string): string[] {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopwords.has(token));
}


function frequencia(tokens: string[]): Map<string, number> {
  const total = tokens.length || 1;
  return tokens.reduce((mapa, token) => {
    mapa.set(token, (mapa.get(token) ?? 0) + 1 / total);
    return mapa;
  }, new Map<string, number>());
}


function construirVetor(tokens: string[], idf: Map<string, number>): Map<string, number> {
  const tf = frequencia(tokens);
  const vetor = new Map<string, number>();
  tf.forEach((valor, termo) => {
    vetor.set(termo, valor * (idf.get(termo) ?? 0));
  });
  return vetor;
}

function similaridadeCosseno(a: Map<string, number>, b: Map<string, number>): number {
  let produto = 0;
  let normaA = 0;
  let normaB = 0;

  a.forEach((valor, termo) => {
    produto += valor * (b.get(termo) ?? 0);
    normaA += valor * valor;
  });

  b.forEach((valor) => {
    normaB += valor * valor;
  });

  if (!normaA || !normaB) return 0;
  return produto / (Math.sqrt(normaA) * Math.sqrt(normaB));
}


function criarModelo() {
  const documentos = artigos.map((artigo) => normalizar(`${artigo.titulo} ${artigo.resumo} ${artigo.texto}`));
  const termos = new Set(documentos.flat());
  const idf = new Map<string, number>();

  termos.forEach((termo) => {
    const aparicoes = documentos.filter((tokens) => tokens.includes(termo)).length;
    idf.set(termo, Math.log((1 + documentos.length) / (1 + aparicoes)) + 1);
  });

  return {
    idf,
    vetores: documentos.map((tokens) => construirVetor(tokens, idf)),
  };
}

const modelo = criarModelo();
export function recomendarArtigosPorCalculadoras(calculadoras: string[], limite = 3): RecomendacaoArtigo[] {
  const perfil = calculadoras
    .map((calculadora) => perfilCalculadoras[calculadora] ?? calculadora)
    .join(' ');

  const consulta = perfil.trim() || perfilCalculadoras.rescisao;
  const vetorConsulta = construirVetor(normalizar(consulta), modelo.idf);

  return artigos
    .map((artigo, index) => ({
      artigo,
      score: similaridadeCosseno(vetorConsulta, modelo.vetores[index]),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limite)
    .map(({ artigo, score }) => ({
      slug: artigo.slug,
      titulo: artigo.titulo,
      categoria: artigo.categoria,
      resumo: artigo.resumo,
      tempo: artigo.tempo,
      score: Math.round(score * 100) / 100,
      motivo: `Relacionado a: ${calculadoras.join(', ') || 'calculadoras trabalhistas'}.`,
    }));
}
