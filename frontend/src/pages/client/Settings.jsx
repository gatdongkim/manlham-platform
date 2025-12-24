import React, { useState } from "react";
import { 
  User, 
  Building, 
  Smartphone, 
  Lock, 
  Bell, 
  Save, 
  ShieldCheck,
  Loader2 
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; // ✅ Pulling real user data

export default function ClientSettings() {
  const { user, updateUser } = useAuth(); // ✅ Get dynamic user and update function
  const [loading, setLoading] = useState(false);
  
  // Initialize form with real data from your AuthContext
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: user?.company || "",
    mpesaNumber: user?.mpesaNumber || "",
    notifications: user?.notifications ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call to your backend
      // await API.patch('/users/profile', form);
      
      // ✅ Update the local context so the Header changes immediately
      updateUser(form); 
      
      setTimeout(() => {
        setLoading(false);
        alert("Settings updated successfully!");
      }, 800);
    } catch (error) {
      console.error("Save failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 italic tracking-tight">
          Settings<span className="text-indigo-600">.</span>
        </h1>
        <p className="text-gray-500 font-medium">Manage your organization and payment preferences.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section: Profile Information */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
            <User className="text-indigo-600" size={20} />
            <h2 className="font-black text-xs uppercase tracking-widest text-gray-800">Profile Details</h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition font-bold text-gray-400"
                disabled // Usually email shouldn't be changed without verification
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-1">
                <Building size={12} /> Company / Organization Name
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition font-bold"
              />
            </div>
          </div>
        </div>

        {/* Section: Payment Settings */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
            <Smartphone className="text-indigo-600" size={20} />
            <h2 className="font-black text-xs uppercase tracking-widest text-gray-800">Payment Methods</h2>
          </div>
          <div className="p-8">
            <div className="max-w-sm space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Default M-Pesa Number</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-sm font-bold text-gray-400">+</span>
                <input
                  name="mpesaNumber"
                  value={form.mpesaNumber}
                  onChange={handleChange}
                  placeholder="2547..."
                  className="w-full pl-8 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition font-bold"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-medium">This number will be pre-filled during STK push for hiring students.</p>
            </div>
          </div>
        </div>

        {/* Section: Preferences */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">Email Notifications</h3>
              <p className="text-xs text-gray-500 font-medium">Receive alerts for new applications and job completions.</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="notifications" 
              checked={form.notifications} 
              onChange={handleChange}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button type="button" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition flex items-center gap-2">
            <Lock size={14} /> Change Password
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition shadow-xl shadow-gray-200 active:scale-95 disabled:bg-gray-400"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {loading ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>

      </form>

      {/* Security Badge */}
      <div className="mt-12 p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex items-center gap-4">
        <ShieldCheck className="text-emerald-600" size={32} />
        <div>
          <h4 className="font-black text-emerald-900 text-sm uppercase tracking-tight">Data Privacy</h4>
          <p className="text-xs text-emerald-700 mt-0.5 font-medium">Your payment information and company data are encrypted and never shared with third parties.</p>
        </div>
      </div>
    </div>
  );
}