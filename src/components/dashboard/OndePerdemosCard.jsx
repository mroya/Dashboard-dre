import React from 'react';
import { AlertCircle, ArrowDownRight, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/format';

export const OndePerdemosCard = ({ items = [], onSelectIndicator }) => {
  return (
    <div className="glass-panel p-5 border-red-500/20 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-base">🔎</span>
          <h3 className="font-bold text-white text-base font-heading">
            Onde Estamos Perdendo?
          </h3>
        </div>
        <span className="badge-status badge-red text-[10px]">
          Focos de Atenção
        </span>
      </div>

      <div className="space-y-3 flex-1">
        {items.length > 0 ? (
          items.map((item, idx) => (
            <div
              key={item.chave || idx}
              onClick={() => onSelectIndicator && onSelectIndicator(item)}
              className="bg-slate-900/70 p-3.5 rounded-xl border border-red-500/20 hover:border-red-500/50 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-slate-200 text-sm group-hover:text-red-300 transition-colors">
                    {item.nome}
                  </span>
                </div>
                <span className="font-mono font-bold text-red-400 text-sm flex items-center gap-0.5">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  {formatPercent(item.desvioPercentual)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Realizado: <strong className="text-slate-200">{formatCurrency(item.valor)}</strong></span>
                <span>Meta: <strong className="text-slate-200">{formatCurrency(item.meta)}</strong></span>
              </div>

              <p className="text-xs text-slate-300/90 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                "{item.mensagem}"
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400 text-xs">
            <TrendingDown className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p>Nenhum indicador com desvio negativo crítico identificado.</p>
          </div>
        )}
      </div>
    </div>
  );
};
