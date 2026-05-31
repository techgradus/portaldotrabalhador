import { Request, Response } from 'express';
import { processarMensagem } from '../services/chatService';

function generateSessionId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function chat(req: Request, res: Response): Promise<void> {
  const { message, history = [], sessionId } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({ reply: 'Mensagem inválida.' });
    return;
  }

  const sid = sessionId || generateSessionId();

  try {
    const reply = await processarMensagem(message.trim(), history, sid);
    res.json({ reply, sessionId: sid });
  } catch (err) {
    console.error('Erro ao processar mensagem:', err);
    res.status(500).json({
      reply: 'No momento não consigo responder. Tente novamente em instantes.',
      sessionId: sid,
    });
  }
}
