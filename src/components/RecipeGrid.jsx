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
            <div className="text-center py-16 animate-fade-in">
                <UtensilsCrossed size={48} className="mx-auto text-surface-700 mb-4" />
                <p className="text-surface-200/50 text-lg">{emptyMessage || 'No recipes found'}</p>
                <p className="text-surface-200/30 text-sm mt-1">Try a different search or add more ingredients</p>
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
