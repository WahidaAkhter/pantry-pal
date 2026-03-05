import axios from 'axios';

// ============================================================
// 🔑  API Keys — Replace with your own keys before testing
// ============================================================
const SPOON_KEY = '9ebe0eda516942f1ba523dbca375b193';
const GEMINI_KEY = 'AIzaSyDtUq70Cn0AuLObCEbUCOInVfWbxPDfuy4';

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
//  Google Gemini AI helper
// ──────────────────────────────────────────────────────────────

const GEMINI_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

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
        `${GEMINI_URL}?key=${GEMINI_KEY}`,
        {
            contents: [
                { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser request: ${prompt}` }] },
            ],
        },
        { headers: { 'Content-Type': 'application/json' } }
    );

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

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
