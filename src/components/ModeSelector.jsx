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
                    className={`flex-1 w-full sm:w-auto flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-all duration-200
            ${active === id
                            ? 'bg-brand-500/10 border-brand-500/40 text-brand-400 shadow-lg shadow-brand-500/10'
                            : 'border-surface-700/40 text-surface-200 hover:border-surface-700 hover:bg-surface-800/40'
                        }`}
                >
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
