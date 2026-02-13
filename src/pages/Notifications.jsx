import React from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { Send, Bell, Clock } from 'lucide-react';

const Notifications = () => {
    const { notifications, addNotification } = useVolunteer();

    const handleSend = (e) => {
        e.preventDefault();
        const msg = e.target.message.value;
        if (msg.trim()) {
            addNotification(msg);
            e.target.reset();
            alert('Broadcast Sent!');
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-white">Broadcast Center</h1>

            <div className="glass-panel p-8 animate-slide-up delay-100">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Send className="w-5 h-5 text-cyan-400" /> Send New Broadcast
                </h3>
                <form onSubmit={handleSend} className="space-y-4">
                    <textarea 
                        name="message" 
                        rows="4" 
                        placeholder="Type your urgent message here..." 
                        required
                        className="w-full p-6 resize-none focus:ring-1 focus:ring-cyan-500/50" 
                    ></textarea>
                    <button type="submit" className="btn btn-primary px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
                        <Send className="w-4 h-4" /> Send to All
                    </button>
                </form>
            </div>

            <div className="animate-slide-up delay-300">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400" /> Broadcast History
                </h3>
                <div className="space-y-4">
                    {notifications.slice().reverse().map((n, idx) => (
                        <div 
                            key={n.id} 
                            className="glass-panel p-6 flex flex-col gap-2 animate-fade-in"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="flex justify-between items-start">
                                <span className="flex items-center gap-2 font-bold text-cyan-400">
                                    <Bell className="w-4 h-4" /> System Broadcast
                                </span>
                                <span className="text-xs text-slate-500">{new Date(n.date).toLocaleString()}</span>
                            </div>
                            <p className="text-slate-300">{n.message}</p>
                        </div>
                    ))}
                    {notifications.length === 0 && <p className="text-slate-500 italic pb-4">No broadcast history.</p>}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
