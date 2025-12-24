import React, { useState } from "react";
// ❌ Removed DashboardLayout import
import BackButton from "../../components/BackButton";
import { 
  Calendar, 
  Clock, 
  Video, 
  Search,
  Users,
  AlertCircle
} from "lucide-react";

export default function StaffMeetings() {
  const [filter, setFilter] = useState("UPCOMING");

  const [meetings] = useState([
    {
      id: "MTG-001",
      title: "Project Manlham: Core Infrastructure Sync",
      description: "Finalizing the Admin Control Panel and preparing for the Staff Dashboard implementation.",
      time: "10:30 AM",
      date: "Dec 20, 2025",
      link: "https://meet.google.com/mts-manlham-staff-sync",
      type: "Staff Only",
      status: "UPCOMING",
      attendees: 8
    },
    {
      id: "MTG-002",
      title: "Security & Role-Check Audit",
      description: "Reviewing ProtectedRoute logic and permission tiers for MSME and PRO accounts.",
      time: "02:00 PM",
      date: "Dec 21, 2025",
      link: "#",
      type: "Technical Briefing",
      status: "UPCOMING",
      attendees: 5
    },
    {
      id: "MTG-000",
      title: "Q4 Platform Review",
      description: "Retrospective on previous deployment and transaction ledger stability.",
      time: "09:00 AM",
      date: "Dec 15, 2025",
      link: "#",
      type: "General",
      status: "PAST",
      attendees: 12
    }
  ]);

  const filteredMeetings = meetings.filter(m => m.status === filter);

  // ✅ Return only the inner content
  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-6">
      
      {/* Navigation */}
      <div className="space-y-4">
        <BackButton text="Back to Staff Portal" to="/staff/dashboard" />
        <header className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 italic">
              Briefings<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-semibold mt-1">Scheduled internal meetings and project syncs.</p>
          </div>
          
          <div className="flex bg-white border border-gray-100 p-1 rounded-2xl shadow-sm">
            <button 
              onClick={() => setFilter("UPCOMING")}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === "UPCOMING" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setFilter("PAST")}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === "PAST" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Past
            </button>
          </div>
        </header>
      </div>

      {/* Search & Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search meeting topics..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-indigo-500/10 outline-none font-medium shadow-sm"
          />
        </div>
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-[2rem] flex items-center justify-center gap-3">
           <Calendar className="text-indigo-600" size={20} />
           <span className="text-sm font-black text-indigo-900 uppercase">{filteredMeetings.length} Scheduled</span>
        </div>
      </div>

      {/* Meeting List */}
      <div className="space-y-4">
        {filteredMeetings.length > 0 ? filteredMeetings.map((meeting) => (
          <div key={meeting.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-indigo-100/50 transition-all group">
            <div className="flex flex-col lg:flex-row gap-6 justify-between lg:items-center">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                    {meeting.type}
                  </span>
                  <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-tighter">
                    ID: {meeting.id}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight">{meeting.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-2xl">
                  {meeting.description}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl">
                    <Calendar size={14} className="text-indigo-500" /> {meeting.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl">
                    <Clock size={14} className="text-indigo-500" /> {meeting.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl">
                    <Users size={14} className="text-indigo-500" /> {meeting.attendees} Attendees
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition shadow-sm">
                  <AlertCircle size={20} />
                </button>
                <a 
                  href={meeting.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 lg:flex-none flex items-center justify-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-900 transition shadow-lg shadow-indigo-100 active:scale-95"
                >
                  Join Session <Video size={18} />
                </a>
              </div>
            </div>
          </div>
        )) : (
          <div className="bg-white p-20 rounded-[3rem] border border-dashed border-gray-200 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-400 font-black uppercase tracking-widest italic">No meetings found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}