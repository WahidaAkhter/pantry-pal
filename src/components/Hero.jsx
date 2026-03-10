import { ArrowDown, Sparkles, Leaf, SearchCheck } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Animated organic background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
                <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] bg-blue-500/10 rounded-full blur-[120px] animate-blob mix-blend-screen" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-emerald-400/15 rounded-full blur-[120px] animate-blob mix-blend-screen" style={{ animationDelay: '4s' }} />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="max-w-5xl mx-auto px-4 text-center animate-fade-in relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 text-sm font-medium text-brand-300 shadow-[0_0_15px_rgba(34,197,94,0.15)] border-brand-500/30">
                    <Sparkles size={16} className="text-brand-400 animate-pulse" />
                    <span>Powered by AI · Reduce Food Waste</span>
                </div>

                <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight mb-6 drop-shadow-2xl text-white">
                    Cook Smarter with
                    <br />
                    <span className="gradient-text drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">What You Have</span>
                </h1>

                <p className="text-lg sm:text-xlg text-surface-200/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    Type your ingredients, search for inspiration, or let our AI chef craft the
                    perfect recipe — all from what's already in your kitchen.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
                    <a href="#search" className="btn-primary text-base flex items-center gap-2 group">
                        <SearchCheck size={18} className="group-hover:scale-110 transition-transform" />
                        Find Recipes Now
                    </a>
                    <a href="#how-it-works" className="btn-secondary flex items-center gap-2 group">
                        <span>See How It Works</span>
                        <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                    </a>
                </div>

                {/* Feature chips */}
                <div id="features" className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
                    {[
                        { icon: <SearchCheck size={16} />, label: 'Smart Search', color: 'group-hover:text-blue-400 group-hover:border-blue-400/50' },
                        { icon: <Leaf size={16} />, label: 'Pantry Mode', color: 'group-hover:text-emerald-400 group-hover:border-emerald-400/50' },
                        { icon: <Sparkles size={16} />, label: 'AI Generation', color: 'group-hover:text-purple-400 group-hover:border-purple-400/50' },
                    ].map(({ icon, label, color }) => (
                        <div
                            key={label}
                            className={`group flex items-center gap-2 glass-light rounded-full px-6 py-3 text-surface-200 transition-all duration-300 cursor-default hover:bg-surface-800/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] border-surface-700/50 ${color}`}
                        >
                            <span className="transition-colors duration-300">{icon}</span>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
