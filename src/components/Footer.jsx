import { ChefHat, Github, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-surface-800/60 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                        <ChefHat size={14} className="text-white" />
                    </div>
                    <span className="font-display font-semibold text-sm">
                        Pantry<span className="gradient-text">Pal</span> AI
                    </span>
                </div>

                <p className="text-xs text-surface-200/40 flex items-center gap-1">
                    Built with <Heart size={12} className="text-red-400" /> using React, Tailwind &amp; Gemini AI
                </p>

                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-surface-200/40 hover:text-surface-200 transition-colors"
                >
                    <Github size={20} />
                </a>
            </div>
        </footer>
    );
}
