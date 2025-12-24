import React, { useState, useEffect } from "react";
import axios from "axios";
// ✅ REMOVED: DashboardLayout to fix the double sidebar issue
import { UserCircle, Bookmark, Star, MessageSquare, UserPlus, Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function RememberTalent() {
  const [savedTalent, setSavedTalent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedTalent = async () => {
      try {
        // Updated endpoint to match common patterns, but keeping your logic
        const response = await axios.get('/api/v1/clients/saved-talent');
        
        // ✅ FIX: Ensure we are extracting an array
        const actualData = response.data.data || response.data;
        setSavedTalent(Array.isArray(actualData) ? actualData : []);
      } catch (err) {
        console.error("Error fetching saved talent:", err);
        // ✅ Fallback to empty array instead of crashing
        setSavedTalent([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchSavedTalent();
  }, []);

  const removeTalent = (id) => {
    setSavedTalent(savedTalent.filter(t => (t.id || t._id) !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 italic tracking-tight flex items-center gap-3">
            Saved Talent <Bookmark className="text-indigo-600" fill="currentColor" size={32} />
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Your curated list of top-performing professionals.</p>
        </div>
        <Link 
          to="/client/discover-students" 
          className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition shadow-xl active:scale-95"
        >
          Discover More Talent
        </Link>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Loading Favorites...</p>
        </div>
      ) : savedTalent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTalent.map((talent) => (
            <div key={talent.id || talent._id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <UserCircle size={36} />
                </div>
                <button 
                  onClick={() => removeTalent(talent.id || talent._id)}
                  className="p-3 bg-gray-50 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-1 tracking-tight">{talent.name}</h3>
              <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mb-1">{talent.role || "Professional"}</p>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter mb-4">{talent.institution}</p>

              <div className="flex items-center gap-1.5 text-amber-500 mb-8 bg-amber-50 w-fit px-3 py-1 rounded-full">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-black">{talent.rating || "5.0"}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to={`/client/chats?user=${talent.id || talent._id}`}
                  className="flex items-center justify-center gap-2 py-4 bg-gray-50 text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition"
                >
                  <MessageSquare size={14} /> Message
                </Link>
                <button className="flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition shadow-lg active:scale-95">
                  <UserPlus size={14} /> Hire
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
          <Bookmark size={60} className="mx-auto text-gray-100 mb-6" />
          <p className="text-gray-500 font-black italic text-lg">Your talent pool is empty.</p>
          <p className="text-gray-400 text-sm mb-8">Start building your network of top students.</p>
          <Link 
            to="/client/discover-students" 
            className="text-indigo-600 font-black uppercase text-xs tracking-widest border-b-2 border-indigo-100 hover:border-gray-900 hover:text-gray-900 pb-1 transition-all"
          >
            Browse students →
          </Link>
        </div>
      )}
    </div>
  );
}