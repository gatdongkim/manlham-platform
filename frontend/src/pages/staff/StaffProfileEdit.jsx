import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import BackButton from "../../components/BackButton";
import { 
  User, 
  Mail, 
  Building2, 
  Stethoscope, 
  Award, 
  Save, 
  Loader2,
  Camera
} from "lucide-react";

export default function StaffProfileEdit() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "Kelvin Kibet",
    email: "kibet@manlham.tech",
    department: "TECH_SUPPORT",
    specialty: "Network Diagnostics",
    bio: "Dedicated to resolving hardware and software hurdles for South Sudanese MSMEs."
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API update
    setTimeout(() => {
      setLoading(false);
      alert("Staff Profile Updated!");
    }, 1500);
  };

  return (
    <DashboardLayout role="STAFF">
      <div className="max-w-4xl mx-auto pb-20 space-y-8">
        
        <div className="space-y-4">
          <BackButton text="Back to Dashboard" to="/staff/dashboard" />
          <header>
            <h1 className="text-4xl font-black text-gray-900 italic">
              Staff Identity<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-semibold mt-1">Manage your internal credentials and department settings.</p>
          </header>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Avatar & Role Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm text-center">
              <div className="relative inline-block mx-auto mb-4">
                <div className="w-32 h-32 bg-indigo-50 rounded-[2.5rem] border-4 border-white shadow-xl flex items-center justify-center text-indigo-600">
                  <User size={48} />
                </div>
                <button type="button" className="absolute -bottom-2 -right-2 bg-gray-900 text-white p-3 rounded-2xl shadow-lg hover:bg-indigo-600 transition-colors">
                  <Camera size={18} />
                </button>
              </div>
              <h3 className="font-black text-gray-900 italic text-xl">{form.name}</h3>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">Verified Staff Member</p>
            </div>

            <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-4">Account Metadata</h4>
              <div className="space-y-4 text-xs font-bold">
                <div className="flex justify-between">
                  <span className="opacity-60">Staff ID:</span>
                  <span className="italic">MTS-8829-2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Joined:</span>
                  <span className="italic">Dec 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form Fields */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Official Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Department</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    value={form.department}
                    onChange={(e) => setForm({...form, department: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-black italic outline-none focus:ring-4 focus:ring-indigo-500/10 appearance-none"
                  >
                    <option value="TECH_SUPPORT">Tech Support</option>
                    <option value="FINANCE">Finance & Payouts</option>
                    <option value="MODERATION">Content Moderation</option>
                    <option value="ADMIN">Administration</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Expertise Specialty</label>
              <div className="relative">
                <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={form.specialty}
                  placeholder="e.g. M-Pesa API, React Debugging..."
                  onChange={(e) => setForm({...form, specialty: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Staff Bio</label>
              <textarea 
                value={form.bio}
                rows={4}
                onChange={(e) => setForm({...form, bio: e.target.value})}
                className="w-full p-6 bg-gray-50 border-none rounded-[2rem] font-medium text-sm outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
              />
            </div>

            <button 
              disabled={loading}
              className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-indigo-100 hover:bg-gray-900 transition flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
              {loading ? "Saving Records..." : "Update Staff Profile"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}