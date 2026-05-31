import { Outlet, NavLink } from 'react-router-dom';
import styles from './AdminLayout.module.css';

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/artigos', label: 'Artigos / Leis', end: false },
  { to: '/admin/calculadoras', label: 'Calculadoras', end: false },
];

export default function AdminLayout() {
  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>PT</span>
          <span className={styles.brandLabel}>Admin</span>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <span className={styles.topbarTitle}>Painel de Administração</span>
          <div className={styles.avatar}>A</div>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
