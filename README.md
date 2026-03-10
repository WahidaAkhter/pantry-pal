# 🍳 PantryPal AI — Smart Recipe Finder

**[Live Demo](https://pantry-pal-ai.netlify.app/)**

PantryPal AI is a modern, AI-powered recipe discovery app that helps you find delicious recipes from ingredients you already have. Search by keyword, enter pantry ingredients, or let **Google Gemma 3 via OpenRouter** generate creative recipes on the fly — reducing food waste one meal at a time.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Features

- 🔍 **Keyword Search** — Search thousands of recipes by name using the Spoonacular API
- 🥕 **Pantry Mode** — Enter ingredients you have on hand and discover what you can cook
- 🤖 **AI Recipe Generator** — Describe any craving and Google Gemma 3 (via OpenRouter) generates a full recipe with steps, ingredients & tips
- 📖 **Detailed Recipe View** — See full instructions, ingredient lists, prep/cook times, and nutritional info
- 🌙 **Dark Mode UI** — Sleek dark-themed interface with smooth animations and glassmorphism effects
- 📱 **Fully Responsive** — Looks great on all screen sizes

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 7](https://vite.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) & [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) |
| **Recipe API** | [Spoonacular API](https://spoonacular.com/food-api) |
| **AI** | [Google Gemma 3 27B](https://openrouter.ai/models/google/gemma-3-27b-it) (via OpenRouter) |
| **Linting** | [ESLint 9](https://eslint.org/) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/pantry-pal.git
cd pantry-pal

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

The app uses two external APIs. Create a `.env` file in the root directory and add your own keys:

- **Spoonacular API** — Get a free key at [spoonacular.com](https://spoonacular.com/food-api)
- **OpenRouter API** — Get a free key at [openrouter.ai](https://openrouter.ai/). By default, the app requests the completely free `google/gemma-3-27b-it` model so you won't be charged for AI usage.

```env
VITE_SPOONACULAR_KEY=your_spoonacular_key_here
VITE_OPENROUTER_KEY=your_openrouter_key_here
```

---

## 📁 Project Structure

```
pantry-pal/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images & media
│   ├── components/          # Reusable UI components
│   │   ├── AiPromptInput    # AI prompt text input
│   │   ├── AiRecipeModal    # Modal for AI-generated recipes
│   │   ├── Hero             # Landing hero section
│   │   ├── IngredientInput  # Pantry ingredient entry
│   │   ├── ModeSelector     # Search/Pantry/AI mode toggle
│   │   ├── Navbar           # Top navigation bar
│   │   ├── RecipeCard       # Individual recipe card
│   │   ├── RecipeGrid       # Grid layout for recipe cards
│   │   ├── SearchBar        # Keyword search input
│   │   └── Footer           # Site footer
│   ├── pages/
│   │   ├── Home             # Main landing & search page
│   │   └── RecipeDetail     # Full recipe detail page
│   ├── services/
│   │   └── api.js           # Spoonacular & OpenRouter API integrations
│   ├── App.jsx              # Root component with routing
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── tailwind.config.js       # Tailwind theme & animations config
├── vite.config.js           # Vite configuration
└── package.json
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
