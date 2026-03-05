import { Link } from 'react-router-dom';
import { Clock, Users, ChefHat } from 'lucide-react';

export default function RecipeCard({ recipe, index }) {
    // Spoonacular complex-search result shape vs. findByIngredients shape
    const id = recipe.id;
    const title = recipe.title;
    const image = recipe.image;
    const readyInMinutes = recipe.readyInMinutes;
    const servings = recipe.servings;

    // findByIngredients-specific
    const usedCount = recipe.usedIngredientCount ?? null;
    const missedCount = recipe.missedIngredientCount ?? null;

    return (
        <Link
            to={`/recipe/${id}`}
            className="group block card-hover rounded-2xl overflow-hidden glass animate-slide-up"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'backwards' }}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />

                {/* Badges */}
                {usedCount !== null && (
                    <div className="absolute top-3 right-3 flex gap-1.5">
                        <span className="text-xs font-medium bg-brand-500/90 text-white px-2 py-0.5 rounded-full">
                            {usedCount} used
                        </span>
                        {missedCount > 0 && (
                            <span className="text-xs font-medium bg-red-500/80 text-white px-2 py-0.5 rounded-full">
                                {missedCount} missing
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-display font-semibold text-base line-clamp-2 mb-3 group-hover:text-brand-400 transition-colors">
                    {title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-surface-200/50">
                    {readyInMinutes && (
                        <span className="flex items-center gap-1">
                            <Clock size={13} />
                            {readyInMinutes} min
                        </span>
                    )}
                    {servings && (
                        <span className="flex items-center gap-1">
                            <Users size={13} />
                            {servings} servings
                        </span>
                    )}
                    <span className="flex items-center gap-1 ml-auto text-brand-400/60">
                        <ChefHat size={13} />
                        View
                    </span>
                </div>
            </div>
        </Link>
    );
}
