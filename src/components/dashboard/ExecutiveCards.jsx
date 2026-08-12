import React from 'react';
import { DollarSign, TrendingUp, Percent, Receipt, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/format';

export const ExecutiveCards = ({ indicatorsMap, onSelectIndicator }) => {
  const venda = indicatorsMap['venda'];
  const projecao = indicatorsMap['projecao'];
  const rentabilidade = indicatorsMap['rentabilidade'];
  const ticketMedio = indicatorsMap['ticket_medio'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* CARD 1 — VENDA EFETIVA */}
      <div
        onClick={() => venda && onSelectIndicator(venda)}
        className="glass-card-interactive p-5 group border-slate-800 hover:border-cyan-500/40"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Venda Efetiva
          </span>
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="mb-2">
          <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
            {formatCurrency(venda?.valor)}
          </div>
          {venda?.meta && (
            <p className="text-xs text-slate-400 mt-0.5">
              Meta: <span className="text-slate-300 font-medium">{formatCurrency(venda.meta)}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          {venda?.desvioPercentual !== null ? (
            <span
              className={`badge-status text-[11px] ${
                venda.desvioPercentual >= 0 ? 'badge-green' : 'badge-red'
              }`}
            >
              {venda.desvioPercentual >= 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {formatPercent(venda.desvioPercentual)}
            </span>
          ) : (
            <span className="text-xs text-slate-500">Sem meta informada</span>
          )}
          <span className="text-[11px] text-cyan-400/80 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Info className="w-3 h-3" /> Detalhes
          </span>
        </div>
      </div>

      {/* CARD 2 — PROJEÇÃO DE FECHAMENTO */}
      <div
        onClick={() => projecao && onSelectIndicator(projecao)}
        className="glass-card-interactive p-5 group border-slate-800 hover:border-indigo-500/40"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Projeção
            </span>
            <span className="bg-indigo-500/20 text-indigo-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-indigo-500/30">
              PROJEÇÃO
            </span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="mb-2">
          <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
            {formatCurrency(projecao?.valor)}
          </div>
          {projecao?.meta && (
            <p className="text-xs text-slate-400 mt-0.5">
              Alvo: <span className="text-slate-300 font-medium">{formatCurrency(projecao.meta)}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <span
            className={`text-xs font-medium ${
              (projecao?.desvioPercentual || 0) >= 0 ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {(projecao?.desvioPercentual || 0) >= 0
              ? 'Projetando fechar acima'
              : 'Projetando fechar abaixo'}
          </span>
          <span className="text-[11px] text-indigo-400/80 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Info className="w-3 h-3" /> Origem
          </span>
        </div>
      </div>

      {/* CARD 3 — RENTABILIDADE */}
      <div
        onClick={() => rentabilidade && onSelectIndicator(rentabilidade)}
        className="glass-card-interactive p-5 group border-slate-800 hover:border-emerald-500/40"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Rentabilidade
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Percent className="w-4 h-4" />
          </div>
        </div>

        <div className="mb-2">
          <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
            {formatPercent(rentabilidade?.valor, { showSign: false })}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Margem Repositório Total
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <span className="badge-status badge-green text-[11px]">
            ● Margem Saudável
          </span>
          <span className="text-[11px] text-emerald-400/80 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Info className="w-3 h-3" /> Ver dados
          </span>
        </div>
      </div>

      {/* CARD 4 — TICKET MÉDIO */}
      <div
        onClick={() => ticketMedio && onSelectIndicator(ticketMedio)}
        className="glass-card-interactive p-5 group border-slate-800 hover:border-blue-500/40"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Ticket Médio
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Receipt className="w-4 h-4" />
          </div>
        </div>

        <div className="mb-2">
          <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
            {formatCurrency(ticketMedio?.valor)}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Média por cliente atendido
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-400">
            {indicatorsMap['quantidade_cupons']?.valor
              ? `${indicatorsMap['quantidade_cupons'].valor} cupons emitidos`
              : 'Indicador de Balcão'}
          </span>
          <span className="text-[11px] text-blue-400/80 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Info className="w-3 h-3" /> Origem
          </span>
        </div>
      </div>
    </div>
  );
};
