import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  
  // Dynamic Configuration based on Type
  // Note: We use style objects for shadows to leverage the CSS variable --accent-rgb directly
  const config = {
    success: {
      icon: CheckCircle,
      textColor: 'text-accent',
      borderColor: 'border-accent/50',
      bgColor: 'bg-accent/10',
      indicatorColor: 'bg-accent',
      shadowStyle: { boxShadow: '0 0 20px -5px rgba(var(--accent-rgb), 0.3)' },
      title: 'EXEC_SUCCESS',
    },
    error: {
      icon: AlertCircle,
      textColor: 'text-red-500',
      borderColor: 'border-red-500/50',
      bgColor: 'bg-red-500/10',
      indicatorColor: 'bg-red-500',
      shadowStyle: { boxShadow: '0 0 20px -5px rgba(239, 68, 68, 0.3)' },
      title: 'EXEC_ERROR',
    },
    info: {
      icon: Info,
      textColor: 'text-blue-500',
      borderColor: 'border-blue-500/50',
      bgColor: 'bg-blue-500/10',
      indicatorColor: 'bg-blue-500',
      shadowStyle: { boxShadow: '0 0 20px -5px rgba(59, 130, 246, 0.3)' },
      title: 'SYSTEM_INFO',
    }
  };

  const style = config[toast.type];
  const Icon = style.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={style.shadowStyle}
      className={`
        pointer-events-auto relative w-full overflow-hidden 
        rounded-xl border ${style.borderColor} bg-zinc-950/95 p-4 
        backdrop-blur-md flex items-start gap-3 group
      `}
    >
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
        
        {/* Accent Glow on Left */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.indicatorColor}`} />

        {/* Icon */}
        <div className={`mt-0.5 shrink-0 ${style.textColor} p-1.5 rounded-lg ${style.bgColor} border border-white/5`}>
            <Icon size={18} strokeWidth={2.5} />
        </div>

        <div className="flex-1 z-10 min-w-0">
            <div className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-0.5 ${style.textColor} flex items-center gap-2`}>
                <span>&gt; {style.title}</span>
                <span className={`w-1 h-1 rounded-full ${style.indicatorColor} animate-pulse`}></span>
            </div>
            <p className="text-sm font-medium text-zinc-200 leading-snug break-words">
                {toast.message}
            </p>
        </div>

        <button 
            onClick={() => onRemove(toast.id)}
            className="text-zinc-600 hover:text-white transition-colors shrink-0 z-10 p-1 hover:bg-zinc-800 rounded-md -mt-1 -mr-1"
        >
            <X size={14} />
        </button>
        
        {/* Progress Bar */}
        <motion.div 
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 4, ease: "linear" }}
            className={`absolute bottom-0 left-0 right-0 h-[2px] ${style.indicatorColor} origin-left opacity-30`}
        />
    </motion.div>
  );
};