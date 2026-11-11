import React from 'react';
import { X } from 'lucide-react';

/**
 * Shared CMS modal shell with a pinned header, scrollable body, and pinned footer
 * so action buttons remain visible regardless of scroll height.
 */
export default function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidthClass = 'max-w-xl',
  footer,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-3xl ${maxWidthClass} w-full max-h-[90vh] shadow-2xl border border-stone-200 flex flex-col overflow-hidden`}
      >
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-stone-200 flex items-center justify-between gap-4 shrink-0 bg-white">
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">{title}</h3>
            {subtitle && (
              <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 sm:px-8 py-5 overflow-y-auto flex-1">
          {children}
        </div>

        {footer && (
          <div className="px-6 sm:px-8 py-4 border-t border-stone-200 flex items-center justify-end gap-3 shrink-0 bg-white z-10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
