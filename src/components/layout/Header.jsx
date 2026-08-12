import React from 'react';
import { FileText, History, BarChart3, UploadCloud, Sparkles, Store, Calendar } from 'lucide-react';

export const Header = ({
  currentTab,
  setCurrentTab,
  onOpenUpload,
  filial = '778',
  periodo = 'Mês Atual',
  dataRef = '10/08/2026',
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent font-heading">
                DRE Inteligente
              </span>
              <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/20 uppercase tracking-wider">
                IA 2.5
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Leitura, Interpretação & Ação Gerencial</p>
          </div>
        </div>

        {/* Informações da Filial e Período */}
        <div className="hidden md:flex items-center gap-4 bg-slate-900/90 px-4 py-1.5 rounded-xl border border-slate-800/80 shadow-inner">
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

        {/* Navegação e Ação de Upload */}
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => setCurrentTab('history')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'history'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Histórico</span>
            </button>

            <button
              onClick={() => setCurrentTab('compare')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'compare'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Comparação</span>
            </button>
          </nav>

          <button
            onClick={onOpenUpload}
            className="btn-primary text-xs py-2 px-3.5 shadow-cyan-500/20"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Analisar DRE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
