import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const TOAST_STYLES = {
  success: {
    title: 'Berhasil',
    icon: CheckCircle2,
    containerClass: 'border-emerald-300 bg-white shadow-2xl',
    iconWrapClass: 'bg-emerald-100 text-emerald-700',
    titleClass: 'text-emerald-950',
  },
  error: {
    title: 'Terjadi Kesalahan',
    icon: AlertCircle,
    containerClass: 'border-red-300 bg-white shadow-2xl',
    iconWrapClass: 'bg-red-100 text-red-600',
    titleClass: 'text-red-900',
  },
  warning: {
    title: 'Perhatian',
    icon: AlertTriangle,
    containerClass: 'border-amber-300 bg-white shadow-2xl',
    iconWrapClass: 'bg-amber-100 text-amber-700',
    titleClass: 'text-amber-950',
  },
  info: {
    title: 'Informasi',
    icon: Info,
    containerClass: 'border-slate-300 bg-white shadow-2xl',
    iconWrapClass: 'bg-slate-100 text-slate-700',
    titleClass: 'text-slate-900',
  },
};

/**
 * Provides global floating popup notifications (toasts) visible across any scroll position.
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const dismissToast = useCallback((id) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = 'success', options = {}) => {
      if (!message) return;

      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const duration = options.duration ?? 3800;
      const variant = TOAST_STYLES[type] ? type : 'info';

      setToasts((prev) => [
        ...prev.slice(-2),
        {
          id,
          message,
          type: variant,
          title: options.title || TOAST_STYLES[variant].title,
        },
      ]);

      if (duration > 0) {
        const timer = setTimeout(() => {
          dismissToast(id);
        }, duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [dismissToast]
  );

  useEffect(() => {
    const activeTimers = timersRef.current;
    return () => {
      activeTimers.forEach((timer) => clearTimeout(timer));
      activeTimers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      {/* Floating Popup Toast Layer (Highest Layer) */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed top-4 inset-x-4 z-[100] flex flex-col items-center gap-2.5 pointer-events-none"
      >
        {toasts.map((toast) => {
          const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
          const Icon = style.icon;

          return (
            <div
              key={toast.id}
              role="alert"
              className={`toast-pop-in pointer-events-auto w-full max-w-md rounded-2xl border p-4 flex items-start gap-3 ${style.containerClass}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.iconWrapClass}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <p className={`text-xs font-extrabold uppercase tracking-wide ${style.titleClass}`}>
                  {toast.title}
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5 leading-snug">
                  {toast.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Tutup notifikasi"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
