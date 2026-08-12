import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans">
          <div className="glass-panel p-8 max-w-lg w-full text-center border-red-500/30">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2 font-heading">
              Algo inesperado ocorreu ao carregar a visualização
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              {this.state.error?.message || 'Erro de renderização na interface.'}
            </p>
            <div className="bg-slate-900/90 p-3 rounded-xl text-left font-mono text-[11px] text-red-300/80 mb-6 overflow-x-auto max-h-32 border border-slate-800">
              {this.state.error?.stack || String(this.state.error)}
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary text-xs py-2 px-4"
              >
                <RefreshCw className="w-4 h-4" />
                Recarregar Página
              </button>
              <button
                onClick={this.handleReset}
                className="btn-secondary text-xs py-2 px-4 text-slate-300"
              >
                Limpar Cache e Reiniciar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
