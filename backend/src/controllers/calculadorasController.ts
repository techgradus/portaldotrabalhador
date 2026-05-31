import { Request, Response, NextFunction } from 'express';
import { isDatabaseConfigured, prisma } from '../config/database';

async function registrarUso(tipo: string): Promise<void> {
  if (!isDatabaseConfigured) return;

  await prisma.metricasCalculadora
    .create({ data: { tipo } })
    .catch(console.error);
}

export async function calcularRescisao(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { salarioBruto, dataAdmissao, dataDemissao, tipo, saldoFGTS = 0 } = req.body;
    if (!salarioBruto || !dataAdmissao || !dataDemissao || !tipo) {
      res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
      return;
    }

    const admissao = new Date(dataAdmissao);
    const demissao = new Date(dataDemissao);
    const mesesCompletos =
      (demissao.getFullYear() - admissao.getFullYear()) * 12 +
      (demissao.getMonth() - admissao.getMonth());
    const anos = Math.floor(mesesCompletos / 12);

    const r = (n: number) => Math.round(n * 100) / 100;

    const saldoSalario = r((salarioBruto / 30) * demissao.getDate());
    const decimoTerceiro = tipo !== 'com_justa_causa' ? r((salarioBruto / 12) * (mesesCompletos % 12 || 12)) : 0;
    const feriasProporcional = tipo !== 'com_justa_causa' ? r((salarioBruto / 12) * (mesesCompletos % 12 || 12)) : 0;
    const umTercoFerias = r(feriasProporcional / 3);
    const avisoPrevio = tipo === 'sem_justa_causa' || tipo === 'acordo_mutuo'
      ? r(salarioBruto + Math.min(anos, 3) * (salarioBruto / 30) * 3)
      : 0;
    const multaFGTS = tipo === 'sem_justa_causa' ? r(saldoFGTS * 0.4)
      : tipo === 'acordo_mutuo' ? r(saldoFGTS * 0.2)
      : 0;

    await registrarUso('rescisao');
    res.json({
      saldoSalario,
      decimoTerceiro,
      feriasProporcional,
      umTercoFerias,
      avisoPrevio,
      multaFGTS,
      totalBruto: r(saldoSalario + decimoTerceiro + feriasProporcional + umTercoFerias + avisoPrevio + multaFGTS),
    });
  } catch (err) {
    next(err);
  }
}

export async function calcularSalarioLiquido(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { salarioBruto, dependentes = 0 } = req.body;
    if (!salarioBruto) {
      res.status(400).json({ message: 'salarioBruto é obrigatório.' });
      return;
    }

    const inssTabela = [
      { limite: 1518.0, aliquota: 0.075 },
      { limite: 2793.88, aliquota: 0.09 },
      { limite: 4190.83, aliquota: 0.12 },
      { limite: 8157.41, aliquota: 0.14 },
    ];

    let inss = 0;
    let base = salarioBruto;
    let anterior = 0;
    for (const faixa of inssTabela) {
      if (base <= 0) break;
      const tributavel = Math.min(base, faixa.limite - anterior);
      inss += tributavel * faixa.aliquota;
      base -= tributavel;
      anterior = faixa.limite;
    }

    const irrfTabela = [
      { limite: 2259.2, aliquota: 0, deducao: 0 },
      { limite: 2826.65, aliquota: 0.075, deducao: 169.44 },
      { limite: 3751.05, aliquota: 0.15, deducao: 381.44 },
      { limite: 4664.68, aliquota: 0.225, deducao: 662.77 },
      { limite: Infinity, aliquota: 0.275, deducao: 896.0 },
    ];

    const baseIRRF = salarioBruto - inss - dependentes * 189.59;
    let irrf = 0;
    if (baseIRRF > 0) {
      const faixa = irrfTabela.find((f) => baseIRRF <= f.limite)!;
      irrf = Math.max(0, baseIRRF * faixa.aliquota - faixa.deducao);
    }

    const r = (n: number) => Math.round(n * 100) / 100;
    await registrarUso('salario_liquido');
    res.json({
      salarioBruto: r(salarioBruto),
      inss: r(inss),
      irrf: r(irrf),
      salarioLiquido: r(salarioBruto - inss - irrf),
      aliquotaEfetiva: r(((inss + irrf) / salarioBruto) * 100),
    });
  } catch (err) {
    next(err);
  }
}

export async function calcularFGTS(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { salarioBruto, anosTrabalho = 0, mesesTrabalho = 0 } = req.body;
    if (!salarioBruto) {
      res.status(400).json({ message: 'salarioBruto é obrigatório.' });
      return;
    }

    const totalMeses = anosTrabalho * 12 + mesesTrabalho;
    const depositoMensal = salarioBruto * 0.08;
    const saldoEstimado = depositoMensal * totalMeses;
    const multaRescisoria = saldoEstimado * 0.4;

    const r = (n: number) => Math.round(n * 100) / 100;
    await registrarUso('fgts');
    res.json({
      depositoMensal: r(depositoMensal),
      saldoEstimado: r(saldoEstimado),
      multaRescisoria: r(multaRescisoria),
      totalSaque: r(saldoEstimado + multaRescisoria),
    });
  } catch (err) {
    next(err);
  }
}
