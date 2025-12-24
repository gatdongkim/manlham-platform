import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/http";
import { Search, UserCircle, Star, GraduationCap, ArrowRight, Filter, ChevronLeft, Loader2 } from "lucide-react";

export default function DiscoverStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await API.get('/students/all'); 
      const data = response.data;
      const extractedData = data?.data || (Array.isArray(data) ? data : []);
      
      if (extractedData.length === 0) {
        setStudents([
          {
            _id: "1",
            user: { name: "John Doe" },
            institutionType: "University of Juba",
            skills: ["React", "Node.js", "Tailwind"],
            rating: 5.0
          },
          {
            _id: "2",
            user: { name: "Sarah Smith" },
            institutionType: "Nairobi Technical University",
            skills: ["UI/UX", "Figma", "Adobe XD"],
            rating: 4.8
          }
        ]);
      } else {
        setStudents(extractedData);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]); // ✅ Prevent .map() crash on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = (students || []).filter(s =>
    s?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    s?.skills?.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <header className="mb-10">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-8 hover:text-indigo-600 transition group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </button>
        
        <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">
          Talent Marketplace<span className="text-indigo-600">.</span>
        </h1>
        <p className="text-gray-500 font-medium mt-1">Hire top-tier students from leading East African institutions.</p>
      </header>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, skill, or institution..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition shadow-sm active:scale-95">
          <Filter size={18} /> Filter Results
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Scanning Student Directory...</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudents.length > 0 ? filteredStudents.map((student) => (
            <div key={student._id} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-full blur-3xl -mr-12 -mt-12 transition-colors group-hover:bg-indigo-100" />
              
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                  <UserCircle size={36} />
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-black bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-tighter">
                  <Star size={14} fill="currentColor" /> {student.rating || '5.0'}
                </div>
              </div>

              <div className="relative z-10 flex-1">
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 tracking-tight leading-none">
                  {student?.user?.name}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  <GraduationCap size={16} className="text-indigo-400" />
                  <span className="truncate">{student?.institutionType}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {student?.skills?.slice(0, 4).map((skill, index) => (
                    <span key={index} className="text-[9px] font-black uppercase tracking-widest bg-gray-50 text-gray-500 px-3 py-1.5 rounded-lg border border-gray-100 group-hover:border-indigo-100 transition-colors">
                      {skill}
                    </span>
                  ))}
                  {student?.skills?.length > 4 && (
                    <span className="text-[9px] font-black text-gray-300 px-2 py-1.5 tracking-widest">+{student.skills.length - 4} More</span>
                  )}
                </div>
              </div>

              <button 
                onClick={() => navigate(`/student/profile/${student._id}`)}
                className="relative z-10 w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95 group-hover:shadow-indigo-200"
              >
                Inspect Profile <ArrowRight size={14} strokeWidth={3} />
              </button>
            </div>
          )) : (
            <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
              <UserCircle className="mx-auto text-gray-100 mb-6" size={64} />
              <p className="text-gray-400 font-black italic text-lg">No talent matches your search.</p>
              <button 
                onClick={() => setSearch("")} 
                className="text-indigo-600 font-black uppercase text-xs mt-4 hover:underline"
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