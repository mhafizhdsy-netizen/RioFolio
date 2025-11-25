import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, MessageSquare, Clock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface Comment {
  id: string;
  name: string;
  message: string;
  created_at: string;
  avatar_color: string;
}

const AVATAR_COLORS = [
  'bg-red-500', 'bg-orange-500', 'bg-amber-500', 
  'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 
  'bg-cyan-500', 'bg-blue-500', 'bg-indigo-500', 
  'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 
  'bg-pink-500', 'bg-rose-500'
];

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch comments from Supabase
  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // PERBAIKAN: Menggunakan JSON.stringify agar error object terbaca jelas di console
        console.error('Supabase Error details:', JSON.stringify(error, null, 2));
      } else {
        setComments(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();

    // Setup Realtime subscription
    const subscription = supabase
      .channel('public:comments')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, (payload) => {
        const newComment = payload.new as Comment;
        setComments((prev) => [newComment, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    try {
      const { error } = await supabase
        .from('comments')
        .insert([
          { 
            name: name.trim(), 
            message: message.trim(), 
            avatar_color: randomColor 
          }
        ]);

      if (error) throw error;

      // Success
      setName('');
      setMessage('');
      
      // Auto scroll to top
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      
      // Manual refetch to ensure consistency
      fetchComments();

    } catch (error: any) {
      console.error('Error posting comment:', JSON.stringify(error, null, 2));
      // Tampilkan alert hanya jika benar-benar gagal post agar user tahu
      alert(`Failed to send: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date helper
  const formatDate = (isoString: string) => {
    try {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        }).format(date);
    } catch (e) {
        return 'Just now';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-20 border-t border-zinc-800 pt-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-accent">
                <MessageSquare size={18} />
            </div>
            <div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white">Public Chat</h3>
                <p className="text-xs text-zinc-500 font-mono">Powered by Supabase DB</p>
            </div>
        </div>
        <div className="text-xs font-mono text-zinc-600 px-2 py-1 bg-zinc-900 rounded border border-zinc-800">
            {comments.length} RECORDS
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col: Input Form */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
        >
             <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                    <User className="absolute left-3 top-3 text-zinc-600 group-focus-within:text-accent transition-colors" size={16} />
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="IDENTIFIER / NAME"
                        className="w-full bg-zinc-900/50 border border-zinc-800 text-white text-xs font-mono rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-accent/50 transition-all placeholder:text-zinc-700"
                    />
                </div>
                
                <div className="relative">
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="TRANSMISSION DATA..."
                        rows={4}
                        className="w-full bg-zinc-900/50 border border-zinc-800 text-white text-sm rounded-lg py-3 px-4 focus:outline-none focus:border-accent/50 transition-all placeholder:text-zinc-700 resize-none custom-scrollbar"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting || !name || !message}
                    className="w-full bg-white text-zinc-950 hover:bg-zinc-200 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-white/5"
                >
                    {isSubmitting ? (
                        <span className="animate-pulse">Uploading...</span>
                    ) : (
                        <>
                            <span>Post Message</span>
                            <Send size={14} />
                        </>
                    )}
                </button>
            </form>
        </motion.div>

        {/* Right Col: Scrollable List */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[320px]"
        >
            <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-800 flex items-center justify-between shrink-0">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Recent Logs</span>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar scroll-smooth"
            >
                {isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-700 gap-2">
                        <div className="w-5 h-5 border-2 border-zinc-700 border-t-accent rounded-full animate-spin"></div>
                        <span className="text-xs font-mono">SYNCING DB...</span>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout" initial={false}>
                        {comments.map((comment) => (
                            <motion.div
                                layout
                                key={comment.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative"
                            >
                                <div className="flex gap-3">
                                    <div className={`w-6 h-6 shrink-0 rounded ${comment.avatar_color || 'bg-zinc-700'} flex items-center justify-center text-white font-bold text-[10px] shadow-inner mt-0.5`}>
                                        {comment.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-xs font-bold text-zinc-300 truncate pr-2">{comment.name}</h4>
                                            <div className="text-[9px] text-zinc-600 font-mono whitespace-nowrap flex items-center gap-1">
                                                 <Clock size={8} />
                                                 {formatDate(comment.created_at)}
                                            </div>
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed mt-1 break-words">
                                            {comment.message}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Divider */}
                                <div className="h-px bg-zinc-900 mt-4 w-full"></div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}

                {!isLoading && comments.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-700 gap-2">
                        <MessageSquare size={24} className="opacity-20" />
                        <span className="text-xs">No entries found.</span>
                    </div>
                )}
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Comments;
