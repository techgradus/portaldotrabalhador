const INSS_FAIXAS = [
  { limite: 1518.0,  aliquota: 0.075 },
  { limite: 2793.88, aliquota: 0.09  },
  { limite: 4190.83, aliquota: 0.12  },
  { limite: 8157.41, aliquota: 0.14  },
];

export function calcularINSS(salarioBruto: number): number {
  let inss = 0;
  let base = salarioBruto;
  let anterior = 0;

  for (const faixa of INSS_FAIXAS) {
    if (base <= 0) break;
    const faixaLimite = faixa.limite - anterior;
    const tributavel = Math.min(base, faixaLimite);
    inss += tributavel * faixa.aliquota;
    base -= tributavel;
    anterior = faixa.limite;
  }
  return Math.round(inss * 100) / 100;
}

const IRRF_FAIXAS = [
  { limite: 2259.2,  aliquota: 0,    deducao: 0       },
  { limite: 2826.65, aliquota: 0.075, deducao: 169.44  },
  { limite: 3751.05, aliquota: 0.15,  deducao: 381.44  },
  { limite: 4664.68, aliquota: 0.225, deducao: 662.77  },
  { limite: Infinity,aliquota: 0.275, deducao: 896.0   },
];

export function calcularIRRF(
  salarioBruto: number,
  inss: number,
  dependentes = 0
): number {
  const deducaoDependente = 189.59;
  const base = salarioBruto - inss - dependentes * deducaoDependente;
  if (base <= 0) return 0;

  const faixa = IRRF_FAIXAS.find((f) => base <= f.limite)!;
  const irrf = base * faixa.aliquota - faixa.deducao;
  return Math.max(0, Math.round(irrf * 100) / 100);
}

export interface ResultadoSalarioLiquido {
  salarioBruto: number;
  inss: number;
  irrf: number;
  salarioLiquido: number;
  aliquotaEfetiva: number;
}

export function calcularSalarioLiquido(
  salarioBruto: number,
  dependentes = 0
): ResultadoSalarioLiquido {
  const inss = calcularINSS(salarioBruto);
  const irrf = calcularIRRF(salarioBruto, inss, dependentes);
  const salarioLiquido = salarioBruto - inss - irrf;
  const aliquotaEfetiva =
    ((inss + irrf) / salarioBruto) * 100;

  return {
    salarioBruto,
    inss: Math.round(inss * 100) / 100,
    irrf: Math.round(irrf * 100) / 100,
    salarioLiquido: Math.round(salarioLiquido * 100) / 100,
    aliquotaEfetiva: Math.round(aliquotaEfetiva * 100) / 100,
  };
}

export interface ResultadoFerias {
  salarioDias: number;
  umTerco: number;
  totalBruto: number;
  inss: number;
  irrf: number;
  totalLiquido: number;
}

export function calcularFerias(
  salarioBruto: number,
  diasFerias = 30
): ResultadoFerias {
  const salarioDias = (salarioBruto / 30) * diasFerias;
  const umTerco = salarioDias / 3;
  const totalBruto = salarioDias + umTerco;
  const inss = calcularINSS(totalBruto);
  const irrf = calcularIRRF(totalBruto, inss);
  const totalLiquido = totalBruto - inss - irrf;

  return {
    salarioDias: Math.round(salarioDias * 100) / 100,
    umTerco: Math.round(umTerco * 100) / 100,
    totalBruto: Math.round(totalBruto * 100) / 100,
    inss: Math.round(inss * 100) / 100,
    irrf: Math.round(irrf * 100) / 100,
    totalLiquido: Math.round(totalLiquido * 100) / 100,
  };
}

export interface ResultadoHorasExtras {
  valorHoraNormal: number;
  valorHoraExtra50: number;
  valorHoraExtra100: number;
  totalHorasExtras50: number;
  totalHorasExtras100: number;
  totalBruto: number;
}

