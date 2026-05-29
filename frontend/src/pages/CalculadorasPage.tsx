import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  calcularRescisao,
  calcularFerias,
  calcularHorasExtras,
  calcularSalarioLiquido,
  calcularFGTS,
  formatBRL,
  type TipoRescisao,
} from '../utils/calculos';
import { buscarRecomendacoes, type RecomendacaoArtigo } from '../services/api';
import styles from './CalculadorasPage.module.css';

const tabs = [
  { id: 'rescisao', label: 'Rescisão' },
  { id: 'ferias', label: 'Férias' },
  { id: 'horas-extras', label: 'Horas Extras' },
  { id: 'salario-liquido', label: 'Salário Líquido' },
  { id: 'fgts', label: 'FGTS' },
];

function ResultItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={highlight ? styles.resultItemHighlight : styles.resultItem}>
      <span className={styles.resultLabel}>{label}</span>
      <span className={styles.resultValue}>{value}</span>
    </div>
  );
}

interface RescisaoFields {
  salario: string;
  dataAdmissao: string;
  dataDemissao: string;
  tipo: TipoRescisao;
  saldoFGTS: string;
}

function CalcRescisao() {
  const { register, handleSubmit } = useForm<RescisaoFields>({
    defaultValues: {
      salario: '',
      dataAdmissao: '',
      dataDemissao: '',
      tipo: 'sem_justa_causa',
      saldoFGTS: '',
    },
  });
  const [result, setResult] = useState<ReturnType<typeof calcularRescisao> | null>(null);

  const onSubmit = (data: RescisaoFields) => {
    setResult(
      calcularRescisao(
        parseFloat(data.salario.replace(',', '.')),
        new Date(data.dataAdmissao),
        new Date(data.dataDemissao),
        data.tipo,
        parseFloat(data.saldoFGTS.replace(',', '.') || '0')
      )
    );
  };

  return (
    <div className={styles.calcLayout}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.calcTitle}>Rescisão Trabalhista</h2>
        <p className={styles.calcDesc}>Calcule todos os valores da rescisão de forma precisa.</p>

        <label className={styles.label}>
          Salário Bruto (R$)
          <input
            {...register('salario', { required: true })}
            className={styles.input}
            placeholder="3500,00"
            type="text"
          />
        </label>
        <label className={styles.label}>
          Data de Admissão
          <input {...register('dataAdmissao', { required: true })} className={styles.input} type="date" />
        </label>
        <label className={styles.label}>
          Data de Demissão
          <input {...register('dataDemissao', { required: true })} className={styles.input} type="date" />
        </label>
        <label className={styles.label}>
          Tipo de Rescisão
          <select {...register('tipo')} className={styles.input}>
            <option value="sem_justa_causa">Demissão sem justa causa</option>
            <option value="com_justa_causa">Demissão por justa causa</option>
            <option value="pedido_demissao">Pedido de demissão</option>
            <option value="acordo_mutuo">Acordo mútuo (art. 484-A)</option>
          </select>
        </label>
        <label className={styles.label}>
          Saldo do FGTS (R$)
          <input {...register('saldoFGTS')} className={styles.input} placeholder="12000,00" type="text" />
        </label>
        <button type="submit" className={styles.submitBtn}>Calcular Rescisão</button>
      </form>

      <div className={styles.results}>
        <h3 className={styles.resultsTitle}>Resultado</h3>
        {result ? (
          <>
            <ResultItem label="Saldo de Salário" value={formatBRL(result.saldoSalario)} />
            <ResultItem label="13º Proporcional" value={formatBRL(result.decimoTerceiroProporcional)} />
            <ResultItem label="Férias Proporcionais" value={formatBRL(result.feriasProporcional)} />
            <ResultItem label="1/3 sobre Férias" value={formatBRL(result.umTercoFerias)} />
            <ResultItem label="Aviso Prévio" value={formatBRL(result.avisoPrevio)} />
            <ResultItem label="Multa FGTS (40%)" value={formatBRL(result.multaFGTS)} />
            <div className={styles.divider} />
            <ResultItem label="INSS (desconto)" value={`-${formatBRL(result.inss)}`} />
            <ResultItem label="IRRF (desconto)" value={`-${formatBRL(result.irrf)}`} />
            <div className={styles.divider} />
            <ResultItem label="Total Bruto" value={formatBRL(result.totalBruto)} />
            <ResultItem label="Total Líquido" value={formatBRL(result.totalLiquido)} highlight />
          </>
        ) : (
          <p className={styles.resultsEmpty}>Preencha os dados ao lado para calcular.</p>
        )}
      </div>
    </div>
  );
}

