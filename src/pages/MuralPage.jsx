import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Share2, 
  Check, 
  Edit3, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  FileSpreadsheet, 
  Store, 
  Calendar, 
  ArrowRight,
  Info,
  Copy,
  Zap,
  Wrench,
  UtensilsCrossed,
  Save,
  RotateCcw
} from 'lucide-react';
import { getPhotoMuralSample, getMuralDataFromDRE } from '../data/sampleMuralData';
import { formatCurrency, formatPercent } from '../utils/format';

export const MuralPage = ({ activeReport }) => {
  const [dataSource, setDataSource] = useState('photo'); // 'photo' | 'active'
  const [muralData, setMuralData] = useState(() => getPhotoMuralSample());
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Estados editáveis
  const [customFrase, setCustomFrase] = useState('');
  const [customAtencao1, setCustomAtencao1] = useState('');
  const [customAtencao2, setCustomAtencao2] = useState('');
  const [customAtencao3, setCustomAtencao3] = useState('');

  // Atualizar dados quando a fonte mudar ou quando activeReport for carregado
  useEffect(() => {
    if (dataSource === 'photo') {
      const photoData = getPhotoMuralSample();
      setMuralData(photoData);
      setCustomFrase(photoData.fraseDestaque);
      setCustomAtencao1(photoData.pontosAtencao[0]?.texto || '');
      setCustomAtencao2(photoData.pontosAtencao[1]?.texto || '');
      setCustomAtencao3(photoData.pontosAtencao[2]?.texto || '');
    } else {
      const activeData = getMuralDataFromDRE(activeReport);
      setMuralData(activeData);
      setCustomFrase(activeData.fraseDestaque);
      setCustomAtencao1(activeData.pontosAtencao[0]?.texto || '');
      setCustomAtencao2(activeData.pontosAtencao[1]?.texto || '');
      setCustomAtencao3(activeData.pontosAtencao[2]?.texto || '');
    }
  }, [dataSource, activeReport]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyWhatsApp = () => {
    const text = `📊 *MURAL DRE — GESTÃO À VISTA*
🏢 *${muralData.empresa} • ${muralData.filial}*
📅 *Período:* ${muralData.periodo}

━━━━━━━━━━━━━━━━━━━━
💰 *RESUMO DOS PRINCIPAIS RESULTADOS:*

🛒 *1. Venda Efetiva (Venda EF)*
• Orçado: ${formatCurrency(muralData.kpis.vendaEf.orcado)}
• Vendeu: ${formatCurrency(muralData.kpis.vendaEf.realizado)}
• Desvio: *+${muralData.kpis.vendaEf.desvioPerc.toFixed(2)}%* (${muralData.kpis.vendaEf.statusLabel})

📈 *2. Margem Bruta (MB)*
• Orçado: ${formatCurrency(muralData.kpis.mb.orcado)}
• Realizado: ${formatCurrency(muralData.kpis.mb.realizado)}
• Desvio: *+${muralData.kpis.mb.desvioPerc.toFixed(2)}%*

🎯 *3. Margem de Contribuição (MC)*
• Orçado: ${formatCurrency(muralData.kpis.mc.orcado)}
• Realizado: ${formatCurrency(muralData.kpis.mc.realizado)}
• Desvio: *+${muralData.kpis.mc.desvioPerc.toFixed(2)}%* 🚀
• % MC Mês: *${muralData.kpis.mc.percSobreVendaMes || 11.40}%*
• % MC Acumulado 2026: *${muralData.kpis.mc.percSobreVendaAcumulado || 10.40}%*

━━━━━━━━━━━━━━━━━━━━
⭐ *RECONHECIMENTO DA EQUIPE:*
"${customFrase || muralData.fraseDestaque}"

━━━━━━━━━━━━━━━━━━━━
⚠️ *PONTOS DE ATENÇÃO / DESPESAS:*
• ${customAtencao1 || muralData.pontosAtencao[0]?.texto}
• ${customAtencao2 || muralData.pontosAtencao[1]?.texto}
• ${customAtencao3 || muralData.pontosAtencao[2]?.texto}

━━━━━━━━━━━━━━━━━━━━
📌 _Quadro de Gestão à Vista da Filial_`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleResetNotes = () => {
    if (dataSource === 'photo') {
      const photoData = getPhotoMuralSample();
      setCustomFrase(photoData.fraseDestaque);
      setCustomAtencao1(photoData.pontosAtencao[0]?.texto || '');
      setCustomAtencao2(photoData.pontosAtencao[1]?.texto || '');
      setCustomAtencao3(photoData.pontosAtencao[2]?.texto || '');
    } else {
      const activeData = getMuralDataFromDRE(activeReport);
      setCustomFrase(activeData.fraseDestaque);
      setCustomAtencao1(activeData.pontosAtencao[0]?.texto || '');
      setCustomAtencao2(activeData.pontosAtencao[1]?.texto || '');
      setCustomAtencao3(activeData.pontosAtencao[2]?.texto || '');
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 animate-fade-in space-y-6 print:p-0 print:m-0 print:max-w-none">
      {/* Barra de Controles e Alternância de Origem (Oculta na Impressão) */}
      <div className="print:hidden glass-panel p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-bold">
            📋
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white font-heading">
                Mural DRE de Loja
              </h2>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-wider">
                Gestão à Vista A4
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Modelo resumido com destaque de metas, margens e pontos de atenção para murais de filial.
            </p>
          </div>
        </div>

        {/* Alternador de Fonte de Dados e Ações */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setDataSource('photo')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dataSource === 'photo'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📸 Exemplo Real (Foto)
            </button>
            <button
              onClick={() => setDataSource('active')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dataSource === 'active'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📊 DRE Ativa no Sistema
            </button>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 ${
              isEditing ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : ''
            }`}
            title="Editar notas do gerente antes de imprimir"
          >
            {isEditing ? <Save className="w-3.5 h-3.5 text-amber-400" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Concluir Edição' : 'Editar Notas'}</span>
          </button>

          <button
            onClick={handleCopyWhatsApp}
            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 hover:text-emerald-400"
            title="Copiar texto formatado para o WhatsApp da equipe"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'WhatsApp'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5 shadow-amber-500/20 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500"
            title="Imprimir folha A4 pronta para afixar no mural da loja"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Mural A4</span>
          </button>
        </div>
      </div>

      {/* QUADRO MURAL FÍSICO (Simulação visual da moldura azul com a folha A4 dentro) */}
      <div className="mural-frame bg-[#0a235c] p-3 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-[#1e3a8a] text-slate-800 print:bg-white print:p-0 print:border-none print:shadow-none">
        
        {/* Topo do Quadro Mural Azul (Estilo Quadro de Parede com Logo DRE da foto) */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 px-2 text-white print:hidden">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ícone de Gráfico de Pizza idêntico ao do mural da foto */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-amber-400/80 flex items-center justify-center bg-blue-900/50 shadow-inner">
              <span className="text-amber-400 text-xs sm:text-sm font-black">◴ %</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black italic tracking-wider text-white drop-shadow-md">
              DRE
            </h1>
          </div>
          <div className="text-right">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-blue-200 font-semibold bg-blue-900/60 px-2.5 py-1 rounded-full border border-blue-400/30">
              Quadro de Gestão à Vista • {muralData.filial}
            </span>
          </div>
        </div>

        {/* FOLHA A4 INTERNA (Folha branca afixada no acrílico transparente) */}
        <div className="mural-sheet bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-xl border border-slate-200 text-slate-900 print:shadow-none print:border-none print:p-4 print:rounded-none">
          
          {/* Cabeçalho Oficial da Folha */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-300 pb-3 mb-4 gap-2">
            <div className="flex items-center gap-3">
              {/* Badge Grupo Panvel */}
              <div className="bg-slate-900 text-white font-extrabold px-3 py-1 text-xs sm:text-sm rounded tracking-wide font-heading">
                grupo panvel
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base tracking-tight">
                  Relatório DRE
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {muralData.filial} • {muralData.periodo} • Ref: {muralData.dataReferencia}
                </p>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-500 hidden sm:block">
              <span className="bg-slate-100 px-2 py-1 rounded font-mono text-[10px] text-slate-600 border border-slate-200">
                Documento de Gestão de Filial
              </span>
            </div>
          </div>

          {/* TABELA DRE OFICIAL RESUMIDA COM MARCADORES LARANJA */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-[10px] sm:text-xs border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                  <th className="p-2 border-r border-slate-300">Conta / Descrição</th>
                  <th className="p-2 text-right border-r border-slate-300">Orçado Mês</th>
                  <th className="p-2 text-right border-r border-slate-300">Realizado Mês</th>
                  <th className="p-2 text-right border-r border-slate-300">Desvio %</th>
                  <th className="p-2 text-right border-r border-slate-300 hidden md:table-cell">Orçado Acum.</th>
                  <th className="p-2 text-right border-r border-slate-300 hidden md:table-cell">Realizado Acum.</th>
                  <th className="p-2 text-right border-r border-slate-300 hidden md:table-cell">Desvio Acum. %</th>
                  <th className="p-2 text-center bg-amber-50">Destaque Mural</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-slate-800">
                {muralData.linhasTabela.map((linha, idx) => (
                  <tr 
                    key={idx} 
                    className={`${linha.destaque ? 'bg-amber-50/70 font-bold text-slate-900' : 'hover:bg-slate-50'}`}
                  >
                    <td className="p-2 font-sans border-r border-slate-300 flex items-center gap-1.5">
                      {linha.descricao}
                    </td>
                    <td className="p-2 text-right border-r border-slate-300 text-slate-600">
                      {formatCurrency(linha.orcadoMes)}
                    </td>
                    <td className="p-2 text-right border-r border-slate-300 font-bold text-slate-900">
                      {formatCurrency(linha.realizadoMes)}
                    </td>
                    <td className="p-2 text-right border-r border-slate-300">
                      <span className={`px-1 rounded ${linha.desvioPerc >= 0 ? 'text-emerald-700' : 'text-red-700 font-bold'}`}>
                        {linha.desvioPerc >= 0 ? '+' : ''}{linha.desvioPerc.toFixed(2)}%
                      </span>
                    </td>
                    <td className="p-2 text-right border-r border-slate-300 hidden md:table-cell text-slate-600">
                      {formatCurrency(linha.orcadoAcum)}
                    </td>
                    <td className="p-2 text-right border-r border-slate-300 hidden md:table-cell text-slate-800">
                      {formatCurrency(linha.realizadoAcum)}
                    </td>
                    <td className="p-2 text-right border-r border-slate-300 hidden md:table-cell">
                      <span className={linha.desvioAcumPerc >= 0 ? 'text-emerald-700' : 'text-slate-700'}>
                        {linha.desvioAcumPerc >= 0 ? '+' : ''}{linha.desvioAcumPerc.toFixed(2)}%
                      </span>
                    </td>
                    <td className="p-2 text-center bg-amber-50/80 font-sans">
                      {linha.marcador && (
                        <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
                          {linha.marcador}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MARCADORES INFERIORES DA TABELA (MC 11,40% | EVOLUÇÃO | MC 2026 10,40%) */}
          <div className="flex flex-wrap items-center justify-between bg-amber-100/70 border border-amber-300/80 px-4 py-2 rounded-lg mb-6 text-xs text-slate-800 font-bold">
            <div className="flex items-center gap-1">
              <span className="bg-amber-400 px-2 py-0.5 rounded font-black text-slate-950">MC Mês: {muralData.kpis.mc.percSobreVendaMes || 11.40}%</span>
              <span className="text-amber-800">⮠ Destaque do Mês</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-orange-700 font-black">➔ Evolução Positiva ➔</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-amber-400 px-2 py-0.5 rounded font-black text-slate-950">MC 2026: {muralData.kpis.mc.percSobreVendaAcumulado || 10.40}%</span>
              <span className="text-amber-800">⮠ Acumulado</span>
            </div>
          </div>

          {/* LINHA DIVISÓRIA COM TEXTO DO RESUMO */}
          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t-2 border-dashed border-amber-400"></div>
            <span className="flex-shrink mx-4 text-xs sm:text-sm font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded shadow-sm">
              ✍️ Resumo Executivo da Gerência de Loja
            </span>
            <div className="flex-grow border-t-2 border-dashed border-amber-400"></div>
          </div>

          {/* PAINEL INFERIOR EM 3 COLUNAS (IDÊNTICO AO MANUSCRITO DA FOTO) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* COLUNA 1: VENDA EF & MB */}
            <div className="space-y-4">
              {/* Card Venda EF */}
              <div className="border-2 border-amber-300/80 bg-amber-50/40 rounded-xl p-4 shadow-sm hover:border-amber-400 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-amber-400 text-slate-950 font-black text-sm px-2.5 py-0.5 rounded shadow-sm inline-block">
                    Venda EF
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    +{muralData.kpis.vendaEf.desvioPerc.toFixed(2)}%
                  </span>
                </div>
                <div className="space-y-1 text-xs font-sans">
                  <div className="flex justify-between py-0.5 border-b border-amber-200/60">
                    <span className="text-slate-600 font-medium">Orçado:</span>
                    <span className="font-mono font-bold text-slate-800">{formatCurrency(muralData.kpis.vendaEf.orcado)}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-amber-200/60">
                    <span className="text-slate-600 font-medium">Vendeu:</span>
                    <span className="font-mono font-bold text-slate-950 text-sm">{formatCurrency(muralData.kpis.vendaEf.realizado)}</span>
                  </div>
                  <div className="flex justify-between py-0.5 text-emerald-800 font-bold">
                    <span>Desvio:</span>
                    <span className="font-mono">+{muralData.kpis.vendaEf.desvioPerc.toFixed(2)}%</span>
                  </div>
                </div>
                {/* Barra de Meta */}
                <div className="w-full bg-slate-200 h-2 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Card MB (Margem Bruta) */}
              <div className="border-2 border-amber-300/80 bg-amber-50/40 rounded-xl p-4 shadow-sm hover:border-amber-400 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-amber-400 text-slate-950 font-black text-sm px-2.5 py-0.5 rounded shadow-sm inline-block">
                      MB (Margem Bruta)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    +{muralData.kpis.mb.desvioPerc.toFixed(2)}%
                  </span>
                </div>
                <div className="space-y-1 text-xs font-sans">
                  <div className="flex justify-between py-0.5 border-b border-amber-200/60">
                    <span className="text-slate-600 font-medium">Orçado:</span>
                    <span className="font-mono font-bold text-slate-800">{formatCurrency(muralData.kpis.mb.orcado)}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-amber-200/60">
                    <span className="text-slate-600 font-medium">Vendeu / Realizado:</span>
                    <span className="font-mono font-bold text-slate-950 text-sm">{formatCurrency(muralData.kpis.mb.realizado)}</span>
                  </div>
                  <div className="flex justify-between py-0.5 text-emerald-800 font-bold">
                    <span>Desvio:</span>
                    <span className="font-mono">+{muralData.kpis.mb.desvioPerc.toFixed(2)}%</span>
                  </div>
                </div>
                {/* Barra de Meta */}
                <div className="w-full bg-slate-200 h-2 rounded-full mt-2.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>

                {/* Legenda Lúdica de MB */}
                <div className="mt-3 bg-white/90 p-2.5 rounded-lg border border-amber-200/80 text-[11px] text-slate-700 shadow-xs">
                  <div className="flex items-center gap-1 text-amber-800 font-bold text-[11px] mb-1">
                    <span>🛍️</span>
                    <span>O que é MB de forma simples?</span>
                  </div>
                  <p className="leading-snug text-slate-600">
                    É <strong>o que sobra da venda</strong> depois de pagar o custo dos produtos à fábrica. <em>(Exemplo: Se vendemos por R$ 100 um item que custou R$ 60, a MB são os <strong>R$ 40</strong> que sobraram).</em>
                  </p>
                </div>
              </div>
            </div>

            {/* COLUNA 2: MC & FRASE SÍNTESE DO MÊS (EM DESTAQUE COM CHAVES) */}
            <div className="space-y-4">
              {/* Card MC */}
              <div className="border-2 border-amber-400 bg-amber-50/60 rounded-xl p-4 shadow-md hover:border-orange-400 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-amber-400 text-slate-950 font-black text-sm px-2.5 py-0.5 rounded shadow-sm inline-block">
                      MC (Margem Contribuição)
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400 animate-pulse">
                    +{muralData.kpis.mc.desvioPerc.toFixed(2)}% 🚀
                  </span>
                </div>
                <div className="space-y-1 text-xs font-sans">
                  <div className="flex justify-between py-0.5 border-b border-amber-200/60">
                    <span className="text-slate-600 font-medium">Orçado:</span>
                    <span className="font-mono font-bold text-slate-800">{formatCurrency(muralData.kpis.mc.orcado)}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-amber-200/60">
                    <span className="text-slate-600 font-medium">Vendeu / Fez:</span>
                    <span className="font-mono font-black text-emerald-800 text-base">{formatCurrency(muralData.kpis.mc.realizado)}</span>
                  </div>
                  <div className="flex justify-between py-0.5 text-emerald-800 font-black">
                    <span>Desvio:</span>
                    <span className="font-mono">+{muralData.kpis.mc.desvioPerc.toFixed(2)}%</span>
                  </div>
                </div>

                {/* Legenda Lúdica de MC */}
                <div className="mt-3 bg-white/95 p-2.5 rounded-lg border border-amber-300 text-[11px] text-slate-700 shadow-xs">
                  <div className="flex items-center gap-1 text-orange-800 font-bold text-[11px] mb-1">
                    <span>🎯</span>
                    <span>O que é MC de forma simples?</span>
                  </div>
                  <p className="leading-snug text-slate-600">
                    É <strong>o dinheiro real que a nossa loja gera</strong> para o Grupo Panvel depois de pagar <strong>todas as nossas despesas</strong> (luz, água, equipe, manutenção). É desse resultado que vêm nossas <strong>premiações e investimentos!</strong>
                  </p>
                </div>
              </div>

              {/* FRASE DE RECONHECIMENTO EM CHAVES { } — MANUSCRITA NA FOTO */}
              <div className="relative border-4 border-amber-400 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-5 rounded-2xl shadow-lg">
                <div className="absolute -top-3 left-4 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow">
                  ⭐ Destaque do Gerente
                </div>

                {isEditing ? (
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold text-slate-700 block">Editar Mensagem da Loja:</label>
                    <textarea
                      value={customFrase}
                      onChange={(e) => setCustomFrase(e.target.value)}
                      className="w-full text-xs font-semibold p-2 border-2 border-amber-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-slate-900"
                      rows={3}
                    />
                  </div>
                ) : (
                  <div className="pt-2 text-center">
                    <span className="text-3xl font-black text-amber-500 leading-none mr-1">{'{'}</span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed inline px-1 bg-amber-200/60 rounded">
                      {customFrase || muralData.fraseDestaque}
                    </p>
                    <span className="text-3xl font-black text-amber-500 leading-none ml-1">{'}'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* COLUNA 3: PONTOS DE ATENÇÃO / JUSTIFICATIVAS DE DESPESAS (SETAS ->) */}
            <div className="border-2 border-red-200 bg-red-50/30 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-red-200 pb-2">
                <span className="text-xs font-black uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  Pontos de Atenção (Despesas)
                </span>
                <span className="text-[10px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded border border-red-300">
                  Desvios Relevantes
                </span>
              </div>

              {isEditing ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">⚡ Item 1 (Energia):</label>
                    <input
                      type="text"
                      value={customAtencao1}
                      onChange={(e) => setCustomAtencao1(e.target.value)}
                      className="w-full p-1.5 text-xs border border-red-300 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">🛠️ Item 2 (Manutenção):</label>
                    <input
                      type="text"
                      value={customAtencao2}
                      onChange={(e) => setCustomAtencao2(e.target.value)}
                      className="w-full p-1.5 text-xs border border-red-300 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">🍱 Item 3 (Alimentação):</label>
                    <input
                      type="text"
                      value={customAtencao3}
                      onChange={(e) => setCustomAtencao3(e.target.value)}
                      className="w-full p-1.5 text-xs border border-red-300 rounded bg-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs text-slate-800 font-medium">
                  {/* Ponto 1: Energia Elétrica */}
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-red-200/80 shadow-xs">
                    <span className="text-orange-600 font-bold text-sm leading-none mt-0.5">➔</span>
                    <p className="leading-snug">
                      {customAtencao1 || muralData.pontosAtencao[0]?.texto}
                    </p>
                  </div>

                  {/* Ponto 2: Manutenção */}
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-red-200/80 shadow-xs">
                    <span className="text-orange-600 font-bold text-sm leading-none mt-0.5">➔</span>
                    <p className="leading-snug">
                      {customAtencao2 || muralData.pontosAtencao[1]?.texto}
                    </p>
                  </div>

                  {/* Ponto 3: Alimentação */}
                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-red-200/80 shadow-xs">
                    <span className="text-orange-600 font-bold text-sm leading-none mt-0.5">➔</span>
                    <p className="leading-snug">
                      {customAtencao3 || muralData.pontosAtencao[2]?.texto}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* GUIA LÚDICO DA EQUIPE: A JORNADA DO DINHEIRO NA LOJA (MB vs MC) */}
          <div className="mt-6 pt-4 border-t-2 border-slate-200 bg-gradient-to-r from-blue-50/60 via-amber-50/60 to-emerald-50/60 p-4 rounded-xl border border-slate-300">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">💡</span>
              <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">
                Guia Rápido da Equipe: A Jornada do Dinheiro da Filial
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
              {/* Passo 1: Venda */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-lg">🛒</span>
                  <div className="font-bold text-slate-900 mt-1">1. Venda Total</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">O cliente paga no caixa</p>
                </div>
                <div className="bg-slate-100 text-slate-800 font-mono font-bold text-[11px] py-0.5 rounded mt-2">
                  Ex: R$ 100,00
                </div>
              </div>

              {/* Passo 2: Menos CMV */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-lg">📦</span>
                  <div className="font-bold text-red-700 mt-1">(-) Custo (CMV)</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Paga a fábrica/fornecedor</p>
                </div>
                <div className="bg-red-50 text-red-700 font-mono font-bold text-[11px] py-0.5 rounded mt-2">
                  - R$ 60,00
                </div>
              </div>

              {/* Passo 3: Margem Bruta (MB) */}
              <div className="bg-amber-100/90 p-2.5 rounded-lg border-2 border-amber-400 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-lg">🛍️</span>
                  <div className="font-black text-amber-900 mt-1">(=) Margem Bruta (MB)</div>
                  <p className="text-[10px] text-amber-800 font-medium mt-0.5">Sobra para manter a loja</p>
                </div>
                <div className="bg-amber-400 text-slate-950 font-mono font-black text-[11px] py-0.5 rounded mt-2">
                  = R$ 40,00
                </div>
              </div>

              {/* Passo 4: Menos Despesas */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-lg">🏢</span>
                  <div className="font-bold text-red-700 mt-1">(-) Despesas Loja</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Luz, água, equipe, limpeza</p>
                </div>
                <div className="bg-red-50 text-red-700 font-mono font-bold text-[11px] py-0.5 rounded mt-2">
                  - R$ 25,00
                </div>
              </div>

              {/* Passo 5: Margem de Contribuição (MC) */}
              <div className="bg-emerald-100/90 p-2.5 rounded-lg border-2 border-emerald-500 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-lg">🎯</span>
                  <div className="font-black text-emerald-950 mt-1">(=) Margem Contrib. (MC)</div>
                  <p className="text-[10px] text-emerald-800 font-medium mt-0.5">Lucro real & premiações!</p>
                </div>
                <div className="bg-emerald-600 text-white font-mono font-black text-[11px] py-0.5 rounded mt-2">
                  = R$ 15,00 🚀
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé da Folha Impressa */}
          <div className="border-t border-slate-200 pt-3 mt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400">
            <span>Sistema DRE Inteligente • Modo Mural de Loja (A4)</span>
            <span>Impresso para: Quadro de Gestão à Vista da Filial</span>
          </div>

        </div>

        {/* AVISO CLÁSSICO NA BASE DO QUADRO MURAL (COMO NA FOTO) */}
        <div className="mt-3 text-center print:hidden">
          <span className="inline-block bg-white/10 text-white/90 text-xs sm:text-sm font-black tracking-widest px-4 py-1.5 rounded-lg border border-white/20 uppercase shadow">
            ⚠️ {muralData.avisoMural} ⚠️
          </span>
        </div>

      </div>
    </div>
  );
};

export default MuralPage;
