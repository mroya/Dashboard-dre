import { GoogleGenerativeAI } from '@google/generative-ai';
import { cleanAndExtractJSON } from './jsonHelper';

let genAIInstance = null;
const getGenAI = () => {
  if (!genAIInstance) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    if (!apiKey) {
      console.warn('⚠️ VITE_GEMINI_API_KEY não configurada no .env');
    }
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance;
};

// Converter arquivo para base64
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const res = reader.result;
      if (typeof res === 'string' && res.includes(',')) {
        resolve(res.split(',')[1]);
      } else {
        resolve(res);
      }
    };
    reader.onerror = (err) => reject(err);
  });

// Gerar hash SHA-256 do arquivo para cache local
const hashFile = async (file) => {
  try {
    const buffer = await file.arrayBuffer();
    const hash = await crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    return `${file.name}_${file.size}_${file.lastModified}`;
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Chamada Gemini com retry e fallback automático de modelos válidos
const generateWithModelFallback = async (prompt, base64Data, mimeType) => {
  const genAI = getGenAI();
  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-flash-latest',
    'gemini-flash-lite-latest',
    'gemini-2.5-pro',
  ];

  let lastError = null;

  for (const modelName of modelsToTry) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`🤖 Análise multimodal com ${modelName} (tentativa ${attempt})...`);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.1,
          },
        });

        const result = await model.generateContent([
          prompt,
          {
            inlineData: {
              mimeType: mimeType || 'application/pdf',
              data: base64Data,
            },
          },
        ]);

        const response = await result.response;
        const text = response.text();
        return cleanAndExtractJSON(text);
      } catch (err) {
        console.warn(`Aviso com modelo ${modelName} (tentativa ${attempt}):`, err.message);
        lastError = err;

        if (err.message?.includes('503') || err.message?.includes('high demand')) {
          await sleep(1500 * attempt);
        } else {
          break;
        }
      }
    }
  }

  throw lastError || new Error('Falha ao processar PDF com os modelos de IA disponíveis.');
};

/**
 * Pipeline principal de leitura e estruturação executiva da DRE via Gemini
 */
