import { useState } from 'react';
import styles from './FaqPage.module.css';
import guiImage from '../img/gui.png';

const faqs = [
  {
    pergunta: 'Quem pede demissão tem direito ao FGTS?',
    resposta: 'Quem pede demissão tem direito apenas ao saldo do FGTS acumulado, sem a multa de 40%. A multa rescisória só é devida quando a dispensa parte do empregador, sem justa causa. No acordo mútuo (art. 484-A da CLT), o trabalhador recebe 50% da multa.',
  },
  {
    pergunta: 'Quantas horas posso trabalhar por dia?',
    resposta: 'A CLT limita a jornada a 8 horas por dia e 44 horas por semana. O empregado pode fazer no máximo 2 horas extras diárias, remuneradas com adicional de no mínimo 50%. Trabalhadores em turno ininterrupto de revezamento têm jornada de 6 horas.',
  },
  {
    pergunta: 'Quem tem direito ao 13º salário?',
    resposta: 'Todo empregado com carteira assinada tem direito ao 13º salário, proporcional aos meses trabalhados no ano. Para cada mês completo trabalhado, o empregado adquire 1/12 avos do 13º. A fração igual ou superior a 15 dias conta como mês completo.',
  },
  {
    pergunta: 'Posso trabalhar sem carteira assinada?',
    resposta: 'O trabalho sem carteira assinada é informal e o empregador está sujeito a multas e autuações. O trabalhador informal não tem acesso ao FGTS, seguro-desemprego, férias remuneradas nem décimo terceiro. Mesmo sem registro, se comprovada a relação de emprego, todos os direitos são devidos retroativamente.',
  },
  {
    pergunta: 'O que é o período de experiência?',
    resposta: 'O contrato de experiência é modalidade de contrato por prazo determinado, com duração máxima de 90 dias, podendo ser prorrogado uma única vez. Ao término sem justa causa, o trabalhador tem direito a férias proporcionais com 1/3, 13º proporcional e saque do FGTS sem multa.',
  },
  {
    pergunta: 'Tenho direito a intervalo de almoço?',
    resposta: 'Sim. Para jornadas acima de 6 horas, o intervalo mínimo é de 1 hora. Para jornadas entre 4 e 6 horas, o intervalo é de no mínimo 15 minutos. O desconto indevido desse intervalo obriga o empregador a pagar a hora correspondente acrescida de 50%.',
  },
  {
    pergunta: 'Como funciona o aviso prévio?',
    resposta: 'O aviso prévio tem prazo mínimo de 30 dias e pode ser aumentado em 3 dias por ano de serviço na mesma empresa, até o limite de 90 dias. Pode ser trabalhado ou indenizado (pago sem necessidade de cumprir o período). Quem pede demissão também deve cumprir o aviso, ou desconta o valor do acerto.',
  },
  {
    pergunta: 'Quando tenho direito ao seguro-desemprego?',
    resposta: 'O trabalhador tem direito ao seguro-desemprego quando é demitido sem justa causa e cumpre os requisitos de tempo mínimo de emprego: na 1ª solicitação, ao menos 12 meses nos 18 meses anteriores; na 2ª, pelo menos 9 meses nos 12 meses anteriores; nas demais, pelo menos 6 meses imediatamente anteriores.',
  },
];

export default function FaqPage() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <p className={styles.breadcrumb}>Início / Perguntas Frequentes</p>
          <h1 className={styles.pageTitle}>Perguntas Frequentes</h1>
          <p className={styles.pageDesc}>Respostas objetivas para as dúvidas trabalhistas mais comuns.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} className={aberto === i ? `${styles.item} ${styles.itemOpen}` : styles.item}>
              <button
                className={styles.pergunta}
                onClick={() => setAberto(aberto === i ? null : i)}
              >
                <span>{faq.pergunta}</span>
                <span className={styles.icon}>{aberto === i ? '−' : '+'}</span>
              </button>
              {aberto === i && <p className={styles.resposta}>{faq.resposta}</p>}
            </div>
          ))}
        </div>

        <div className={styles.guiBox}>
          <div className={styles.guiContent}>
            <img src={guiImage} alt="Gui" className={styles.guiImage} />
            <p className={styles.guiText}>Não encontrou sua dúvida? Pergunte ao Gui.</p>
          </div>
          <button
            className={styles.guiBtn}
            onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
          >
            Falar com o Gui
          </button>
        </div>
      </div>
    </div>
  );
}
