interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => (
  <div role="alert" className="rounded-2xl bg-white/15 px-6 py-8 text-center text-white backdrop-blur-lg">
    <p className="text-lg font-medium">Não foi possível carregar o clima</p>
    <p className="mt-2 text-sm text-white/80">{message}</p>
  </div>
);