interface FeriasFields {
  salario: string;
  dias: '30' | '20' | '15';
}

function CalcFerias() {
  const { register, handleSubmit } = useForm<FeriasFields>({
    defaultValues: { salario: '', dias: '30' },
  });
  const [result, setResult] = useState<ReturnType<typeof calcularFerias> | null>(null);

  const onSubmit = (data: FeriasFields) => {
    setResult(calcularFerias(parseFloat(data.salario.replace(',', '.')), parseInt(data.dias)));
  };

  return (
    <div className={styles.calcLayout}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.calcTitle}>Férias + 1/3 Constitucional</h2>
        <p className={styles.calcDesc}>Descubra o valor exato das suas férias com o adicional de 1/3.</p>
        <label className={styles.label}>
          Salário Bruto (R$)
          <input {...register('salario', { required: true })} className={styles.input} placeholder="3500,00" />
        </label>
        <label className={styles.label}>
          Dias de Férias
          <select {...register('dias')} className={styles.input}>
            <option value="30">30 dias</option>
            <option value="20">20 dias (10 vendidos)</option>
            <option value="15">15 dias</option>
          </select>
        </label>
        <button type="submit" className={styles.submitBtn}>Calcular Férias</button>
      </form>
      <div className={styles.results}>
        <h3 className={styles.resultsTitle}>Resultado</h3>
        {result ? (
          <>
            <ResultItem label="Salário proporcional" value={formatBRL(result.salarioDias)} />
            <ResultItem label="1/3 Constitucional" value={formatBRL(result.umTerco)} />
            <ResultItem label="Total Bruto" value={formatBRL(result.totalBruto)} />
            <div className={styles.divider} />
            <ResultItem label="INSS (desconto)" value={`-${formatBRL(result.inss)}`} />
            <ResultItem label="IRRF (desconto)" value={`-${formatBRL(result.irrf)}`} />
            <div className={styles.divider} />
            <ResultItem label="Total Líquido" value={formatBRL(result.totalLiquido)} highlight />
          </>
        ) : (
          <p className={styles.resultsEmpty}>Preencha os dados ao lado para calcular.</p>
        )}
      </div>
    </div>
  );
}

interface HorasExtrasFields {
  salario: string;
  h50: string;
  h100: string;
  horasMes: '220' | '200' | '180';
}

function CalcHorasExtras() {
  const { register, handleSubmit } = useForm<HorasExtrasFields>({
    defaultValues: { salario: '', h50: '0', h100: '0', horasMes: '220' },
  });
  const [result, setResult] = useState<ReturnType<typeof calcularHorasExtras> | null>(null);

  const onSubmit = (data: HorasExtrasFields) => {
    setResult(
      calcularHorasExtras(
        parseFloat(data.salario.replace(',', '.')),
        parseFloat(data.h50),
        parseFloat(data.h100),
        parseFloat(data.horasMes)
      )
    );
  };

  return (
    <div className={styles.calcLayout}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.calcTitle}>Calculadora de Horas Extras</h2>
        <p className={styles.calcDesc}>Calcule o valor de horas extras diurnas (50%) e noturnas (100%).</p>
        <label className={styles.label}>
          Salário Bruto (R$)
          <input {...register('salario', { required: true })} className={styles.input} placeholder="3500,00" />
        </label>
        <label className={styles.label}>
          Horas mensais contratadas
          <select {...register('horasMes')} className={styles.input}>
            <option value="220">220h (44h semanais)</option>
            <option value="200">200h (40h semanais)</option>
            <option value="180">180h (36h semanais)</option>
          </select>
        </label>
        <label className={styles.label}>
          Horas Extras 50% (diurnas)
          <input {...register('h50')} className={styles.input} type="number" min="0" step="0.5" placeholder="0" />
        </label>
        <label className={styles.label}>
          Horas Extras 100% (noturnas / feriados)
          <input {...register('h100')} className={styles.input} type="number" min="0" step="0.5" placeholder="0" />
        </label>
        <button type="submit" className={styles.submitBtn}>Calcular Horas Extras</button>
      </form>
      <div className={styles.results}>
        <h3 className={styles.resultsTitle}>Resultado</h3>
        {result ? (
          <>
            <ResultItem label="Valor da hora normal" value={formatBRL(result.valorHoraNormal)} />
            <ResultItem label="Valor hora extra 50%" value={formatBRL(result.valorHoraExtra50)} />
            <ResultItem label="Valor hora extra 100%" value={formatBRL(result.valorHoraExtra100)} />
            <div className={styles.divider} />
            <ResultItem label="Total extras 50%" value={formatBRL(result.totalHorasExtras50)} />
            <ResultItem label="Total extras 100%" value={formatBRL(result.totalHorasExtras100)} />
            <div className={styles.divider} />
            <ResultItem label="Total a receber" value={formatBRL(result.totalBruto)} highlight />
          </>
        ) : (
          <p className={styles.resultsEmpty}>Preencha os dados ao lado para calcular.</p>
        )}
      </div>
    </div>
  );
}

