import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Calendar, 
    Users, 
    BarChart3, 
    Bell, 
    LogOut, 
    HelpingHand,
    Menu,
    X
} from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/events', icon: Calendar, label: 'Events' },
        { path: '/volunteers', icon: Users, label: 'Volunteers' },
        { path: '/reports', icon: BarChart3, label: 'Reports' },
        { path: '/notifications', icon: Bell, label: 'Notifications' },
    ];

    const isLanding = location.pathname === '/';

    if (isLanding) return null; // Or render a different navbar for landing page

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'py-2 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-cyan-500/10' : 'py-4 bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <HelpingHand className="w-8 h-8 text-cyan-400 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
                        VolunteerSync
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 shadow-inner max-w-2xl">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group
                                ${isActive 
                                    ? 'text-white' 
                                    : 'text-slate-400 hover:text-white'}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full animate-fade-in"></div>
                                    )}
                                    <item.icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110 text-cyan-400' : 'group-hover:scale-110'}`} />
                                    <span className="relative z-10">{item.label}</span>
                                    {isActive && (
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="relative p-2 text-slate-400 hover:text-white transition-colors group">
                        <Bell className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
                    </button>
                    <div className="h-8 w-px bg-white/10"></div>
                    <NavLink to="/" className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium group">
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Logout</span>
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-3xl pt-24 px-6 md:hidden animate-slide-up flex flex-col gap-4 h-[100dvh]">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-4 p-4 rounded-2xl transition-all text-lg font-medium
                                    ${isActive 
                                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                <item.icon className="w-6 h-6" />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                    
                    <div className="mt-auto mb-8 space-y-4">
                        <div className="h-px bg-white/10"></div>
                        <NavLink 
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all text-lg font-medium"
                        >
                            <LogOut className="w-6 h-6" />
                            <span>Logout</span>
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
