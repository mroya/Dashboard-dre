import React, { useState } from 'react';
import { GitCompare, ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Percent, Calendar } from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/format';

export const ComparePage = ({ activeReport }) => {
  const [selectedMode, setSelectedMode] = useState('realizado_meta'); // 'realizado_meta', 'projecao_meta', 'd7'

  if (!activeReport) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="glass-panel p-10">
          <GitCompare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Nenhuma DRE Carregada</h3>
          <p className="text-xs text-slate-400">
            Envie ou selecione uma DRE para visualizar o comparativo de metas, projeções e períodos.
          </p>
        </div>
      </div>
    );
  }

  const indicators = activeReport.indicadores || [];
  const indMap = activeReport.indicadoresMap || {};

  const venda = indMap['venda'];
  const proj = indMap['projecao'];

  const comparisonRows = indicators.filter((i) => i.encontrado && (i.meta || i.valor));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
            <GitCompare className="w-6 h-6 text-cyan-400" />
            Painel Comparativo & Metas
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Filial {activeReport.filial} • {activeReport.periodo} • {activeReport.data_referencia}
          </p>
        </div>

        {/* Modos de Comparação */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedMode('realizado_meta')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedMode === 'realizado_meta'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Realizado vs. Meta
          </button>
          <button
            onClick={() => setSelectedMode('projecao_meta')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedMode === 'projecao_meta'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Projeção vs. Meta
          </button>
        </div>
      </div>

      {/* Destaque Macro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="glass-panel p-6 border-cyan-500/30">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Realizado vs. Meta Acumulada
          </span>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-white font-mono">
                {formatCurrency(venda?.valor)}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Meta: {formatCurrency(venda?.meta)}
              </span>
            </div>
            <span
              className={`badge-status ${
                (venda?.desvioPercentual || 0) >= 0 ? 'badge-green' : 'badge-red'
              }`}
            >
              {(venda?.desvioPercentual || 0) >= 0 ? '+' : ''}
              {venda?.desvioPercentual?.toFixed(2)}%
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                (venda?.atingimento || 0) >= 100 ? 'bg-emerald-500' : 'bg-cyan-500'
              }`}
              style={{ width: `${Math.min(100, venda?.atingimento || 0)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
            <span>Atingimento: {venda?.atingimento?.toFixed(1)}%</span>
            <span>{venda?.desvio && venda.desvio >= 0 ? 'Superávit' : 'Faltam'} {formatCurrency(Math.abs(venda?.desvio || 0))}</span>
          </div>
        </div>

        <div className="glass-panel p-6 border-indigo-500/30">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Projeção de Fechamento vs. Meta
          </span>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-indigo-300 font-mono">
                {formatCurrency(proj?.valor)}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Alvo do Mês: {formatCurrency(proj?.meta)}
              </span>
            </div>
            <span
              className={`badge-status ${
                (proj?.desvioPercentual || 0) >= 0 ? 'badge-green' : 'badge-orange'
              }`}
            >
              {(proj?.desvioPercentual || 0) >= 0 ? '+' : ''}
              {proj?.desvioPercentual?.toFixed(2)}%
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${Math.min(100, proj?.atingimento || 0)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
            <span>Projeção de Atingimento: {proj?.atingimento?.toFixed(1)}%</span>
            <span>Ritmo Diário Atual</span>
          </div>
        </div>
      </div>

      {/* Tabela de Comparação Completa */}
      <div className="glass-panel p-5 border-slate-800">
        <h3 className="font-bold text-white text-base mb-4 font-heading">
          Detalhamento de Todas as Linhas
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 pl-2">Indicador</th>
                <th className="pb-3 text-right">Realizado</th>
                <th className="pb-3 text-right">Meta</th>
                <th className="pb-3 text-right">Diferença (R$)</th>
                <th className="pb-3 text-right">Desvio %</th>
                <th className="pb-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {comparisonRows.map((row) => (
                <tr key={row.chave} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pl-2 font-sans font-medium text-slate-200">
                    <span className="mr-2">{row.statusIcon}</span>
                    {row.nome}
                  </td>
                  <td className="py-3 text-right text-slate-100 font-bold">
                    {row.unidade === 'BRL' ? formatCurrency(row.valor) : formatPercent(row.valor, { showSign: false })}
                  </td>
                  <td className="py-3 text-right text-slate-400">
                    {row.meta ? (row.unidade === 'BRL' ? formatCurrency(row.meta) : formatPercent(row.meta, { showSign: false })) : '—'}
                  </td>
                  <td className="py-3 text-right">
                    {row.desvio !== null ? (
                      <span className={row.desvio >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {formatCurrency(row.desvio, { showSign: true })}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-3 text-right">
                    {row.desvioPercentual !== null ? (
                      <span
                        className={`font-semibold ${
                          row.desvioPercentual >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {formatPercent(row.desvioPercentual)}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-3 text-center font-sans">
                    <span
                      className={`badge-status text-[10px] ${
                        row.statusCor === 'green'
                          ? 'badge-green'
                          : row.statusCor === 'yellow'
                          ? 'badge-yellow'
                          : row.statusCor === 'orange'
                          ? 'badge-orange'
                          : 'badge-red'
                      }`}
                    >
                      {row.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
