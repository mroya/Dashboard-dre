import React from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, FileSearch, Sparkles } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/format';

export const ValidationScreen = ({ data, onProceedToDashboard }) => {
  const indicators = data.indicadores || [];
  const encontrados = indicators.filter((i) => i.encontrado);
  const naoEncontrados = indicators.filter((i) => !i.encontrado);

  const formatValue = (ind) => {
    if (ind.unidade === 'BRL') return formatCurrency(ind.valor);
    if (ind.unidade === 'PERCENT') return formatPercent(ind.valor, { showSign: false });
    return ind.valor;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Banner de Validação */}
      <div className="glass-panel p-6 sm:p-8 mb-8 border-cyan-500/30 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white font-heading">
                  Validação da DRE — Filial {data.filial}
                </h1>
                <span className="badge-status badge-green text-[10px]">
                  Confiança 100%
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1">
                Conferência de integridade dos dados extraídos do documento{' '}
                <strong className="text-cyan-300 font-semibold">{data.arquivo_nome}</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={onProceedToDashboard}
            className="btn-primary text-sm py-3 px-6 shrink-0 shadow-cyan-500/25"
          >
            <span>Avançar para o Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid de Validação: Encontrados vs Não Encontrados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bloco 1: Indicadores Encontrados */}
        <div className="glass-panel p-6 border-emerald-500/20">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Indicadores Localizados ({encontrados.length})</span>
            </div>
            <span className="text-xs text-slate-400">Validados no PDF</span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {encontrados.map((ind) => (
              <div
                key={ind.chave}
                className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-xs">●</span>
                    <span className="font-semibold text-slate-200 text-sm">{ind.nome}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                    <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{ind.origem} • Página {ind.pagina}</span>
                    {ind.textoOrigem && (
                      <span className="text-slate-500 truncate max-w-[200px]">
                        ("{ind.textoOrigem}")
                      </span>
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white text-sm font-mono">
                    {formatValue(ind)}
                  </span>
                  {ind.meta && (
                    <p className="text-[11px] text-slate-400">
                      Meta: {formatCurrency(ind.meta)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bloco 2: Indicadores Não Encontrados */}
        <div className="glass-panel p-6 border-amber-500/20">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Indicadores Não Localizados ({naoEncontrados.length})</span>
            </div>
            <span className="text-xs text-slate-400">Regra Anti-Alucinação</span>
          </div>

          {naoEncontrados.length > 0 ? (
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {naoEncontrados.map((ind) => (
                <div
                  key={ind.chave}
                  className="bg-slate-900/60 p-3.5 rounded-xl border border-amber-500/20 flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-slate-300 text-sm">{ind.nome}</span>
                    <p className="text-xs text-amber-400/90 mt-0.5">
                      ⚠️ Dado não localizado na DRE
                    </p>
                  </div>
                  <span className="badge-status badge-yellow text-[10px]">
                    Não Consta
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
              <p className="font-medium text-slate-300">Todos os indicadores foram localizados no documento!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
