import axios from 'axios';

// ============================================================
// 🔑  API Keys — loaded from .env file (see .env.example)
// ============================================================
const SPOON_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_KEY;

const spoonApi = axios.create({
    baseURL: 'https://api.spoonacular.com',
    params: { apiKey: SPOON_KEY },
});

// ──────────────────────────────────────────────────────────────
//  Spoonacular helpers
// ──────────────────────────────────────────────────────────────

/** Search recipes by keyword (e.g. "Pasta") */
export const searchRecipes = async (query, number = 9) => {
    const { data } = await spoonApi.get('/recipes/complexSearch', {
        params: {
            query,
            number,
            addRecipeInformation: true,
            fillIngredients: true,
        },
    });
    return data.results;
};

/** Find recipes that can be made from a list of ingredients */
export const getRecipesByIngredients = async (ingredients, number = 9) => {
    const { data } = await spoonApi.get('/recipes/findByIngredients', {
        params: {
            ingredients: Array.isArray(ingredients) ? ingredients.join(',') : ingredients,
            number,
            ranking: 1,
            ignorePantry: true,
        },
    });
    return data;
};

/** Get full recipe details (summary, ingredients, steps) */
export const getRecipeDetails = async (id) => {
    const { data } = await spoonApi.get(`/recipes/${id}/information`, {
        params: { includeNutrition: false },
    });
    return data;
};

// ──────────────────────────────────────────────────────────────
//  OpenRouter AI helper
// ──────────────────────────────────────────────────────────────

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const generateAiRecipe = async (prompt) => {
    const systemPrompt = `You are a world-class chef AI. The user will describe what ingredients they have or what kind of meal they want. 
Generate a creative, delicious recipe in the following strict JSON format (no markdown, no code fences):
{
  "title": "Recipe Name",
  "description": "Short 1-2 sentence description",
  "servings": "2-4",
  "prepTime": "15 mins",
  "cookTime": "30 mins",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "steps": ["Step 1 instruction", "Step 2 instruction"],
  "tips": "A helpful chef's tip"
}`;

    const { data } = await axios.post(
        OPENROUTER_URL,
        {
            model: 'google/gemma-3-27b-it',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `User request: ${prompt}` }
            ]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_KEY}`
            }
        }
    );

    if (data.error) {
        throw new Error(`OpenRouter Error: ${data.error.message || 'Unknown error from AI'}`);
    }

    const text = data.choices?.[0]?.message?.content || '';

    if (!text || text.trim() === '') {
        throw new Error('The AI failed to generate a recipe. Please try again.');
    }

    // Strip possible markdown code fences
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    try {
        return JSON.parse(cleaned);
    } catch {
        return {
            title: 'AI Generated Recipe',
            description: text.slice(0, 200),
            ingredients: [],
            steps: [text],
            tips: '',
            servings: '—',
            prepTime: '—',
            cookTime: '—',
        };
    }
};
