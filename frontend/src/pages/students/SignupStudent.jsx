import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Plus, X, ArrowRight } from "lucide-react";
import BackButton from "../../components/BackButton";
import api from "../../api/http";

export default function SignupStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); 
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    institutionType: "",
    about: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const addSkill = (e) => {
    if (e) e.preventDefault();
    const val = skillInput.trim();
    if (val && !skills.includes(val) && skills.length < 10) {
      setSkills([...skills, val]);
      setSkillInput("");
    }
  };

  const removeSkill = (tag) => setSkills(skills.filter(s => s !== tag));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (skills.length < 3) {
      setError("Please add at least 3 skills!");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!form.agree) {
      setError("You must agree to the terms.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setLoading(true);
    try {
      await api.post("/auth/register", { 
        name: form.name,
        email: form.email,
        password: form.password,
        institutionType: form.institutionType,
        about: form.about,
        skills: skills,
        role: "PRO",
        isVerified: true 
      });

      setIsRegistered(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.response?.data?.message || "Connection refused. Is the backend running?");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-6">
        <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl text-center max-w-lg border border-indigo-50">
          <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Mail size={48} className="animate-pulse" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 italic tracking-tighter mb-4 text-center">Check your inbox<span className="text-indigo-600">.</span></h2>
          <p className="text-gray-500 font-bold leading-relaxed mb-10 uppercase text-[11px] tracking-widest px-4">
            Account created for <span className="text-indigo-600 lowercase">{form.email}</span>
          </p>
          <Link to="/login" className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-600 transition-all">
            Proceed to Login <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] py-12 px-6 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-xl">
        <div className="mb-8"><BackButton text="Back to Selection" to="/register" /></div>
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
          
          {/* --- HEADER UPDATED WITH LOGO --- */}
          <header className="text-center mb-10">
            <div className="inline-flex mb-6">
              <img 
                src="/logo.png" 
                alt="Manlham Tech Logo" 
                className="w-20 h-20 object-contain" 
              />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight italic uppercase">
              Student Account<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase mt-2">
              Join the professional marketplace
            </p>
          </header>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input name="name" required onChange={updateField} className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all" placeholder="Full Name" />
              <select name="institutionType" required onChange={updateField} className="w-full px-4 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm cursor-pointer focus:bg-white">
                <option value="">Institution Level</option>
                <option value="UNIVERSITY">University</option>
                <option value="COLLEGE">College</option>
                <option value="SECONDARY">Secondary</option>
              </select>
            </div>

            <input type="email" name="email" required onChange={updateField} className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm focus:bg-white" placeholder="Email Address" />

            <div className="space-y-3">
              <div className="flex gap-2">
                <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSkill(e)} placeholder="Add Skill (e.g. React)" className="flex-1 px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm" />
                <button type="button" onClick={addSkill} className="w-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Plus size={24} /></button>
              </div>
              <div className="flex flex-wrap gap-2 p-2 bg-indigo-50/30 rounded-2xl border border-dashed border-indigo-100 min-h-[50px]">
                {skills.map(skill => (
                  <span key={skill} className="bg-white border border-indigo-100 text-indigo-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-sm">
                    {skill} <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                  </span>
                ))}
              </div>
            </div>

            <textarea name="about" onChange={updateField} className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm h-28 resize-none focus:bg-white" placeholder="Tell us about your professional goals..." />

            <div className="grid md:grid-cols-2 gap-6">
              <input type="password" name="password" required onChange={updateField} className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm" placeholder="Password" />
              <input type="password" name="confirmPassword" required onChange={updateField} className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm" placeholder="Confirm" />
            </div>

            <label className="flex items-start gap-3 p-5 bg-gray-50 rounded-[2rem] cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" name="agree" checked={form.agree} className="mt-1 w-4 h-4 rounded text-indigo-600" onChange={updateField} />
              <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tight">I agree to the Terms and acknowledge the Student Protocol.</span>
            </label>

            <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl disabled:bg-gray-400">
              {loading ? "Registering Account..." : "Launch Professional Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}