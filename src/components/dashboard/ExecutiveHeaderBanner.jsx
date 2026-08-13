import React, { useState } from 'react';
import { Sparkles, MessageSquare, Copy, Check, FileUp, TrendingUp, AlertCircle, Quote, Mail } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/format';
import { EmailShareModal } from '../share/EmailShareModal';

export const ExecutiveHeaderBanner = ({ data, onOpenUpload }) => {
  const [copied, setCopied] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleCopyWhatsApp = () => {
    const texto = `📊 *Leitura Executiva — Filial ${data.filial || '778'} (${data.periodo || 'Julho/2026'})*

${data.avaliacaoGeral?.diagnostico || ''}

*Frase para Reunião:*
"${data.fraseReuniao || ''}"

⭐ *O Principal Placar:*
${data.avaliacaoGeral?.placarOuro?.valor || ''} — ${data.avaliacaoGeral?.placarOuro?.subtitulo || ''}

🟢 *1. Venda:* R$ ${Number(data.venda?.mesRealizado || 0).toLocaleString('pt-BR')} (Meta: R$ ${Number(data.venda?.mesOrcado || 0).toLocaleString('pt-BR')} | ${data.venda?.desvioMesPerc >= 0 ? '+' : ''}${data.venda?.desvioMesPerc}%)
🟢 *2. CMV:* ${data.cmv?.cmvMesAtual}% (Melhora de ${data.cmv?.melhoraPP} p.p. vs 2025)
🟢 *3. Margem Bruta:* R$ ${Number(data.margemBruta?.valorMes || 0).toLocaleString('pt-BR')} (${data.margemBruta?.percMes}%)
🟢 *4. Despesas Próprias:* Economia acumulada de R$ ${Number(data.despesasProprias?.economiaAcumulada || 0).toLocaleString('pt-BR')}
🚀 *5. Margem de Contribuição:* +R$ ${Number(data.margemContribuicao?.ganhoNominalAcumulado || 0).toLocaleString('pt-BR')} no ano (+${data.margemContribuicao?.ganhoPercAcumulado}%)

🟡 *Pontos de Atenção:*
⚡ Energia: +${data.anomalias?.[0]?.desvioAcumuladoPerc}% no acumulado
🚚 Delivery: +${data.anomalias?.[1]?.desvioAcumuladoPerc}% no acumulado
📦 Materiais: +R$ ${Number(data.anomalias?.[2]?.desvioAcumulado || 0).toLocaleString('pt-BR')}

🎯 *Prioridades:*
1. Vendas: Proteger o acumulado
2. Margem: CMV < 70%
3. Custos: Manter economia de despesas
4. Auditoria: Energia e materiais`;

    navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="glass-panel p-6 border-slate-700/80 relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90">
      {/* Background glow decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Topo: Título da Filial e Ações */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-tight">
                  Leitura Executiva — Filial {data.filial || '778'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  {data.periodo || 'Julho/2026'} • Resultado Mensal e Acumulado Jan-{data.periodo?.split('/')[0] || 'Jul'}
                </p>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-2.5 w-full md:w-auto">
            <button
              onClick={handleCopyWhatsApp}
              className="btn-secondary text-xs py-2 px-3 flex items-center justify-center gap-1.5 hover:border-emerald-500/50 text-emerald-300 bg-emerald-950/30"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate">Copiado WhatsApp!</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="btn-secondary text-xs py-2 px-3 flex items-center justify-center gap-1.5 hover:border-cyan-500/50 text-cyan-300 bg-cyan-950/30"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate">E-mail</span>
            </button>

            <button
              onClick={onOpenUpload}
              className="btn-primary text-xs py-2 px-3.5 col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5"
            >
              <FileUp className="w-4 h-4" />
              <span>Analisar Novo PDF</span>
            </button>
          </div>
        </div>

        {/* Avaliação e Diagnóstico Central */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-center">
          {/* Coluna Esquerda: Diagnóstico Macro */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="badge-status badge-green text-xs">
                🟢 {data.avaliacaoGeral?.statusTexto || 'DRE Muito Positivo'}
              </span>
              <span className="text-xs text-slate-400">Avaliação do Consultor Financeiro</span>
            </div>

            <p className="text-base sm:text-lg font-semibold text-slate-100 leading-snug">
              {data.avaliacaoGeral?.diagnostico ||
                'A filial está entregando mais margem e contribuição do que o orçamento, principalmente por melhora do CMV + forte controle das despesas próprias.'}
            </p>

            {/* Frase para Reunião com Liderança */}
            {data.fraseReuniao && (
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <Quote className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                    Frase para Reunião de Alinhamento
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 italic mt-0.5">
                    "{data.fraseReuniao}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Coluna Direita: ⭐ O Placar da DRE (Número de Ouro) */}
          <div className="lg:col-span-5">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-cyan-950/40 border border-emerald-500/40 shadow-xl shadow-emerald-950/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {data.avaliacaoGeral?.placarOuro?.titulo || '⭐ O Principal Número da DRE'}
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  PLACAR REAL
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-emerald-400 my-1">
                {typeof data.avaliacaoGeral?.placarOuro?.valor === 'number' || (!isNaN(data.avaliacaoGeral?.placarOuro?.valor) && !String(data.avaliacaoGeral?.placarOuro?.valor).includes('R$'))
                  ? formatCurrency(Number(data.avaliacaoGeral?.placarOuro?.valor))
                  : (data.avaliacaoGeral?.placarOuro?.valor || '+R$ 237.097')}
              </div>

              <p className="text-xs font-medium text-slate-200">
                {data.avaliacaoGeral?.placarOuro?.subtitulo ||
                  'Margem de Contribuição Acumulada acima do Orçamento (+43,26%)'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {data.avaliacaoGeral?.placarOuro?.destaque || 'O número mais importante para apresentar à diretoria.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lúdico e Elegante de Envio por E-mail */}
      <EmailShareModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        data={data}
      />
    </div>
  );
};
