import { useState, useEffect, useRef } from 'react';
import styles from './ChatBot.module.css';
import { sendMessage } from '../../services/chatService';
import guiImage from '../../img/gui.png';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface StoredMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface StoredChatState {
  messages: StoredMessage[];
  sessionId?: string;
}

const CHAT_STORAGE_KEY = 'portal-trabalhador.chat';

const initialMessage: Message = {
  id: '0',
  role: 'assistant',
  text: 'Olá! Sou o Gui, seu guia trabalhista. Posso ajudar com direitos, cálculos, modelos de documentos e caminhos dentro do portal. Me conte o que você precisa resolver.',
  timestamp: new Date(),
};

const SUGGESTIONS = [
  'Como calcular minhas férias?',
  'Tenho direito ao FGTS?',
  'O que é aviso prévio?',
  'Como funciona a rescisão?',
];

function serializeInitialMessage(): StoredMessage {
  return { ...initialMessage, timestamp: initialMessage.timestamp.toISOString() };
}

function loadStoredChat(): StoredChatState {
  try {
    const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return { messages: [serializeInitialMessage()] };

    const parsed = JSON.parse(raw) as StoredChatState;
    if (!Array.isArray(parsed.messages) || parsed.messages.length === 0) {
      return { messages: [serializeInitialMessage()] };
    }

    return parsed;
  } catch {
    return { messages: [serializeInitialMessage()] };
  }
}

function parseStoredMessages(messages: StoredMessage[]): Message[] {
  return messages.map((message) => ({
    ...message,
    timestamp: new Date(message.timestamp),
  }));
}

function renderBubble(text: string, setOpen: (v: boolean) => void) {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(<span key={last}>{text.slice(last, match.index)}</span>);
    }
    const [, label, url] = match;
    parts.push(
      <a
        key={match.index}
        href={url}
        onClick={(e) => {
          e.preventDefault();
          setOpen(false);
          window.location.href = url;
        }}
        style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}
      >
        {label}
      </a>
    );
    last = regex.lastIndex;
  }

  if (last < text.length) parts.push(<span key={last}>{text.slice(last)}</span>);
  return parts;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [storedChat] = useState<StoredChatState>(() => loadStoredChat());
  const [messages, setMessages] = useState<Message[]>(() => parseStoredMessages(storedChat.messages));
  const [sessionId, setSessionId] = useState<string | undefined>(() => storedChat.sessionId);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-chat', handler);
    return () => window.removeEventListener('open-chat', handler);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    try {
      const state: StoredChatState = {
        sessionId,
        messages: messages.map((message) => ({
          ...message,
          timestamp: message.timestamp.toISOString(),
        })),
      };
      window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [messages, sessionId]);

  const submit = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const history = messages.slice(1).map((m) => ({ role: m.role, text: m.text }));
      const { reply, sessionId: nextSessionId } = await sendMessage(text.trim(), history, sessionId);
      if (nextSessionId) setSessionId(nextSessionId);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'assistant', text: reply, timestamp: new Date() },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          text: 'Desculpe, tive um problema de conexão. Tente novamente em instantes.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fechar chat' : 'Abrir chat com Gui'}
        aria-controls="gui-chat-window"
        aria-expanded={open}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {!open && <span className={styles.fabLabel}>Gui</span>}
      </button>

      {open && (
        <div className={styles.windowWrapper} id="gui-chat-window">
          <div className={styles.guiSidebar}>
            <img src={guiImage} alt="Gui" className={styles.guiSidebarImage} />
          </div>
          <div className={styles.window}>
          <div className={styles.header}>
            <div className={styles.avatar}>G</div>
            <div className={styles.headerInfo}>
              <span className={styles.name}>Gui</span>
              <span className={styles.status}>
                <span className={styles.dot} />
                Seu guia trabalhista
              </span>
            </div>
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="Fechar">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg) => (
              <div key={msg.id} className={msg.role === 'user' ? styles.msgUser : styles.msgBot}>
                <div className={styles.bubble}>
                  {msg.role === 'assistant' ? renderBubble(msg.text, setOpen) : msg.text}
                </div>
                <span className={styles.time}>{formatTime(msg.timestamp)}</span>
              </div>
            ))}
            {loading && (
              <div className={styles.msgBot}>
                <div className={styles.typing}>
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && (
            <div className={styles.suggestions}>
              {SUGGESTIONS.map((s) => (
                <button key={s} className={styles.suggestion} onClick={() => submit(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="text"
              placeholder="Digite sua dúvida trabalhista..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              maxLength={500}
            />
            <button
              className={styles.send}
              onClick={() => submit(input)}
              disabled={!input.trim() || loading}
              aria-label="Enviar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
