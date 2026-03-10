import { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

export default function AiPromptInput({ onGenerate, loading }) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim()) onGenerate(prompt.trim());
    };

    const suggestions = [
        'I have leftover chicken and some yogurt — make something spicy',
        'Quick 10-minute breakfast with eggs and cheese',
        'Healthy vegan dinner using lentils and spinach',
    ];

    return (
        <div className="w-full max-w-xl mx-auto space-y-4">
            <form onSubmit={handleSubmit} className="relative">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (prompt.trim() && !loading) {
                                handleSubmit(e);
                            }
                        }
                    }}
                    placeholder="Describe what you have or what you're craving…"
                    rows={3}
                    className="input-field !pr-14 resize-none"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="absolute right-3 bottom-3 w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <Sparkles size={18} className="animate-pulse" />
                    ) : (
                        <Send size={18} />
                    )}
                </button>
            </form>

            {/* Suggestion chips */}
            <div className="space-y-2">
                <span className="text-xs text-surface-200/40 font-medium uppercase tracking-wider">Try these</span>
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                        <button
                            key={s}
                            onClick={() => setPrompt(s)}
                            className="text-xs glass-light rounded-full px-3 py-1.5 text-surface-200/70 hover:text-brand-400 hover:border-brand-500/30 transition-colors text-left"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