interface SalarioLiquidoFields {
  salario: string;
  dependentes: string;
}

function CalcSalarioLiquido() {
  const { register, handleSubmit } = useForm<SalarioLiquidoFields>({
    defaultValues: { salario: '', dependentes: '0' },
  });
  const [result, setResult] = useState<ReturnType<typeof calcularSalarioLiquido> | null>(null);

  const onSubmit = (data: SalarioLiquidoFields) => {
    setResult(calcularSalarioLiquido(parseFloat(data.salario.replace(',', '.')), parseInt(data.dependentes)));
  };

  return (
    <div className={styles.calcLayout}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.calcTitle}>Salário Líquido</h2>
        <p className={styles.calcDesc}>Descubra seu salário líquido após os descontos de INSS e Imposto de Renda.</p>
        <label className={styles.label}>
          Salário Bruto (R$)
          <input {...register('salario', { required: true })} className={styles.input} placeholder="5000,00" />
        </label>
        <label className={styles.label}>
          Número de dependentes
          <select {...register('dependentes')} className={styles.input}>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} dependente{n !== 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className={styles.submitBtn}>Calcular Salário Líquido</button>
      </form>
      <div className={styles.results}>
        <h3 className={styles.resultsTitle}>Resultado</h3>
        {result ? (
          <>
            <ResultItem label="Salário Bruto" value={formatBRL(result.salarioBruto)} />
            <div className={styles.divider} />
            <ResultItem label="Desconto INSS" value={`-${formatBRL(result.inss)}`} />
            <ResultItem label="Desconto IRRF" value={`-${formatBRL(result.irrf)}`} />
            <ResultItem label="Alíquota efetiva" value={`${result.aliquotaEfetiva}%`} />
            <div className={styles.divider} />
            <ResultItem label="Salário Líquido" value={formatBRL(result.salarioLiquido)} highlight />
          </>
        ) : (
          <p className={styles.resultsEmpty}>Preencha os dados ao lado para calcular.</p>
        )}
      </div>
    </div>
  );
}

interface FGTSFields {
  salario: string;
  anos: string;
  meses: string;
}

