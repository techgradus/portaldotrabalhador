import { useParams, Link } from 'react-router-dom';
import styles from './SimplePages.module.css';
import { modelos, ModeloItem } from '../data/modelos';

export default function ModeloDetailPage() {
  const { slug } = useParams();
  const modelo: ModeloItem | undefined = modelos.find((m) => m.slug === slug);

  if (!modelo) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div className="container">
            <p className={styles.breadcrumb}>Início / Modelos de Documentos</p>
            <h1 className={styles.pageTitle}>Modelo não encontrado</h1>
            <p className={styles.pageDesc}>O documento solicitado não está disponível.</p>
            <Link to="/modelos" className={styles.backLink}>
              Voltar para os modelos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <p className={styles.breadcrumb}>Início / Modelos de Documentos / {modelo.titulo}</p>
          <h1 className={styles.pageTitle}>{modelo.titulo}</h1>
          <p className={styles.pageDesc}>{modelo.desc}</p>
          <div className={styles.modeloTags}>
            {modelo.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.documentCard}>
          <div className={styles.documentBody}>
            <p>Este documento está disponível para visualização e download abaixo.</p>
            <div className={styles.actionGroup}>
              <a
                href={`/modelos/${modelo.arquivo}`}
                className={styles.downloadBtn}
                download={modelo.arquivo}
                target="_blank"
                rel="noreferrer"
              >
                Baixar modelo
              </a>
              <a
                href={`/modelos/${modelo.arquivo}`}
                className={styles.openBtn}
                target="_blank"
                rel="noreferrer"
              >
                Abrir modelo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
