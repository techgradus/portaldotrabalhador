export interface ModeloItem {
  titulo: string;
  desc: string;
  info: string;
  tags: string[];
  slug: string;
  arquivo: string;
}

export const modelos: ModeloItem[] = [
  {
    titulo: 'Pedido de Demissão',
    desc: 'Modelo de carta formal de pedido de demissão, com aviso prévio.',
    info: 'A formalização do seu pedido de demissão deve ser feita por escrito e entregue ao RH ou ao seu gestor imediato,variando de acordo com a sua intenção sobre o aviso prévio.',
    tags: ['Rescisão', 'Desligamento'],
    slug: 'pedido-demissao',
    arquivo: 'pedido-demissao.docx',
  },
  {
    titulo: 'Carta de Advertência',
    desc: 'Modelo para notificação disciplinar de empregado, com espaço para testemunhas.',
    info: 'Documento usado para formalizar advertências e orientar o empregado sobre condutas inadequadas.Pontos Importantes Recusa de Assinatura: Caso o funcionário se recuse a assinar, a carta deve ser lida na presença de duas testemunhas, que assinarão o documento, validando a ciência.Imediatidade: A advertência deve ser dada logo após o empregador tomar conhecimento da falta.',
    tags: ['RH', 'Disciplinar'],
    slug: 'carta-advertencia',
    arquivo: 'carta-advertencia.docx',
  },
  {
    titulo: 'Contrato de Trabalho',
    desc: 'Contrato de trabalho por prazo indeterminado com cláusulas essenciais pela CLT.',
    info: 'Contrato padrão com cláusulas básicas, direitos e deveres para admissão de empregado.',
    tags: ['Admissão', 'Contrato'],
    slug: 'contrato-trabalho',
    arquivo: 'contrato-trabalho.docx',
  },
  {
    titulo: 'Acordo de Rescisão Mútua',
    desc: 'Modelo para o acordo previsto no art. 484-A da CLT, com todos os requisitos legais.',
    info: 'Acordo bilateral que formaliza a rescisão de contrato de trabalho de comum acordo, deve conter a identificação das partes, a vontade consensual de encerrar o vínculo, a data de desligamento, as verbas rescisórias aplicáveis (conforme Art. 484-A da CLT) e a quitação mútua. Este modelo formaliza o fim de um contrato de trabalho, garantindo segurança jurídica..',
    tags: ['Rescisão', 'Acordo'],
    slug: 'rescisao-mutua',
    arquivo: 'rescisao-mutua.docx',
  },
  {
    titulo: 'Atestado de Experiência',
    desc: 'Documento para comprovação do término do período de experiência e efetivação.',
    info: 'Atesta o tempo de experiência do empregado e serve como comprovante para o histórico profissional.',
    tags: ['Admissão', 'Experiência'],
    slug: 'atestado-experiencia',
    arquivo: 'atestado-experiencia.docx',
  },
  {
    titulo: 'Recibo de Entrega de CTPS',
    desc: 'Comprovante de entrega e devolução da carteira de trabalho ao empregado.',
    info: 'Recibo usado para registrar a entrega ou devolução da CTPS em processos de admissão e desligamento.',
    tags: ['CTPS', 'Admissão'],
    slug: 'recibo-ctps',
    arquivo: 'recibo-ctps.docx',
  },
];
