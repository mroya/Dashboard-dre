import { supabase } from '../supabase/supabaseClient';

const LOCAL_STORAGE_KEY = 'dre_inteligente_relatorios_v1';

// Helper para salvar no storage local como backup/resiliência
const saveToLocalStorage = (report) => {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const filtered = existing.filter((r) => r.id !== report.id);
    filtered.unshift(report);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered.slice(0, 50)));
  } catch (err) {
    console.warn('Falha ao salvar no localStorage local:', err);
  }
};

// Helper para ler do storage local
const getFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

/**
 * Salva a análise completa da DRE no Supabase e no cache local
 */
export const saveDREReport = async (processedData) => {
  const reportId = processedData.id || crypto.randomUUID();
  const timestamp = new Date().toISOString();

  const reportRecord = {
    id: reportId,
    filial: processedData.filial || 'Filial Principal',
    data_referencia: processedData.data_referencia || new Date().toISOString().split('T')[0],
    periodo: processedData.periodo || 'Mensal',
    arquivo_nome: processedData.arquivo_nome || 'DRE_Analisada.pdf',
    arquivo_url: processedData.arquivo_url || null,
    data_upload: timestamp,
    status_processamento: 'concluido',
    texto_extraido: processedData.texto_extraido || '',
    confianca_extracao: processedData.confianca_extracao || 100,
    resumo_gestor: processedData.analise?.resumoExecutivo || '',
    dados_completos: processedData,
    created_at: timestamp,
    updated_at: timestamp,
  };

  // 1. Sempre salvar localmente primeiro para resposta instantânea e resiliência
  saveToLocalStorage(reportRecord);

  // 2. Tentar persistência no Supabase
  try {
    const { data: relatorioData, error: relatorioError } = await supabase
      .from('dre_relatorios')
      .upsert(reportRecord, { onConflict: 'id' })
      .select()
      .single();

    if (relatorioError) {
      console.warn('Aviso Supabase (dre_relatorios):', relatorioError.message);
    } else if (processedData.indicadores && Array.isArray(processedData.indicadores)) {
      // Salvar indicadores individuais para relatórios relacionais
      const indicadoresRows = processedData.indicadores.map((ind) => ({
        dre_relatorio_id: reportId,
        categoria: ind.categoria || 'vendas',
        indicador: ind.indicador || ind.nome,
        valor: ind.valor ?? null,
        valor_anterior: ind.valor_anterior ?? null,
        meta: ind.meta ?? null,
        desvio: ind.desvio ?? null,
        desvio_percentual: ind.desvioPercentual ?? null,
        atingimento_percentual: ind.atingimento ?? null,
        unidade: ind.unidade || 'BRL',
        origem: ind.origem || 'PDF',
        pagina_pdf: ind.pagina || 1,
        texto_origem: ind.textoOrigem || '',
        formula: ind.formula || '',
        status_cor: ind.statusCor || 'green',
      }));

      await supabase.from('dre_indicadores').insert(indicadoresRows);
    }
  } catch (err) {
    console.warn('Erro ao sincronizar com Supabase, mantido em cache seguro:', err);
  }

  return reportRecord;
};

/**
 * Busca o histórico de relatórios DRE
 */
export const getDREHistory = async (filial = null) => {
  try {
    let query = supabase
      .from('dre_relatorios')
      .select('*')
      .order('created_at', { ascending: false });

    if (filial) {
      query = query.eq('filial', filial);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn('Buscando histórico do cache local devido a:', err.message);
  }

  // Fallback cache local
  const local = getFromLocalStorage();
  if (filial) {
    return local.filter((r) => r.filial === filial);
  }
  return local;
};

/**
 * Busca um relatório específico por ID
 */
export const getDREById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('dre_relatorios')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) return data;
  } catch (err) {
    console.warn('Buscando relatório por ID no cache local:', err);
  }

  const local = getFromLocalStorage();
  return local.find((r) => r.id === id) || null;
};
