import React from 'react';
import { FileText, History, BarChart3, UploadCloud, Sparkles, Store, Calendar, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const Header = ({
  currentTab,
  setCurrentTab,
  onOpenUpload,
  filial = '778',
  periodo = 'Mês Atual',
  dataRef = '10/08/2026',
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2">
        {/* Logo & Marca */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent font-heading">
                DRE Inteligente
              </span>
              <span className="bg-cyan-500/10 text-cyan-400 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full border border-cyan-500/20 uppercase tracking-wider">
                IA 2.5
              </span>
            </div>
            <p className="hidden sm:block text-xs text-slate-400 font-medium">Leitura, Interpretação & Ação Gerencial</p>
          </div>
        </div>

        {/* Informações da Filial e Período (Desktop/Tablet) */}
        <div className="hidden lg:flex items-center gap-4 bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800/80 shadow-inner">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Store className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-white">Filial {filial}</span>
          </div>
          <div className="w-px h-3.5 bg-slate-700" />
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>{periodo} • {dataRef}</span>
          </div>
        </div>

        {/* Navegação, Seletor Dia/Noite e Upload */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <nav className="flex items-center gap-0.5 sm:gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentTab('dashboard')}
              title="Visão Geral da DRE"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Visão Geral</span>
            </button>

            <button
              onClick={() => setCurrentTab('history')}
              title="Histórico de Relatórios"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'history'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Histórico</span>
            </button>

            <button
              onClick={() => setCurrentTab('compare')}
              title="Metas e Projeções"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'compare'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Comparação</span>
            </button>

            <button
              onClick={() => setCurrentTab('mural')}
              title="Quadro Mural de Loja (Gestão à Vista)"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'mural'
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="hidden sm:inline">Mural Loja</span>
            </button>
          </nav>

          {/* Botão de Alternância Dia / Noite */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Mudar para Modo Dia (Claro)' : 'Mudar para Modo Noite (Escuro)'}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 transition-all text-slate-300 hover:text-white flex items-center justify-center shrink-0"
            aria-label="Alternar tema"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 hover:-rotate-12 transition-transform" />
            )}
          </button>

          <button
            onClick={onOpenUpload}
            className="btn-primary text-xs py-1.5 sm:py-2 px-2.5 sm:px-3.5 shadow-cyan-500/20 shrink-0"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden md:inline">Analisar DRE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
