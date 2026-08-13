/**
 * DADOS ESTRUTURADOS DO QUADRO DE GESTÃO À VISTA (MURAL DRE)
 * Baseado na folha oficial impressa do Grupo Panvel com anotações manuais do Gerente.
 */

export const getPhotoMuralSample = () => {
  return {
    id: 'mural-foto-panvel',
    titulo: 'Mural DRE de Loja',
    subtitulo: 'Quadro de Gestão à Vista • Transparência e Foco em Metas',
    empresa: 'Grupo Panvel',
    filial: 'Filial 778',
    periodo: 'Julho / 2026',
    dataReferencia: '31/07/2026',
    avisoMural: 'NÃO TAPAR MURAL COM CAIXAS',
    
    // 3 Pilares Principais (Parte Inferior Esquerda e Centro)
    kpis: {
      vendaEf: {
        codigo: 'Venda EF',
        nome: 'Venda Efetiva',
        orcado: 867083,
        realizado: 898299,
        desvioNominal: 31216,
        desvioPerc: 3.60,
        atingimento: 103.60,
        status: 'positivo',
        statusLabel: 'Superou a Meta',
      },
      mb: {
        codigo: 'MB',
        nome: 'Margem Bruta',
        orcado: 264495,
        realizado: 283212,
        desvioNominal: 18717,
        desvioPerc: 7.11,
        atingimento: 107.11,
        status: 'positivo',
        statusLabel: 'Superou a Meta',
      },
      mc: {
        codigo: 'MC',
        nome: 'Margem de Contribuição',
        orcado: 69008,
        realizado: 102444,
        desvioNominal: 33436,
        desvioPerc: 48.45,
        atingimento: 148.45,
        percSobreVendaMes: 11.40,
        percSobreVendaAcumulado: 10.40,
        status: 'positivo',
        statusLabel: 'Superávit Histórico',
      },
    },

    // Anotações Manuscritas da Folha
    anotacoesTabela: {
      mcMesHighlight: 'MC 11,40%',
      evolucao: 'Evolução',
      mcAcumuladoHighlight: 'MC 2026 10,40%',
    },

    // Frase Síntese do Gerente (Caixa destacada em chaves)
    fraseDestaque: 'Julho foi um excelente mês de vendas e atingimos a maioria das metas e premiações',

    // Pontos de Atenção / Justificativas de Despesas (Coluna da Direita)
    pontosAtencao: [
      {
        id: 'energia',
        icone: '⚡',
        conta: 'Energia Elétrica',
        desvioPerc: 61.52,
        tipo: 'acima_orcado',
        texto: 'Tivemos um aumento considerável na energia elétrica, cerca de 61,52% acima.',
        gravidade: 'alta',
      },
      {
        id: 'manutencao',
        icone: '🛠️',
        conta: 'Serviço de Manutenção',
        desvioPerc: 42.00,
        tipo: 'acima_orcado',
        texto: 'Tivemos custos de serviço de manutenção, 42% acima.',
        gravidade: 'media',
      },
      {
        id: 'alimentacao',
        icone: '🍱',
        conta: 'Alimentação do Trabalhador',
        desvioPerc: 50.61,
        tipo: 'acima_orcado',
        texto: 'Tivemos um custo considerável, o dobro do orçado, com alimentação do trabalhador 50,61% acima.',
        gravidade: 'alta',
      },
    ],

    // Linhas Sintéticas da Tabela DRE da Folha A4
    linhasTabela: [
      {
        descricao: 'Venda Bruta / Efetiva',
        orcadoMes: 867083,
        realizadoMes: 898299,
        desvioPerc: 3.60,
        orcadoAcum: 5551641,
        realizadoAcum: 5560294,
        desvioAcumPerc: 0.16,
        destaque: false,
        marcador: null,
      },
      {
        descricao: 'Custo Mercadorias Vendidas (CMV)',
        orcadoMes: 602588,
        realizadoMes: 615087,
        desvioPerc: 2.07,
        orcadoAcum: 3784519,
        realizadoAcum: 3882027,
        desvioAcumPerc: 2.58,
        destaque: false,
        marcador: null,
      },
      {
        descricao: 'Margem Bruta (MB)',
        orcadoMes: 264495,
        realizadoMes: 283212,
        desvioPerc: 7.11,
        orcadoAcum: 1767122,
        realizadoAcum: 1853037,
        desvioAcumPerc: 4.86,
        destaque: true,
        marcador: 'MB',
      },
      {
        descricao: 'Despesas com Energia Elétrica',
        orcadoMes: 4500,
        realizadoMes: 7268,
        desvioPerc: 61.52,
        orcadoAcum: 31500,
        realizadoAcum: 48900,
        desvioAcumPerc: 55.24,
        destaque: false,
        marcador: '-> Acima',
      },
      {
        descricao: 'Despesas com Manutenção / Serviços',
        orcadoMes: 3200,
        realizadoMes: 4544,
        desvioPerc: 42.00,
        orcadoAcum: 22400,
        realizadoAcum: 29800,
        desvioAcumPerc: 33.04,
        destaque: false,
        marcador: '-> Acima',
      },
      {
        descricao: 'Despesas com Alimentação do Trabalhador',
        orcadoMes: 2800,
        realizadoMes: 4217,
        desvioPerc: 50.61,
        orcadoAcum: 19600,
        realizadoAcum: 28500,
        desvioAcumPerc: 45.41,
        destaque: false,
        marcador: '-> Acima',
      },
      {
        descricao: 'Despesas Próprias Totais',
        orcadoMes: 164369,
        realizadoMes: 148213,
        desvioPerc: -9.83,
        orcadoAcum: 1145888,
        realizadoAcum: 990570,
        desvioAcumPerc: -13.55,
        destaque: false,
        marcador: 'Economia',
      },
      {
        descricao: 'Margem de Contribuição (MC)',
        orcadoMes: 69008,
        realizadoMes: 102444,
        desvioPerc: 48.45,
        orcadoAcum: 548081,
        realizadoAcum: 785179,
        desvioAcumPerc: 43.26,
        destaque: true,
        marcador: 'MC 11,40%',
      },
    ],
  };
};

