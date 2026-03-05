import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // close mobile menu on route change
    useEffect(() => setMenuOpen(false), [location]);

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
                    ? 'glass shadow-lg shadow-black/20 py-3'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow">
                        <ChefHat size={20} className="text-white" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight">
                        Pantry<span className="gradient-text">Pal</span> AI
                    </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6">
                    <a href="#features" className="text-sm text-surface-200 hover:text-brand-400 transition-colors">Features</a>
                    <a href="#how-it-works" className="text-sm text-surface-200 hover:text-brand-400 transition-colors">How It Works</a>
                    <a href="#search" className="btn-primary text-sm !px-5 !py-2">Start Cooking</a>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-surface-200 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4 animate-fade-in flex flex-col gap-3">
                    <a href="#features" className="text-sm text-surface-200 hover:text-brand-400 transition-colors py-2">Features</a>
                    <a href="#how-it-works" className="text-sm text-surface-200 hover:text-brand-400 transition-colors py-2">How It Works</a>
                    <a href="#search" className="btn-primary text-sm text-center">Start Cooking</a>
                </div>
            )}
        </nav>
    );
}
