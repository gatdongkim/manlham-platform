import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { User, Lock, Bell, ShieldCheck, Save, LogOut } from "lucide-react";

export default function Settings() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    notifications: true,
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to update user basic info
      await axios.put('/api/v1/auth/update-details', { 
        name: form.name, 
        email: form.email 
      });
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Account Settings</h1>
        <p className="text-gray-500">Manage your profile, security, and notification preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Navigation Sidebar (Desktop) */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-sm">
            <User size={18} /> Public Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition">
            <Lock size={18} /> Password & Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition">
            <Bell size={18} /> Notifications
          </button>
          <hr className="my-4" />
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium text-sm transition"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Profile Section */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                <ShieldCheck className="text-indigo-600" size={20} />
                <h2 className="font-bold text-gray-800">Basic Information</h2>
            </div>
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                    disabled={loading}
                    className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition disabled:bg-gray-400"
                >
                  <Save size={18} /> {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>

          {/* Preferences Section */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Email Preferences</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-gray-800">Marketing Notifications</span>
                  <span className="text-xs text-gray-500">Stay updated with new features and opportunities.</span>
                </div>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={form.notifications}
                  onChange={handleChange}
                  className="w-5 h-5 accent-indigo-600"
                />
              </label>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="p-6 border-2 border-dashed border-red-100 rounded-2xl">
            <h3 className="text-red-600 font-bold mb-1">Danger Zone</h3>
            <p className="text-xs text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="text-red-600 text-sm font-bold hover:underline">Delete my account</button>
          </section>

        </div>
      </div>
    </div>
  );
}