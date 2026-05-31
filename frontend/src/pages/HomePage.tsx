import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import guiImage from '../img/gui.png';

const quickAccess = [
  { to: '/leis', title: 'Leis Trabalhistas', desc: 'CLT e normas vigentes', color: '#0F2D5F' },
  { to: '/calculadoras', title: 'Calculadoras', desc: 'Calcule seus valores', color: '#1B7A4A' },
  { to: '/direitos', title: 'Direitos', desc: 'Carteira assinada, FGTS', color: '#8B2E0F' },
  { to: '/processos', title: 'Processos', desc: 'Ação na Justiça', color: '#6B2D91' },
  { to: '/modelos', title: 'Modelos', desc: 'Documentos prontos', color: '#0D5786' },
  { to: '/faq', title: 'Perguntas Freq.', desc: 'Dúvidas comuns', color: '#8F5400' },
];

const calcCards = [
  { hash: 'rescisao', title: 'Rescisão Trabalhista', desc: 'Aviso prévio, 13º, férias, multa FGTS e saldo de salário.', tag: 'Popular' },
  { hash: 'ferias', title: 'Férias + 1/3', desc: 'Valor exato com o adicional constitucional.', tag: '' },
  { hash: 'horas-extras', title: 'Horas Extras', desc: '50% diurna e 100% noturna pelo seu salário.', tag: '' },
  { hash: 'salario-liquido', title: 'Salário Líquido', desc: 'Descubra o valor líquido após INSS e IR.', tag: 'Popular' },
];

const leisDestaque = [
  { slug: 'direitos-clt', title: 'Direitos do Trabalhador na CLT', cat: 'CLT', tempo: '8 min' },
  { slug: 'jornada-horas-extras', title: 'Jornada de Trabalho e Horas Extras', cat: 'Jornada', tempo: '6 min' },
  { slug: 'ferias-um-terco', title: 'Férias e o 1/3 Constitucional', cat: 'Férias', tempo: '5 min' },
  { slug: 'rescisao-justa-causa', title: 'Rescisão com e sem Justa Causa', cat: 'Rescisão', tempo: '8 min' },
  { slug: 'licenca-maternidade', title: 'Licença Maternidade e Paternidade', cat: 'Licenças', tempo: '7 min' },
  { slug: 'aviso-previo', title: 'Aviso Prévio: regras e prazos', cat: 'Aviso Prévio', tempo: '5 min' },
];

const faqItems = [
  'Quem pede demissão tem direito ao FGTS?',
  'Quantas horas posso trabalhar por dia?',
  'Quem tem direito ao 13º salário?',
  'Posso trabalhar sem carteira assinada?',
  'O que é o período de experiência?',
  'Como funciona o aviso prévio?',
];

export default function HomePage() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>Informação trabalhista gratuita e confiável</span>
          <h1 className={styles.heroTitle}>
            Seus direitos<br />trabalhistas,<br />
            <span className={styles.heroHighlight}>explicados.</span>
          </h1>
          <p className={styles.heroSub}>
            Calculadoras precisas, leis detalhadas e orientação completa<br />
            para trabalhadores CLT em todo o Brasil.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/calculadoras" className={styles.ctaPrimary}>
              Ver calculadoras
            </Link>
            <Link to="/leis" className={styles.ctaSecondary}>
              Explorar leis
            </Link>
          </div>
        </div>
        <button
          className={styles.heroGui}
          onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
          aria-label="Falar com o Gui"
        >
          <img src={guiImage} alt="Gui - Guia Trabalhista" className={styles.heroGuiImage} />
        </button>
        <div className={styles.heroStats}>
          {[
            { n: '47+', l: 'Leis explicadas' },
            { n: '12', l: 'Calculadoras' },
          ].map((s) => (
            <div key={s.l} className={styles.heroStat}>
              <strong>{s.n}</strong>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>O que você precisa hoje?</h2>
              <p className={styles.sectionSub}>Acesse rapidamente as áreas mais consultadas do portal</p>
            </div>
          </div>
          <div className={styles.quickGrid}>
            {quickAccess.map((item) => (
              <Link key={item.to} to={item.to} className={styles.quickCard}>
                <span className={styles.quickIcon} style={{ background: item.color + '1A', color: item.color }}>
                  →
                </span>
                <strong className={styles.quickTitle}>{item.title}</strong>
                <span className={styles.quickDesc}>{item.desc}</span>
                <span className={styles.quickArrow} style={{ color: item.color }}>
                  Acessar →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Calculadoras Trabalhistas</h2>
              <p className={styles.sectionSub}>Calcule seus direitos de forma rápida e precisa</p>
            </div>
            <Link to="/calculadoras" className={styles.seeAll}>Ver todas →</Link>
          </div>
          <div className={styles.calcGrid}>
            {calcCards.map((c) => (
              <Link key={c.hash} to={`/calculadoras#${c.hash}`} className={styles.calcCard}>
                {c.tag && <span className={styles.calcTag}>{c.tag}</span>}
                <h3 className={styles.calcTitle}>{c.title}</h3>
                <p className={styles.calcDesc}>{c.desc}</p>
                <span className={styles.calcBtn}>Calcular agora</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Leis mais consultadas</h2>
            </div>
            <Link to="/leis" className={styles.seeAll}>Ver todas →</Link>
          </div>
          <div className={styles.leisGrid}>
            {leisDestaque.map((l) => (
              <Link key={l.slug} to={`/leis/${l.slug}`} className={styles.leiCard}>
                <span className={styles.leiCat}>{l.cat}</span>
                <span className={styles.leiTitle}>{l.title}</span>
                <div className={styles.leiMeta}>
                  <span className={styles.leiTempo}>{l.tempo} de leitura</span>
                  <span className={styles.leiArrow}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.guiBanner}>
        <div className="container">
          <div className={styles.guiContent}>
            <div className={styles.guiAvatar}>
              <img src={guiImage} alt="Gui - Guia Trabalhista" className={styles.guiAvatarImage} />
            </div>
            <div>
              <h2 className={styles.guiTitle}>Gui, seu guia trabalhista</h2>
              <p className={styles.guiSub}>
                Tire suas dúvidas trabalhistas em tempo real. Gui conhece toda a legislação
                trabalhista brasileira e está disponível 24h por dia.
              </p>
              <button
                className={styles.guiBtn}
                onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
              >
                Iniciar conversa
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Perguntas Frequentes</h2>
            </div>
            <Link to="/faq" className={styles.seeAll}>Ver todas →</Link>
          </div>
          <div className={styles.faqGrid}>
            {faqItems.map((q) => (
              <Link key={q} to="/faq" className={styles.faqItem}>
                <span>{q}</span>
                <span className={styles.faqPlus}>+</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
