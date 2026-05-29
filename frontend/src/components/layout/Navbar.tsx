import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/leis', label: 'Leis Trabalhistas' },
  { to: '/calculadoras', label: 'Calculadoras' },
  { to: '/direitos', label: 'Direitos' },
  { to: '/processos', label: 'Processos' },
  { to: '/modelos', label: 'Modelos' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <svg className={styles.brandIcon} viewBox="0 0 64 64" role="img">
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

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo noturno'}
          title={theme === 'dark' ? 'Modo claro' : 'Modo noturno'}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 14.8A8.5 8.5 0 0 1 9.2 3 7 7 0 1 0 21 14.8Z" />
            </svg>
          )}
        </button>

        <div className={styles.chatBlock}>
          <button className={styles.chatBtn} onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}>
            Falar com o Gui
          </button>
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <span className={menuOpen ? styles.lineTopOpen : styles.lineTop} />
          <span className={menuOpen ? styles.lineMidOpen : styles.lineMid} />
          <span className={menuOpen ? styles.lineBotOpen : styles.lineBot} />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileLink} ${styles.mobileLinkActive}`
                  : styles.mobileLink
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            className={styles.mobileThemeBtn}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Modo claro' : 'Modo noturno'}
          </button>
          <button
            className={styles.mobileChatBtn}
            onClick={() => {
              setMenuOpen(false);
              window.dispatchEvent(new CustomEvent('open-chat'));
            }}
          >
            Falar com o Gui
          </button>
        </div>
      )}
    </header>
  );
}
