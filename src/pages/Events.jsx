import React, { useState } from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { Plus, Search, MapPin, Calendar as CalIcon, Users, X } from 'lucide-react';

const Events = () => {
    const { events, addEvent, updateEventStatus, volunteers, registerVolunteer } = useVolunteer();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const filteredEvents = events.filter(e => {
        const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              e.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || e.status === filter;
        return matchesSearch && matchesFilter;
    });

    const handleCreateEvent = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        addEvent({
            title: formData.get('title'),
            description: formData.get('description'),
            date: formData.get('date'),
            location: formData.get('location'),
            maxVolunteers: formData.get('maxVolunteers'),
        });
        setIsModalOpen(false);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        try {
            registerVolunteer({
                eventId: selectedEventId,
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
            });
            setIsRegisterModalOpen(false);
            alert('Registration Successful!');
        } catch (err) {
            alert(err.message);
        }
    };

    const openRegister = (id) => {
        setSelectedEventId(id);
        setIsRegisterModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-white">Event Management</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 transform transition hover:-translate-y-1"
                >
                    <Plus className="w-5 h-5" /> Create Event
                </button>
            </div>

            {/* Filter Bar */}
            <div className="glass-panel p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search events..." 
                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select 
                    className="bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Event Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event, idx) => {
                    const eventVols = volunteers.filter(v => v.eventId === event.id).length;
                    const isFull = eventVols >= parseInt(event.maxVolunteers);

                    return (
                        <div 
                            key={event.id} 
                            className="glass-panel p-6 flex flex-col hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white line-clamp-1">{event.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${
                                    event.status === 'active' 
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20 animate-pulse-glow' 
                                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                    {event.status}
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">{event.description}</p>
                            
                            <div className="space-y-2 mb-6 text-sm text-slate-300">
                                <div className="flex items-center gap-2"><CalIcon className="w-4 h-4 text-cyan-400" /> {new Date(event.date).toLocaleDateString()}</div>
                                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-400" /> {event.location}</div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                <span className={`flex items-center gap-2 font-bold ${isFull ? 'text-red-400' : 'text-cyan-400'}`}>
                                    <Users className="w-4 h-4" /> {eventVols} / {event.maxVolunteers}
                                </span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => openRegister(event.id)}
                                        disabled={isFull || event.status === 'completed'}
                                        className="px-3 py-1.5 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                                    >
                                        {isFull ? 'Full' : 'Register'}
                                    </button>
                                    {event.status === 'active' && (
                                        <button 
                                            onClick={() => { if(confirm('End event?')) updateEventStatus(event.id, 'completed') }}
                                            className="px-3 py-1.5 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
                                        >
                                            End
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="glass-panel w-full max-w-lg p-8 relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X /></button>
                        <h2 className="text-2xl font-bold text-white mb-6">Create New Event</h2>
                        <form onSubmit={handleCreateEvent} className="space-y-4">
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Title</label>
                                <input name="title" required className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-white focus:border-cyan-400 outline-none" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Description</label>
                                <textarea name="description" rows="3" className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-white focus:border-cyan-400 outline-none"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-400 text-sm mb-1">Date</label>
                                    <input type="date" name="date" required className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-white focus:border-cyan-400 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-1">Location</label>
                                    <input name="location" required className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-white focus:border-cyan-400 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Max Volunteers</label>
                                <input type="number" name="maxVolunteers" min="1" required className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-white focus:border-cyan-400 outline-none" />
                            </div>
                            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-lg transition-colors mt-4">Create Event</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Register Modal */}
            {isRegisterModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="glass-panel w-full max-w-md p-8 relative">
                        <button onClick={() => setIsRegisterModalOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white"><X /></button>
                        <h2 className="text-2xl font-bold text-white mb-6">Register Volunteer</h2>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Full Name</label>
                                <input name="name" required className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-white focus:border-cyan-400 outline-none" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Email</label>
                                <input type="email" name="email" required className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-white focus:border-cyan-400 outline-none" />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-1">Phone</label>
                                <input type="tel" name="phone" required className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-2 text-white focus:border-cyan-400 outline-none" />
                            </div>
                            <button type="submit" className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition-colors mt-4">Confirm Registration</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
