import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { generateId } from '@/utils';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  notify: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const TOAST_EXIT_MS = 220;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [dismissingToastIds, setDismissingToastIds] = useState<Set<string>>(() => new Set());
  const dismissingToastIdsRef = useRef<Set<string>>(new Set());

  const dismiss = useCallback((id: string) => {
    if (dismissingToastIdsRef.current.has(id)) return;

    dismissingToastIdsRef.current.add(id);
    setDismissingToastIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      dismissingToastIdsRef.current.delete(id);
      setDismissingToastIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, TOAST_EXIT_MS);
  }, []);

  const notify = useCallback(
    (type: ToastType, message: string) => {
      const id = generateId();
      setToasts((prev) => [...prev, { id, type, message }]);
      window.setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      notify,
      success: (m) => notify('success', m),
      error: (m) => notify('error', m),
      info: (m) => notify('info', m),
    }),
    [notify],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" role="region" aria-live="polite" aria-label="Notifications">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          const isDismissing = dismissingToastIds.has(toast.id);
          return (
            <div
              key={toast.id}
              className={`toast toast--${toast.type}${isDismissing ? ' is-dismissing' : ''}`}
              role="status"
            >
              <Icon size={18} aria-hidden="true" />
              <span className="toast__message">{toast.message}</span>
              <button
                type="button"
                className="toast__close"
                aria-label="Dismiss notification"
                onClick={() => dismiss(toast.id)}
                data-testid="toast-dismiss-button"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
