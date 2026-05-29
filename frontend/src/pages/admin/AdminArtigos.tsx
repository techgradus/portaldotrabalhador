import styles from './AdminDashboard.module.css';

export default function AdminArtigos() {
  return (
    <div>
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Artigos / Leis</h2>
          <button className={styles.addBtn}>+ Novo artigo</button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Atualização</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className={styles.loading}>Nenhum artigo cadastrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
