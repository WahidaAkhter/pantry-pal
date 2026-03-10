import RecipeCard from './RecipeCard';
import { UtensilsCrossed } from 'lucide-react';

function SkeletonCard() {
    return (
        <div className="rounded-2xl overflow-hidden glass">
            <div className="h-48 shimmer-bg" />
            <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 rounded shimmer-bg" />
                <div className="h-3 w-1/2 rounded shimmer-bg" />
            </div>
        </div>
    );
}

export default function RecipeGrid({ recipes, loading, emptyMessage }) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (!recipes || recipes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in glass-light rounded-2xl border border-surface-700/30 max-w-2xl mx-auto shadow-inner">
                <div className="w-16 h-16 rounded-full bg-surface-800/80 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)] text-surface-600">
                    <UtensilsCrossed size={32} />
                </div>
                <h3 className="text-xl font-display font-semibold text-surface-100 mb-2">
                    {emptyMessage || 'No recipes found'}
                </h3>
                <p className="text-surface-200/50 text-sm max-w-sm">
                    Try adjusting your search terms or adding more ingredients to your pantry list.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, i) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={i} />
            ))}
        </div>
    );
}