function CalcFGTS() {
  const { register, handleSubmit } = useForm<FGTSFields>({
    defaultValues: { salario: '', anos: '', meses: '0' },
  });
  const [result, setResult] = useState<ReturnType<typeof calcularFGTS> | null>(null);

  const onSubmit = (data: FGTSFields) => {
    setResult(
      calcularFGTS(
        parseFloat(data.salario.replace(',', '.')),
        parseInt(data.anos || '0'),
        parseInt(data.meses || '0')
      )
    );
  };

  return (
    <div className={styles.calcLayout}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.calcTitle}>Calculadora de FGTS</h2>
        <p className={styles.calcDesc}>Calcule o saldo estimado do FGTS e a multa rescisória de 40%.</p>
        <label className={styles.label}>
          Salário Bruto (R$)
          <input {...register('salario', { required: true })} className={styles.input} placeholder="3500,00" />
        </label>
        <label className={styles.label}>
          Anos trabalhados
          <input {...register('anos')} className={styles.input} type="number" min="0" placeholder="3" />
        </label>
        <label className={styles.label}>
          Meses adicionais
          <select {...register('meses')} className={styles.input}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {i} {i === 1 ? 'mês' : 'meses'}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className={styles.submitBtn}>Calcular FGTS</button>
      </form>
      <div className={styles.results}>
        <h3 className={styles.resultsTitle}>Resultado</h3>
        {result ? (
          <>
            <ResultItem label="Depósito mensal (8%)" value={formatBRL(result.depositoMensal)} />
            <ResultItem label="Saldo estimado" value={formatBRL(result.saldoEstimado)} />
            <div className={styles.divider} />
            <ResultItem label="Multa rescisória (40%)" value={formatBRL(result.multaRescisoria)} />
            <ResultItem label="Total em caso de demissão" value={formatBRL(result.totalSaque)} highlight />
          </>
        ) : (
          <p className={styles.resultsEmpty}>Preencha os dados ao lado para calcular.</p>
        )}
      </div>
    </div>
  );
}

const calculadoras: Record<string, () => JSX.Element> = {
  rescisao: CalcRescisao,
  ferias: CalcFerias,
  'horas-extras': CalcHorasExtras,
  'salario-liquido': CalcSalarioLiquido,
  fgts: CalcFGTS,
};

export default function CalculadorasPage() {
  const location = useLocation();
  const [active, setActive] = useState('rescisao');
  const [historico, setHistorico] = useState<string[]>(() => {
    try {
      const armazenado = localStorage.getItem('calculadoras-usadas');
      return armazenado ? JSON.parse(armazenado) : ['rescisao'];
    } catch {
      return ['rescisao'];
    }
  });
  const [recomendacoes, setRecomendacoes] = useState<RecomendacaoArtigo[]>([]);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && calculadoras[hash]) {
      setActive(hash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.hash]);

  useEffect(() => {
    setHistorico((atual) => {
      const proximoHistorico = [active, ...atual.filter((id) => id !== active)].slice(0, 4);
      localStorage.setItem('calculadoras-usadas', JSON.stringify(proximoHistorico));
      return proximoHistorico;
    });
  }, [active]);

  useEffect(() => {
    if (historico.length === 0) return;

    buscarRecomendacoes(historico)
      .then(setRecomendacoes)
      .catch(() => setRecomendacoes([]));
  }, [historico]);

  const selectCalculator = (id: string) => {
    setActive(id);
    window.history.replaceState(null, '', `/calculadoras#${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ActiveCalc = calculadoras[active];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <p className={styles.breadcrumb}>Início / Calculadoras</p>
          <h1 className={styles.pageTitle}>Calculadoras Trabalhistas</h1>
          <p className={styles.pageDesc}>Calcule seus direitos trabalhistas de forma rápida, precisa e gratuita.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.tabsRow}>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={active === t.id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              onClick={() => selectCalculator(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={styles.calcWrapper}>
          <ActiveCalc />
        </div>

        {recomendacoes.length > 0 && (
          <section className={styles.mlPanel}>
            <div className={styles.mlHeader}>
              <div>
                <h2 className={styles.mlTitle}>Artigos recomendados para voce</h2>
              </div>
              <span className={styles.mlModel}>TF-IDF</span>
            </div>
            <div className={styles.mlGrid}>
              {recomendacoes.map((item) => (
                <Link key={item.slug} to={`/leis/${item.slug}`} className={styles.mlCard}>
                  <div className={styles.mlMeta}>
                    <span>{item.categoria}</span>
                    <span>{item.tempo}</span>
                  </div>
                  <h3 className={styles.mlCardTitle}>{item.titulo}</h3>
                  <p className={styles.mlResumo}>{item.resumo}</p>
                  <span className={styles.mlScore}>similaridade {Math.round(item.score * 100)}%</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className={styles.disclaimer}>
          <strong>Atenção:</strong> Os valores calculados são estimativas com base na legislação vigente.
          Para cálculos definitivos, consulte um profissional especializado ou o departamento de RH da empresa.
        </div>
      </div>
    </div>
  );
}
