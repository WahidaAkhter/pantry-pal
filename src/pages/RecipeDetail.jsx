import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeDetails } from '../services/api';
import { ArrowLeft, Clock, Users, Heart, ExternalLink } from 'lucide-react';

export default function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await getRecipeDetails(id);
                setRecipe(data);
            } catch (err) {
                setError('Failed to load recipe. Please check your API key and try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-28 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="h-8 w-32 rounded shimmer-bg mb-8" />
                    <div className="h-80 rounded-2xl shimmer-bg mb-8" />
                    <div className="h-6 w-3/4 rounded shimmer-bg mb-4" />
                    <div className="h-4 w-1/2 rounded shimmer-bg mb-8" />
                    <div className="space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-4 rounded shimmer-bg" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="min-h-screen pt-28 px-4 text-center">
                <p className="text-red-400">{error || 'Recipe not found'}</p>
                <Link to="/" className="btn-secondary inline-flex items-center gap-2 mt-4">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>
        );
    }

    const steps =
        recipe.analyzedInstructions?.[0]?.steps || [];

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                {/* Back link */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-surface-200/50 hover:text-brand-400 transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to recipes
                </Link>

                {/* Hero image */}
                <div className="relative rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-black/40">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-64 sm:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
                            {recipe.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-surface-200/60">
                            {recipe.readyInMinutes && (
                                <span className="flex items-center gap-1">
                                    <Clock size={15} className="text-brand-400" />
                                    {recipe.readyInMinutes} min
                                </span>
                            )}
                            {recipe.servings && (
                                <span className="flex items-center gap-1">
                                    <Users size={15} className="text-brand-400" />
                                    {recipe.servings} servings
                                </span>
                            )}
                            {recipe.healthScore && (
                                <span className="flex items-center gap-1">
                                    <Heart size={15} className="text-red-400" />
                                    Health: {recipe.healthScore}%
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Diet / Dish tags */}
                {(recipe.diets?.length > 0 || recipe.dishTypes?.length > 0) && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {recipe.diets?.map((diet) => (
                            <span key={diet} className="text-xs font-medium bg-brand-500/15 text-brand-400 px-3 py-1 rounded-full border border-brand-500/20">
                                {diet}
                            </span>
                        ))}
                        {recipe.dishTypes?.map((type) => (
                            <span key={type} className="text-xs font-medium bg-surface-800/60 text-surface-200/60 px-3 py-1 rounded-full border border-surface-700/30">
                                {type}
                            </span>
                        ))}
                    </div>
                )}

                {/* Summary */}
                {recipe.summary && (
                    <div className="glass rounded-2xl p-6 mb-8">
                        <h2 className="font-display font-semibold text-xl mb-3">About This Recipe</h2>
                        <div
                            className="text-sm text-surface-200/70 leading-relaxed prose-a:text-brand-400 prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: recipe.summary }}
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Ingredients */}
                    <div className="lg:col-span-2">
                        <div className="glass rounded-2xl p-6 sticky top-28">
                            <h2 className="font-display font-semibold text-xl mb-4">🥘 Ingredients</h2>
                            <ul className="space-y-2.5">
                                {recipe.extendedIngredients?.map((ing, i) => (
                                    <li
                                        key={`${ing.id}-${i}`}
                                        className="flex items-start gap-2 text-sm text-surface-200/80"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                                        {ing.original}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="lg:col-span-3">
                        <div className="glass rounded-2xl p-6">
                            <h2 className="font-display font-semibold text-xl mb-4">📋 Instructions</h2>
                            {steps.length > 0 ? (
                                <ol className="space-y-4">
                                    {steps.map((step) => (
                                        <li key={step.number} className="flex gap-4">
                                            <span className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 text-sm font-bold flex items-center justify-center shrink-0">
                                                {step.number}
                                            </span>
                                            <p className="text-sm text-surface-200/80 leading-relaxed pt-1">
                                                {step.step}
                                            </p>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="text-sm text-surface-200/50">
                                    No step-by-step instructions available for this recipe.
                                </p>
                            )}
                        </div>

                        {/* Source link */}
                        {recipe.sourceUrl && (
                            <a
                                href={recipe.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-surface-200/40 hover:text-brand-400 transition-colors mt-6"
                            >
                                <ExternalLink size={14} />
                                View original source
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
