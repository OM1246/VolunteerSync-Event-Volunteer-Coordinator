
import React, { useState, useEffect } from 'react';
import { Users, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const HostMyEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyEvents();
    }, []);

    const fetchMyEvents = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) return;

        try {
            const response = await fetch('http://localhost:5000/api/events/my-events', {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching host events:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalVolunteers = events.reduce((acc, event) => acc + (event.volunteers?.length || 0), 0);
    const averageVolunteers = events.length > 0 ? Math.round(totalVolunteers / events.length) : 0;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white mb-8">Event Analytics</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Events" 
                    value={events.length} 
                    icon={Calendar} 
                    color="text-blue-400" 
                    bg="bg-blue-500/10"
                    border="border-blue-500/20"
                />
                <StatCard 
                    title="Total Volunteers" 
                    value={totalVolunteers} 
                    icon={Users} 
                    color="text-purple-400" 
                    bg="bg-purple-500/10"
                    border="border-purple-500/20"
                />
                <StatCard 
                    title="Avg. Attendance" 
                    value={averageVolunteers} 
                    icon={TrendingUp} 
                    color="text-green-400" 
                    bg="bg-green-500/10"
                    border="border-green-500/20"
                />
            </div>

            {/* Events List & Details */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="glass-panel p-6 rounded-3xl border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-cyan-400" /> Volunteer Distribution
                    </h2>
                    <div className="h-64 flex items-center justify-center">
                        {events.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={events.map(e => ({ name: e.title, value: e.volunteers?.length || 0 }))}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {events.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-slate-500">No data available</div>
                        )}
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl border border-white/10 overflow-hidden">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Events</h2>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {events.map(event => (
                            <div key={event._id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white">{event.title}</h3>
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                                        {new Date(event.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-slate-400">
                                    <span>{event.location}</span>
                                    <span className="flex items-center gap-1 text-cyan-400 font-bold">
                                        <Users className="w-3 h-3" /> {event.volunteers?.length || 0}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color, bg, border }) => (
    <div className={`glass-panel p-6 rounded-2xl border ${border} relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>
        <div className={`absolute top-0 right-0 w-24 h-24 ${bg} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`}></div>
        <div className="relative z-10">
            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
        </div>
    </div>
);

export default HostMyEvents;
