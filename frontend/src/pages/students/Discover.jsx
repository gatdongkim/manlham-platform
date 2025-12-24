import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, BookOpen, Briefcase, Users, ArrowUpRight } from "lucide-react";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch real jobs from backend on load
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/v1/jobs');
        // We map backend "OPEN" jobs to the "Job" type for the UI
        const backendJobs = data.map(job => ({
          id: job._id,
          title: job.title,
          type: "Job",
          company: job.client?.name || "Client",
          skills: job.category ? [job.category] : ["General"],
          budget: job.budget
        }));
        setOpportunities(backendJobs);
      } catch (err) {
        console.error("Failed to fetch opportunities", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filtered = opportunities.filter(item => {
    const matchesType = filter === "ALL" || item.type === filter;
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Discover</h1>
        <p className="text-gray-500 text-lg mt-2">
          Find your next gig, learn a new skill, or connect with a mentor.
        </p>
      </header>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by title, skill, or company..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400 hidden md:block" />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full md:w-48 p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Job">Freelance Jobs</option>
            <option value="Course">Courses</option>
            <option value="Mentorship">Mentorship</option>
          </select>
        </div>
      </div>

      {/* Grid Layout */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                  item.type === 'Job' ? 'bg-emerald-100 text-emerald-700' : 
                  item.type === 'Course' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {item.type === 'Job' && <Briefcase size={12} />}
                  {item.type === 'Course' && <BookOpen size={12} />}
                  {item.type === 'Mentorship' && <Users size={12} />}
                  {item.type}
                </span>
                {item.budget && (
                  <span className="text-sm font-bold text-gray-900">KES {item.budget.toLocaleString()}</span>
                )}
              </div>

              <h3 className="font-bold text-xl text-gray-800 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">{item.company}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.skills.map(skill => (
                  <span key={skill} className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>

              <button className="mt-auto flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all">
                View Opportunity <ArrowUpRight size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* No Results State */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg">No opportunities match your search criteria.</p>
          <button onClick={() => {setQuery(""); setFilter("ALL")}} className="text-indigo-600 font-bold mt-2 hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}