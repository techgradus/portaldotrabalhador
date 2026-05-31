import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
});

export interface RecomendacaoArtigo {
  slug: string;
  titulo: string;
  categoria: string;
  resumo: string;
  tempo: string;
  score: number;
  motivo: string;
}

export async function buscarRecomendacoes(calculadoras: string[]): Promise<RecomendacaoArtigo[]> {
  const response = await api.get<{ recomendacoes: RecomendacaoArtigo[] }>('/recomendacoes', {
    params: { calculadoras: calculadoras.join(',') },
  });

  return response.data.recomendacoes;
}

export default api;
