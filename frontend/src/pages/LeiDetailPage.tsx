import { useParams, Link } from 'react-router-dom';
import styles from './LeiDetailPage.module.css';
import guiImage from '../img/gui.png';

const artigos: Record<string, { titulo: string; cat: string; tempo: string; corpo: string }> = {
  'direitos-clt': {
    titulo: 'Direitos do Trabalhador na CLT',
    cat: 'Direitos Básicos',
    tempo: '8 min',
    corpo: `
A Consolidação das Leis do Trabalho (CLT), aprovada pelo Decreto-Lei nº 5.452/1943, é o principal instrumento de proteção dos trabalhadores com vínculo empregatício no Brasil. Com diversas atualizações ao longo das décadas, a CLT garante um conjunto mínimo de direitos a todo empregado com carteira assinada.

## Carteira de Trabalho

Todo trabalhador empregado tem direito ao registro do contrato de trabalho na Carteira de Trabalho e Previdência Social (CTPS). O empregador deve assinar a carteira no prazo de 48 horas após o início da prestação de serviços. A ausência do registro constitui relação de emprego irregular, sujeita a multas administrativas e ação trabalhista.

## Remuneração

O salário mínimo nacional é o piso de remuneração para qualquer trabalhador, vedada qualquer distinção por motivo de sexo, idade, cor ou estado civil. O pagamento deve ocorrer até o quinto dia útil do mês subsequente ao trabalhado.

## Jornada de Trabalho

A duração normal do trabalho não pode ser superior a oito horas diárias e quarenta e quatro horas semanais. As horas que excederem esse limite são consideradas extras e devem ser remuneradas com adicional mínimo de 50% sobre o valor da hora normal.

## Férias Anuais Remuneradas

Após cada período de 12 meses de vigência do contrato de trabalho, o empregado tem direito a férias remuneradas de 30 dias, acrescidas de pelo menos 1/3 a mais do que a remuneração normal — garantia prevista diretamente na Constituição Federal.

## Décimo Terceiro Salário

Previsto na Lei nº 4.090/1962, o 13º salário é devido a todo empregado e deve ser pago em duas parcelas: a primeira entre fevereiro e novembro, e a segunda até 20 de dezembro.

## FGTS

O Fundo de Garantia do Tempo de Serviço corresponde ao depósito mensal de 8% do salário bruto em conta vinculada ao trabalhador. Na rescisão sem justa causa, o empregador deve recolher adicionalmente multa de 40% sobre o saldo da conta.

## Aviso Prévio

O aviso prévio é obrigatório tanto para o empregador quanto para o empregado que deseja encerrar o contrato de trabalho. O prazo mínimo é de 30 dias, podendo ser acrescido de 3 dias por ano de serviço prestado na mesma empresa, até o limite de 90 dias.

## Seguro-Desemprego

O trabalhador dispensado sem justa causa tem direito ao seguro-desemprego, cujo valor e número de parcelas variam conforme o tempo de emprego e o salário recebido, respeitados os critérios da Lei nº 7.998/1990.
    `,
  },
  'jornada-horas-extras': {
    titulo: 'Jornada de Trabalho e Horas Extras',
    cat: 'Jornada',
    tempo: '6 min',
    corpo: `
A jornada de trabalho é o período durante o qual o empregado permanece à disposição do empregador. A CLT estabelece limites claros para proteger a saúde e o descanso do trabalhador.

## Limites Legais

A duração normal do trabalho não pode exceder 8 horas por dia e 44 horas por semana. Trabalhadores em turno ininterrupto de revezamento têm jornada de 6 horas, salvo negociação coletiva em contrário.

## Horas Extras

A prorrogação da jornada além dos limites legais gera horas extras, que devem ser remuneradas com adicional de no mínimo 50% sobre o valor da hora normal para dias úteis, e 100% para domingos e feriados, salvo disposição mais favorável em acordo ou convenção coletiva.

O empregado não pode realizar mais de 2 horas extras por dia, e o banco de horas é uma alternativa à remuneração adicional, desde que previsto em acordo ou convenção coletiva.

## Intervalo Intrajornada

Para jornadas superiores a 6 horas, é obrigatório intervalo mínimo de 1 hora para repouso e alimentação. Jornadas entre 4 e 6 horas têm intervalo mínimo de 15 minutos. O intervalo não remunerado não é computado na duração do trabalho.

## Intervalo Interjornada

Entre duas jornadas de trabalho deve haver um período mínimo de 11 horas consecutivas de descanso. A inobservância desse intervalo implica pagamento em dobro das horas subtraídas.

## Descanso Semanal

Todo trabalhador tem direito a repouso semanal remunerado de 24 horas consecutivas, preferencialmente aos domingos, além de feriados civis e religiosos.

## Trabalho Noturno

Considera-se noturno o trabalho realizado entre 22h e 5h. O adicional noturno é de 20% sobre a hora diurna, e a hora noturna é computada como 52 minutos e 30 segundos.
    `,
  },
  'ferias-um-terco': {
    titulo: 'Férias e o 1/3 Constitucional',
    cat: 'Férias',
    tempo: '5 min',
    corpo: `
As férias anuais remuneradas são um direito fundamental do trabalhador, previsto tanto na CLT quanto no artigo 7º, inciso XVII, da Constituição Federal de 1988.

## Período Aquisitivo

O trabalhador adquire o direito a férias após completar 12 meses de vigência do contrato de trabalho (período aquisitivo). O empregador tem até os 12 meses seguintes para conceder as férias (período concessivo).

## Duração das Férias

A quantidade de dias de férias varia de acordo com o número de faltas injustificadas no período aquisitivo: sem faltas ou até 5 faltas — 30 dias; de 6 a 14 faltas — 24 dias; de 15 a 23 faltas — 18 dias; de 24 a 32 faltas — 12 dias; acima de 32 faltas — perda do direito a férias.

## O 1/3 Constitucional

A Constituição Federal garante que o valor das férias seja acrescido de pelo menos um terço a mais do que a remuneração normal. Esse adicional incide sobre o salário bruto do período de férias.

## Antecipação do Pagamento

O pagamento das férias deve ser feito até 2 dias antes do início do período de descanso, incluindo o terço constitucional. O não pagamento no prazo dobra o valor devido ao trabalhador.

## Venda de Férias (Abono Pecuniário)

O trabalhador pode converter 1/3 dos dias de férias em pagamento em dinheiro (abono pecuniário), desde que solicite ao empregador com no mínimo 15 dias de antecedência.

## Férias Coletivas

O empregador pode conceder férias coletivas a todos os empregados ou a determinados setores, notificando o sindicato e comunicando o Ministério do Trabalho com antecedência mínima de 15 dias.
    `,
  },
    'aviso-previo': {
    titulo: 'Aviso Prévio: Regras e Prazos',
    cat: 'Rescisão',
    tempo: '6 min',
    corpo: `

## Aviso prévio

O aviso prévio é a comunicação antecipada de que o contrato de trabalho será encerrado.
Ele pode ser:

trabalhado (a pessoa continua trabalhando)
indenizado (a empresa paga sem exigir trabalho)

O mínimo é de 30 dias e aumenta 3 dias por ano trabalhado na mesma empresa, até o limite de 90 dias.

## Durante o aviso prévio trabalhado, o empregado urbano pode:

reduzir 2 horas da jornada diária; ou
faltar 7 dias corridos no final do período, sem desconto.

Quando o trabalhador pede demissão e não cumpre o aviso, a empresa pode descontar o valor correspondente das verbas rescisórias.

    `,
  },
    'licenca-maternidade': {
    titulo: 'Licença maternidade e paternidade',
    cat: 'Licenças',
    tempo: '7 min',
    corpo: `

## Licença-maternidade

O salário-maternidade normalmente dura:

120 dias em caso de parto;
120 dias em adoção;
14 dias em caso de aborto previsto em lei ou espontâneo.

Quem pode ter direito:

empregadas CLT;
MEI;
domésticas;
contribuintes do INSS;
desempregadas mantendo qualidade de segurada.

## Licença-paternidade

O prazo mínimo geral previsto é de 5 dias.
Há casos com ampliação para 20 dias, conforme legislação específica e programas de prorrogação
    `,
  },

    'rescisao-justa-causa': {
    titulo: 'Rescisão com e sem justa causa',
    cat: 'Rescisão',
    tempo: '8 min',
    corpo: `

## Sem justa causa

Quando a empresa demite sem motivo grave, o trabalhador geralmente recebe:

saldo de salário;
férias vencidas e proporcionais + 1/3;
13º proporcional;
aviso prévio;
saque do FGTS;
multa de 40% do FGTS;
seguro-desemprego (se cumprir requisitos).

## Com justa causa

Na justa causa, o trabalhador perde alguns direitos e normalmente recebe apenas:

saldo de salário;
férias vencidas + 1/3.

Em regra, perde:

aviso prévio;
13º proporcional;
saque do FGTS;
multa do FGTS;
seguro-desemprego.

A empresa deve formalizar a rescisão e pagar as verbas em até 10 dias corridos após o fim do contrato.
    `,
  },
    'seguro-desemprego': {
    titulo: 'Seguro-desemprego: quem tem direito',
    cat: 'FGTS',
    tempo: '5 min',
    corpo: `

## Tem direito quem:

foi dispensado sem justa causa;
está desempregado;
não possui renda própria suficiente;
não recebe benefício previdenciário contínuo (com exceções).

## Tempo mínimo trabalhado:

1ª solicitação: 12 meses nos últimos 18 meses;
2ª solicitação: 9 meses nos últimos 12 meses;
3ª ou mais: 6 meses anteriores à demissão.
    `,
  },
    'intervalo-almoco': {
    titulo: 'Intervalo de almoço e descanso',
    cat: 'Jornada',
    tempo: '4 min',
    corpo: `

## Pela CLT:

jornada acima de 6 horas → intervalo mínimo de 1 hora;
jornada entre 4 e 6 horas → 15 minutos;
descanso semanal remunerado normalmente é de 24 horas consecutivas.

O descanso semanal geralmente ocorre aos domingos, mas pode variar conforme escala e categoria profissional.
    `,
  },
    'decimo-terceiro': {
    titulo: 'Décimo terceiro salário',
    cat: 'Direitos Básicos',
    tempo: '5 min',
    corpo: `

## O 13º é um salário extra pago em duas parcelas:

1ª parcela até 30 de novembro;
2ª parcela até 20 de dezembro.

O valor é proporcional ao tempo trabalhado no ano:

cada mês trabalhado por mais de 15 dias conta como 1/12.

## O 13º é um salário extra pago em duas parcelas:
horas extras habituais;
adicional noturno;
comissões.

    `,
  },
    'adicional-noturno': {
    titulo: 'Adicional noturno: como calcular',
    cat: 'Jornada',
    tempo: '4 min',
    corpo: `

## Para trabalhadores urbanos:

trabalho noturno normalmente ocorre entre 22h e 5h;
o adicional mínimo é de 20% sobre a hora diurna.

## Exemplo:
hora normal: R$ 10
adicional noturno: +20%
hora noturna = R$ 12

## Além disso, a hora noturna urbana é reduzida:
52 minutos e 30 segundos equivalem a 1 hora noturna trabalhada.
    `,
  },
    'fgts-direitos': {
    titulo: 'FGTS: depósito, saque e multa',
    cat: 'FGTS',
    tempo: '7 min',
    corpo: `

## A empresa deve depositar:

8% do salário do trabalhador mensalmente;
2% para menor aprendiz.

## Pode sacar o FGTS em situações como:
demissão sem justa causa;
aposentadoria;
compra de imóvel;
doenças graves;
saque-aniversário

## Na demissão sem justa causa:
a empresa paga multa de 40% sobre o saldo do FGTS.
    `,
  },
    'processo-trabalhista': {
    titulo: 'Como entrar com um processo trabalhista',
    cat: 'Processos',
    tempo: '9 min',
    corpo: `

## O trabalhador pode:

procurar um advogado trabalhista; ou
entrar diretamente na Justiça do Trabalho.

Normalmente o processo começa em uma Vara do Trabalho da cidade onde o serviço foi prestado.

## Documentos importantes:

carteira de trabalho;
holerites;
comprovantes;
conversas;
contrato;
provas de horas extras ou irregularidades.

## Também é possível buscar:

sindicato da categoria;
Defensoria Pública (quando disponível);
assistência judiciária gratuita.    `,
  },


};



