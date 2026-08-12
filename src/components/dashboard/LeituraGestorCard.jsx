import React, { useState } from 'react';
import { Brain, Copy, Check, Share2, Sparkles } from 'lucide-react';

export const LeituraGestorCard = ({ summaryText, filial = '778', dataRef = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToShare = `🧠 *LEITURA DO GESTOR — FILIAL ${filial} (${dataRef})*\n\n${summaryText}\n\n_Gerado pelo DRE Inteligente IA_`;
    navigator.clipboard.writeText(textToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass-panel p-6 mb-6 border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/30 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-heading">
                Leitura do Gestor
              </h3>
              <span className="bg-indigo-500/10 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/20">
                Resumo Executivo
              </span>
            </div>
            <p className="text-xs text-slate-400">Diagnóstico inteligente da filial em 5 linhas</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="btn-secondary text-xs py-2 px-3 self-end sm:self-auto border-indigo-500/30 hover:border-indigo-500/60"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-semibold">Copiado para WhatsApp!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-indigo-400" />
              <span>Copiar para WhatsApp</span>
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
          "{summaryText}"
        </p>
      </div>
    </div>
  );
};
