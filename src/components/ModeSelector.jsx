import { SearchCheck, Leaf, Sparkles } from 'lucide-react';

const modes = [
    { id: 'search', label: 'Search', icon: <SearchCheck size={18} />, desc: 'Search by keyword' },
    { id: 'pantry', label: 'Pantry', icon: <Leaf size={18} />, desc: 'Use your ingredients' },
    { id: 'ai', label: 'AI Chef', icon: <Sparkles size={18} />, desc: 'Generate with AI' },
];

export default function ModeSelector({ active, onChange }) {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mx-auto">
            {modes.map(({ id, label, icon, desc }) => (
                <button
                    key={id}
                    onClick={() => onChange(id)}
                    className={`flex-1 w-full sm:w-auto flex items-center gap-3 px-5 py-4 rounded-xl border transition-all duration-300 relative overflow-hidden group
            ${active === id
                            ? 'bg-brand-500/10 border-brand-400/50 text-brand-400 shadow-[0_0_20px_rgba(34,197,94,0.15)] scale-[1.02]'
                            : 'border-surface-700/40 text-surface-200 hover:border-surface-600 hover:bg-surface-800/60'
                        }`}
                >
                    {active === id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-transparent shimmer-bg opacity-50 pointer-events-none" />
                    )}
                    <span className={`${active === id ? 'text-brand-400' : 'text-surface-200/60'} transition-colors`}>
                        {icon}
                    </span>
                    <div className="text-left">
                        <div className="font-semibold text-sm leading-none mb-0.5">{label}</div>
                        <div className="text-xs text-surface-200/50">{desc}</div>
                    </div>
                </button>
            ))}
        </div>
    );
}
