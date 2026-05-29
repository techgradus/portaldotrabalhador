import axios from './api';

interface MessageHistory {
  role: 'user' | 'assistant';
  text: string;
}

export async function sendMessage(
  text: string,
  history: MessageHistory[],
  sessionId?: string
): Promise<{ reply: string; sessionId?: string }> {
  try {
    const { data } = await axios.post('/chat', {
      message: text,
      history: history.map((m) => ({ role: m.role, content: m.text })),
      sessionId,
    });
    return {
      reply: data.reply as string,
      sessionId: data.sessionId as string | undefined,
    };
  } catch (err: unknown) {
    const axiosErr = err as { response?: { data?: { reply?: string; sessionId?: string } } };
    if (axiosErr.response?.data?.reply) {
      return {
        reply: axiosErr.response.data.reply,
        sessionId: axiosErr.response.data.sessionId,
      };
    }
    throw err;
  }
}
