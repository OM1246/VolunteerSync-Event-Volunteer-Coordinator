import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, BarChart3, Bell, HelpingHand, CheckCircle } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-glow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow delay-1000"></div>
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-6">
                <div className="max-w-7xl mx-auto glass-panel border border-white/10 px-6 py-4 flex justify-between items-center bg-slate-950/40 backdrop-blur-2xl">
                    <div className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <HelpingHand className="w-8 h-8 text-cyan-400 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
                            VolunteerSync
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#features" className="hidden md:block text-slate-300 hover:text-white font-medium transition-colors">Features</a>
                        <Link to="/get-started" className="btn btn-primary px-6 py-2 rounded-full font-bold flex items-center gap-2 group shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <header className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold animate-fade-in mb-4">
                        <CheckCircle className="w-4 h-4" />
                        <span>The #1 Platform for Modern NGOs</span>
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight animate-slide-up">
                        <span className="text-white block mb-2">Coordinate Goodness</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            With Precision & Power
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200 font-light">
                        The high-tech command center for your mission. Manage events, track volunteers, and visualize impact in real-time.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-slide-up delay-300">
                        <Link to="/get-started" className="btn btn-primary px-10 py-4 rounded-xl font-bold text-lg shadow-[0_10px_40px_-10px_rgba(34,211,238,0.5)] hover:shadow-[0_20px_60px_-15px_rgba(34,211,238,0.6)] hover:-translate-y-1 transition-all">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Features */}
            <section id="features" className="py-32 px-6 relative z-10">
                <div className="container mx-auto">
                    <div className="text-center mb-20 animate-slide-up delay-500">
                        <h2 className="text-4xl font-bold text-white mb-4">Supercharged Capabilities</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to scale your impact, built into one cohesive interface.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="animate-slide-up delay-500"><FeatureCard icon={Calendar} title="Event Management" desc="Create and manage volunteer events with ease. Set constraints, locations, and track registration caps." color="text-cyan-400" gradient="from-cyan-500/20"/></div>
                        <div className="animate-slide-up delay-700" style={{ animationDelay: '200ms' }}><FeatureCard icon={Users} title="Volunteer Tracking" desc="Maintain a digital roster of all your helpers. Track attendance history and reliability scores." color="text-purple-400" gradient="from-purple-500/20"/></div>
                        <div className="animate-slide-up delay-700" style={{ animationDelay: '400ms' }}><FeatureCard icon={BarChart3} title="Impact Analytics" desc="Visual reports on participation success rates and activity levels to showcase your real-world impact." color="text-green-400" gradient="from-green-500/20"/></div>
                        <div className="animate-slide-up delay-700" style={{ animationDelay: '600ms' }}><FeatureCard icon={Bell} title="Broadcast Comms" desc="Send urgent updates to your registered volunteers instantly through our integrated notification center." color="text-yellow-400" gradient="from-yellow-500/20"/></div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/5 py-12 text-center relative z-10">
                <div className="container mx-auto px-6">
                    <p className="text-slate-500 text-sm">
                        &copy; 2026 <span className="text-slate-300 font-bold">VolunteerSync</span>. A masterpiece built for Hackathon.
                    </p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc, color, gradient }) => (
    <div className="glass-panel p-8 h-full relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl rounded-full translate-x-10 -translate-y-10`}></div>
        
        <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${color} shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
            <Icon className="w-7 h-7" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">{desc}</p>
    </div>
);

export default Landing;
