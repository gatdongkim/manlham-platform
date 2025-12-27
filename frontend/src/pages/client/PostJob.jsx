import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/http"; 
import { Loader2, Send, Briefcase, DollarSign, Calendar, Layout, FileText, Globe, ArrowLeft } from "lucide-react";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    currency: "SSP", 
    category: "Software Development",
    deadline: "",
    location: "Remote",
    skills: [] // ✅ Added to satisfy potential backend schema requirements
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Step 1: Format payload strictly (convert budget to Number)
      const payload = {
        ...formData,
        budget: Number(formData.budget),
        skills: ["General"] // Provide a default if the backend requires an array
      };

      // ✅ Step 2: Use the plural endpoint that matches your verified API structure
      // Your log shows /jobs/client-stats exists, suggesting /jobs is the base
      await API.post("/jobs", payload);
      
      navigate("/client/dashboard");
    } catch (error) {
      console.error("FULL SERVER ERROR:", error.response?.data);
      // ✅ Improved error alerting to see the specific field causing the 400/404
      const errorMessage = error.response?.data?.message || "Check network tab for details";
      alert(`Failed to post job: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8 p-4">
      <div className="space-y-4">
        <button 
          onClick={() => navigate('/client/dashboard')} 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>
        <header>
          <h1 className="text-4xl font-black text-gray-900 italic tracking-tighter uppercase">
            Create Opportunity<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
            Hire top student talent across South Sudan & Kenya
          </p>
        </header>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-indigo-100/20 space-y-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Project Title</label>
          <div className="relative">
            <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" required
              placeholder="e.g. Build a Landing Page for Juba Store"
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-gray-300"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Expertise Category</label>
            <div className="relative">
              <Layout className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select 
                className="w-full pl-14 pr-12 py-5 bg-gray-50 border-none rounded-2xl font-black italic outline-none appearance-none focus:ring-4 focus:ring-indigo-500/10"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                value={formData.category}
              >
                <option>Software Development</option>
                <option>Graphic Design</option>
                <option>Digital Marketing</option>
                <option>Data Entry</option>
                <option>Content Writing</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Working Model</label>
            <div className="relative">
              <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select 
                className="w-full pl-14 pr-12 py-5 bg-gray-50 border-none rounded-2xl font-black italic outline-none appearance-none focus:ring-4 focus:ring-indigo-500/10"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                value={formData.location}
              >
                <option>Remote</option>
                <option>Juba (On-site)</option>
                <option>Nairobi (On-site)</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Budget Allocation</label>
            <div className="flex gap-2">
              <select 
                className="w-28 bg-gray-900 text-white rounded-2xl font-black text-xs p-5 outline-none hover:bg-indigo-600 transition-colors cursor-pointer"
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
              >
                <option value="SSP">SSP</option>
                <option value="KES">KES</option>
                <option value="USD">USD</option>
              </select>
              <div className="relative flex-1">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="number" required
                  placeholder="5000"
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-gray-300"
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Project Deadline</label>
            <div className="relative">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="date" required
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Description & Deliverables</label>
          <div className="relative">
            <FileText className="absolute left-5 top-6 text-gray-400" size={20} />
            <textarea 
              required rows="6"
              placeholder="Describe exactly what needs to be done..."
              className="w-full pl-14 pr-6 py-6 bg-gray-50 border-none rounded-[2rem] font-medium text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none shadow-inner"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit" disabled={loading}
          className="w-full bg-gray-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-gray-200 active:scale-95 disabled:opacity-50 group"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
              Publish Opportunity
            </>
          )}
        </button>
      </form>
    </div>
  );
}