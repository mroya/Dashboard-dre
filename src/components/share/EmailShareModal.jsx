import React, { useState } from 'react';
import {
  Mail,
  X,
  Send,
  Copy,
  Check,
  Sparkles,
  UserCheck,
  ChevronRight,
  Eye,
  FileText,
  ExternalLink,
  MessageSquare,
  Building2,
  Users,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatCurrency, formatPercent } from '../../utils/format';

export const EmailShareModal = ({ isOpen, onClose, data }) => {
  const [recipient, setRecipient] = useState('');
  const [emailTone, setEmailTone] = useState('executivo'); // 'executivo', 'tatico', 'completo'
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [customNote, setCustomNote] = useState('');

  if (!isOpen || !data) return null;

  const filial = data.filial || '778';
  const periodo = data.periodo || 'Julho/2026';
  const placarValor = data.avaliacaoGeral?.placarOuro?.valor
    ? (typeof data.avaliacaoGeral.placarOuro.valor === 'number' || (!isNaN(data.avaliacaoGeral.placarOuro.valor) && !String(data.avaliacaoGeral.placarOuro.valor).includes('R$')))
      ? formatCurrency(Number(data.avaliacaoGeral.placarOuro.valor))
      : data.avaliacaoGeral.placarOuro.valor
    : '+R$ 237.098';

  const defaultSubject = `[DRE Executiva] Filial ${filial} (${periodo}) — ${data.avaliacaoGeral?.statusTexto || 'Resultado Excepcional'}`;

  const presetAudiences = [
    { label: 'Diretoria / CFO', email: 'diretoria@farmacias.com.br', icon: Briefcase },
    { label: 'Gestor da Filial', email: `filial${filial}@farmacias.com.br`, icon: Building2 },
    { label: 'Regional de Vendas', email: 'regional.sul@farmacias.com.br', icon: Users },
  ];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#34d399', '#818cf8', '#fbbf24']
      });
    } catch {}
  };

  // Gerador de Texto Plano para mailto e fallback
  const generatePlainText = () => {
    let text = `========================================================\n`;
    text += `LEITURA EXECUTIVA DRE — FILIAL ${filial} (${periodo})\n`;
    text += `========================================================\n\n`;

    if (customNote.trim()) {
      text += `📝 NOTA DO REMETENTE:\n"${customNote.trim()}"\n\n`;
    }

    text += `⭐ PLACAR DE OURO DA DRE:\n`;
    text += `${placarValor} — ${data.avaliacaoGeral?.placarOuro?.subtitulo || 'Margem de Contribuição Acumulada acima do Orçado'}\n\n`;

    text += `🎯 DIAGNÓSTICO DO CONSULTOR:\n`;
    text += `${data.avaliacaoGeral?.diagnostico || 'Desempenho financeiro robusto com forte controle de custos.'}\n\n`;

    if (data.fraseReuniao) {
      text += `💬 FRASE PARA REUNIÃO DE DIRETORIA:\n"${data.fraseReuniao}"\n\n`;
    }

    text += `--------------------------------------------------------\n`;
    text += `📊 INDICADORES CHAVE (REALIZADO vs ORÇADO):\n`;
    text += `--------------------------------------------------------\n`;
    text += `🟢 1. Venda Efetiva: R$ ${Number(data.venda?.mesRealizado || 0).toLocaleString('pt-BR')} (Meta: R$ ${Number(data.venda?.mesOrcado || 0).toLocaleString('pt-BR')} | ${data.venda?.desvioMesPerc >= 0 ? '+' : ''}${data.venda?.desvioMesPerc}%)\n`;
    text += `🟢 2. CMV: ${data.cmv?.cmvMesAtual}% (Melhora de ${data.cmv?.melhoraPP || '2.51'} p.p. vs 2025)\n`;
    text += `🟢 3. Margem Bruta: R$ ${Number(data.margemBruta?.valorMes || 0).toLocaleString('pt-BR')} (${data.margemBruta?.percMes}%)\n`;
    text += `🟢 4. Despesas Próprias: Economia de R$ ${Number(data.despesasProprias?.economiaAcumulada || 0).toLocaleString('pt-BR')} no ano\n`;
    text += `🚀 5. Margem Contribuição: +R$ ${Number(data.margemContribuicao?.ganhoNominalAcumulado || 0).toLocaleString('pt-BR')} (+${data.margemContribuicao?.ganhoPercAcumulado}%)\n\n`;

    if (emailTone === 'tatico' || emailTone === 'completo') {
      text += `--------------------------------------------------------\n`;
      text += `🎯 PRIORIDADES TÁTICAS DO GESTOR:\n`;
      text += `--------------------------------------------------------\n`;
      (data.prioridadesGestor || []).forEach((p, idx) => {
        text += `${idx + 1}. ${p.titulo}: ${p.foco}\n`;
      });
      text += `\n`;
    }

    if (emailTone === 'completo' && data.anomalias?.length) {
      text += `--------------------------------------------------------\n`;
      text += `⚠️ PONTOS DE ATENÇÃO & ANOMALIAS:\n`;
      text += `--------------------------------------------------------\n`;
      data.anomalias.forEach((a) => {
        text += `• ${a.categoria}: Realizado R$ ${Number(a.mesRealizado || 0).toLocaleString('pt-BR')} vs Orçado R$ ${Number(a.mesOrcado || 0).toLocaleString('pt-BR')} (${a.observacao})\n`;
      });
      text += `\n`;
    }

    text += `\nGerado automaticamente via Sistema DRE Inteligente.\n`;
    return text;
  };

  // Gerador de HTML Rico para colar com estilo no Gmail/Outlook
  const generateRichHtml = () => {
    return `
      <div style="font-family: Arial, -apple-system, sans-serif; max-width: 620px; color: #1e293b; line-height: 1.5; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Cabeçalho -->
        <div style="background: linear-gradient(135deg, #0284c7 0%, #1e3a8a 100%); color: #ffffff; padding: 24px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #7dd3fc; font-weight: bold; margin-bottom: 4px;">
            DRE Inteligente • Relatório Executivo
          </div>
          <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; color: #ffffff;">
            Filial ${filial} — ${periodo}
          </h1>
          <div style="font-size: 13px; color: #e0f2fe;">
            Status Geral: <strong style="color: #4ade80;">🟢 ${data.avaliacaoGeral?.statusTexto || 'DRE Muito Positivo'}</strong>
          </div>
        </div>

        <div style="padding: 24px;">
          ${customNote.trim() ? `
            <div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px; font-size: 13px; color: #334155; font-style: italic;">
              "${customNote.trim()}"
            </div>
          ` : ''}

          <!-- Placar de Ouro -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 1px solid #86efac; border-radius: 10px; padding: 18px; margin-bottom: 20px; text-align: center;">
            <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #15803d; letter-spacing: 0.5px;">
              ${data.avaliacaoGeral?.placarOuro?.titulo || '⭐ O Principal Número para Comemorar'}
            </div>
            <div style="font-size: 32px; font-weight: 900; color: #166534; font-family: monospace; margin: 6px 0;">
              ${placarValor}
            </div>
            <div style="font-size: 13px; font-weight: 600; color: #14532d;">
              ${data.avaliacaoGeral?.placarOuro?.subtitulo || 'Margem de Contribuição Acumulada acima do Orçamento'}
            </div>
          </div>

          <!-- Diagnóstico -->
          <div style="margin-bottom: 20px; font-size: 14px; color: #334155; line-height: 1.6;">
            <strong>Diagnóstico Macro:</strong> ${data.avaliacaoGeral?.diagnostico || ''}
          </div>

          ${data.fraseReuniao ? `
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; color: #1e40af;">
              <strong>💬 Frase para Alinhamento:</strong> "${data.fraseReuniao}"
            </div>
          ` : ''}

          <!-- Tabela de Indicadores -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
            <thead>
              <tr style="background: #f1f5f9; text-align: left; color: #475569; font-size: 11px; text-transform: uppercase;">
                <th style="padding: 10px; border-bottom: 2px solid #cbd5e1;">Indicador</th>
                <th style="padding: 10px; border-bottom: 2px solid #cbd5e1;">Realizado</th>
                <th style="padding: 10px; border-bottom: 2px solid #cbd5e1;">Orçado</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #cbd5e1;">Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">🟢 1. Venda Efetiva</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-family: monospace;">R$ ${Number(data.venda?.mesRealizado || 0).toLocaleString('pt-BR')}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-family: monospace;">R$ ${Number(data.venda?.mesOrcado || 0).toLocaleString('pt-BR')}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">+${data.venda?.desvioMesPerc}%</td>
              </tr>
              <tr style="background: #fafafa;">
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">🟢 2. CMV</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-family: monospace;">${data.cmv?.cmvMesAtual}%</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-family: monospace;">—</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">-${data.cmv?.melhoraPP || '2.51'} p.p.</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">🟢 3. Margem Bruta</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-family: monospace;">R$ ${Number(data.margemBruta?.valorMes || 0).toLocaleString('pt-BR')}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-family: monospace;">R$ ${Number(data.margemBruta?.orcadoMes || 0).toLocaleString('pt-BR')}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">+${data.margemBruta?.ganhoPPMes || 3} p.p.</td>
              </tr>
              <tr style="background: #fafafa;">
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">🟢 4. Despesas Próprias</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-family: monospace;">R$ ${Number(data.despesasProprias?.valorMes || 0).toLocaleString('pt-BR')}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-family: monospace;">R$ ${Number(data.despesasProprias?.orcadoMes || 0).toLocaleString('pt-BR')}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">-R$ ${Number(data.despesasProprias?.economiaMes || 0).toLocaleString('pt-BR')}</td>
              </tr>
              <tr style="background: #f0fdf4;">
                <td style="padding: 10px; border-bottom: 2px solid #86efac; font-weight: 800; color: #166534;">🚀 5. Margem Contribuição</td>
                <td style="padding: 10px; border-bottom: 2px solid #86efac; font-family: monospace; font-weight: 800; color: #166534;">R$ ${Number(data.margemContribuicao?.valorMes || 0).toLocaleString('pt-BR')}</td>
                <td style="padding: 10px; border-bottom: 2px solid #86efac; color: #64748b; font-family: monospace;">R$ ${Number(data.margemContribuicao?.orcadoMes || 0).toLocaleString('pt-BR')}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 2px solid #86efac; color: #15803d; font-weight: 800;">+${data.margemContribuicao?.ganhoPercMes}%</td>
              </tr>
            </tbody>
          </table>

          <!-- Prioridades -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <div style="font-size: 13px; font-weight: bold; color: #0f172a; margin-bottom: 8px;">
              🎯 Prioridades Imediatas do Gestor:
            </div>
            <ol style="margin: 0; padding-left: 20px; font-size: 12px; color: #334155;">
              ${(data.prioridadesGestor || []).map(p => `<li style="margin-bottom: 4px;"><strong>${p.titulo}:</strong> ${p.foco}</li>`).join('')}
            </ol>
          </div>

          <div style="text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 14px;">
            Relatório gerado automaticamente pelo Sistema DRE Inteligente
          </div>
        </div>
      </div>
    `;
  };

  // Ação 1: Abrir no Cliente de E-mail padrão (mailto)
  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(defaultSubject);
    const body = encodeURIComponent(generatePlainText());
    const targetEmail = recipient.trim() || '';
    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
    triggerConfetti();
  };

  // Ação 2: Copiar com Formatação Rica (HTML + PlainText)
  const handleCopyRichEmail = async () => {
    try {
      const htmlText = generateRichHtml();
      const plainText = generatePlainText();

      const blobHtml = new Blob([htmlText], { type: 'text/html' });
      const blobText = new Blob([plainText], { type: 'text/plain' });

      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({
          'text/html': blobHtml,
          'text/plain': blobText,
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(plainText);
      }

      setCopied(true);
      triggerConfetti();
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.warn('Fallback copiar texto simples:', err);
      navigator.clipboard.writeText(generatePlainText());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Ação 3: Simulação de envio com feedback interativo e confetes
  const handleSimulatedSend = () => {
    if (!recipient.trim()) {
      setRecipient('diretoria@farmacias.com.br');
    }
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      triggerConfetti();

      setTimeout(() => {
        setSentSuccess(false);
        onClose();
      }, 2500);
    }, 1200);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel-elevated w-full max-w-2xl p-6 sm:p-7 animate-fade-in relative border border-slate-700/80 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Topo Modal */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-heading">
              Enviar Leitura Executiva por E-mail
            </h2>
            <p className="text-xs text-slate-400">
              Compartilhe o diagnóstico da Filial {filial} de forma elegante e profissional.
            </p>
          </div>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="overflow-y-auto pr-1 py-4 space-y-4 flex-1">
          {/* Sucesso no Envio */}
          {sentSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 animate-fade-in">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-emerald-200">🎉 E-mail disparado com sucesso!</p>
                <p className="text-xs text-emerald-300/80">
                  A leitura executiva foi enviada para <strong>{recipient || 'diretoria@farmacias.com.br'}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Destinatário Rápido com Presets */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Destinatário Principal (E-mail):
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="email"
                placeholder="Ex: diretoria@farmacias.com.br, gerente@filial.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Presets de 1 clique */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-slate-400">Sugestões rápidas:</span>
              {presetAudiences.map((aud, idx) => {
                const IconComponent = aud.icon;
                const isSelected = recipient === aud.email;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRecipient(aud.email)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    <IconComponent className="w-3 h-3" />
                    <span>{aud.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formato / Tom do E-mail */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Formato & Tom da Mensagem:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setEmailTone('executivo')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  emailTone === 'executivo'
                    ? 'bg-cyan-500/10 border-cyan-500 text-white'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5 mb-0.5">
                  <span>💎</span>
                  <span>Executivo</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Placar de ouro + Frase + 5 Indicadores
                </p>
              </button>

              <button
                type="button"
                onClick={() => setEmailTone('tatico')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  emailTone === 'tatico'
                    ? 'bg-cyan-500/10 border-cyan-500 text-white'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5 mb-0.5">
                  <span>🎯</span>
                  <span>Tático</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Indicadores + 4 Prioridades do Gestor
                </p>
              </button>

              <button
                type="button"
                onClick={() => setEmailTone('completo')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  emailTone === 'completo'
                    ? 'bg-cyan-500/10 border-cyan-500 text-white'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5 mb-0.5">
                  <span>📊</span>
                  <span>Completo</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  DRE Total + Motores + Anomalias
                </p>
              </button>
            </div>
          </div>

          {/* Nota Personalizada (Opcional) */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Mensagem / Nota Adicional (Opcional):
            </label>
            <input
              type="text"
              placeholder="Ex: Segue a prévia do fechamento para nossa reunião das 14h."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Prévia Visual do E-mail */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Prévia do E-mail Formatado:
              </span>
              <span className="text-[11px] text-cyan-400">Layout Newsletter Executiva</span>
            </div>

            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 text-xs font-mono text-slate-300 space-y-2 max-h-44 overflow-y-auto">
              <div className="text-[11px] text-slate-400 font-sans border-b border-slate-800 pb-2">
                <span className="font-bold text-white">Assunto:</span> {defaultSubject}
              </div>

              {customNote.trim() && (
                <div className="p-2 rounded bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 font-sans text-xs italic">
                  "{customNote.trim()}"
                </div>
              )}

              <div className="text-emerald-400 font-bold">
                ⭐ {placarValor} — {data.avaliacaoGeral?.placarOuro?.subtitulo || 'Margem Acumulada acima do Orçado'}
              </div>

              <div className="text-slate-300 font-sans">
                {data.avaliacaoGeral?.diagnostico}
              </div>

              <div className="text-slate-400 pt-1 space-y-1">
                <div>🟢 Venda: R$ {Number(data.venda?.mesRealizado || 0).toLocaleString('pt-BR')} (+{data.venda?.desvioMesPerc}%)</div>
                <div>🟢 CMV: {data.cmv?.cmvMesAtual}% (Melhora de {data.cmv?.melhoraPP || '2.51'} p.p.)</div>
                <div>🟢 Despesas: Economia de R$ {Number(data.despesasProprias?.economiaAcumulada || 0).toLocaleString('pt-BR')}</div>
                <div>🚀 Margem Contribuição: +R$ {Number(data.margemContribuicao?.ganhoNominalAcumulado || 0).toLocaleString('pt-BR')} (+{data.margemContribuicao?.ganhoPercAcumulado}%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé / Botões de Ação */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary text-xs w-full sm:w-auto order-3 sm:order-1"
          >
            Cancelar
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
            {/* Opção 1: Copiar Formatado */}
            <button
              type="button"
              onClick={handleCopyRichEmail}
              className="btn-secondary text-xs py-2 px-3 flex-1 sm:flex-initial flex items-center justify-center gap-1.5 border-slate-700 hover:border-cyan-500/50 text-cyan-300"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copiado com Formatação!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar E-mail Formatado</span>
                </>
              )}
            </button>

            {/* Opção 2: Abrir no App de E-mail */}
            <button
              type="button"
              onClick={handleOpenMailClient}
              className="btn-primary text-xs py-2 px-3.5 flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 shadow-cyan-500/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir no E-mail</span>
            </button>

            {/* Opção 3: Disparo Imediato */}
            <button
              type="button"
              disabled={isSending}
              onClick={handleSimulatedSend}
              className="btn-primary text-xs py-2 px-3.5 flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-500/20"
            >
              {isSending ? (
                <span>Enviando...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Agora</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailShareModal;
