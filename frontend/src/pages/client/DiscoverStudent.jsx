import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/http"; // ✅ Consistent API usage
import { Search, UserCircle, Star, GraduationCap, ArrowRight, Filter, ChevronLeft, Loader2 } from "lucide-react";

export default function DiscoverStudent() { // ✅ Renamed to singular to match route
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/students/all'); 
      const data = response.data.data || response.data;
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s =>
    s?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    s?.skills?.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20 animate-in fade-in duration-500">
      <header className="mb-10">
        <button 
          onClick={() => navigate('/client/dashboard')} 
          className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-8 hover:text-indigo-600 transition group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </button>
        
        <h1 className="text-5xl font-black text-gray-900 italic tracking-tight uppercase">
          Talent Marketplace<span className="text-indigo-600">.</span>
        </h1>
        <p className="text-gray-500 font-black uppercase text-[10px] tracking-widest mt-2">Hire top-tier students from leading East African institutions.</p>
      </header>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, skill, or institution..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Scanning Student Directory...</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudents.length > 0 ? filteredStudents.map((student) => (
            <div key={student._id} className="group bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                  <UserCircle size={36} />
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-black bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-tighter">
                  <Star size={14} fill="currentColor" /> {student.rating || '5.0'}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 tracking-tight italic uppercase">
                  {student?.user?.name}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  <GraduationCap size={16} className="text-indigo-400" />
                  <span className="truncate">{student?.institutionType}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {student?.skills?.slice(0, 4).map((skill, index) => (
                    <span key={index} className="text-[9px] font-black uppercase tracking-widest bg-gray-50 text-gray-500 px-3 py-1.5 rounded-lg border border-gray-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => navigate(`/student/profile/${student._id}`)}
                className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
              >
                Inspect Profile <ArrowRight size={14} strokeWidth={3} />
              </button>
            </div>
          )) : (
            <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <UserCircle className="mx-auto text-gray-200 mb-8" size={64} />
              <p className="text-gray-900 font-black italic text-2xl uppercase tracking-tight">No talent matches found</p>
              <button 
                onClick={() => setSearch("")} 
                className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mt-4 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}