import React from 'react';
import { TrafficCone, Info, Sparkles } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/format';

export const SemaforoFilial = ({ indicators, onSelectIndicator }) => {
  const formatValue = (ind) => {
    if (!ind.encontrado) return '⚠️ Não localizado';
    if (ind.unidade === 'BRL') return formatCurrency(ind.valor);
    if (ind.unidade === 'PERCENT') return formatPercent(ind.valor, { showSign: false });
    return ind.valor;
  };

  const getStatusBadge = (ind) => {
    if (!ind.encontrado) {
      return <span className="badge-status badge-yellow text-[10px]">⚠️ Não Localizado</span>;
    }
    if (ind.statusCor === 'green') {
      return <span className="badge-status badge-green text-[10px]">🟢 No Caminho</span>;
    }
    if (ind.statusCor === 'yellow') {
      return <span className="badge-status badge-yellow text-[10px]">🟡 Próximo</span>;
    }
    if (ind.statusCor === 'orange') {
      return <span className="badge-status badge-orange text-[10px]">🟠 Atenção</span>;
    }
    if (ind.statusCor === 'red') {
      return <span className="badge-status badge-red text-[10px]">🔴 Precisamos Agir</span>;
    }
    return <span className="badge-status badge-blue text-[10px]">🔵 Informativo</span>;
  };

  return (
    <div className="glass-panel p-5 mb-6 border-slate-800">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-lg">🚦</span>
          <div>
            <h3 className="font-bold text-white text-base font-heading">
              Semáforo da Filial
            </h3>
            <p className="text-xs text-slate-400">
              Visão consolidada do estado de saúde de cada departamento em poucos segundos.
            </p>
          </div>
        </div>
        <span className="text-xs text-cyan-400 font-medium flex items-center gap-1">
          <Info className="w-3.5 h-3.5" /> Clique em uma linha para ver a origem
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="pb-3 pl-2">Indicador / Departamento</th>
              <th className="pb-3 text-right">Realizado</th>
              <th className="pb-3 text-right">Meta</th>
              <th className="pb-3 text-right">Desvio %</th>
              <th className="pb-3 text-center">Status</th>
              <th className="pb-3 text-right pr-2">Origem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {indicators.map((ind) => (
              <tr
                key={ind.chave}
                onClick={() => onSelectIndicator(ind)}
                className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
              >
                <td className="py-3 pl-2">
                  <div className="flex items-center gap-2">
                    <span>{ind.statusIcon}</span>
                    <span className="font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {ind.nome}
                    </span>
                    {ind.isProjecao && (
                      <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-bold px-1 rounded">
                        PROJEÇÃO
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3 text-right font-mono font-medium text-slate-100">
                  {formatValue(ind)}
                </td>

                <td className="py-3 text-right font-mono text-slate-400">
                  {ind.meta ? (ind.unidade === 'BRL' ? formatCurrency(ind.meta) : formatPercent(ind.meta, { showSign: false })) : '—'}
                </td>

                <td className="py-3 text-right font-mono">
                  {ind.desvioPercentual !== null ? (
                    <span
                      className={`font-semibold ${
                        ind.desvioPercentual >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {formatPercent(ind.desvioPercentual)}
                    </span>
                  ) : (
                    <span className="text-slate-500">—</span>
                  )}
                </td>

                <td className="py-3 text-center">
                  {getStatusBadge(ind)}
                </td>

                <td className="py-3 text-right pr-2 text-slate-400 group-hover:text-cyan-400 transition-colors text-[11px]">
                  Pág. {ind.pagina} ↗
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