export function calcularHorasExtras(
  salarioBruto: number,
  horasExtras50: number,
  horasExtras100: number,
  horasMensais = 220
): ResultadoHorasExtras {
  const valorHoraNormal = salarioBruto / horasMensais;
  const valorHoraExtra50 = valorHoraNormal * 1.5;
  const valorHoraExtra100 = valorHoraNormal * 2.0;
  const totalHorasExtras50 = valorHoraExtra50 * horasExtras50;
  const totalHorasExtras100 = valorHoraExtra100 * horasExtras100;
  const totalBruto = totalHorasExtras50 + totalHorasExtras100;

  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    valorHoraNormal: round(valorHoraNormal),
    valorHoraExtra50: round(valorHoraExtra50),
    valorHoraExtra100: round(valorHoraExtra100),
    totalHorasExtras50: round(totalHorasExtras50),
    totalHorasExtras100: round(totalHorasExtras100),
    totalBruto: round(totalBruto),
  };
}

export interface ResultadoFGTS {
  depositoMensal: number;
  saldoEstimado: number;
  multaRescisoria: number;
  totalSaque: number;
}

export function calcularFGTS(
  salarioBruto: number,
  anosTrabalho: number,
  mesesTrabalho = 0
): ResultadoFGTS {
  const totalMeses = anosTrabalho * 12 + mesesTrabalho;
  const depositoMensal = salarioBruto * 0.08;
  const saldoEstimado = depositoMensal * totalMeses;
  const multaRescisoria = saldoEstimado * 0.4;
  const totalSaque = saldoEstimado + multaRescisoria;

  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    depositoMensal: round(depositoMensal),
    saldoEstimado: round(saldoEstimado),
    multaRescisoria: round(multaRescisoria),
    totalSaque: round(totalSaque),
  };
}

export type TipoRescisao =
  | 'sem_justa_causa'
  | 'com_justa_causa'
  | 'pedido_demissao'
  | 'acordo_mutuo';

export interface ResultadoRescisao {
  saldoSalario: number;
  decimoTerceiroProporcional: number;
  feriasProporcional: number;
  umTercoFerias: number;
  avisoPrevio: number;
  multaFGTS: number;
  inss: number;
  irrf: number;
  totalBruto: number;
  totalLiquido: number;
}

export function calcularRescisao(
  salarioBruto: number,
  dataAdmissao: Date,
  dataDemissao: Date,
  tipo: TipoRescisao,
  saldoFGTS = 0
): ResultadoRescisao {
  const diasTrabalhados = dataDemissao.getDate();
  const mesesCompletos =
    (dataDemissao.getFullYear() - dataAdmissao.getFullYear()) * 12 +
    (dataDemissao.getMonth() - dataAdmissao.getMonth());
  const anos = Math.floor(mesesCompletos / 12);
  const anosParaAviso = Math.min(anos, 3);

  const saldoSalario = (salarioBruto / 30) * diasTrabalhados;
  const decimoTerceiro =
    tipo !== 'com_justa_causa'
      ? (salarioBruto / 12) * (mesesCompletos % 12 || 12)
      : 0;
  const feriasProporcional =
    tipo !== 'com_justa_causa'
      ? (salarioBruto / 12) * (mesesCompletos % 12 || 12)
      : 0;
  const umTercoFerias = feriasProporcional / 3;
  const avisoPrevio =
    tipo === 'sem_justa_causa' || tipo === 'acordo_mutuo'
      ? salarioBruto + anosParaAviso * (salarioBruto / 30) * 3
      : 0;
  const multaFGTS =
    tipo === 'sem_justa_causa' ? saldoFGTS * 0.4
    : tipo === 'acordo_mutuo' ? saldoFGTS * 0.2
    : 0;

  const totalBruto =
    saldoSalario +
    decimoTerceiro +
    feriasProporcional +
    umTercoFerias +
    avisoPrevio +
    multaFGTS;

  const inss = calcularINSS(saldoSalario + decimoTerceiro + feriasProporcional + umTercoFerias);
  const irrf = calcularIRRF(saldoSalario + decimoTerceiro, inss);
  const totalLiquido = totalBruto - inss - irrf;

  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    saldoSalario: round(saldoSalario),
    decimoTerceiroProporcional: round(decimoTerceiro),
    feriasProporcional: round(feriasProporcional),
    umTercoFerias: round(umTercoFerias),
    avisoPrevio: round(avisoPrevio),
    multaFGTS: round(multaFGTS),
    inss: round(inss),
    irrf: round(irrf),
    totalBruto: round(totalBruto),
    totalLiquido: round(totalLiquido),
  };
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
