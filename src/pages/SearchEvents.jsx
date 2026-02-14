
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, User, Search, CheckCircle, AlertCircle } from 'lucide-react';

const SearchEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/events');
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (eventId) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
            setMessage({ type: 'error', text: 'Please login to register' });
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/events/${eventId}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Registered successfully!' });
                // Optimistically update UI or re-fetch
                fetchEvents();
            } else {
                setMessage({ type: 'error', text: data.message || 'Registration failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong' });
        }
    };

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Explore Opportunities</h1>
                    <p className="text-slate-400">Find events that match your passion and skills.</p>
                </div>
                
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search by title or location..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                </div>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {message.text}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map(event => (
                        <div key={event._id} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all hover:translate-y-[-5px] group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {event.status}
                                </div>
                                <span className="text-slate-500 text-sm">
                                    {new Date(event.date).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                {event.title}
                            </h3>
                            
                            <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                                {event.description}
                            </p>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-slate-300 text-sm">
                                    <MapPin className="w-4 h-4 text-cyan-500" />
                                    {event.location}
                                </div>
                                <div className="flex items-center gap-3 text-slate-300 text-sm">
                                    <User className="w-4 h-4 text-purple-500" />
                                    Hosted by {event.host?.name || 'Unknown'}
                                </div>
                                <div className="flex items-center gap-3 text-slate-300 text-sm">
                                    <Calendar className="w-4 h-4 text-green-500" />
                                    {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>

                            <button 
                                onClick={() => handleRegister(event._id)}
                                className="w-full py-3 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-white text-cyan-400 font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-cyan-500/20"
                            >
                                Register Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
            
            {!loading && filteredEvents.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                    No events found matching your search.
                </div>
            )}
        </div>
    );
};

export default SearchEvents;
