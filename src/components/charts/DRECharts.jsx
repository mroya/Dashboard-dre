import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { formatCurrency, formatPercent } from '../../utils/format';

const DEPARTMENT_COLORS = ['#38bdf8', '#818cf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#f472b6'];

export const DRECharts = ({ indicatorsMap }) => {
  // 1. Dados para Gráfico Comparativo Meta x Realizado por Categoria
  const compareData = [
    {
      name: 'Venda Geral',
      Realizado: indicatorsMap['venda']?.valor || 0,
      Meta: indicatorsMap['venda']?.meta || 0,
    },
    {
      name: 'Medicamentos',
      Realizado: indicatorsMap['medicamentos']?.valor || 0,
      Meta: indicatorsMap['medicamentos']?.meta || 0,
    },
    {
      name: 'Genéricos',
      Realizado: indicatorsMap['genericos']?.valor || 0,
      Meta: indicatorsMap['genericos']?.meta || 0,
    },
    {
      name: 'Higiene/Beleza',
      Realizado: indicatorsMap['higiene_beleza']?.valor || 0,
      Meta: indicatorsMap['higiene_beleza']?.meta || 0,
    },
    {
      name: 'Marca Própria',
      Realizado: indicatorsMap['marca_propria']?.valor || 0,
      Meta: indicatorsMap['marca_propria']?.meta || 0,
    },
    {
      name: 'Digital',
      Realizado: indicatorsMap['canais_digitais']?.valor || 0,
      Meta: indicatorsMap['canais_digitais']?.meta || 0,
    },
  ].filter((d) => d.Realizado > 0 || d.Meta > 0);

  // 2. Dados para Mix de Vendas / Composição
  const mixData = [
    { name: 'Genéricos', value: indicatorsMap['genericos']?.valor || 0 },
    { name: 'RX', value: indicatorsMap['rx']?.valor || 0 },
    { name: 'OTC', value: indicatorsMap['otc']?.valor || 0 },
    { name: 'Higiene e Beleza', value: indicatorsMap['higiene_beleza']?.valor || 0 },
    { name: 'Marca Própria', value: indicatorsMap['marca_propria']?.valor || 0 },
    { name: 'Clinic', value: indicatorsMap['clinic']?.valor || 0 },
    { name: 'Digital', value: indicatorsMap['canais_digitais']?.valor || 0 },
  ].filter((d) => d.value > 0);

  const customBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white mb-1.5">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="font-mono">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const customPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{data.name}</p>
          <p className="font-mono text-cyan-300">
            {formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* GRÁFICO 1: META X REALIZADO */}
      <div className="glass-panel p-5 lg:col-span-2 border-slate-800 flex flex-col">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div>
            <h4 className="font-bold text-white text-base font-heading">
              Meta vs. Realizado por Setor
            </h4>
            <p className="text-xs text-slate-400">Comparativo nominal de faturamento da filial</p>
          </div>
          <span className="badge-status badge-blue text-[10px]">Visão Setorial</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={compareData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
                tickLine={false}
              />
              <Tooltip content={customBarTooltip} />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
              />
              <Bar dataKey="Realizado" fill="#38bdf8" radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Bar dataKey="Meta" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRÁFICO 2: MIX DE VENDAS */}
      <div className="glass-panel p-5 border-slate-800 flex flex-col">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div>
            <h4 className="font-bold text-white text-base font-heading">
              Mix de Participação
            </h4>
            <p className="text-xs text-slate-400">Composição por categoria</p>
          </div>
          <span className="badge-status badge-green text-[10px]">Distribuição</span>
        </div>

        <div className="h-64 w-full flex items-center justify-center">
          {mixData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mixData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {mixData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={customPieTooltip} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-xs text-slate-500">Sem dados suficientes para o mix.</p>
          )}
        </div>
      </div>
    </div>
  );
};
