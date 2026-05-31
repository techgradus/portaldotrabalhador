import styles from './AdminDashboard.module.css';

export default function AdminCalculadoras() {
  const calculadoras = [
    { nome: 'Rescisão Trabalhista', usos: 0, ativa: true },
    { nome: 'Férias + 1/3', usos: 0, ativa: true },
    { nome: 'Horas Extras', usos: 0, ativa: true },
    { nome: 'Salário Líquido', usos: 0, ativa: true },
    { nome: 'FGTS', usos: 0, ativa: true },
  ];

  return (
    <div>
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Calculadoras</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usos (mês)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {calculadoras.map((c) => (
              <tr key={c.nome}>
                <td className={styles.tdTitle}>{c.nome}</td>
                <td className={styles.tdMid}>{c.usos}</td>
                <td>
                  <span className={`${styles.statusTag} ${c.ativa ? styles.tagGreen : styles.tagGray}`}>
                    {c.ativa ? 'Ativa' : 'Inativa'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
