/**
 * MOTOR DE CÁLCULO FINANCEIRO CENTRALIZADO (CalculationEngine)
 * Princípio: "Primeiro o número. Depois o cálculo. Depois a interpretação."
 * Nunca assume 0 ou null silenciosamente.
 */

export const calculateDesvio = (realizado, meta) => {
  if (realizado === null || realizado === undefined || meta === null || meta === undefined) {
    return null;
  }
  return Number(realizado) - Number(meta);
};

export const calculateDesvioPercentual = (realizado, meta) => {
  if (realizado === null || realizado === undefined || !meta || Number(meta) === 0) {
    return null;
  }
  return ((Number(realizado) / Number(meta)) - 1) * 100;
};

export const calculateAtingimento = (realizado, meta) => {
  if (realizado === null || realizado === undefined || !meta || Number(meta) === 0) {
    return null;
  }
  return (Number(realizado) / Number(meta)) * 100;
};

export const calculateProjecaoRitmo = (vendaAcumulada, diaAtual, totalDiasMes = 30) => {
  if (vendaAcumulada === null || vendaAcumulada === undefined || !diaAtual || diaAtual <= 0) {
    return null;
  }
  const ritmoDiario = Number(vendaAcumulada) / Number(diaAtual);
  return ritmoDiario * Number(totalDiasMes);
};

export const calculateEvolucao = (atual, anterior) => {
  if (atual === null || atual === undefined || !anterior || Number(anterior) === 0) {
    return null;
  }
  return ((Number(atual) / Number(anterior)) - 1) * 100;
};

/**
 * Normaliza e consolida todos os indicadores extraídos com metadados de rastreabilidade
 */
export const buildIndicatorObject = ({
  chave,
  nome,
  categoria,
  valor,
  meta,
  valorAnterior = null,
  unidade = 'BRL',
  origem = 'PDF',
  pagina = 1,
  textoOrigem = '',
  formulaPadrao = '',
  isProjecao = false,
}) => {
  const isFound = valor !== null && valor !== undefined;
  
  let desvio = null;
  let desvioPercentual = null;
  let atingimento = null;
  let formulaUtilizada = formulaPadrao || (origem === 'PDF' ? 'Valor extraído diretamente do documento' : '');
  let memoriaCalculo = '';

  if (isFound && meta !== null && meta !== undefined) {
    desvio = calculateDesvio(valor, meta);
    desvioPercentual = calculateDesvioPercentual(valor, meta);
    atingimento = calculateAtingimento(valor, meta);
    
    if (origem !== 'PDF') {
      formulaUtilizada = 'Desvio = Realizado - Meta | Desvio % = ((Realizado / Meta) - 1) * 100';
      memoriaCalculo = `${valor} - ${meta} = ${desvio} (${desvioPercentual?.toFixed(2)}%)`;
    }
  }

  // Definição de status e semáforo
  let status = 'neutral';
  let statusCor = 'blue';
  let statusIcon = '🔵';
  let statusLabel = 'Informativo';

  if (!isFound) {
    status = 'missing';
    statusCor = 'gray';
    statusIcon = '⚠️';
    statusLabel = 'Dado não localizado na DRE';
  } else if (desvioPercentual !== null) {
    if (desvioPercentual >= 0) {
      status = 'success';
      statusCor = 'green';
      statusIcon = '🟢';
      statusLabel = 'Acima da Meta';
    } else if (desvioPercentual >= -2.0) {
      status = 'warning_light';
      statusCor = 'yellow';
      statusIcon = '🟡';
      statusLabel = 'Próximo da Meta';
    } else if (desvioPercentual >= -5.0) {
      status = 'warning';
      statusCor = 'orange';
      statusIcon = '🟠';
      statusLabel = 'Atenção';
    } else {
      status = 'danger';
      statusCor = 'red';
      statusIcon = '🔴';
      statusLabel = 'Precisamos Agir';
    }
  } else {
    // Para indicadores sem meta (ex: NPS, Ticket, Rentabilidade pura)
    status = 'success';
    statusCor = 'green';
    statusIcon = '🟢';
    statusLabel = 'No Caminho';
  }

  return {
    chave,
    nome,
    categoria,
    encontrado: isFound,
    valor: isFound ? Number(valor) : null,
    meta: meta !== null && meta !== undefined ? Number(meta) : null,
    valorAnterior: valorAnterior !== null ? Number(valorAnterior) : null,
    desvio,
    desvioPercentual,
    atingimento,
    unidade,
    origem: isProjecao ? 'PROJEÇÃO' : origem,
    isProjecao,
    pagina,
    textoOrigem: textoOrigem || (isFound ? `Valor identificado na página ${pagina}` : 'Não consta no documento original'),
    formula: formulaUtilizada,
    memoriaCalculo,
    status,
    statusCor,
    statusIcon,
    statusLabel,
  };
};
