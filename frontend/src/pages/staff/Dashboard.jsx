import React, { useState } from "react";
// ❌ Removed DashboardLayout import
import { 
  Calendar, 
  Clock, 
  Video, 
  MessageSquare, 
  Bell, 
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export default function StaffDashboard() {
  const [meetings] = useState([
    {
      id: "MTG-001",
      title: "Project Manlham: Core Infrastructure Sync",
      time: "10:30 AM",
      date: "Today",
      link: "https://meet.google.com/mts-manlham-staff-sync",
      priority: "URGENT"
    },
    {
      id: "MTG-002",
      title: "Staff Dashboard Feedback Session",
      time: "02:00 PM",
      date: "Tomorrow",
      link: "#",
      priority: "NORMAL"
    }
  ]);

  // ✅ Just return the div content. App.jsx handles the Sidebar/Navbar.
  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8">
      
      {/* Welcome Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-gray-900 italic">
            Staff Portal<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-500 font-semibold mt-1">Welcome back. Here is your briefing for today.</p>
        </div>
        <div className="flex gap-4">
          <button className="relative p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-400 hover:text-indigo-600 transition">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content: Upcoming Meetings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <Calendar className="text-indigo-600" size={20} /> Upcoming Meetings
            </h3>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Calendar</button>
          </div>

          <div className="space-y-4">
            {meetings.map((mtg) => (
              <div key={mtg.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl ${mtg.priority === 'URGENT' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
                      <Video size={24} />
                    </div>
                    <div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${mtg.priority === 'URGENT' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                        {mtg.priority}
                      </span>
                      <h4 className="text-lg font-black text-gray-900 mt-1">{mtg.title}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                          <Clock size={14} /> {mtg.date} at {mtg.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <a 
                    href={mtg.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition active:scale-95"
                  >
                    Join Meeting <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Announcements & Quick Actions */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <MessageSquare className="text-indigo-600" size={20} /> Notice Board
            </h3>
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <ShieldCheck className="absolute -right-4 -bottom-4 text-white/10" size={120} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">System Update</p>
              <h4 className="text-xl font-black mt-2 leading-tight">Admin Control Panel Fixed</h4>
              <p className="text-sm mt-4 font-medium opacity-90 leading-relaxed">
                The Staff role mapping and database connection issues have been resolved.
              </p>
              <button className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition">
                Read More <ChevronRight size={14} />
              </button>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}