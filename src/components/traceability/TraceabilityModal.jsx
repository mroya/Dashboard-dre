import React from 'react';
import { X, FileText, Calculator, Layers, Sparkles, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/format';

export const TraceabilityModal = ({ indicator, isOpen, onClose }) => {
  if (!isOpen || !indicator) return null;

  const formatVal = (val) => {
    if (val === null || val === undefined) return '⚠️ Não localizado';
    if (indicator.unidade === 'BRL') return formatCurrency(val);
    if (indicator.unidade === 'PERCENT') return formatPercent(val, { showSign: false });
    return val;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel-elevated w-full max-w-lg p-6 sm:p-7 animate-fade-in relative border border-cyan-500/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <span>{indicator.nome}</span>
              {indicator.isProjecao && (
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-500/30">
                  PROJEÇÃO
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">Rastreabilidade e memória de cálculo auditável</p>
          </div>
        </div>

        {/* Informações Centrais */}
        <div className="space-y-4">
          {/* Card de Valores */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Valor Realizado</span>
              <span className="text-xl font-bold text-white font-mono">
                {formatVal(indicator.valor)}
              </span>
            </div>

            {indicator.meta && (
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Meta Estipulada</span>
                <span className="text-xl font-bold text-slate-300 font-mono">
                  {formatVal(indicator.meta)}
                </span>
              </div>
            )}
          </div>

          {/* 1. Origem do Dado */}
          <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
              <FileText className="w-4 h-4" />
              <span>1. Origem do Dado</span>
            </div>
            <p className="text-xs text-slate-200">
              {indicator.origem === 'PDF' ? (
                <>
                  Extraído diretamente do documento PDF • <strong>Página {indicator.pagina || 1}</strong>
                </>
              ) : (
                <>
                  Tipo: <strong>{indicator.origem}</strong>
                </>
              )}
            </p>
            {indicator.textoOrigem && (
              <p className="text-xs text-slate-400 mt-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px]">
                "{indicator.textoOrigem}"
              </p>
            )}
          </div>

          {/* 2. Fórmula Utilizada */}
          <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1.5">
              <Calculator className="w-4 h-4" />
              <span>2. Fórmula Utilizada</span>
            </div>
            <p className="text-xs text-slate-300 font-mono bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-[11px]">
              {indicator.formula || 'Valor nominal direto do demonstrativo.'}
            </p>
          </div>

          {/* 3. Memória de Cálculo */}
          {indicator.desvio !== null && indicator.desvio !== undefined && (
            <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                <Layers className="w-4 h-4" />
                <span>3. Memória de Cálculo do Desvio</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <p>
                  <strong>Desvio Nominal:</strong> {formatCurrency(indicator.desvio, { showSign: true })}
                </p>
                <p>
                  <strong>Desvio Percentual:</strong> {formatPercent(indicator.desvioPercentual, { showSign: true })}
                </p>
                {indicator.atingimento !== null && (
                  <p>
                    <strong>Atingimento da Meta:</strong> {indicator.atingimento.toFixed(2)}%
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="btn-secondary text-xs py-2 px-4">
            Fechar Rastreabilidade
          </button>
        </div>
      </div>
    </div>
  );
};