export const parseDREDocument = async (file, onProgress = () => {}) => {
  try {
    onProgress({ step: 1, label: '📄 Lendo documento...' });

    const fileHash = await hashFile(file);
    const cacheKey = `dre_cache_exec_${fileHash}`;

    // Verificar cache local
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        onProgress({ step: 4, label: '⚡ Recuperando dados do cache...' });
        const parsedCached = JSON.parse(cached);
        onProgress({ step: 5, label: '🚀 Concluído!' });
        return parsedCached;
      }
    } catch {}

    const base64Data = await fileToBase64(file);
    onProgress({ step: 2, label: '🔎 Gemini analisando DRE (Mês, Acumulado, CMV, Despesas)...' });

    const prompt = `Você é um CFO e Consultor Sênior de Gestão Financeira de Redes de Farmácias.
Analise detalhadamente este relatório DRE / Fechamento de Filial (considerando o resultado do Mês e o Acumulado de Janeiro até o Mês de Referência) e gere uma LEITURA EXECUTIVA E STORYTELLING DE ALTO NÍVEL.

REGRA CRÍTICA ANTI-ALUCINAÇÃO:
- Use apenas os dados reais contidos no PDF. Se algum número não constar, calcule a partir dos componentes existentes ou use null.
- Trate números brasileiros: '848.503,00' -> 848503, '69,50%' -> 69.50.
- Retorne APENAS um JSON válido.

ESTRUTURA OBRIGATÓRIA DO JSON:
{
  "filial": "string (ex: 778)",
  "periodo": "string (ex: Julho/2026)",
  "data_referencia": "DD/MM/AAAA",
  "fraseReuniao": "Frase de 1 a 2 linhas resumindo a situação da filial para apresentar à liderança",
  "avaliacaoGeral": {
    "status": "muito_positivo | positivo | atencao | critico",
    "statusTexto": "DRE Muito Positivo / Sob Atenção / etc",
    "cor": "green | yellow | orange | red",
    "diagnostico": "Explicação macro em 2 linhas",
    "placarOuro": {
      "titulo": "⭐ O Principal Número para Comemorar (ou o Maior Risco)",
      "valor": "ex: +R$ 237.097",
      "subtitulo": "ex: Margem de Contribuição Acumulada acima do Orçamento (+43,26%)",
      "destaque": "Frase de impacto sobre o placar"
    }
  },
  "venda": {
    "mesRealizado": number,
    "mesOrcado": number,
    "desvioMesNominal": number,
    "desvioMesPerc": number,
    "anoAnterior": number_or_null,
    "crescimentoAnoAnterior": number_or_null,
    "acumuladoRealizado": number,
    "acumuladoOrcado": number,
    "desvioAcumuladoNominal": number,
    "desvioAcumuladoPerc": number,
    "comentario": "Texto claro traduzindo o resultado da venda no mês e ano",
    "pontoAtencao": "Ponto de alerta sobre a venda"
  },
  "cmv": {
    "cmvMesAtual": number,
    "cmvMesAnteriorAno": number_or_null,
    "melhoraPP": number_or_null,
    "cmvAcumuladoAtual": number,
    "cmvAcumuladoAnoAnterior": number_or_null,
    "melhoraPPAcumulado": number_or_null,
    "lucroBrutoMesAtual": number,
    "lucroBrutoMesAnoAnterior": number_or_null,
    "crescimentoLucroBrutoPerc": number_or_null,
    "traducaoGestor": "Tradução prática do CMV para o gestor"
  },
  "margemBruta": {
    "valorMes": number,
    "percMes": number,
    "orcadoMes": number,
    "percOrcadoMes": number,
    "ganhoNominalMes": number,
    "ganhoPPMes": number,
    "crescimentoVs2025": number_or_null,
    "acumuladoValor": number,
    "acumuladoPerc": number,
    "acumuladoOrcadoValor": number,
    "acumuladoOrcadoPerc": number,
    "ganhoNominalAcumulado": number,
    "ganhoPPAcumulado": number,
    "ganhoPercSobreOrcado": number
  },
  "despesasProprias": {
    "valorMes": number,
    "orcadoMes": number,
    "economiaMes": number,
    "percVendaAtual": number,
    "percVendaAnterior": number_or_null,
    "acumuladoValor": number,
    "acumuladoOrcado": number,
    "economiaAcumulada": number,
    "economiaPercAcumulada": number,
    "comentario": "Texto traduzindo a eficiência das despesas próprias"
  },
  "margemContribuicao": {
    "valorMes": number,
    "orcadoMes": number,
    "ganhoNominalMes": number,
    "ganhoPercMes": number,
    "percVendaMes": number,
    "percVendaOrcadoMes": number,
    "ganhoPPMes": number,
    "acumuladoValor": number,
    "acumuladoOrcado": number,
    "ganhoNominalAcumulado": number,
    "ganhoPercAcumulado": number,
    "percVendaAcumulado": number,
    "percVendaOrcadoAcumulado": number
  },
  "motoresMelhora": [
    { "num": "①", "titulo": "Título do Motor 1", "descricao": "Explicação clara" },
    { "num": "②", "titulo": "Título do Motor 2", "descricao": "Explicação clara" },
    { "num": "③", "titulo": "Título do Motor 3", "descricao": "Explicação clara" }
  ],
  "anomalias": [
    {
      "categoria": "Energia Elétrica / Delivery / Materiais / etc",
      "icone": "⚡",
      "status": "critico | atencao | positivo_com_alerta",
      "cor": "red | orange | yellow",
      "mesRealizado": number,
      "mesOrcado": number,
      "desvioMes": number,
      "desvioMesPerc": number,
      "acumuladoRealizado": number,
      "acumuladoOrcado": number,
      "desvioAcumulado": number,
      "desvioAcumuladoPerc": number,
      "observacao": "Análise da anomalia"
    }
  ],
  "rankingIndicadores": [
    { "indicador": "string", "avaliacao": "Muito boa | Excelente | Atenção | Investigar", "status": "green | yellow | orange | red", "icone": "🟢 | 🟡 | 🔴", "detalhe": "string" }
  ],
  "prioridadesGestor": [
    { "num": 1, "titulo": "string", "foco": "string", "tipo": "vendas", "cor": "blue" },
    { "num": 2, "titulo": "string", "foco": "string", "tipo": "margem", "cor": "emerald" },
    { "num": 3, "titulo": "string", "foco": "string", "tipo": "custos", "cor": "purple" },
    { "num": 4, "titulo": "string", "foco": "string", "tipo": "auditoria", "cor": "amber" }
  ]
}`;

    const mimeType = file.type || 'application/pdf';
    const parsedData = await generateWithModelFallback(prompt, base64Data, mimeType);

    onProgress({ step: 3, label: '🧮 Estruturando narrativa executiva e placar...' });

    const resultadoConsolidado = {
      id: crypto.randomUUID(),
      arquivo_nome: file.name,
      confianca_extracao: 100,
      ...parsedData,
    };

    // Cache local
    try {
      localStorage.setItem(cacheKey, JSON.stringify(resultadoConsolidado));
    } catch {}

    onProgress({ step: 5, label: '🚀 Concluído!' });
    return resultadoConsolidado;
  } catch (error) {
    console.error('Erro no processamento do PDF:', error);
    throw new Error(`Erro na leitura do PDF: ${error.message}`);
  }
};
