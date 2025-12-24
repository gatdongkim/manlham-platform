import React, { useState } from "react";
// ❌ Removed DashboardLayout import to prevent duplication
import BackButton from "../../components/BackButton";
import { 
  Search, 
  Mail, 
  MapPin, 
} from "lucide-react";

export default function StaffUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  const [staffList] = useState([
    { id: 1, name: "Dr. Kelvin Kibet", role: "ADMIN", dept: "Infrastructure", online: true },
    { id: 2, name: "Sarah Manlham", role: "STAFF", dept: "Support Lead", online: true },
    { id: 3, name: "John Lado", role: "STAFF", dept: "Moderation", online: false },
  ]);

  const filteredStaff = staffList.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Returning only the inner content as App.jsx provides the Layout
  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-6">
      
      <div className="space-y-4">
        <BackButton text="Back to Staff Portal" to="/staff/dashboard" />
        <header>
          <h1 className="text-4xl font-black text-gray-900 italic">
            Directory<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-500 font-semibold mt-1">Connect with other staff members and administrators.</p>
        </header>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, department or role..." 
          className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map(member => (
          <div key={member.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-md transition group">
            <div className="flex items-start justify-between mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-2xl border border-indigo-100">
                  {member.name.charAt(0)}
                </div>
                {member.online && <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white"></span>}
              </div>
              <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${
                member.role === 'ADMIN' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {member.role}
              </span>
            </div>
            
            <h3 className="text-xl font-black text-gray-900">{member.name}</h3>
            <p className="text-sm font-bold text-indigo-500 uppercase tracking-tighter mb-6">{member.dept}</p>
            
            <div className="space-y-3 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                 <Mail size={14} className="text-indigo-400"/> {member.name.toLowerCase().split(' ')[0]}@manlham.tech
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                 <MapPin size={14} className="text-indigo-400"/> Juba HQ, SS
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-gray-50 text-gray-900 font-black text-[10px] uppercase tracking-widest rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all active:scale-95">
              Send Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}