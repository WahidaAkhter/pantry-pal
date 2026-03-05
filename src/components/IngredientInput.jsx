import { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';

export default function IngredientInput({ onSearch, loading }) {
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);

    const addTag = () => {
        const val = text.trim().toLowerCase();
        if (val && !tags.includes(val)) {
            setTags([...tags, val]);
        }
        setText('');
    };

    const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const handleSubmit = () => {
        if (tags.length) onSearch(tags);
    };

    return (
        <div className="w-full max-w-xl mx-auto space-y-4">
            {/* Input row */}
            <div className="flex gap-2">
                <div className="relative flex-1 group">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add an ingredient…"
                        className="input-field !pr-12"
                        disabled={loading}
                    />
                    <button
                        type="button"
                        onClick={addTag}
                        disabled={!text.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center hover:bg-brand-500/30 transition-colors disabled:opacity-30"
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading || tags.length === 0}
                    className="btn-primary !px-5 text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    <Search size={16} />
                    {loading ? 'Searching…' : 'Find Recipes'}
                </button>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 animate-fade-in">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 bg-brand-500/15 text-brand-400 text-sm font-medium px-3 py-1.5 rounded-full border border-brand-500/20"
                        >
                            {tag}
                            <button
                                onClick={() => removeTag(tag)}
                                className="hover:text-red-400 transition-colors"
                                aria-label={`Remove ${tag}`}
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                    <button
                        onClick={() => setTags([])}
                        className="text-xs text-surface-200/50 hover:text-red-400 transition-colors px-2"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
}