export default function LeiDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const artigo = slug ? artigos[slug] : undefined;

  if (!artigo) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Artigo não encontrado</h1>
          <Link to="/leis" className={styles.backLink}>← Voltar para Leis</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <p className={styles.breadcrumb}>
            <Link to="/">Início</Link> / <Link to="/leis">Leis Trabalhistas</Link> / {artigo.titulo}
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <article className={styles.article}>
            <div className={styles.articleMeta}>
              <span className={styles.articleCat}>{artigo.cat}</span>
              <span className={styles.articleTempo}>{artigo.tempo} de leitura</span>
            </div>
            <h1 className={styles.articleTitle}>{artigo.titulo}</h1>
            <div className={styles.articleBody}>
              {artigo.corpo.trim().split('\n\n').map((bloco, i) =>
                bloco.startsWith('## ')
                  ? <h2 key={i} className={styles.h2}>{bloco.slice(3)}</h2>
                  : <p key={i} className={styles.p}>{bloco}</p>
              )}
            </div>
          </article>

          <aside className={styles.aside}>
            <div className={styles.asideCard}>
              <h3 className={styles.asideTitle}>Tem dúvidas sobre este tema?</h3>
              <div className={styles.asideContent}>
                <img src={guiImage} alt="Gui" className={styles.asideImage} />
                <p className={styles.asideDesc}>Pergunte ao Gui, nosso assistente especializado em legislação trabalhista.</p>
              </div>
              <button
                className={styles.asideBtn}
                onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
              >
                Perguntar ao Gui
              </button>
            </div>
            <div className={styles.asideCard}>
              <h3 className={styles.asideTitle}>Calcule seus valores</h3>
              <p className={styles.asideDesc}>Use nossas calculadoras trabalhistas para simular seus direitos.</p>
              <Link to="/calculadoras" className={styles.asideBtnSecondary}>
                Acessar calculadoras
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
