import React, { useState, useEffect } from "react";
// ✅ FIXED: Using your custom API instance for base URL and Auth headers
import api from "../../api/http";
import { UserCircle, Bookmark, Star, MessageSquare, UserPlus, Trash2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function RememberTalent() {
  const navigate = useNavigate();
  const [savedTalent, setSavedTalent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedTalent = async () => {
      try {
        // ✅ FIXED: Endpoint synchronization
        const response = await api.get('/clients/saved-talent');
        const actualData = response.data.data || response.data;
        setSavedTalent(Array.isArray(actualData) ? actualData : []);
      } catch (err) {
        console.error("Error fetching saved talent:", err);
        setSavedTalent([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchSavedTalent();
  }, []);

  const removeTalent = async (id) => {
    try {
      // Optional: Add API call to remove from database here
      setSavedTalent(savedTalent.filter(t => (t.id || t._id) !== id));
    } catch (err) {
      console.error("Failed to remove talent");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 italic tracking-tight flex items-center gap-3 uppercase">
            Saved Talent <Bookmark className="text-indigo-600" fill="currentColor" size={32} />
          </h1>
          <p className="text-gray-500 mt-2 font-black uppercase text-[10px] tracking-widest">Your curated list of top-performing professionals.</p>
        </div>
        <button 
          onClick={() => navigate('/client/discover-student')} 
          className="bg-gray-900 text-white px-8 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition shadow-xl active:scale-95"
        >
          Discover More Talent
        </button>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Opening Favorites...</p>
        </div>
      ) : savedTalent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTalent.map((talent) => (
            <div key={talent.id || talent._id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <UserCircle size={36} />
                </div>
                <button 
                  onClick={() => removeTalent(talent.id || talent._id)}
                  className="p-3 bg-gray-50 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-1 tracking-tight italic uppercase">{talent.name}</h3>
              <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-1">{talent.role || "Professional"}</p>
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-tighter mb-4">{talent.institution}</p>

              <div className="flex items-center gap-1.5 text-amber-500 mb-8 bg-amber-50 w-fit px-3 py-1.5 rounded-xl border border-amber-100">
                <Star size={14} fill="currentColor" />
                <span className="text-[10px] font-black">{talent.rating || "5.0"}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate(`/client/chats?user=${talent.id || talent._id}`)}
                  className="flex items-center justify-center gap-2 py-4 bg-gray-50 text-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition"
                >
                  <MessageSquare size={14} /> Message
                </button>
                <button className="flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition shadow-lg active:scale-95">
                  <UserPlus size={14} /> Hire
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
          <Bookmark size={60} className="mx-auto text-gray-200 mb-8" />
          <p className="text-gray-900 font-black italic text-2xl uppercase tracking-tight">Your talent pool is empty</p>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2 mb-10">Start building your network of top students.</p>
          <Link 
            to="/client/discover-student" 
            className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-indigo-100"
          >
            Browse students →
          </Link>
        </div>
      )}
    </div>
  );
}