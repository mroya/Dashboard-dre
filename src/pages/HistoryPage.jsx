import React, { useState, useEffect } from 'react';
import { History, FileText, Calendar, Eye, Trash2, Search, ArrowRight, Store } from 'lucide-react';
import { getDREHistory } from '../repositories/dreRepository';
import { formatCurrency, formatDateBR } from '../utils/format';

export const HistoryPage = ({ onSelectReport, onOpenUpload }) => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await getDREHistory();
      setReports(data || []);
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      (r.filial && r.filial.toLowerCase().includes(term)) ||
      (r.arquivo_nome && r.arquivo_nome.toLowerCase().includes(term)) ||
      (r.periodo && r.periodo.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
            <History className="w-6 h-6 text-cyan-400" />
            Histórico de DREs Processadas
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Consulte análises anteriores, compare desempenhos e audite relatórios já carregados.
          </p>
        </div>

        <button onClick={onOpenUpload} className="btn-primary text-xs py-2 px-4">
          + Processar Nova DRE
        </button>
      </div>

      {/* Barra de Busca */}
      <div className="glass-panel p-4 mb-6 border-slate-800 flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por filial, nome de arquivo ou período..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-500"
        />
      </div>

      {/* Lista de Relatórios */}
      {loading ? (
        <div className="glass-panel p-12 text-center text-slate-400">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm">Carregando histórico do Supabase...</p>
        </div>
      ) : filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map((report) => {
            const vendaVal = report.dados_completos?.indicadoresMap?.venda?.valor;
            const metaVal = report.dados_completos?.indicadoresMap?.venda?.meta;

            return (
              <div
                key={report.id}
                onClick={() => onSelectReport(report.dados_completos || report)}
                className="glass-card-interactive p-5 border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-semibold bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                      <Store className="w-3.5 h-3.5" />
                      Filial {report.filial}
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDateBR(report.data_referencia)}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base mb-1 group-hover:text-cyan-300 transition-colors truncate">
                    {report.arquivo_nome}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4">
                    {report.periodo || 'Demonstrativo de Resultados'}
                  </p>

                  {vendaVal && (
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400">Venda:</span>
                        <span className="font-mono font-bold text-white">{formatCurrency(vendaVal)}</span>
                      </div>
                      {metaVal && (
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Meta:</span>
                          <span className="font-mono">{formatCurrency(metaVal)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-cyan-400 font-semibold">
                  <span>Abrir Análise</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center border-slate-800">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="font-bold text-white text-base mb-1">Nenhum relatório encontrado</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
            Faça upload do seu primeiro arquivo de DRE em PDF para iniciar o histórico de análises da filial.
          </p>
          <button onClick={onOpenUpload} className="btn-primary text-xs py-2 px-4">
            Processar DRE Agora
          </button>
        </div>
      )}
    </div>
  );
};
