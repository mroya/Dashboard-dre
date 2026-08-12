-- =====================================================
-- SCHEMA POSTGRESQL / SUPABASE — SISTEMA DRE INTELIGENTE
-- =====================================================

-- 1. TABELA PRINCIPAL DE RELATÓRIOS DRE
CREATE TABLE IF NOT EXISTS public.dre_relatorios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filial VARCHAR(50) NOT NULL,
  data_referencia DATE,
  periodo VARCHAR(100),
  arquivo_nome VARCHAR(255) NOT NULL,
  arquivo_url TEXT,
  data_upload TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status_processamento VARCHAR(50) DEFAULT 'concluido',
  texto_extraido TEXT,
  confianca_extracao NUMERIC(5,2) DEFAULT 100.00,
  resumo_gestor TEXT,
  dados_completos JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices de consulta rápida
CREATE INDEX IF NOT EXISTS idx_dre_relatorios_filial ON public.dre_relatorios(filial);
CREATE INDEX IF NOT EXISTS idx_dre_relatorios_data ON public.dre_relatorios(data_referencia);

-- 2. TABELA DE INDICADORES DETALHADOS E RASTREABILIDADE
CREATE TABLE IF NOT EXISTS public.dre_indicadores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dre_relatorio_id UUID REFERENCES public.dre_relatorios(id) ON DELETE CASCADE,
  categoria VARCHAR(50) NOT NULL, -- 'vendas', 'rentabilidade', 'ticket', 'mix', 'digitais', 'outros'
  indicador VARCHAR(100) NOT NULL,
  valor NUMERIC(15,2),
  valor_anterior NUMERIC(15,2),
  meta NUMERIC(15,2),
  desvio NUMERIC(15,2),
  desvio_percentual NUMERIC(8,4),
  atingimento_percentual NUMERIC(8,4),
  unidade VARCHAR(20) DEFAULT 'BRL', -- 'BRL', 'PERCENT', 'UNIT', 'SCORE'
  origem VARCHAR(50) DEFAULT 'PDF', -- 'PDF', 'CALCULADO', 'PROJECAO', 'ESTIMATIVA'
  pagina_pdf INT DEFAULT 1,
  texto_origem TEXT,
  formula TEXT,
  status_cor VARCHAR(20) DEFAULT 'green', -- 'green', 'yellow', 'orange', 'red', 'blue'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_dre_indicadores_relatorio ON public.dre_indicadores(dre_relatorio_id);

-- 3. TABELA DE ANÁLISES, INSIGHTS E PLANO DE AÇÃO
CREATE TABLE IF NOT EXISTS public.dre_analises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dre_relatorio_id UUID REFERENCES public.dre_relatorios(id) ON DELETE CASCADE,
  nivel VARCHAR(50) NOT NULL, -- 'critico', 'atencao', 'oportunidade', 'destaque'
  indicador VARCHAR(100),
  resultado TEXT NOT NULL,
  explicacao TEXT,
  impacto VARCHAR(20) DEFAULT 'medio', -- 'alto', 'medio', 'baixo'
  recomendacao TEXT,
  prioridade INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_dre_analises_relatorio ON public.dre_analises(dre_relatorio_id);

-- 4. TABELA DE DOCUMENTOS E ARQUIVOS PROCESSADOS
CREATE TABLE IF NOT EXISTS public.dre_documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(100),
  tamanho BIGINT,
  storage_path TEXT,
  status VARCHAR(50) DEFAULT 'processado',
  erro_processamento TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- POLÍTICAS DE SEGURANÇA (Row Level Security - RLS)
-- =====================================================
ALTER TABLE public.dre_relatorios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dre_indicadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dre_analises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dre_documentos ENABLE ROW LEVEL SECURITY;

-- Políticas para leitura e escrita autenticadas / anônimas de uso da filial
CREATE POLICY "Permitir select para anon e autenticados" ON public.dre_relatorios FOR SELECT USING (true);
CREATE POLICY "Permitir insert para anon e autenticados" ON public.dre_relatorios FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update para anon e autenticados" ON public.dre_relatorios FOR UPDATE USING (true);

CREATE POLICY "Permitir select indicadores" ON public.dre_indicadores FOR SELECT USING (true);
CREATE POLICY "Permitir insert indicadores" ON public.dre_indicadores FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir select analises" ON public.dre_analises FOR SELECT USING (true);
CREATE POLICY "Permitir insert analises" ON public.dre_analises FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir select documentos" ON public.dre_documentos FOR SELECT USING (true);
CREATE POLICY "Permitir insert documentos" ON public.dre_documentos FOR INSERT WITH CHECK (true);
