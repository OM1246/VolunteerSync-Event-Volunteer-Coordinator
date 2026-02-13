import React from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { Download, Trophy, Star, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const Reports = () => {
    const { events, volunteers, notifications } = useVolunteer();

    // Data Transformation for Charts
    const eventParticipation = events.map(e => ({
        name: e.title.length > 15 ? e.title.substring(0, 15) + '...' : e.title,
        fullTitle: e.title,
        count: volunteers.filter(v => v.eventId === e.id).length
    })).sort((a, b) => b.count - a.count).slice(0, 5);

    const statusData = [
        { name: 'Active', value: events.filter(e => e.status === 'active').length, color: '#22d3ee' },
        { name: 'Completed', value: events.filter(e => e.status === 'completed').length, color: '#a855f7' }
    ];

    // Mock trend based on event dates (since we don't track vol reg date, we use event date as proxy)
    const trendData = events
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(e => ({
            date: new Date(e.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            volunteers: volunteers.filter(v => v.eventId === e.id).length
        }));

    // Stats Logic
    const eventCounts = {};
    volunteers.forEach(v => { eventCounts[v.eventId] = (eventCounts[v.eventId] || 0) + 1; });
    const topEventId = Object.keys(eventCounts).reduce((a, b) => eventCounts[a] > eventCounts[b] ? a : b, null);
    const topEvent = events.find(e => e.id === topEventId);

    const volCounts = {};
    volunteers.filter(v => v.status === 'present').forEach(v => { volCounts[v.email] = (volCounts[v.email] || 0) + 1; });
    const topVolEmail = Object.keys(volCounts).reduce((a, b) => volCounts[a] > volCounts[b] ? a : b, null);
    const topVol = volunteers.find(v => v.email === topVolEmail);

    const handleExport = () => {
        const data = { events, volunteers, notifications, exportedAt: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'volunteersync_backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Impact Reports</h1>
                <button 
                    onClick={handleExport}
                    className="btn btn-outline border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 flex items-center gap-2 px-4 py-2 rounded-lg font-bold"
                >
                    <Download className="w-5 h-5" /> Export Data
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-8 flex items-center gap-6 animate-slide-in-right delay-200">
                    <div className="p-4 rounded-full bg-yellow-500/10 text-yellow-400">
                        <Trophy className="w-10 h-10 animate-pulse-glow" />
                    </div>
                    <div>
                        <h3 className="text-slate-400 text-sm uppercase font-bold tracking-wider mb-1">Top Event</h3>
                        <div className="text-2xl font-bold text-white">
                            {topEvent ? topEvent.title : 'No Data'}
                        </div>
                        {topEvent && <div className="text-cyan-400 text-sm">{eventCounts[topEventId]} Volunteers</div>}
                    </div>
                </div>

                <div className="glass-panel p-8 flex items-center gap-6 animate-slide-in-right delay-400">
                    <div className="p-4 rounded-full bg-purple-500/10 text-purple-400">
                        <Star className="w-10 h-10 animate-pulse-glow" />
                    </div>
                    <div>
                        <h3 className="text-slate-400 text-sm uppercase font-bold tracking-wider mb-1">Star Volunteer</h3>
                        <div className="text-2xl font-bold text-white">
                            {topVol ? topVol.name : 'No Data'}
                        </div>
                        {topVol && <div className="text-cyan-400 text-sm">{volCounts[topVolEmail]} Events Attended</div>}
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart: Participation */}
                <div className="glass-panel p-6 animate-slide-up delay-500">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-cyan-400" /> Most Popular Events
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={eventParticipation}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="count" fill="#22d3ee" radius={[4, 4, 0, 0]} animationDuration={1500} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie & Area Split */}
                <div className="flex flex-col gap-6">
                    {/* Pie Chart: Status */}
                    <div className="glass-panel p-6 flex-1 animate-slide-up delay-700">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <PieIcon className="w-5 h-5 text-purple-400" /> Event Status
                        </h3>
                        <div className="h-48 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex flex-col gap-2 text-sm ml-4">
                                {statusData.map((entry, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                        <span className="text-slate-300">{entry.name}: {entry.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Area Chart: Trend */}
                    <div className="glass-panel p-6 flex-1 animate-slide-up delay-900">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-400" /> Volunteer Trend
                        </h3>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="volunteers" stroke="#22c55e" fillOpacity={1} fill="url(#colorVol)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
