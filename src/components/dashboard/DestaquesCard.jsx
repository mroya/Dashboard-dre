import React from 'react';
import { Trophy, ArrowUpRight, Sparkles } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/format';

export const DestaquesCard = ({ items = [], onSelectIndicator }) => {
  return (
    <div className="glass-panel p-5 border-emerald-500/20 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-base">🏆</span>
          <h3 className="font-bold text-white text-base font-heading">
            Onde Estamos Ganhando?
          </h3>
        </div>
        <span className="badge-status badge-green text-[10px]">
          Destaques
        </span>
      </div>

      <div className="space-y-3 flex-1">
        {items.length > 0 ? (
          items.map((item, idx) => (
            <div
              key={item.chave || idx}
              onClick={() => onSelectIndicator && item.encontrado && onSelectIndicator(item)}
              className="bg-slate-900/70 p-3.5 rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                    ★
                  </span>
                  <span className="font-bold text-slate-200 text-sm group-hover:text-emerald-300 transition-colors">
                    {item.nome}
                  </span>
                </div>
                {item.desvioPercentual !== null ? (
                  <span className="font-mono font-bold text-emerald-400 text-sm flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {formatPercent(item.desvioPercentual, { showSign: true })}
                  </span>
                ) : (
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {formatPercent(item.valor, { showSign: false })}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300/90 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                "{item.mensagem}"
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400 text-xs">
            <Trophy className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p>Nenhum destaque positivo registrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};
