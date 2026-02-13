import React, { useState } from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { Search, Check, X, ShieldAlert } from 'lucide-react';

const Volunteers = () => {
    const { volunteers, events, updateVolunteerStatus } = useVolunteer();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVolunteers = volunteers.filter(v => 
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        v.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Volunteer Roster</h1>

            <div className="glass-panel p-4 flex">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="glass-panel overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-slate-400 uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Event</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredVolunteers.length > 0 ? filteredVolunteers.map((vol, idx) => {
                            const event = events.find(e => e.id === vol.eventId);
                            return (
                                <tr 
                                    key={vol.id} 
                                    className="hover:bg-white/5 transition-colors animate-slide-up"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <td className="p-4 font-medium text-white">{vol.name}</td>
                                    <td className="p-4 text-slate-400">
                                        <div>{vol.email}</div>
                                        <div className="text-xs opacity-70">{vol.phone}</div>
                                    </td>
                                    <td className="p-4 text-cyan-400">{event ? event.title : 'Unknown Event'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase 
                                            ${vol.status === 'present' ? 'bg-green-500/20 text-green-400' : 
                                              vol.status === 'absent' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                            {vol.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <button 
                                            onClick={() => updateVolunteerStatus(vol.id, 'present')}
                                            className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                                            title="Mark Present"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => updateVolunteerStatus(vol.id, 'absent')}
                                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                            title="Mark Absent"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-500">No volunteers found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Volunteers;
