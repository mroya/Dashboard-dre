import React from 'react';
import { ExecutiveHeaderBanner } from '../components/dashboard/ExecutiveHeaderBanner';
import { NarrativeCards } from '../components/dashboard/NarrativeCards';
import { MotorsAndAnomalies } from '../components/dashboard/MotorsAndAnomalies';

export const DashboardPage = ({ data, onOpenUpload }) => {
  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in space-y-6">
      {/* 1. Header Executivo, Frase de Reunião e Placar de Ouro */}
      <ExecutiveHeaderBanner data={data} onOpenUpload={onOpenUpload} />

      {/* 2. Seções Narrativas Estruturadas (Venda, CMV, Margem Bruta, Despesas, Margem Contribuição) */}
      <NarrativeCards data={data} />

      {/* 3. Motores de Melhora, Anomalias de Custo, Ranking Semafórico e Prioridades do Gestor */}
      <MotorsAndAnomalies data={data} />
    </div>
  );
};

export default DashboardPage;
