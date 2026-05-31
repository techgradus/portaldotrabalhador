import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const columns = [
  {
    title: 'Navegação',
    links: [
      { to: '/', label: 'Início' },
      { to: '/leis', label: 'Leis Trabalhistas' },
      { to: '/calculadoras', label: 'Calculadoras' },
      { to: '/direitos', label: 'Direitos' },
      { to: '/processos', label: 'Processos Trabalhistas' },
    ],
  },
  {
    title: 'Calculadoras',
    links: [
      { to: '/calculadoras#rescisao', label: 'Rescisão Trabalhista' },
      { to: '/calculadoras#ferias', label: 'Férias + 1/3' },
      { to: '/calculadoras#horas-extras', label: 'Horas Extras' },
      { to: '/calculadoras#salario-liquido', label: 'Salário Líquido' },
      { to: '/calculadoras#fgts', label: 'FGTS' },
    ],
  },
  {
    title: 'Portal',
    links: [
      { to: '/modelos', label: 'Modelos de Documentos' },
      { to: '/faq', label: 'Perguntas Frequentes' },
      { to: '/atualizacoes', label: 'Atualizações da Lei' },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.brandLink}>
              <span className={styles.brandMark}>
                <svg className={styles.brandIcon} viewBox="0 0 64 64" role="img" aria-hidden="true">
                  <rect x="4" y="4" width="56" height="56" rx="16" fill="currentColor" />
                  <circle cx="32" cy="19" r="7.5" fill="#FFFFFF" />
                  <path
                    d="M20.5 37.5c.8-8 5.2-12.2 11.5-12.2s10.7 4.2 11.5 12.2L32 43.5 20.5 37.5Z"
                    fill="#FFFFFF"
                  />
                  <path d="M30.1 27.5h3.8l2.3 13.2L32 45.2l-4.2-4.5 2.3-13.2Z" fill="currentColor" />
                  <path
                    d="M18.5 35.2 32 39.5l13.5-4.3v12.2L32 53 18.5 47.4V35.2Z"
                    fill="#DDEAFF"
                  />
                  <path d="M18.5 35.2 32 39.5V53l-13.5-5.6V35.2Z" fill="#2A63B8" />
                  <path
                    d="M22.8 41h7.1M24 45.4h5.4M39.5 41h6.2M38.5 45.4h7.2"
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className={styles.brandName}>Portal do Trabalhador</span>
            </Link>
            <p className={styles.tagline}>
              Informação trabalhista gratuita e confiável para trabalhadores do Brasil.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className={styles.col}>
              <h4 className={styles.colTitle}>{col.title}</h4>
              <ul className={styles.colLinks}>
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={styles.colLink} onClick={scrollToTop}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Portal do Trabalhador. Todos os direitos reservados.
          </p>
          <p className={styles.disclaimer}>
            As informações deste site têm caráter educativo e não substituem orientação jurídica profissional.
          </p>
        </div>
      </div>
    </footer>
  );
}
