import React, { useState } from "react";
// ❌ Removed DashboardLayout import
import BackButton from "../../components/BackButton"; 
import { 
  Megaphone, 
  Send, 
  Eye, 
  Users, 
  Layout, 
  Clock
} from "lucide-react";

export default function AdminPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    target: "ALL", 
    priority: "NORMAL"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Replace this with your actual API call: 
    // await api.post('/admin/broadcast', form);
    setTimeout(() => {
      setLoading(false);
      alert(`Announcement "${form.title}" published!`);
      setForm({ title: "", content: "", target: "ALL", priority: "NORMAL" });
    }, 1500);
  };

  return (
    // ✅ Replaced <DashboardLayout> with a standard <div> container
    <div className="max-w-6xl mx-auto pb-20 space-y-6">
      
      {/* Navigation & Header */}
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3 italic">
              Broadcast<span className="text-indigo-600">.</span> <Megaphone className="text-indigo-600" size={32} />
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">
              Send system-wide notifications and updates.
            </p>
          </div>
        </header>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Form */}
        <form onSubmit={submit} className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Audience</label>
                <div className="relative mt-1">
                  <Users className="absolute left-3 top-3 text-gray-400" size={16} />
                  <select name="target" value={form.target} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none font-bold text-sm">
                    <option value="ALL">Everyone</option>
                    <option value="STUDENTS">Students Only</option>
                    <option value="CLIENTS">Clients Only</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Priority</label>
                <select name="priority" value={form.priority} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm">
                  <option value="NORMAL">Normal</option>
                  <option value="URGENT">Urgent (Red Label)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Scheduled Maintenance" className="w-full mt-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold" required />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Content</label>
              <textarea name="content" value={form.content} onChange={handleChange} placeholder="Write your message..." className="w-full mt-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl h-64 focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed font-medium" required />
            </div>

            <button disabled={loading} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 disabled:bg-gray-400 active:scale-95">
              <Send size={20} />
              {loading ? "Publishing..." : "Broadcast Announcement"}
            </button>
          </div>
        </form>

        {/* Live Preview Section */}
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Eye size={20} />
            <span className="text-xs font-black uppercase tracking-widest">Live Preview</span>
          </div>
          <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 p-8 min-h-[400px] shadow-sm">
            {!form.title && !form.content ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 mt-20">
                <Layout size={48} />
                <p className="mt-2 text-sm font-bold uppercase tracking-tighter">Drafting Phase...</p>
              </div>
            ) : (
              <article className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${form.priority === 'URGENT' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                    {form.priority}
                  </span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 font-black uppercase">
                    <Clock size={12} /> JUST NOW
                  </span>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter italic">{form.title || "Headline Here"}</h2>
                <div className="text-gray-600 whitespace-pre-wrap leading-relaxed font-medium">
                  {form.content || "Message body will appear here..."}
                </div>
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}