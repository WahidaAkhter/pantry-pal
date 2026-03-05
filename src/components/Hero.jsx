import { ArrowDown, Sparkles, Leaf, SearchCheck } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Animated background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-600/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-400/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="max-w-5xl mx-auto px-4 text-center animate-fade-in">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-sm text-brand-400">
                    <Sparkles size={14} />
                    <span>Powered by AI · Reduce Food Waste</span>
                </div>

                <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight mb-6">
                    Cook Smarter with
                    <br />
                    <span className="gradient-text">What You Have</span>
                </h1>

                <p className="text-lg sm:text-xl text-surface-200/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Type your ingredients, search for inspiration, or let our AI chef craft the
                    perfect recipe — all from what's already in your kitchen.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <a href="#search" className="btn-primary text-base flex items-center gap-2">
                        <SearchCheck size={18} />
                        Find Recipes Now
                    </a>
                    <a href="#how-it-works" className="btn-secondary flex items-center gap-2">
                        <span>See How It Works</span>
                        <ArrowDown size={16} />
                    </a>
                </div>

                {/* Feature chips */}
                <div id="features" className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    {[
                        { icon: <SearchCheck size={16} />, label: 'Smart Search' },
                        { icon: <Leaf size={16} />, label: 'Pantry Mode' },
                        { icon: <Sparkles size={16} />, label: 'AI Generation' },
                    ].map(({ icon, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-2 glass-light rounded-full px-5 py-2.5 text-surface-200 hover:text-brand-400 hover:border-brand-500/30 transition-colors cursor-default"
                        >
                            {icon}
                            {label}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
