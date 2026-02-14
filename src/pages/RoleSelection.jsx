
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar } from 'lucide-react';

const RoleSelection = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden px-6">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-4xl w-full">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 animate-fade-in">
                    Choose Your Path
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Volunteer Option */}
                    <Link 
                        to="/login?role=volunteer" 
                        className="group relative p-8 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-8 h-8 text-cyan-400" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                            Join as Volunteer
                        </h2>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                            Find meaningful events, register with one click, and track your impact in the community.
                        </p>
                    </Link>

                    {/* Host Option */}
                    <Link 
                        to="/login?role=host" 
                        className="group relative p-8 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.2)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Calendar className="w-8 h-8 text-purple-400" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                            Host an Event
                        </h2>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                            Create events, manage volunteers, and access detailed analytics and reports.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
