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
            className="group block card-hover rounded-2xl overflow-hidden glass hover:glass-light animate-slide-up"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'backwards' }}
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/20 to-transparent" />

                {/* Badges */}
                {usedCount !== null && (
                    <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-brand-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full shadow-lg border border-brand-400/30">
                            {usedCount} Used
                        </span>
                        {missedCount > 0 && (
                            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-rose-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full shadow-lg border border-rose-400/30">
                                {missedCount} Missing
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between h-[120px]">
                <h3 className="font-display font-semibold text-lg line-clamp-2 text-surface-50 group-hover:text-brand-400 transition-colors duration-300">
                    {title}
                </h3>

                <div className="flex items-center gap-4 text-xs font-medium text-surface-200/60 mt-auto">
                    {readyInMinutes && (
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} className="text-surface-200/40" />
                            {readyInMinutes} min
                        </span>
                    )}
                    {servings && (
                        <span className="flex items-center gap-1.5">
                            <Users size={14} className="text-surface-200/40" />
                            {servings} servings
                        </span>
                    )}
                    <span className="flex items-center gap-1.5 ml-auto text-brand-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <ChefHat size={14} />
                        View
                    </span>
                </div>
            </div>
        </Link>
    );
}
