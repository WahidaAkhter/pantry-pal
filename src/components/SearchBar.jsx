import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, loading }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) onSearch(query.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
            <div className="relative group">
                <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-200/40 group-focus-within:text-brand-400 transition-colors"
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search recipes… e.g. "Pasta", "Chicken Curry"'
                    className="input-field !pl-12 !pr-28"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary !px-4 !py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {loading ? 'Searching…' : 'Search'}
                </button>
            </div>
        </form>
    );
}
