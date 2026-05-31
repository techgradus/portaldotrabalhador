import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LeisPage.module.css';

const categorias = ['Todos', 'Direitos Básicos', 'Jornada', 'Férias', 'Rescisão', 'FGTS', 'Licenças', 'Processos'];

const leis = [
  { slug: 'direitos-clt', titulo: 'Direitos do Trabalhador na CLT', cat: 'Direitos Básicos', tempo: '8 min', resumo: 'Conheça os principais direitos garantidos pela CLT, com referência ao salário mínimo nacional de 2026.' },
  { slug: 'jornada-horas-extras', titulo: 'Jornada de Trabalho e Horas Extras', cat: 'Jornada', tempo: '6 min', resumo: 'A CLT limita a jornada a 8h diárias e 44h semanais. Saiba como são calculadas as horas extras.' },
  { slug: 'ferias-um-terco', titulo: 'Férias e o 1/3 Constitucional', cat: 'Férias', tempo: '5 min', resumo: 'Todo trabalhador tem direito a 30 dias de férias após 12 meses de trabalho com acréscimo de 1/3.' },
  { slug: 'aviso-previo', titulo: 'Aviso Prévio: regras e prazos', cat: 'Rescisão', tempo: '6 min', resumo: 'O aviso prévio pode ser trabalhado ou indenizado. O prazo mínimo é de 30 dias por lei.' },
  { slug: 'licenca-maternidade', titulo: 'Licença Maternidade e Paternidade', cat: 'Licenças', tempo: '7 min', resumo: 'A licença maternidade é de 120 dias e a licença paternidade é de 5 dias úteis.' },
  { slug: 'rescisao-justa-causa', titulo: 'Rescisão com e sem Justa Causa', cat: 'Rescisão', tempo: '8 min', resumo: 'Na demissão sem justa causa, o trabalhador tem direito a aviso prévio, multa FGTS e seguro-desemprego.' },
  { slug: 'seguro-desemprego', titulo: 'Seguro-Desemprego: quem tem direito', cat: 'FGTS', tempo: '5 min', resumo: 'O seguro-desemprego é pago ao trabalhador dispensado sem justa causa, com tabela atualizada em 2026.' },
  { slug: 'intervalo-almoco', titulo: 'Intervalo de Almoço e Descanso', cat: 'Jornada', tempo: '4 min', resumo: 'Jornadas acima de 6 horas exigem intervalo mínimo de 1 hora. Saiba quais são as regras.' },
  { slug: 'decimo-terceiro', titulo: 'Décimo Terceiro Salário', cat: 'Direitos Básicos', tempo: '5 min', resumo: 'O 13º salário é pago em duas parcelas: até 30/11 e até 20/12. Entenda o cálculo.' },
  { slug: 'adicional-noturno', titulo: 'Adicional Noturno: como calcular', cat: 'Jornada', tempo: '4 min', resumo: 'Trabalho entre 22h e 5h tem adicional de 20% sobre a hora normal. Veja as regras.' },
  { slug: 'fgts-direitos', titulo: 'FGTS: depósito, saque e multa', cat: 'FGTS', tempo: '7 min', resumo: 'O empregador deposita mensalmente 8% do salário no FGTS. Veja regras de saque, multa e referência de 2026.' },
  { slug: 'processo-trabalhista', titulo: 'Como entrar com processo trabalhista', cat: 'Processos', tempo: '9 min', resumo: 'Entenda o passo a passo para abrir uma reclamação trabalhista na Justiça do Trabalho.' },
];

export default function LeisPage() {
  const [catAtiva, setCatAtiva] = useState('Todos');
  const [busca, setBusca] = useState('');

  const filtradas = leis.filter((l) => {
    const matchCat = catAtiva === 'Todos' || l.cat === catAtiva;
    const matchBusca =
      busca === '' ||
      l.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      l.resumo.toLowerCase().includes(busca.toLowerCase());
    return matchCat && matchBusca;
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <p className={styles.breadcrumb}>Início / Leis Trabalhistas</p>
          <h1 className={styles.pageTitle}>Leis Trabalhistas</h1>
          <p className={styles.pageDesc}>Entenda a CLT e seus direitos de forma clara e objetiva.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Categorias</h3>
            {categorias.map((cat) => (
              <button
                key={cat}
                className={cat === catAtiva ? `${styles.catBtn} ${styles.catBtnActive}` : styles.catBtn}
                onClick={() => setCatAtiva(cat)}
              >
                {cat}
              </button>
            ))}
          </aside>

          <div className={styles.main}>
            <div className={styles.searchBar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Buscar em leis trabalhistas..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className={styles.count}>{filtradas.length} resultado{filtradas.length !== 1 ? 's' : ''}</div>

            <div className={styles.list}>
              {filtradas.map((lei) => (
                <Link key={lei.slug} to={`/leis/${lei.slug}`} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardCat}>{lei.cat}</span>
                    <span className={styles.cardTempo}>{lei.tempo} de leitura</span>
                  </div>
                  <h3 className={styles.cardTitle}>{lei.titulo}</h3>
                  <p className={styles.cardResumo}>{lei.resumo}</p>
                  <span className={styles.cardLer}>Ler artigo →</span>
                </Link>
              ))}
              {filtradas.length === 0 && (
                <p className={styles.empty}>Nenhum resultado encontrado para "{busca}".</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
