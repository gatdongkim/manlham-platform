import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, ChevronRight, ShieldCheck, AlertCircle } from "lucide-react";
import BackButton from "../../components/BackButton";
import { useAuth } from "../../contexts/AuthContext";

export default function SignupClient() {
  const navigate = useNavigate();
  const { register } = useAuth(); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    clientType: "",
    location: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    // 1. Basic Validation
    if (!form.agree) return setError("Please agree to the terms.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");

    setLoading(true);
    try {
      // 2. Prepare data exactly as backend auth.controller.js expects
      const signupData = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: "MSME", // This maps to MSME in your backend enum
        clientType: form.clientType, // Already uppercased by select options
        location: form.location.trim(),
        phone: form.phone.trim()
      };

      console.log("🚀 Sending Request to Backend:", signupData);

      // 3. AWAIT the register call from AuthContext
      // This is the line that connects to your http.js/Axios instance
      const response = await register(signupData);

      // 4. Handle Success
      console.log("✅ Backend Response:", response);
      
      // Navigate only after successful response
      navigate("/login", { 
        state: { successMessage: "Account created successfully! You can now log in." } 
      });

    } catch (err) {
      console.error("❌ Signup Component Caught Error:", err);
      
      // Extract the error message sent by your backend res.status(400).json({message: ...})
      const errorMessage = err.response?.data?.message || err.message || "Registration failed.";
      setError(errorMessage);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] py-12 px-6 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-xl">
        <div className="mb-8"><BackButton text="Back to Selection" to="/register" /></div>
        
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
          <header className="text-center mb-10">
            <div className="inline-flex w-14 h-14 bg-indigo-600 text-white rounded-2xl items-center justify-center mb-4 shadow-lg shadow-indigo-100">
              <Building2 size={28} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight italic uppercase">
              Hire Talent<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">
              Access South Sudan's Verified Professionals
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Feedback */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-100 text-center flex items-center justify-center gap-2 animate-bounce">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Entity Name</label>
                 <input name="name" required className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all" placeholder="Company/Full Name" onChange={updateField} />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Client Category</label>
                 <select name="clientType" required className="w-full px-4 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm appearance-none cursor-pointer focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all" onChange={updateField}>
                    <option value="">Select Category</option>
                    <option value="INDIVIDUAL">Individual</option>
                    <option value="COMPANY">Company</option>
                    <option value="ORGANIZATION">Organization / NGO</option>
                 </select>
              </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Email</label>
                <input type="email" name="email" required className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all" placeholder="business@example.com" onChange={updateField} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input name="location" required className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all" placeholder="Primary Location" onChange={updateField} />
              <input name="phone" required className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all" placeholder="Phone (+211...)" onChange={updateField} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input type="password" name="password" required className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all" placeholder="Password" onChange={updateField} />
              <input type="password" name="confirmPassword" required className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl outline-none font-bold text-sm focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all" placeholder="Confirm Password" onChange={updateField} />
            </div>

            <label className="flex items-start gap-3 p-5 bg-gray-50 rounded-[2rem] cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="checkbox" name="agree" checked={form.agree} className="mt-1 w-4 h-4 rounded text-indigo-600" onChange={updateField} />
              <span className="text-[11px] text-gray-500 font-bold uppercase tracking-tight">I agree to the Terms and acknowledge the Escrow Protocol.</span>
            </label>

            <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2">
              {loading ? "Registering Profile..." : <>Create Client Account <ChevronRight size={18} /></>}
            </button>
          </form>
        </div>

        <div className="mt-8 flex justify-center items-center gap-4 text-gray-400">
          <ShieldCheck size={20} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Manlham Secured Registration</span>
        </div>
      </div>
    </div>
  );
}