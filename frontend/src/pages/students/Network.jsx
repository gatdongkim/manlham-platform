import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, UserPlus, MessageSquare, Check, Users, Globe } from "lucide-react";

export default function Network() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([
    { id: 1, name: "James Lado", role: "Frontend Developer", online: true, mutuals: 12 },
    { id: 2, name: "Mary John", role: "UI/UX Designer", online: false, mutuals: 5 },
    { id: 3, name: "Peter Kuol", role: "Backend Engineer", online: true, mutuals: 8 },
  ]);

  // Handle connection request
  const [sentRequests, setSentRequests] = useState([]);

  const handleConnect = (id) => {
    setSentRequests([...sentRequests, id]);
    // axios.post(`/api/v1/network/connect/${id}`)
  };

  const filtered = people.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Network</h1>
          <p className="text-gray-500 text-lg mt-2 flex items-center gap-2">
            <Globe size={20} className="text-indigo-500" />
            Connect with students, mentors, and potential collaborators.
          </p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </header>

      {/* Connection Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white"><Users size={20}/></div>
            <div><p className="text-xs text-indigo-600 font-bold uppercase">Connections</p><p className="text-xl font-bold">128</p></div>
        </div>
        {/* Add more stat cards here if needed */}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(person => (
          <div
            key={person.id}
            className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg shadow-indigo-200">
                {person.name.charAt(0)}
              </div>
              {person.online && (
                <span className="absolute bottom-0 right-1/3 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
              )}
            </div>

            <div className="text-center mb-6">
              <h3 className="font-bold text-gray-900 text-lg">{person.name}</h3>
              <p className="text-indigo-600 text-sm font-medium">{person.role}</p>
              <p className="text-gray-400 text-xs mt-2 flex items-center justify-center gap-1">
                <Users size={12} /> {person.mutuals} mutual connections
              </p>
            </div>

            <div className="flex gap-2 mt-auto">
              <button 
                onClick={() => handleConnect(person.id)}
                disabled={sentRequests.includes(person.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all ${
                  sentRequests.includes(person.id) 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100'
                }`}
              >
                {sentRequests.includes(person.id) ? (
                  <><Check size={18} /> Sent</>
                ) : (
                  <><UserPlus size={18} /> Connect</>
                )}
              </button>
              
              <button className="p-2.5 bg-gray-50 text-gray-600 border border-gray-100 rounded-xl hover:bg-gray-100 transition">
                <MessageSquare size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
          <p className="text-gray-400 font-medium">No one found matching "{search}"</p>
        </div>
      )}
    </div>
  );
}