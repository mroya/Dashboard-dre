import { formatCurrency, formatPercent } from '../utils/format';

/**
 * MOTOR DE INTERPRETAÇÃO E STORYTELLING FINANCEIRO (DREAnalysisEngine)
 * Transforma números complexos em uma conversa clara, lúdica e focada em tomada de decisão.
 */

export const analyzeDRE = (indicatorsMap, filial = '778', rawAiAnalysis = null) => {
  const indicatorsList = Object.values(indicatorsMap);

  // 1. Identificar Venda e Meta Geral
  const vendaGeral = indicatorsMap['venda'];
  const metaValor = vendaGeral?.meta || indicatorsMap['meta']?.valor;
  const rentGeral = indicatorsMap['rentabilidade'];
  const tktGeral = indicatorsMap['ticket_medio'];
  const projGeral = indicatorsMap['projecao'];

  // 2. Diagnóstico Macro (Como estamos?)
  let comoEstamos = {
    status: 'neutral',
    titulo: 'Análise da Filial',
    subtitulo: 'Acompanhamento consolidado dos resultados.',
    desvioTexto: '—',
    valorFaltanteTexto: '—',
    cor: 'blue',
  };

  if (vendaGeral?.valor && metaValor) {
    const desvioNominal = vendaGeral.valor - metaValor;
    const desvioPerc = ((vendaGeral.valor / metaValor) - 1) * 100;
    const valorFaltante = Math.max(0, metaValor - vendaGeral.valor);

    if (desvioPerc >= 0) {
      comoEstamos = {
        status: 'excelente',
        titulo: '🎉 Estamos superando a meta!',
        subtitulo: `Superávit de ${formatCurrency(desvioNominal)} (${formatPercent(desvioPerc, { showSign: true })}) acima do objetivo mensal.`,
        desvioTexto: `+${desvioPerc.toFixed(1)}% da meta`,
        valorFaltanteTexto: 'Meta atingida com sucesso!',
        cor: 'green',
      };
    } else if (desvioPerc >= -2.0) {
      comoEstamos = {
        status: 'quase_la',
        titulo: '🟡 Muito próximos da meta!',
        subtitulo: `Faltam apenas ${formatCurrency(valorFaltante)} (${formatPercent(desvioPerc)}) para alcançar o alvo mensal.`,
        desvioTexto: `${desvioPerc.toFixed(1)}% da meta`,
        valorFaltanteTexto: `Faltam aprox. ${formatCurrency(valorFaltante)}`,
        cor: 'yellow',
      };
    } else if (desvioPerc >= -5.0) {
      comoEstamos = {
        status: 'atencao',
        titulo: '🟠 Estamos ligeiramente abaixo da meta',
        subtitulo: `Desvio de ${formatPercent(desvioPerc)}. Faltam ${formatCurrency(valorFaltante)} para o fechamento ideal.`,
        desvioTexto: `${desvioPerc.toFixed(1)}% da meta`,
        valorFaltanteTexto: `Faltam ${formatCurrency(valorFaltante)}`,
        cor: 'orange',
      };
    } else {
      comoEstamos = {
        status: 'critico',
        titulo: '🔴 Estamos abaixo da meta',
        subtitulo: `Desvio de ${formatPercent(desvioPerc)}. Faltam ${formatCurrency(valorFaltante)} para atingir o objetivo mensal.`,
        desvioTexto: `${desvioPerc.toFixed(1)}% da meta`,
        valorFaltanteTexto: `Faltam aprox. ${formatCurrency(valorFaltante)}`,
        cor: 'red',
      };
    }
  }

  // 3. Identificar "Onde estamos perdendo?" (Top negativos)
  const itensComMeta = indicatorsList.filter(
    (ind) => ind.encontrado && ind.desvioPercentual !== null && ind.chave !== 'venda' && ind.chave !== 'projecao'
  );

  const ondePerdemos = itensComMeta
    .filter((ind) => ind.desvioPercentual < 0)
    .sort((a, b) => (a.desvioPercentual || 0) - (b.desvioPercentual || 0))
    .slice(0, 4)
    .map((ind) => {
      const valorFalta = (ind.meta || 0) - (ind.valor || 0);
      let mensagem = `${ind.nome} está operando abaixo do ritmo ideal.`;
      if (ind.desvioPercentual < -10) {
        mensagem = `${ind.nome} é hoje um dos principais pontos de atenção da filial.`;
      }
      return {
        ...ind,
        valorFalta: valorFalta > 0 ? valorFalta : 0,
        mensagem,
      };
    });

  // 4. Identificar "Onde estamos ganhando?" (Destaques positivos)
  const ondeGanhamos = itensComMeta
    .filter((ind) => ind.desvioPercentual > 0)
    .sort((a, b) => (b.desvioPercentual || 0) - (a.desvioPercentual || 0))
    .slice(0, 4)
    .map((ind) => ({
      ...ind,
      mensagem: `${ind.nome} está com performance excelente (+${ind.desvioPercentual?.toFixed(1)}% acima da meta).`,
    }));

  // Adicionar rentabilidade se positiva
  if (rentGeral?.valor && rentGeral.valor >= 30) {
    ondeGanhamos.push({
      chave: 'rentabilidade_destaque',
      nome: 'Rentabilidade Repositório',
      valor: rentGeral.valor,
      desvioPercentual: null,
      statusCor: 'green',
      statusIcon: '🟢',
      mensagem: `Margem saudável de ${rentGeral.valor.toFixed(2)}%, garantindo sustentabilidade financeira.`,
    });
  }

  // 5. Gerar Resumo Executivo / "Leitura do Gestor" (~5 linhas)
  let resumoExecutivo = rawAiAnalysis?.resumoExecutivo;
  if (!resumoExecutivo) {
    const nomeFilial = filial ? `A filial ${filial}` : 'A filial';
    const statusVenda = (vendaGeral?.desvioPercentual || 0) >= 0 ? 'apresenta desempenho positivo de vendas' : 'apresenta vendas abaixo da meta projetada';
    const principaisProblemas = ondePerdemos.map((p) => p.nome).join(', ') || 'nenhum setor crítico';
    const principaisDestaques = ondeGanhamos.map((g) => g.nome).join(', ') || 'operações gerais';
    const margemTexto = rentGeral?.valor ? `A rentabilidade média situa-se em ${rentGeral.valor.toFixed(1)}%, mantendo a saúde do caixa.` : 'A margem segue em acompanhamento.';

    resumoExecutivo = `${nomeFilial} ${statusVenda}, com maior necessidade de foco em ${principaisProblemas}. Por outro lado, destacam-se positivamente ${principaisDestaques}. ${margemTexto} O foco prioritário deve ser recuperar volume nos departamentos deficientes sem comprometer a margem de contribuição.`;
  }

  // 6. Gerar Plano de Ação Estratégico
  let planoAcao = rawAiAnalysis?.planoAcao;
  if (!planoAcao || !Array.isArray(planoAcao) || planoAcao.length === 0) {
    planoAcao = [];

    // Prioridade 1: Maior impacto negativo
    if (ondePerdemos.length > 0) {
      const p1 = ondePerdemos[0];
      planoAcao.push({
        prioridade: 1,
        nivel: 'critica',
        badge: 'PRIORIDADE 1 — URGENTE',
        cor: 'red',
        titulo: `Recuperar ${p1.nome}`,
        motivo: `Desvio acumulado de ${formatPercent(p1.desvioPercentual)} em relação à meta.`,
        acaoSugerida: `Alinhar com a equipe de balcão o reforço ativo de abordagem, ofertando itens de ${p1.nome} em cada atendimento com prescrição permitida.`,
      });
    }

    // Prioridade 2: Canais Digitais ou segundo maior problema
    const digitalKpi = indicatorsMap['canais_digitais'] || indicatorsMap['venda_digital'];
    if (digitalKpi && digitalKpi.desvioPercentual !== null && digitalKpi.desvioPercentual < 0) {
      planoAcao.push({
        prioridade: 2,
        nivel: 'alta',
        badge: 'PRIORIDADE 2 — EXPANSÃO',
        cor: 'orange',
        titulo: 'Acelerar Canais Digitais (App / Site)',
        motivo: 'Participação digital e faturamento online abaixo da meta estabelecida.',
        acaoSugerida: 'Orientar o salão a cadastrar e convidar clientes para o Aplicativo, enfatizando cupons exclusivos e entrega rápida.',
      });
    } else if (ondePerdemos.length > 1) {
      const p2 = ondePerdemos[1];
      planoAcao.push({
        prioridade: 2,
        nivel: 'alta',
        badge: 'PRIORIDADE 2 — ATENÇÃO',
        cor: 'orange',
        titulo: `Trabalhar ${p2.nome}`,
        motivo: `Desvio de ${formatPercent(p2.desvioPercentual)} impactando o resultado global.`,
        acaoSugerida: `Verificar ruptura de estoque dos principais SKUs de ${p2.nome} e posicionar itens de destaque na área promocional.`,
      });
    }

    // Prioridade 3: Alavancar o que já está ganhando (Oportunidade)
    if (ondeGanhamos.length > 0) {
      const g1 = ondeGanhamos[0];
      planoAcao.push({
        prioridade: 3,
        nivel: 'oportunidade',
        badge: 'PRIORIDADE 3 — OPORTUNIDADE',
        cor: 'green',
        titulo: `Potencializar ${g1.nome}`,
        motivo: `Desempenho excelente (+${g1.desvioPercentual?.toFixed(1)}%) com alta aceitação dos clientes.`,
        acaoSugerida: `Utilizar ${g1.nome} como produto âncora para vendas casadas e aumento de ticket médio em todos os turnos.`,
      });
    }
  }

  return {
    comoEstamos,
    ondePerdemos,
    ondeGanhamos,
    resumoExecutivo,
    planoAcao,
    totalIndicadores: indicatorsList.length,
    encontrados: indicatorsList.filter((i) => i.encontrado).length,
    naoEncontrados: indicatorsList.filter((i) => !i.encontrado).length,
  };
};
