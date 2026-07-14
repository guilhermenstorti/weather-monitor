export const LoadingIndicator = () => (
  <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 text-white">
    <span className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
    <span className="text-sm text-white/80">Carregando previsão do tempo...</span>
  </div>
);
