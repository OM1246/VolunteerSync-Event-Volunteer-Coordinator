import React from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { Calendar, Users, Activity, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
    const { events, volunteers } = useVolunteer();

    const totalEvents = events.length;
    const activeEvents = events.filter(e => e.status === 'active').length;
    const totalVolunteers = volunteers.length;
    const attended = volunteers.filter(v => v.status === 'present').length;
    const attendanceRate = totalVolunteers > 0 ? Math.round((attended / totalVolunteers) * 100) : 0;

    const recentActivity = volunteers.slice(-3).reverse().map(v => {
        const event = events.find(e => e.id === v.eventId);
        return { ...v, eventTitle: event ? event.title : 'Unknown Event' };
    });

    const StatCard = ({ label, value, icon: Icon, color }) => (
        <div className="glass-panel p-6 relative overflow-hidden group">
            <div className="relative z-10">
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">{label}</div>
                <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
                    {value}
                </div>
            </div>
            <Icon className="absolute right-4 top-4 w-12 h-12 opacity-10 group-hover:scale-110 transition-transform duration-500" />
        </div>
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-slate-400">Welcome back, Admin. Here is what is happening.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="animate-slide-up delay-100">
                    <StatCard label="Total Events" value={totalEvents} icon={Calendar} color="from-white to-slate-400" />
                </div>
                <div className="animate-slide-up delay-200">
                    <StatCard label="Total Volunteers" value={totalVolunteers} icon={Users} color="from-cyan-400 to-blue-500" />
                </div>
                <div className="animate-slide-up delay-300">
                    <StatCard label="Active Events" value={activeEvents} icon={Activity} color="from-emerald-400 to-green-500" />
                </div>
                <div className="animate-slide-up delay-400">
                    <StatCard label="Attendance Rate" value={`${attendanceRate}%`} icon={CheckCircle2} color="from-yellow-400 to-orange-500" />
                </div>
            </div>

            <div className="glass-panel p-8 animate-slide-up delay-500">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-400 animate-pulse" /> Recent Activity
                </h3>
                <div className="space-y-4">
                    {recentActivity.length > 0 ? recentActivity.map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors animate-fade-in" style={{ animationDelay: `${(idx + 5) * 100}ms` }}>
                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                            <div>
                                <span className="text-cyan-400 font-medium">{activity.name}</span>
                                <span className="text-slate-400"> registered for </span>
                                <span className="text-white font-medium">{activity.eventTitle}</span>
                            </div>
                        </div>
                    )) : (
                        <p className="text-slate-500 italic">No recent activity.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
