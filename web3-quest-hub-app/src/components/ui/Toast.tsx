'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

function Toast({ toast, onClose }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(toast.id), 300);
    }, toast.duration || 5000);
    
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);
  
  const typeStyles = {
    success: 'border-[var(--terminal-green)] text-[var(--terminal-green)]',
    error: 'border-[var(--error-red)] text-[var(--error-red)]',
    info: 'border-[var(--blockchain-blue)] text-[var(--blockchain-blue)]',
    warning: 'border-[var(--warning-orange)] text-[var(--warning-orange)]',
  };
  
  const icons = {
    success: '✓',
    error: '✗',
    info: 'ℹ',
    warning: '⚠',
  };
  
  return (
    <div
      className={cn(
        'bg-[var(--pixel-dark)] border-4 p-4 min-w-[300px] pixel-shadow',
        typeStyles[toast.type],
        'transition-all duration-300',
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">{icons[toast.type]}</span>
        <p className="pixel-text-base flex-1 font-bold">{toast.message}</p>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => onClose(toast.id), 300);
          }}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const addToast = (type: ToastMessage['type'], message: string, duration?: number) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message, duration }]);
  };
  
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  return {
    toasts,
    addToast,
    removeToast,
    showSuccess: (message: string, duration?: number) => addToast('success', message, duration),
    showError: (message: string, duration?: number) => addToast('error', message, duration),
    showInfo: (message: string, duration?: number) => addToast('info', message, duration),
    showWarning: (message: string, duration?: number) => addToast('warning', message, duration),
  };
}
