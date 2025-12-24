import React, { useState, useEffect } from "react";
// ❌ Removed DashboardLayout import
import BackButton from "../../components/BackButton";
import { 
  Users, 
  Search, 
  MoreVertical, 
  ShieldCheck, 
  UserX, 
  Filter,
  GraduationCap,
  Briefcase,
  BadgeCheck
} from "lucide-react";

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this from your API
    setUsers([
      { id: 1, name: "James Lado", role: "STUDENT", email: "james@mail.com", verified: true, joined: "Dec 2025" },
      { id: 2, name: "Mary John", role: "CLIENT", email: "mary@mail.com", verified: true, joined: "Nov 2025" },
      { id: 3, name: "Admin User", role: "ADMIN", email: "admin@mail.com", verified: true, joined: "Oct 2025" },
      { id: 4, name: "Kelvin Kibet", role: "STUDENT", email: "kibet@mail.com", verified: false, joined: "Jan 2025" },
    ]);
  }, []);

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(query.toLowerCase()) || 
                          u.email.toLowerCase().includes(query.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    // ✅ Use a standard div container to prevent double sidebars
    <div className="max-w-7xl mx-auto pb-20 space-y-6">
      
      {/* Navigation & Header */}
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3 italic tracking-tighter">
              Identity<span className="text-indigo-600">.</span> <Users size={32} className="text-indigo-600" />
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Manage platform permissions and account security.</p>
          </div>
          
          <div className="flex bg-white border border-gray-100 p-1.5 rounded-2xl shadow-sm">
            {["ALL", "STUDENT", "CLIENT", "ADMIN"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  roleFilter === role ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </header>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Search by identity or email address..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-3xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition font-bold text-sm"
          />
        </div>
        <button className="px-8 bg-gray-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition active:scale-95">
          <Filter size={16} className="inline mr-2" /> Advanced
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50">
              <tr>
                <th className="px-10 py-6">User Identity</th>
                <th className="px-6 py-6">Role</th>
                <th className="px-6 py-6">Verification</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-indigo-50/10 transition group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-black text-lg italic shadow-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 leading-tight italic">{user.name}</p>
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <span className={`flex items-center gap-1.5 text-[9px] font-black px-3 py-1.5 rounded-full w-fit uppercase tracking-[0.15em] border ${
                      user.role === 'STUDENT' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                      user.role === 'CLIENT' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {user.role === 'STUDENT' ? <GraduationCap size={12} /> : <Briefcase size={12} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-8">
                    {user.verified ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-[0.1em]">
                        <BadgeCheck size={18} /> Verified
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-orange-500 text-[10px] font-black uppercase tracking-[0.1em] opacity-80">
                        <ShieldCheck size={18} /> Pending Audit
                      </div>
                    )}
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Suspend Account">
                        <UserX size={18} />
                      </button>
                      <button className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="p-32 text-center space-y-4">
            <Users className="mx-auto text-gray-100" size={64} />
            <h3 className="font-black text-gray-900 italic text-xl">User Not Found</h3>
            <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Adjust your search or filters to find the account.</p>
          </div>
        )}
      </div>
    </div>
  );
}