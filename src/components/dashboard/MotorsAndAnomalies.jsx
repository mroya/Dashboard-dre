import React from 'react';
import { Zap, AlertTriangle, CheckCircle2, ShieldCheck, Target, Layers, ArrowUpRight, Search } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/format';

export const MotorsAndAnomalies = ({ data }) => {
  const { motoresMelhora = [], anomalias = [], rankingIndicadores = [], prioridadesGestor = [] } = data;

  return (
    <div className="space-y-6">
      {/* =========================================================================
          SEÇÃO 6 — DE ONDE VEIO ESSA MELHORA? (OS 3 GRANDES MOTORES)
          ========================================================================= */}
      <div className="glass-panel p-6 border-slate-800">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-xl">🔎</span>
          <h2 className="text-lg font-bold text-white font-heading">
            6. De Onde Veio Essa Melhora? (Os 3 Grandes Motores)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {motoresMelhora.map((motor, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-base flex items-center justify-center mb-3">
                {motor.num || `0${idx + 1}`}
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">{motor.titulo}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{motor.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          SEÇÃO 7 — ONDE FICAR ATENTO (ANOMALIAS DE CUSTO / DESPESAS)
          ========================================================================= */}
      <div className="glass-panel p-6 border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🟡</span>
            <h2 className="text-lg font-bold text-white font-heading">
              7. Onde Eu Ficaria Atento (Pontos de Atenção)
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Apesar do DRE estar muito bom, existem alertas importantes nas despesas próprias.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {anomalias.map((anom, idx) => {
            const isRed = anom.cor === 'red' || anom.status === 'critico';
            const isYellow = anom.cor === 'yellow' || anom.status === 'positivo_com_alerta';

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  isRed
                    ? 'bg-red-500/5 border-red-500/30'
                    : isYellow
                    ? 'bg-yellow-500/5 border-yellow-500/30'
                    : 'bg-orange-500/5 border-orange-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{anom.icone || '⚠️'}</span>
                    <span className="font-bold text-white text-sm">{anom.categoria}</span>
                  </div>
                  <span
                    className={`badge-status text-[11px] ${
                      isRed ? 'badge-red' : isYellow ? 'badge-yellow' : 'badge-orange'
                    }`}
                  >
                    {isRed ? '🔴 Investigar Urgente' : isYellow ? '🟡 Atenção Pontual' : '🟠 Monitorar'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono my-2 py-2 border-y border-slate-800/80">
                  <div>
                    <span className="text-slate-400 block font-sans text-[11px]">Mês de Julho</span>
                    <span className="text-slate-200 font-bold">{formatCurrency(anom.mesRealizado)}</span>
                    <span className="text-[11px] text-slate-500 block">Orçado: {formatCurrency(anom.mesOrcado)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-sans text-[11px]">Acumulado 2026</span>
                    <span className="text-slate-200 font-bold">{formatCurrency(anom.acumuladoRealizado)}</span>
                    <span className="text-[11px] text-slate-500 block">Orçado: {formatCurrency(anom.acumuladoOrcado)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2">{anom.observacao}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SEÇÃO 8 — RANKING DOS INDICADORES (SEMAFORIZAÇÃO)
          ========================================================================= */}
      <div className="glass-panel p-6 border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📋</span>
            <h2 className="text-lg font-bold text-white font-heading">
              Ranking dos Indicadores da Filial
            </h2>
          </div>
          <span className="text-xs text-slate-400">Visão Geral Consolidada</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Status</th>
                <th className="p-3">Indicador</th>
                <th className="p-3">Avaliação</th>
                <th className="p-3 text-right">Resultado / Detalhe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {rankingIndicadores.map((item, idx) => {
                const statusStr = String(item.status || item.avaliacao || '').toLowerCase();
                const isGreen = statusStr.includes('green') || statusStr.includes('positiv') || statusStr.includes('muito') || statusStr.includes('excel') || statusStr.includes('bom');
                const isRed = statusStr.includes('red') || statusStr.includes('negativ') || statusStr.includes('crit');
                const isYellow = !isGreen && !isRed;

                return (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3">{item.icone || (isGreen ? '🟢' : isRed ? '🔴' : '🟡')}</td>
                    <td className="p-3 font-semibold text-white">{item.indicador}</td>
                    <td className="p-3">
                      <span
                        className={`badge-status text-[11px] ${
                          isGreen ? 'badge-green' : isRed ? 'badge-red' : 'badge-yellow'
                        }`}
                      >
                        {item.avaliacao}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-slate-300 font-medium">{item.detalhe}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          SEÇÃO 9 — 🎯 PRIORIDADES TÁTICAS DO GESTOR
          ========================================================================= */}
      <div className="glass-panel p-6 border-cyan-500/30 bg-gradient-to-br from-slate-900/90 to-slate-950/90 shadow-xl">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-2xl">🎯</span>
          <h2 className="text-lg font-bold text-white font-heading">
            Prioridades e Focos Táticos do Gestor para o Próximo Mês
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-5">
          Eu trabalharia com 4 focos principais, nesta ordem de impacto e execução:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prioridadesGestor.map((prio, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center mb-3">
                  {prio.num || idx + 1}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{prio.titulo}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{prio.foco}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-cyan-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ação Recomendada</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
