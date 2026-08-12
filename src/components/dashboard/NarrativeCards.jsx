import React from 'react';
import { TrendingUp, Percent, DollarSign, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/format';

export const NarrativeCards = ({ data }) => {
  const { venda, cmv, margemBruta, despesasProprias, margemContribuicao } = data;

  return (
    <div className="space-y-6">
      {/* =========================================================================
          SEÇÃO 1 — VENDA: ACIMA DO ORÇAMENTO
          ========================================================================= */}
      <div className="glass-panel p-6 border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🟢</span>
            <h2 className="text-lg font-bold text-white font-heading">
              1. Venda: Acima do Orçamento
            </h2>
          </div>
          <span className="badge-status badge-green text-xs self-start sm:self-auto">
            <ArrowUpRight className="w-3.5 h-3.5" /> +1,79% no mês | +10,70% vs 2025
          </span>
        </div>

        {/* Tabela de Vendas */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 mb-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Indicador</th>
                <th className="p-3">Realizado (Jul/26)</th>
                <th className="p-3">Orçado</th>
                <th className="p-3 text-right">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 font-mono">
              <tr>
                <td className="p-3 font-sans font-medium text-white">Venda Efetiva do Mês</td>
                <td className="p-3 text-slate-200 font-bold">{formatCurrency(venda?.mesRealizado)}</td>
                <td className="p-3 text-slate-400">{formatCurrency(venda?.mesOrcado)}</td>
                <td className="p-3 text-right text-emerald-400 font-bold">
                  +{formatCurrency(venda?.desvioMesNominal)} (+{venda?.desvioMesPerc}%)
                </td>
              </tr>
              {venda?.anoAnterior && (
                <tr className="bg-slate-900/20">
                  <td className="p-3 font-sans font-medium text-slate-400">vs. Julho/2025 (Ano Anterior)</td>
                  <td className="p-3 text-slate-300">{formatCurrency(venda?.anoAnterior)}</td>
                  <td className="p-3 text-slate-500">—</td>
                  <td className="p-3 text-right text-emerald-400 font-bold">
                    +{venda?.crescimentoAnoAnterior}% de crescimento
                  </td>
                </tr>
              )}
              <tr>
                <td className="p-3 font-sans font-medium text-white">Acumulado 2026 (Jan-Jul)</td>
                <td className="p-3 text-slate-200 font-bold">{formatCurrency(venda?.acumuladoRealizado)}</td>
                <td className="p-3 text-slate-400">{formatCurrency(venda?.acumuladoOrcado)}</td>
                <td className="p-3 text-right text-emerald-400 font-bold">
                  +{formatCurrency(venda?.desvioAcumuladoNominal)} (+{venda?.desvioAcumuladoPerc}%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tradução e Ponto de Atenção */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300">
            <span className="font-semibold text-cyan-400 block mb-1">📖 Leitura para o Gestor:</span>
            {venda?.comentario ||
              'Julho foi um mês forte, crescendo 10,70% contra julho/2025 e superando a meta em 1,79%. No acumulado, a venda está em cima do orçamento (+0,16%).'}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200">
            <span className="font-semibold text-amber-400 block mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Ponto de Atenção:
            </span>
            {venda?.pontoAtencao ||
              'O acumulado está apenas 0,16% acima do orçamento. Portanto, não podemos relaxar na venda.'}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SEÇÃO 2 — O GRANDE DESTAQUE: CMV & LUCRO BRUTO
          ========================================================================= */}
      <div className="glass-panel p-6 border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🟢</span>
            <h2 className="text-lg font-bold text-white font-heading">
              2. O Grande Destaque: CMV
            </h2>
          </div>
          <span className="badge-status badge-green text-xs self-start sm:self-auto">
            Melhora de {cmv?.melhoraPP} p.p. no mês
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mb-4">
          Esse é um dos principais motivos da excelente DRE. A filial conseguiu reduzir o custo de mercadoria e acelerar o Lucro Bruto.
        </p>

        {/* Comparativos de CMV e Lucro Bruto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Card CMV Mês */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-semibold">CMV no Mês</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-white font-mono">
                {cmv?.cmvMesAtual < 100
                  ? `${cmv?.cmvMesAtual}%`
                  : `${((cmv?.cmvMesAtual / (venda?.mesRealizado || 1)) * 100).toFixed(2)}%`}
              </span>
              {cmv?.cmvMesAnteriorAno && (
                <span className="text-xs text-slate-400">
                  ({cmv?.cmvMesAnteriorAno < 100 ? `${cmv?.cmvMesAnteriorAno}%` : formatCurrency(cmv?.cmvMesAnteriorAno)} em 2025)
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5" /> Queda de {cmv?.melhoraPP || 2.51} p.p. no custo
            </p>
          </div>

          {/* Card CMV Acumulado */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-semibold">CMV Acumulado (Jan-Jul)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-white font-mono">
                {cmv?.cmvAcumuladoAtual < 100
                  ? `${cmv?.cmvAcumuladoAtual}%`
                  : `${((cmv?.cmvAcumuladoAtual / (venda?.acumuladoRealizado || 1)) * 100).toFixed(2)}%`}
              </span>
              {cmv?.cmvAcumuladoAnoAnterior && (
                <span className="text-xs text-slate-400">
                  ({cmv?.cmvAcumuladoAnoAnterior < 100 ? `${cmv?.cmvAcumuladoAnoAnterior}%` : formatCurrency(cmv?.cmvAcumuladoAnoAnterior)} em 2025)
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5" /> Redução de {cmv?.melhoraPPAcumulado || 2.09} p.p. no ano
            </p>
          </div>

          {/* Card Salto no Lucro Bruto */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <span className="text-xs text-emerald-400 uppercase font-semibold">Lucro Bruto (Salto)</span>
            <div className="text-2xl font-bold text-white font-mono mt-1">
              {formatCurrency(cmv?.lucroBrutoMesAtual)}
            </div>
            <p className="text-xs text-emerald-300 font-semibold mt-2">
              +{cmv?.crescimentoLucroBrutoPerc}% vs 2025 ({formatCurrency(cmv?.lucroBrutoMesAnoAnterior)})
            </p>
          </div>
        </div>

        {/* Tradução para o Gestor */}
        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200">
          <span className="font-semibold text-cyan-400 block mb-1">💡 Tradução para o Gestor:</span>
          {cmv?.traducaoGestor ||
            'A filial não está apenas vendendo mais; está vendendo com uma estrutura de margem muito superior.'}
        </div>
      </div>

      {/* =========================================================================
          SEÇÃO 3 — MARGEM BRUTA: EXCELENTE
          ========================================================================= */}
      <div className="glass-panel p-6 border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🟢</span>
            <h2 className="text-lg font-bold text-white font-heading">
              3. Margem Bruta: Excelente
            </h2>
          </div>
          <span className="badge-status badge-green text-xs self-start sm:self-auto">
            +{margemBruta?.ganhoPPMes} p.p. de margem no mês
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mês */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Mês de Julho</span>
              <span className="badge-status badge-green text-[11px]">+{margemBruta?.crescimentoVs2025}% vs 2025</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              {formatCurrency(margemBruta?.valorMes)}{' '}
              <span className="text-base text-emerald-400 font-sans">({margemBruta?.percMes}%)</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Orçamento: {formatCurrency(margemBruta?.orcadoMes)} ({margemBruta?.percOrcadoMes}%)
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs font-semibold text-emerald-400">
              <span>Superávit: +{formatCurrency(margemBruta?.ganhoNominalMes)}</span>
              <span>+{margemBruta?.ganhoPPMes} p.p. acima do orçado</span>
            </div>
          </div>

          {/* Acumulado */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Acumulado 2026 (Jan-Jul)</span>
              <span className="badge-status badge-green text-[11px]">+{margemBruta?.ganhoPercSobreOrcado}% sobre orçado</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              {formatCurrency(margemBruta?.acumuladoValor)}{' '}
              <span className="text-base text-emerald-400 font-sans">({margemBruta?.acumuladoPerc}%)</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Orçamento: {formatCurrency(margemBruta?.acumuladoOrcadoValor)} ({margemBruta?.acumuladoOrcadoPerc}%)
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs font-semibold text-emerald-400">
              <span>Ganho: +{formatCurrency(margemBruta?.ganhoNominalAcumulado)}</span>
              <span>+{margemBruta?.ganhoPPAcumulado} p.p. de margem</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SEÇÃO 4 — DESPESAS PRÓPRIAS: OUTRO GRANDE ACERTO
          ========================================================================= */}
      <div className="glass-panel p-6 border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🟢</span>
            <h2 className="text-lg font-bold text-white font-heading">
              4. Despesas Próprias: Outro Grande Acerto
            </h2>
          </div>
          <span className="badge-status badge-green text-xs self-start sm:self-auto">
            Economia de R$ {Number(despesasProprias?.economiaAcumulada || 0).toLocaleString('pt-BR')} no ano
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mb-4">
          {despesasProprias?.comentario ||
            'Aqui está provavelmente o maior ganho gerencial da DRE. A filial transformou uma parte expressiva da margem bruta diretamente em margem de contribuição.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mês */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Despesas do Mês</span>
            <div className="text-2xl font-bold text-white font-mono mt-1">
              {formatCurrency(despesasProprias?.valorMes)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Orçamento: {formatCurrency(despesasProprias?.orcadoMes)}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-emerald-400 font-bold">
                Economia: {formatCurrency(despesasProprias?.economiaMes)}
              </span>
              <span className="text-slate-300">
                {despesasProprias?.percVendaAnterior}% → {despesasProprias?.percVendaAtual}% da venda
              </span>
            </div>
          </div>

          {/* Acumulado */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold uppercase">Despesas Acumuladas 2026</span>
            <div className="text-2xl font-bold text-white font-mono mt-1">
              {formatCurrency(despesasProprias?.acumuladoValor)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Orçamento: {formatCurrency(despesasProprias?.acumuladoOrcado)}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-emerald-400 font-bold">
                Economia Acumulada: {formatCurrency(despesasProprias?.economiaAcumulada)}
              </span>
              <span className="text-emerald-400 font-bold">
                -{despesasProprias?.economiaPercAcumulada}% abaixo do orçado
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SEÇÃO 5 — MARGEM DE CONTRIBUIÇÃO: O GRANDE DESTAQUE
          ========================================================================= */}
      <div className="glass-panel p-6 border-emerald-500/40 bg-gradient-to-br from-slate-900/90 via-emerald-950/20 to-slate-950/90 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🚀</span>
            <h2 className="text-xl font-extrabold text-white font-heading tracking-tight text-emerald-400">
              5. Margem de Contribuição: O GRANDE DESTAQUE
            </h2>
          </div>
          <span className="badge-status badge-green text-xs self-start sm:self-auto font-bold">
            +53,64% no mês | +43,26% no ano
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-5">
          Aqui está o número que eu mais destacaria para apresentar à liderança. A filial gerou R$ 237 mil de resultado líquido de contribuição a mais do que o previsto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mês */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-emerald-500/30">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
              Margem de Contribuição — Julho/2026
            </span>
            <div className="text-3xl font-extrabold text-white font-mono mt-1 text-emerald-400">
              {formatCurrency(margemContribuicao?.valorMes)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Orçamento: {formatCurrency(margemContribuicao?.orcadoMes)} ({margemContribuicao?.percVendaOrcadoMes}%)
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1 text-xs">
              <p className="text-emerald-300 font-bold">
                🚀 +{formatCurrency(margemContribuicao?.ganhoNominalMes)} (+{margemContribuicao?.ganhoPercMes}% acima do orçado)
              </p>
              <p className="text-slate-300">
                Percentual: {margemContribuicao?.percVendaMes}% da venda (+{margemContribuicao?.ganhoPPMes} p.p.)
              </p>
            </div>
          </div>

          {/* Acumulado */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-emerald-500/30">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
              Margem de Contribuição — Acumulado 2026
            </span>
            <div className="text-3xl font-extrabold text-white font-mono mt-1 text-emerald-400">
              {formatCurrency(margemContribuicao?.acumuladoValor)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Orçamento: {formatCurrency(margemContribuicao?.acumuladoOrcado)} ({margemContribuicao?.percVendaOrcadoAcumulado}%)
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1 text-xs">
              <p className="text-emerald-300 font-bold">
                🟢 +{formatCurrency(margemContribuicao?.ganhoNominalAcumulado)} (+{margemContribuicao?.ganhoPercAcumulado}% acima do orçado)
              </p>
              <p className="text-slate-300">
                Margem Acumulada: {margemContribuicao?.percVendaAcumulado}% da venda
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
