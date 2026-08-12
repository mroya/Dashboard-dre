import React, { useState } from 'react';
import { Target, CheckCircle2, ChevronRight, Zap, CheckSquare, Square } from 'lucide-react';

export const ActionPlanSection = ({ actions = [] }) => {
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (idx) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const getBorderColor = (cor) => {
    if (cor === 'red') return 'border-red-500/30 hover:border-red-500/60 bg-red-950/10';
    if (cor === 'orange') return 'border-orange-500/30 hover:border-orange-500/60 bg-orange-950/10';
    return 'border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-950/10';
  };

  const getBadgeClass = (cor) => {
    if (cor === 'red') return 'badge-red';
    if (cor === 'orange') return 'badge-orange';
    return 'badge-green';
  };

  return (
    <div className="glass-panel p-6 mb-6 border-slate-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              🎯 Plano de Ação Estratégico
            </h3>
            <p className="text-xs text-slate-400">
              O que o gestor e a equipe devem executar hoje para atingir a meta.
            </p>
          </div>
        </div>
        <span className="badge-status badge-blue text-xs">
          {actions.length} Prioridades Mapeadas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((item, idx) => {
          const isDone = !!completedTasks[idx];

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${getBorderColor(item.cor)} ${
                isDone ? 'opacity-60 bg-slate-900/40' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`badge-status text-[10px] ${getBadgeClass(item.cor)}`}>
                  {item.badge || `PRIORIDADE ${idx + 1}`}
                </span>

                <button
                  onClick={() => toggleTask(idx)}
                  className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  {isDone ? (
                    <>
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold text-[11px]">Concluída</span>
                    </>
                  ) : (
                    <>
                      <Square className="w-4 h-4 text-slate-500" />
                      <span className="text-[11px]">Marcar</span>
                    </>
                  )}
                </button>
              </div>

              <h4 className={`text-base font-bold text-white mb-2 ${isDone ? 'line-through text-slate-400' : ''}`}>
                {item.titulo}
              </h4>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 mb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Motivo:
                </span>
                <p className="text-xs text-slate-300">
                  {item.motivo}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1 mb-1">
                  <Zap className="w-3 h-3" /> Ação Sugerida:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/20">
                  {item.acaoSugerida}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
