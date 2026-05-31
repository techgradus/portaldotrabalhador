import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SimplePages.module.css';
import { modelos } from '../data/modelos';

function formatInfo(info: string) {
  return info
    .replace(/([.!?])(?=\S)/g, '$1 ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
}

export function ModelosPage() {
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <p className={styles.breadcrumb}>Início / Modelos de Documentos</p>
          <h1 className={styles.pageTitle}>Modelos de Documentos</h1>
          <p className={styles.pageDesc}>Modelos prontos e revisados para uso em relações trabalhistas.</p>
        </div>
      </div>
      <div className="container">
        <div className={styles.modelosGrid}>
          {modelos.map((m) => (
            <div key={m.slug} className={styles.modeloCard}>
              <div className={styles.modeloIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.modeloBody}>
                <h3 className={styles.modeloTitulo}>{m.titulo}</h3>
                <p className={styles.modeloDesc}>{m.desc}</p>
                <div className={styles.modeloTags}>
                  {m.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
              <div className={styles.modeloActions}>
                <a
                  className={styles.downloadBtn}
                  href={`/modelos/${m.arquivo}`}
                  download={m.arquivo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Obter modelo
                </a>
                <button
                  className={styles.infoBtn}
                  onClick={() => setSelectedInfo(selectedInfo === m.slug ? null : m.slug)}
                >
                  {selectedInfo === m.slug ? 'Fechar info' : '+ Info'}
                </button>
              </div>
              {selectedInfo === m.slug && (
                <div className={styles.infoPanel}>
                  <div className={styles.infoHeader}>
                    <span className={styles.infoIcon}>i</span>
                    <p className={styles.infoTitle}>Descrição e informações sobre o modelo</p>
                  </div>
                  <div className={styles.infoText}>
                    {formatInfo(m.info).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const direitos = [
  { titulo: 'Carteira Assinada (CTPS)', desc: 'O registro em carteira é obrigatório e garante acesso a todos os benefícios previstos na CLT.', link: '/leis/direitos-clt' },
  { titulo: 'Décimo Terceiro Salário', desc: 'Pago em duas parcelas anuais, proporcional ao tempo trabalhado no ano.', link: '/leis/direitos-clt' },
  { titulo: 'Seguro-Desemprego', desc: 'Benefício pago ao trabalhador dispensado sem justa causa que cumprir os requisitos legais.', link: '/leis/seguro-desemprego' },
  { titulo: 'Adicional Noturno', desc: 'Adicional de 20% para trabalho realizado entre 22h e 5h da manhã.', link: '/leis/jornada-horas-extras' },
  { titulo: 'Adicional de Insalubridade', desc: 'Percentual de 10%, 20% ou 40% sobre o salário mínimo, conforme o grau de exposição.', link: '/leis/direitos-clt' },
  { titulo: 'Adicional de Periculosidade', desc: 'Adicional de 30% sobre o salário para atividades de risco acentuado.', link: '/leis/direitos-clt' },
  { titulo: 'FGTS', desc: 'Depósito mensal de 8% do salário em conta vinculada, disponível em situações específicas.', link: '/leis/fgts-direitos' },
  { titulo: 'Licença Maternidade e Paternidade', desc: 'Afastamento remunerado garantido pela Constituição Federal para pais e mães.', link: '/leis/licenca-maternidade' },
];

export function DireitosPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <p className={styles.breadcrumb}>Início / Direitos do Trabalhador</p>
          <h1 className={styles.pageTitle}>Direitos do Trabalhador</h1>
          <p className={styles.pageDesc}>Conheça os direitos assegurados pela CLT e pela Constituição Federal.</p>
        </div>
      </div>
      <div className="container">
        <div className={styles.direitosGrid}>
          {direitos.map((d) => (
            <Link key={d.titulo} to={d.link} className={styles.direitoCard}>
              <h3 className={styles.direitoTitulo}>{d.titulo}</h3>
              <p className={styles.direitoDesc}>{d.desc}</p>
              <span className={styles.direitoLink}>Saiba mais →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const processos = [
  { titulo: 'Como entrar com processo trabalhista', desc: 'Passo a passo para abrir uma reclamação trabalhista na Justiça do Trabalho, presencialmente ou pelo sistema PJe.', tempo: '9 min', slug: 'processo-trabalhista' },
  { titulo: 'Prazo para reclamar direitos', desc: 'O trabalhador tem até 2 anos após o fim do contrato para ajuizar ação, e pode pleitear os últimos 5 anos de verbas.', tempo: '5 min', slug: 'processo-trabalhista' },
  { titulo: 'Como funciona a audiência trabalhista', desc: 'A audiência é o momento de negociação entre as partes. Se não houver acordo, inicia-se a fase de instrução com provas.', tempo: '7 min', slug: 'processo-trabalhista' },
  { titulo: 'Direitos após a demissão', desc: 'Saldo de salário, férias, 13º, aviso prévio, FGTS com multa e seguro-desemprego são as verbas rescisórias principais.', tempo: '6 min', slug: 'rescisao-justa-causa' },
];

export function ProcessosPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <p className={styles.breadcrumb}>Início / Processos Trabalhistas</p>
          <h1 className={styles.pageTitle}>Processos Trabalhistas</h1>
          <p className={styles.pageDesc}>Entenda como funciona a Justiça do Trabalho e como defender seus direitos.</p>
        </div>
      </div>
      <div className="container">
        <div className={styles.processosList}>
          {processos.map((p) => (
            <Link key={p.titulo} to={`/leis/${p.slug}`} className={styles.processoCard}>
              <div className={styles.processoMeta}>
                <span className={styles.processoTag}>Processos</span>
                <span className={styles.processoTempo}>{p.tempo} de leitura</span>
              </div>
              <h3 className={styles.processoTitulo}>{p.titulo}</h3>
              <p className={styles.processoDesc}>{p.desc}</p>
              <span className={styles.processoLink}>Ler artigo →</span>
            </Link>
          ))}
        </div>

        <div className={styles.aviso}>
          <strong>Importante:</strong> Em casos de violação de direitos trabalhistas, você pode recorrer ao sindicato da categoria, ao Ministério do Trabalho e Emprego ou diretamente à Justiça do Trabalho. É possível atuar sem advogado (jus postulandi) em causas trabalhistas.
        </div>
      </div>
    </div>
  );
}

const noticias = [
  { titulo: 'Salário mínimo 2026: reajuste e impactos', data: '01/01/2026', cat: 'Salário', resumo: 'O salário mínimo nacional passou a R$ 1.621,00, com reflexos em benefícios, contribuições e cálculos trabalhistas.' },
  { titulo: 'Seguro-desemprego 2026: nova tabela', data: '11/01/2026', cat: 'Benefícios', resumo: 'A tabela anual do seguro-desemprego foi reajustada, com parcela entre R$ 1.621,00 e R$ 2.518,65.' },
  { titulo: 'Mudanças na tabela do INSS para 2026', data: '01/01/2026', cat: 'Previdência', resumo: 'As faixas de contribuição ao INSS foram atualizadas para a competência janeiro de 2026.' },
  { titulo: 'Reforma Trabalhista: o que mudou desde 2017', data: '11/11/2024', cat: 'Reforma', resumo: 'Um balanço das principais mudanças introduzidas pela Lei 13.467/2017 e como elas impactam trabalhadores e empregadores.' },
];

export function AtualizacoesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <p className={styles.breadcrumb}>Início / Atualizações da Lei</p>
          <h1 className={styles.pageTitle}>Atualizações da Lei</h1>
          <p className={styles.pageDesc}>Fique por dentro das mudanças mais recentes na legislação trabalhista.</p>
        </div>
      </div>
      <div className="container">
        <div className={styles.noticiasList}>
          {noticias.map((n) => (
            <div key={n.titulo} className={styles.noticiaCard}>
              <div className={styles.noticiaMeta}>
                <span className={styles.noticiaTag}>{n.cat}</span>
                <span className={styles.noticiaData}>{n.data}</span>
              </div>
              <h3 className={styles.noticiaTitulo}>{n.titulo}</h3>
              <p className={styles.noticiaResumo}>{n.resumo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
