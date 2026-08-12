import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { parseDREDocument } from '../../parsers/PDFParser';
import { saveDREReport } from '../../repositories/dreRepository';

export const UploadModal = ({ isOpen, onClose, onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState({ step: 1, label: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (!selected.name.toLowerCase().endsWith('.pdf')) {
        setErrorMessage('Por favor, selecione um arquivo em formato PDF.');
        return;
      }
      setFile(selected);
      setErrorMessage(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      if (!dropped.name.toLowerCase().endsWith('.pdf')) {
        setErrorMessage('Apenas arquivos PDF são suportados.');
        return;
      }
      setFile(dropped);
      setErrorMessage(null);
    }
  };

  const handleStartAnalysis = async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Processar com Gemini e PDF Parser
      const resultado = await parseDREDocument(file, (progress) => {
        setCurrentStep(progress);
      });

      // 2. Salvar no Supabase / Repositório
      await saveDREReport(resultado);

      // 3. Concluir e notificar componente pai
      setIsProcessing(false);
      onClose();
      onAnalysisComplete(resultado);
    } catch (err) {
      console.error('Erro na análise da DRE:', err);
      setIsProcessing(false);
      setErrorMessage(err.message || 'Falha ao processar o arquivo. Revise o PDF ou tente novamente.');
    }
  };

  const stepsList = [
    { num: 1, label: 'Lendo documento original...' },
    { num: 2, label: 'Identificando indicadores no PDF...' },
    { num: 3, label: 'Calculando metas, desvios e projeções...' },
    { num: 4, label: 'Interpretando resultados com IA...' },
    { num: 5, label: 'Preparando validação e plano de ação...' },
  ];

  return (
    <div className="modal-overlay">
      <div className="glass-panel-elevated w-full max-w-xl p-6 sm:p-8 animate-fade-in relative border border-slate-700/80 shadow-2xl">
        {/* Fechar */}
        {!isProcessing && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">Analisar DRE da Filial</h2>
          <p className="text-sm text-slate-400 mt-1">
            Envie sua DRE e deixe a inteligência artificial transformar números em decisões práticas.
          </p>
        </div>

        {/* Mensagem de Erro */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-sm">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-200">Atenção</p>
              <p className="text-xs text-red-300/90 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Estado 1: Upload Dropzone */}
        {!isProcessing ? (
          <div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                file
                  ? 'border-cyan-500/60 bg-cyan-500/5'
                  : 'border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/70'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {file ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-white text-sm mt-1">{file.name}</p>
                  <p className="text-xs text-slate-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Clique para trocar
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-slate-200 text-sm mt-1">
                    Arraste o arquivo PDF aqui ou clique para selecionar
                  </p>
                  <p className="text-xs text-slate-500">Documentos DRE, Fechamento ou Indicadores Foco</p>
                </div>
              )}
            </div>

            {/* Botão de Enviar */}
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={onClose} className="btn-secondary text-sm">
                Cancelar
              </button>
              <button
                onClick={handleStartAnalysis}
                disabled={!file}
                className={`btn-primary text-sm ${!file ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Iniciar Análise Inteligente</span>
              </button>
            </div>
          </div>
        ) : (
          /* Estado 2: Animação dos 5 passos */
          <div className="py-4">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 text-cyan-400 animate-pulse" />
                </div>
              </div>
            </div>

            <p className="text-center font-bold text-white text-base mb-6 font-heading">
              {currentStep.label || 'Processando DRE...'}
            </p>

            {/* Stepper Visual */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              {stepsList.map((step) => {
                const isCompleted = currentStep.step > step.num;
                const isCurrent = currentStep.step === step.num;

                return (
                  <div key={step.num} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/20 animate-pulse'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isCompleted
                          ? 'text-emerald-400 line-through opacity-80'
                          : isCurrent
                          ? 'text-cyan-300 font-semibold'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
