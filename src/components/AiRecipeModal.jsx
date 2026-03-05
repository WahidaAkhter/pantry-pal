import { X, Clock, Users, ChefHat, Lightbulb } from 'lucide-react';

export default function AiRecipeModal({ recipe, onClose }) {
    if (!recipe) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-6 sm:p-8 animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-surface-800 hover:bg-surface-700 flex items-center justify-center text-surface-200 transition-colors"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-2">
                        <ChefHat size={14} />
                        AI-Generated Recipe
                    </div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl leading-tight">
                        {recipe.title}
                    </h2>
                    {recipe.description && (
                        <p className="text-surface-200/60 mt-2">{recipe.description}</p>
                    )}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-surface-200/60">
                    {recipe.prepTime && recipe.prepTime !== '—' && (
                        <span className="flex items-center gap-1.5 glass-light px-3 py-1.5 rounded-full">
                            <Clock size={14} className="text-brand-400" />
                            Prep: {recipe.prepTime}
                        </span>
                    )}
                    {recipe.cookTime && recipe.cookTime !== '—' && (
                        <span className="flex items-center gap-1.5 glass-light px-3 py-1.5 rounded-full">
                            <Clock size={14} className="text-brand-400" />
                            Cook: {recipe.cookTime}
                        </span>
                    )}
                    {recipe.servings && recipe.servings !== '—' && (
                        <span className="flex items-center gap-1.5 glass-light px-3 py-1.5 rounded-full">
                            <Users size={14} className="text-brand-400" />
                            {recipe.servings} servings
                        </span>
                    )}
                </div>

                {/* Ingredients */}
                {recipe.ingredients?.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                            🥘 Ingredients
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {recipe.ingredients.map((ing, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-surface-200/80"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                                    {ing}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Steps */}
                {recipe.steps?.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                            📋 Instructions
                        </h3>
                        <ol className="space-y-3">
                            {recipe.steps.map((step, i) => (
                                <li key={i} className="flex gap-3 text-sm text-surface-200/80">
                                    <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Tips */}
                {recipe.tips && (
                    <div className="glass-light rounded-xl p-4 flex gap-3">
                        <Lightbulb size={20} className="text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-1">Chef's Tip</p>
                            <p className="text-sm text-surface-200/70">{recipe.tips}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
