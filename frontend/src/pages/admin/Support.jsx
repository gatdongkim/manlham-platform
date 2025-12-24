import React, { useState, useEffect } from "react";
// ❌ Removed DashboardLayout import to prevent layout nesting
import BackButton from "../../components/BackButton";
import { 
  Inbox, 
  Search, 
  MessageSquare, 
  User, 
  Filter, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  ShieldAlert
} from "lucide-react";

export default function AdminSupport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("OPEN");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulated fetch: In production use API.get('/admin/tickets')
    const fetchTickets = async () => {
      setLoading(true);
      setTimeout(() => {
        setTickets([
          { id: "TK-101", user: "student@mail.com", role: "STUDENT", issue: "Payment pending for Job #22", status: "OPEN", date: "2 hours ago", priority: "HIGH" },
          { id: "TK-102", user: "client@mail.com", role: "CLIENT", issue: "Dispute: Quality of work", status: "OPEN", date: "5 hours ago", priority: "CRITICAL" },
          { id: "TK-103", user: "dev_josh@mail.com", role: "STUDENT", issue: "Account verification delay", status: "RESOLVED", date: "1 day ago", priority: "LOW" },
        ]);
        setLoading(false);
      }, 800);
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(t => 
    t.status === activeTab && 
    (t.user.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // ✅ Returning content only. App.jsx handles the parent DashboardLayout.
  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8">
      
      {/* Navigation & Header */}
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3 italic">
              Support<span className="text-indigo-600">.</span> <Inbox size={32} className="text-indigo-600" />
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
              {tickets.filter(t => t.status === 'OPEN').length} Active Tickets Requiring Intervention
            </p>
          </div>
          
          <div className="flex bg-white border border-gray-100 p-1.5 rounded-2xl shadow-sm">
            <button 
              onClick={() => setActiveTab("OPEN")}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "OPEN" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-gray-400 hover:text-gray-600"}`}
            >
              Inbox
            </button>
            <button 
              onClick={() => setActiveTab("RESOLVED")}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "RESOLVED" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" : "text-gray-400 hover:text-gray-600"}`}
            >
              Archive
            </button>
          </div>
        </header>
      </div>

      {/* Search & Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 flex items-center gap-4 bg-gray-50/30 border-b border-gray-50">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search email or ticket ID..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-inner"
              />
            </div>
            <button className="p-3 text-gray-500 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition active:scale-95">
              <Filter size={18} />
            </button>
          </div>

          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="p-24 text-center space-y-4">
                 <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Syncing Encrypted Logs...</p>
              </div>
            ) : filteredTickets.length > 0 ? (
              filteredTickets.map((t) => (
                <div key={t.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-indigo-50/20 transition-all cursor-pointer group">
                  <div className="flex items-start gap-6">
                    <div className={`p-5 rounded-2xl shrink-0 transition-transform group-hover:rotate-6 ${t.priority === 'CRITICAL' ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                      {t.priority === 'CRITICAL' ? <ShieldAlert size={28} /> : <MessageSquare size={28} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-black text-indigo-600 tracking-widest bg-indigo-50 px-2 py-1 rounded">#{t.id}</span>
                        <span className={`text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter ${t.role === 'STUDENT' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                          {t.role}
                        </span>
                      </div>
                      <h3 className="font-black text-gray-900 text-xl leading-tight mb-2 italic tracking-tight">{t.issue}</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-4 font-bold uppercase tracking-wide">
                        <span className="flex items-center gap-1.5"><User size={14} /> {t.user}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {t.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {t.priority === 'CRITICAL' && (
                      <span className="hidden xl:block text-[9px] font-black bg-red-600 text-white px-4 py-1.5 rounded-full animate-pulse tracking-[0.2em]">
                        CRITICAL
                      </span>
                    )}
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition shadow-xl active:scale-95 flex items-center gap-2">
                      Resolve <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-24 text-center">
                <CheckCircle className="text-emerald-200 mx-auto mb-4" size={56} />
                <h3 className="text-xl font-black text-gray-900 italic">No Pending Issues</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">The support queue is fully optimized.</p>
              </div>
            )}
          </div>
        </div>

        {/* Status Matrix Sidebar */}
        <div className="space-y-6">
           <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl text-white">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Urgency Matrix</p>
              <div className="space-y-4">
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition">
                    <span className="text-xs font-bold text-red-400">Critical Priority</span>
                    <span className="text-lg font-black">{tickets.filter(t => t.priority === 'CRITICAL' && t.status === 'OPEN').length}</span>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition">
                    <span className="text-xs font-bold text-amber-400">High Priority</span>
                    <span className="text-lg font-black">{tickets.filter(t => t.priority === 'HIGH' && t.status === 'OPEN').length}</span>
                 </div>
              </div>
           </div>

           <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Escalation Policy</p>
              <p className="text-xs font-medium text-indigo-900/60 leading-relaxed">
                Tickets marked as <strong className="text-indigo-600">Critical</strong> bypass standard staff queues and are routed directly to this control panel.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}