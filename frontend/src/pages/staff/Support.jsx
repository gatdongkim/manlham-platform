import React, { useState } from "react";
// ❌ Removed DashboardLayout import
import BackButton from "../../components/BackButton";
import { 
  MessageSquare, 
  Search, 
  Clock, 
  User,
  Send,
  MoreHorizontal
} from "lucide-react";

export default function StaffSupport() {
  const [activeTab, setActiveTab] = useState("OPEN");

  const [tickets] = useState([
    { id: "T-882", user: "John Doe", subject: "Payment Not Reflecting", priority: "HIGH", status: "OPEN", date: "2 hrs ago" },
    { id: "T-881", user: "Sarah Zen", subject: "Account Verification Help", priority: "MEDIUM", status: "OPEN", date: "5 hrs ago" },
    { id: "T-879", user: "Mike Lado", subject: "Job Posting Error", priority: "LOW", status: "CLOSED", date: "1 day ago" },
  ]);

  const filteredTickets = tickets.filter(t => t.status === activeTab);

  // ✅ Just return the content div. App.jsx handles the Sidebar and Layout logic.
  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-6">
      
      <div className="space-y-4">
        <BackButton text="Back to Staff Portal" to="/staff/dashboard" />
        <header className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 italic">
              Help Desk<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-semibold mt-1">Manage user inquiries and technical support tickets.</p>
          </div>
          
          <div className="flex bg-white border border-gray-100 p-1 rounded-2xl shadow-sm">
            {["OPEN", "CLOSED"].map((status) => (
              <button 
                key={status}
                onClick={() => setActiveTab(status)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === status ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </header>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input placeholder="Search tickets..." className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          
          <div className="space-y-3">
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="bg-white p-5 rounded-3xl border border-gray-50 shadow-sm hover:border-indigo-200 transition cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-indigo-500 font-mono tracking-tighter">{ticket.id}</span>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                    ticket.priority === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                  }`}>{ticket.priority}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition">{ticket.subject}</h4>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1"><User size={12}/> {ticket.user}</span>
                  <span className="text-[10px] text-gray-400 font-bold italic">{ticket.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation View */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-50 shadow-sm flex flex-col min-h-[600px]">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-black">J</div>
              <div>
                <h3 className="font-black text-gray-900 text-sm tracking-tight italic">John Doe</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1"><Clock size={10}/> Last Active: 12m ago</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600"><MoreHorizontal size={20}/></button>
          </div>
          
          <div className="flex-1 p-8 text-center flex flex-col items-center justify-center opacity-20">
            <MessageSquare size={48} className="mb-2" />
            <p className="text-sm font-black uppercase tracking-tighter">Select a ticket to join the conversation</p>
          </div>

          <div className="p-6 bg-gray-50/50 rounded-b-[2.5rem]">
            <div className="relative">
              <input disabled placeholder="Type your response..." className="w-full pl-6 pr-16 py-4 bg-white border border-gray-200 rounded-[1.5rem] outline-none text-sm" />
              <button className="absolute right-2 top-2 p-2.5 bg-indigo-600 text-white rounded-xl"><Send size={18}/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}