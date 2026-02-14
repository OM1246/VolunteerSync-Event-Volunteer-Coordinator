
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';

const MyActivity = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyActivity();
    }, []);

    const fetchMyActivity = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) return;

        try {
            const response = await fetch('http://localhost:5000/api/events/my-activity', {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching activity:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">My Activity</h1>
                <p className="text-slate-400">Track your upcoming obligations and past contributions.</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid gap-6">
                    {events.length > 0 ? events.map(event => (
                        <div key={event._id} className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-6 group hover:bg-white/5 transition-colors">
                            <div className="w-full md:w-20 h-20 rounded-xl bg-cyan-500/10 flex flex-col items-center justify-center text-cyan-400 border border-cyan-500/20">
                                <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
                                <span className="text-xs uppercase font-bold">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-3">
                                    {event.description}
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-400">
                                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-500" /> {event.location}</span>
                                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-500" /> {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>

                            <div className="w-full md:w-auto flex justify-center">
                                <div className="px-6 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-bold text-sm flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> Registered
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-white/5">
                            <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No activities yet</h3>
                            <p className="text-slate-400">You haven't registered for any events.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyActivity;
