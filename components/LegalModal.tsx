import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  const title = type === 'privacy' ? 'Privacy_Policy.md' : 'Terms_of_Service.md';
  const icon = type === 'privacy' ? <Shield size={14} /> : <FileText size={14} />;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md font-mono"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-zinc-950 border border-zinc-800 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between shrink-0 select-none">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50 hover:bg-red-500 transition-colors cursor-pointer" onClick={onClose} />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 hover:bg-green-500 transition-colors" />
                </div>
                
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                    {icon}
                    <span>user@rio:~/{title}</span>
                </div>

                <div className="w-12"></div>
            </div>

            {/* Content Area */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
                <h2 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                    <span className="text-zinc-600 animate-pulse">&gt;</span> {type === 'privacy' ? 'PROTOCOL: PRIVACY_POLICY' : 'PROTOCOL: TERMS_OF_SERVICE'}
                </h2>

                <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
                {type === 'privacy' ? (
                    <>
                    <div className="space-y-2">
                        <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">[01] DATA_HARVESTING</h3>
                        <p className="border-l-2 border-zinc-800 pl-4">
                            We collect minimal telemetry to optimize system performance. No personal identifiers (PII) are intercepted unless explicitly provided via the contact uplink.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">[02] PACKET_USAGE</h3>
                        <p className="border-l-2 border-zinc-800 pl-4">
                            Data packets are processed solely for portfolio analytics. We do not reroute, sell, or expose your data to third-party nodes. Your session is secure.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">[03] COMMUNICATION_UPLINK</h3>
                        <p className="border-l-2 border-zinc-800 pl-4">
                            Information transmitted via the Contact Module is encrypted and used strictly for establishing a handshake (response). No marketing spam bots will be deployed.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">[04] COOKIE_CACHE</h3>
                        <p className="border-l-2 border-zinc-800 pl-4">
                             This node utilizes <code className="bg-zinc-900 px-1 py-0.5 rounded text-accent text-xs">localStorage</code> to persist user preferences (theme, scroll state). No tracking cookies are injected.
                        </p>
                    </div>
                    </>
                ) : (
                    <>
                    <div className="space-y-2">
                        <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">[01] HANDSHAKE_INIT</h3>
                        <p className="border-l-2 border-zinc-800 pl-4">
                            By establishing a connection to this domain (RioFolio), you acknowledge and accept these protocols. Unauthorized access attempts will be logged.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">[02] INTELLECTUAL_PROPERTY</h3>
                        <p className="border-l-2 border-zinc-800 pl-4">
                            All source code, assets, and visual data rendered on this viewport are the property of the Admin (Rio). Forking is permitted for educational purposes; cloning for profit is prohibited.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">[03] SYSTEM_INTEGRITY</h3>
                        <p className="border-l-2 border-zinc-800 pl-4">
                            The system is provided "AS IS". The Admin assumes no liability for stack overflows, memory leaks, or existential crises resulting from the use of this portfolio.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-zinc-200 font-bold text-xs uppercase tracking-wider">[04] JURISDICTION</h3>
                        <p className="border-l-2 border-zinc-800 pl-4">
                            Any disputes arising from this connection shall be resolved in the Localhost Court of Indonesia.
                        </p>
                    </div>
                    </>
                )}
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
                    <span className="text-xs text-zinc-600 animate-pulse">_CURSOR_IDLE</span>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-zinc-800 text-white font-bold text-xs rounded hover:bg-zinc-700 transition-colors border border-zinc-700"
                    >
                        TERMINATE_SESSION
                    </button>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;