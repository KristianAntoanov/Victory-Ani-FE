import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
}

export default function ErrorState({
  title = 'Something went wrong',
  message,
  action,
}: ErrorStateProps) {
  return (
    <div className="state-box" role="alert" data-testid="error-state">
      <AlertTriangle className="ico" size={48} aria-hidden="true" />
      <h3>{title}</h3>
      {message ? <p>{message}</p> : null}
      {action}
    </div>
  );
}
