interface LoadingStateProps {
  label?: string;
}

export default function LoadingState({ label = 'Loading…' }: LoadingStateProps) {
  return (
    <div className="state-box" role="status" aria-live="polite" data-testid="loading-state">
      <span className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