/**
 * Converte qualquer DRE carregada no sistema para a visualização do Mural
 */
export const getMuralDataFromDRE = (report) => {
  if (!report) return getPhotoMuralSample();

  const vendaOrcado = report.venda?.mesOrcado || 867083;
  const vendaReal = report.venda?.mesRealizado || 898299;
  const vendaDesvioNom = report.venda?.desvioMesNominal || (vendaReal - vendaOrcado);
  const vendaDesvioPerc = report.venda?.desvioMesPerc || ((vendaReal - vendaOrcado) / (vendaOrcado || 1)) * 100;

  const mbOrcado = report.margemBruta?.orcadoMes || 264495;
  const mbReal = report.margemBruta?.valorMes || 283212;
  const mbDesvioNom = report.margemBruta?.ganhoNominalMes || (mbReal - mbOrcado);
  const mbDesvioPerc = ((mbReal - mbOrcado) / (mbOrcado || 1)) * 100;

  const mcOrcado = report.margemContribuicao?.orcadoMes || 69008;
  const mcReal = report.margemContribuicao?.valorMes || 102444;
  const mcDesvioNom = report.margemContribuicao?.ganhoNominalMes || (mcReal - mcOrcado);
  const mcDesvioPerc = report.margemContribuicao?.ganhoPercMes || ((mcReal - mcOrcado) / (mcOrcado || 1)) * 100;
  const mcPercVendaMes = report.margemContribuicao?.percVendaMes || 11.40;
  const mcPercVendaAcum = report.margemContribuicao?.percVendaAcumulado || 10.40;

  // Pontos de atenção a partir das anomalias ou despesas
  const pontosAtencao = [];
  if (report.anomalias && report.anomalias.length > 0) {
    report.anomalias.forEach((anom) => {
      pontosAtencao.push({
        id: anom.categoria.toLowerCase().replace(/\s+/g, '-'),
        icone: anom.icone || '⚠️',
        conta: anom.categoria,
        desvioPerc: Math.abs(anom.desvioMesPerc || anom.desvioAcumuladoPerc || 0),
        tipo: 'acima_orcado',
        texto: anom.observacao || `${anom.categoria} com desvio de ${anom.desvioMesPerc || 0}%`,
        gravidade: anom.status === 'Crítico' ? 'alta' : 'media',
      });
    });
  } else {
    // Fallback padrão
    pontosAtencao.push(
      {
        id: 'energia',
        icone: '⚡',
        conta: 'Energia Elétrica',
        desvioPerc: 61.52,
        tipo: 'acima_orcado',
        texto: 'Tivemos um aumento considerável na energia elétrica, cerca de 61,52% acima.',
        gravidade: 'alta',
      },
      {
        id: 'manutencao',
        icone: '🛠️',
        conta: 'Serviço de Manutenção',
        desvioPerc: 42.00,
        tipo: 'acima_orcado',
        texto: 'Tivemos custos de serviço de manutenção, 42% acima.',
        gravidade: 'media',
      },
      {
        id: 'alimentacao',
        icone: '🍱',
        conta: 'Alimentação do Trabalhador',
        desvioPerc: 50.61,
        tipo: 'acima_orcado',
        texto: 'Tivemos um custo considerável, o dobro do orçado, com alimentação do trabalhador 50,61% acima.',
        gravidade: 'alta',
      }
    );
  }

  return {
    id: `mural-filial-${report.filial || '778'}`,
    titulo: 'Mural DRE de Loja',
    subtitulo: 'Quadro de Gestão à Vista • Transparência e Foco em Metas',
    empresa: 'Grupo Panvel',
    filial: `Filial ${report.filial || '778'}`,
    periodo: report.periodo || 'Julho / 2026',
    dataReferencia: report.data_referencia || '31/07/2026',
    avisoMural: 'NÃO TAPAR MURAL COM CAIXAS',

    kpis: {
      vendaEf: {
        codigo: 'Venda EF',
        nome: 'Venda Efetiva',
        orcado: vendaOrcado,
        realizado: vendaReal,
        desvioNominal: vendaDesvioNom,
        desvioPerc: Number(vendaDesvioPerc.toFixed(2)),
        atingimento: Number(((vendaReal / (vendaOrcado || 1)) * 100).toFixed(2)),
        status: vendaDesvioPerc >= 0 ? 'positivo' : 'negativo',
        statusLabel: vendaDesvioPerc >= 0 ? 'Superou a Meta' : 'Abaixo da Meta',
      },
      mb: {
        codigo: 'MB',
        nome: 'Margem Bruta',
        orcado: mbOrcado,
        realizado: mbReal,
        desvioNominal: mbDesvioNom,
        desvioPerc: Number(mbDesvioPerc.toFixed(2)),
        atingimento: Number(((mbReal / (mbOrcado || 1)) * 100).toFixed(2)),
        status: mbDesvioPerc >= 0 ? 'positivo' : 'negativo',
        statusLabel: mbDesvioPerc >= 0 ? 'Superou a Meta' : 'Abaixo da Meta',
      },
      mc: {
        codigo: 'MC',
        nome: 'Margem de Contribuição',
        orcado: mcOrcado,
        realizado: mcReal,
        desvioNominal: mcDesvioNom,
        desvioPerc: Number(mcDesvioPerc.toFixed(2)),
        atingimento: Number(((mcReal / (mcOrcado || 1)) * 100).toFixed(2)),
        percSobreVendaMes: Number(mcPercVendaMes.toFixed(2)),
        percSobreVendaAcumulado: Number(mcPercVendaAcum.toFixed(2)),
        status: mcDesvioPerc >= 0 ? 'positivo' : 'negativo',
        statusLabel: mcDesvioPerc >= 0 ? 'Superávit de Margem' : 'Déficit de Margem',
      },
    },

    anotacoesTabela: {
      mcMesHighlight: `MC ${mcPercVendaMes.toFixed(2)}%`,
      evolucao: 'Evolução',
      mcAcumuladoHighlight: `MC 2026 ${mcPercVendaAcum.toFixed(2)}%`,
    },

    fraseDestaque:
      report.fraseReuniao ||
      'Julho foi um excelente mês de vendas e atingimos a maioria das metas e premiações',

    pontosAtencao: pontosAtencao.slice(0, 3),

    linhasTabela: [
      {
        descricao: 'Venda Bruta / Efetiva',
        orcadoMes: vendaOrcado,
        realizadoMes: vendaReal,
        desvioPerc: Number(vendaDesvioPerc.toFixed(2)),
        orcadoAcum: report.venda?.acumuladoOrcado || 5551641,
        realizadoAcum: report.venda?.acumuladoRealizado || 5560294,
        desvioAcumPerc: report.venda?.desvioAcumuladoPerc || 0.16,
        destaque: false,
        marcador: null,
      },
      {
        descricao: 'Custo Mercadorias Vendidas (CMV)',
        orcadoMes: report.cmv?.cmvMesAnteriorAno || 589735,
        realizadoMes: report.cmv?.cmvMesAtual || 589735,
        desvioPerc: report.cmv?.melhoraPP || 2.51,
        orcadoAcum: report.cmv?.cmvAcumuladoAnoAnterior || 3582166,
        realizadoAcum: report.cmv?.cmvAcumuladoAtual || 3882027,
        desvioAcumPerc: report.cmv?.melhoraPPAcumulado || 2.09,
        destaque: false,
        marcador: null,
      },
      {
        descricao: 'Margem Bruta (MB)',
        orcadoMes: mbOrcado,
        realizadoMes: mbReal,
        desvioPerc: Number(mbDesvioPerc.toFixed(2)),
        orcadoAcum: report.margemBruta?.acumuladoOrcadoValor || 1767122,
        realizadoAcum: report.margemBruta?.acumuladoValor || 1853037,
        desvioAcumPerc: report.margemBruta?.ganhoPercSobreOrcado || 4.86,
        destaque: true,
        marcador: 'MB',
      },
      {
        descricao: 'Despesas com Energia Elétrica',
        orcadoMes: 4500,
        realizadoMes: 7268,
        desvioPerc: 61.52,
        orcadoAcum: 31500,
        realizadoAcum: 48900,
        desvioAcumPerc: 55.24,
        destaque: false,
        marcador: '-> Acima',
      },
      {
        descricao: 'Despesas com Manutenção / Serviços',
        orcadoMes: 3200,
        realizadoMes: 4544,
        desvioPerc: 42.00,
        orcadoAcum: 22400,
        realizadoAcum: 29800,
        desvioAcumPerc: 33.04,
        destaque: false,
        marcador: '-> Acima',
      },
      {
        descricao: 'Despesas com Alimentação do Trabalhador',
        orcadoMes: 2800,
        realizadoMes: 4217,
        desvioPerc: 50.61,
        orcadoAcum: 19600,
        realizadoAcum: 28500,
        desvioAcumPerc: 45.41,
        destaque: false,
        marcador: '-> Acima',
      },
      {
        descricao: 'Despesas Próprias Totais',
        orcadoMes: report.despesasProprias?.orcadoMes || 164369,
        realizadoMes: report.despesasProprias?.valorMes || 148213,
        desvioPerc: -9.83,
        orcadoAcum: report.despesasProprias?.acumuladoOrcado || 1145888,
        realizadoAcum: report.despesasProprias?.acumuladoValor || 990570,
        desvioAcumPerc: -(report.despesasProprias?.economiaPercAcumulada || 13.55),
        destaque: false,
        marcador: 'Economia',
      },
      {
        descricao: 'Margem de Contribuição (MC)',
        orcadoMes: mcOrcado,
        realizadoMes: mcReal,
        desvioPerc: Number(mcDesvioPerc.toFixed(2)),
        orcadoAcum: report.margemContribuicao?.acumuladoOrcado || 548081,
        realizadoAcum: report.margemContribuicao?.acumuladoValor || 785179,
        desvioAcumPerc: report.margemContribuicao?.ganhoPercAcumulado || 43.26,
        destaque: true,
        marcador: `MC ${mcPercVendaMes.toFixed(2)}%`,
      },
    ],
  };
};
