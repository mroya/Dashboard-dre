import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { UploadModal } from './components/upload/UploadModal';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { ComparePage } from './pages/ComparePage';
import { getSampleDREData } from './data/sampleDRE';
import { getDREHistory } from './repositories/dreRepository';

export function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [activeReport, setActiveReport] = useState(() => getSampleDREData());
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Carregar o último relatório do histórico se houver
  useEffect(() => {
    const loadLatest = async () => {
      try {
        const history = await getDREHistory();
        if (history && history.length > 0) {
          const latest = history[0];
          if (latest.dados_completos) {
            setActiveReport(latest.dados_completos);
          }
        }
      } catch (err) {
        console.warn('Usando dados de exemplo padrão:', err);
      }
    };
    loadLatest();
  }, []);

  // Quando o upload e análise IA terminarem:
  const handleAnalysisComplete = (processedData) => {
    setActiveReport(processedData);
    setCurrentTab('dashboard');
  };

  // Selecionar relatório a partir do Histórico:
  const handleSelectFromHistory = (report) => {
    setActiveReport(report.dados_completos || report);
    setCurrentTab('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Topo / Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenUpload={() => setIsUploadOpen(true)}
        filial={activeReport?.filial || '778'}
        periodo={activeReport?.periodo || 'Julho/2026'}
        dataRef={activeReport?.data_referencia || '31/07/2026'}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 pb-12">
        {currentTab === 'dashboard' && (
          <DashboardPage
            data={activeReport}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}

        {currentTab === 'history' && (
          <HistoryPage
            onSelectReport={handleSelectFromHistory}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}

        {currentTab === 'compare' && (
          <ComparePage activeReport={activeReport} />
        )}
      </main>

      {/* Modal de Upload com Análise Gemini */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
      />
    </div>
  );
}

export default App;
