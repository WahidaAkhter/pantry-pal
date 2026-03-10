import { useState } from 'react';
import Hero from '../components/Hero';
import ModeSelector from '../components/ModeSelector';
import SearchBar from '../components/SearchBar';
import IngredientInput from '../components/IngredientInput';
import AiPromptInput from '../components/AiPromptInput';
import RecipeGrid from '../components/RecipeGrid';
import AiRecipeModal from '../components/AiRecipeModal';
import { searchRecipes, getRecipesByIngredients, generateAiRecipe } from '../services/api';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
    const [mode, setMode] = useState('search');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);
    const [aiRecipe, setAiRecipe] = useState(null);
    const [aiWarning, setAiWarning] = useState('');

    const handleSearch = async (query) => {
        setLoading(true);
        setError('');
        setSearched(true);
        setAiRecipe(null);
        try {
            const data = await searchRecipes(query);
            setRecipes(data);
        } catch (err) {
            setError('Failed to search recipes. Please check your API key and try again.');
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePantrySearch = async (ingredients) => {
        setLoading(true);
        setError('');
        setSearched(true);
        setAiRecipe(null);
        try {
            const data = await getRecipesByIngredients(ingredients);
            setRecipes(data);
        } catch (err) {
            setError('Failed to find recipes by ingredients. Please check your API key and try again.');
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAiGenerate = async (prompt) => {
        setLoading(true);
        setError('');
        setAiWarning('');
        setSearched(true);
        setRecipes([]);

        const warningTimer = setTimeout(() => {
            setAiWarning('The AI is taking longer than usual. Please wait...');
        }, 8000);

        try {
            const data = await generateAiRecipe(prompt);
            setAiRecipe(data);
            setAiWarning(''); // Clear warning if successful before timeout
        } catch (err) {
            setError(err.message || 'Failed to generate AI recipe. Please check your API key and try again.');
            setAiWarning(''); // Clear warning on error
        } finally {
            clearTimeout(warningTimer);
            setLoading(false);
        }
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        setRecipes([]);
        setError('');
        setAiWarning('');
        setSearched(false);
        setAiRecipe(null);
    };

    return (
        <>
            <Hero />

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">
                            How It <span className="gradient-text">Works</span>
                        </h2>
                        <p className="text-surface-200/50 max-w-lg mx-auto">Three powerful ways to discover your next meal</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                step: '01',
                                title: 'Search Mode',
                                desc: 'Type any keyword like "Pasta" or "Chicken Curry" to browse recipes from our database.',
                                color: 'from-blue-500/20 to-blue-600/20',
                                border: 'border-blue-500/20',
                            },
                            {
                                step: '02',
                                title: 'Pantry Mode',
                                desc: 'Add ingredients you already have and find recipes that match — reduce your food waste!',
                                color: 'from-brand-500/20 to-brand-600/20',
                                border: 'border-brand-500/20',
                            },
                            {
                                step: '03',
                                title: 'AI Chef',
                                desc: 'Describe your cravings or leftovers in plain English — our AI will craft a unique recipe.',
                                color: 'from-purple-500/20 to-purple-600/20',
                                border: 'border-purple-500/20',
                            },
                        ].map(({ step, title, desc, color, border }) => (
                            <div
                                key={step}
                                className={`glass rounded-2xl p-6 border ${border} hover:scale-[1.02] transition-transform duration-300`}
                            >
                                <span className={`inline-block font-display font-bold text-xs uppercase tracking-widest bg-gradient-to-r ${color} px-3 py-1 rounded-full mb-4`}>
                                    Step {step}
                                </span>
                                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                                <p className="text-sm text-surface-200/50 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Search section */}
            <section id="search" className="py-16 px-4">
                <div className="max-w-5xl mx-auto space-y-8">
                    <div className="text-center">
                        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">
                            Find Your <span className="gradient-text">Recipe</span>
                        </h2>
                        <p className="text-surface-200/50">Choose a mode and start cooking</p>
                    </div>

                    <ModeSelector active={mode} onChange={handleModeChange} />

                    <div className="pt-2">
                        {mode === 'search' && <SearchBar onSearch={handleSearch} loading={loading} />}
                        {mode === 'pantry' && <IngredientInput onSearch={handlePantrySearch} loading={loading} />}
                        {mode === 'ai' && <AiPromptInput onGenerate={handleAiGenerate} loading={loading} />}
                    </div>

                    {error && (
                        <div className="text-center animate-fade-in">
                            <p className="text-red-400 text-sm glass-light inline-block px-4 py-2 rounded-xl">{error}</p>
                        </div>
                    )}

                    {aiWarning && loading && mode === 'ai' && (
                        <div className="text-center animate-fade-in -mt-4">
                            <p className="text-yellow-400/90 text-sm glass-light inline-block px-4 py-2 rounded-xl flex items-center gap-2 mx-auto w-fit">
                                <Sparkles size={14} className="animate-pulse" />
                                {aiWarning}
                            </p>
                        </div>
                    )}

                    {/* AI result card */}
                    {mode === 'ai' && aiRecipe && !loading && (
                        <div className="max-w-xl mx-auto animate-slide-up">
                            <button
                                onClick={() => setAiRecipe(aiRecipe)}
                                className="w-full glass rounded-2xl p-6 text-left card-hover group border border-purple-500/20"
                            >
                                <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                    <Sparkles size={14} />
                                    AI-Generated
                                </div>
                                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-purple-400 transition-colors">
                                    {aiRecipe.title}
                                </h3>
                                <p className="text-sm text-surface-200/50 mb-3">{aiRecipe.description}</p>
                                <span className="inline-flex items-center gap-1 text-sm text-purple-400 font-medium">
                                    View Full Recipe <ArrowRight size={14} />
                                </span>
                            </button>
                        </div>
                    )}

                    {/* Spoonacular results grid */}
                    {mode !== 'ai' && searched && (
                        <RecipeGrid
                            recipes={recipes}
                            loading={loading}
                            emptyMessage={mode === 'pantry' ? 'No recipes found with those ingredients' : 'No recipes found'}
                        />
                    )}
                </div>
            </section>

            {/* AI Recipe Modal */}
            {aiRecipe && mode === 'ai' && (
                <AiRecipeModal recipe={aiRecipe} onClose={() => setAiRecipe(null)} />
            )}
        </>
    );
}
