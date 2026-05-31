import { useQuery } from 'react-query';
import api from '../../services/api';
import styles from './AdminDashboard.module.css';

interface DashboardStats {
  chatUltimoMes: number;
  calculosUltimoMes: number;
}

interface ArtigoRow {
  id: number;
  titulo: string;
  categoria_nome: string | null;
  status: 'publicado' | 'rascunho' | 'revisao';
  updated_at: string;
}

const STATUS_LABEL: Record<string, string> = {
  publicado: 'Publicado',
  rascunho: 'Rascunho',
  revisao: 'Em revisão',
};

const STATUS_CLASS: Record<string, string> = {
  publicado: styles.tagGreen,
  rascunho: styles.tagGray,
  revisao: styles.tagAmber,
};

export default function AdminDashboard() {
  const { data: stats } = useQuery<DashboardStats>(
    'admin-dashboard-stats',
    () => api.get('/admin/dashboard').then((r) => r.data),
    { staleTime: 60000, retry: 1 }
  );

  const { data: artigos, isLoading } = useQuery<ArtigoRow[]>(
    'admin-artigos-recentes',
    () => api.get('/admin/artigos?limit=7').then((r) => r.data),
    { staleTime: 30000, retry: 1 }
  );

  const kpis = [
    {
      label: 'Dúvidas ao Gui',
      value: stats ? stats.chatUltimoMes.toLocaleString('pt-BR') : '—',
      accentColor: 'var(--navy)',
    },
    {
      label: 'Cálculos Realizados',
      value: stats ? stats.calculosUltimoMes.toLocaleString('pt-BR') : '—',
      accentColor: 'var(--green)',
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.kpiRow}>
        {kpis.map((k) => (
          <div key={k.label} className={styles.kpi}>
            <span className={styles.kpiAccent} style={{ background: k.accentColor }} />
            <span className={styles.kpiLabel}>{k.label}</span>
            <strong className={styles.kpiValue}>{k.value}</strong>
            <span className={styles.kpiPeriod}>último mês</span>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Conteúdo Recente</h2>
          <a href="/admin/artigos" className={styles.addBtn}>+ Adicionar</a>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Atualização</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className={styles.loading}>Carregando...</td>
              </tr>
            )}
            {!isLoading && !artigos && (
              <tr>
                <td colSpan={4} className={styles.loading}>Não foi possível carregar os dados.</td>
              </tr>
            )}
            {artigos?.map((a) => (
              <tr key={a.id}>
                <td className={styles.tdTitle}>{a.titulo}</td>
                <td className={styles.tdMid}>{a.categoria_nome ?? '—'}</td>
                <td>
                  <span className={`${styles.statusTag} ${STATUS_CLASS[a.status]}`}>
                    {STATUS_LABEL[a.status]}
                  </span>
                </td>
                <td className={styles.tdMid}>{a.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
