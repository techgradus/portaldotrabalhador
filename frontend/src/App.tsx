import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LeisPage from './pages/LeisPage';
import LeiDetailPage from './pages/LeiDetailPage';
import CalculadorasPage from './pages/CalculadorasPage';
import DireitosPage from './pages/DireitosPage';
import ProcessosPage from './pages/ProcessosPage';
import ModelosPage from './pages/ModelosPage';
import ModeloDetailPage from './pages/ModeloDetailPage';
import FaqPage from './pages/FaqPage';
import AtualizacoesPage from './pages/AtualizacoesPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminArtigos from './pages/admin/AdminArtigos';
import AdminCalculadoras from './pages/admin/AdminCalculadoras';
import ScrollToTop from './components/layout/ScrollToTop';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/leis" element={<LeisPage />} />
            <Route path="/leis/:slug" element={<LeiDetailPage />} />
            <Route path="/calculadoras" element={<CalculadorasPage />} />
            <Route path="/direitos" element={<DireitosPage />} />
            <Route path="/processos" element={<ProcessosPage />} />
            <Route path="/modelos" element={<ModelosPage />} />
            <Route path="/modelos/:slug" element={<ModeloDetailPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/atualizacoes" element={<AtualizacoesPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="artigos" element={<AdminArtigos />} />
            <Route path="calculadoras" element={<AdminCalculadoras />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
