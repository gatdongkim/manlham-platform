import React, { useState } from "react";
// ❌ Removed DashboardLayout import
import BackButton from "../../components/BackButton";
import { 
  ShieldCheck, 
  Upload, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Fingerprint
} from "lucide-react";

export default function StaffVerification() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("IDLE"); // IDLE, UPLOADING, SUBMITTED

  const handleUpload = (e) => {
    e.preventDefault();
    setStatus("UPLOADING");
    
    // Simulate File Processing
    setTimeout(() => {
      setStatus("SUBMITTED");
    }, 2000);
  };

  // ✅ Returning content only - Layout is handled by App.jsx
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8">
      
      <div className="space-y-4">
        <BackButton text="Back to Dashboard" to="/staff/dashboard" />
        <header>
          <h1 className="text-4xl font-black text-gray-900 italic">
            Security Clearance<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-500 font-semibold mt-1 italic uppercase text-[10px] tracking-widest">
            Identity Verification & Background Check
          </p>
        </header>
      </div>

      {status === "SUBMITTED" ? (
        <div className="bg-white p-12 rounded-[3rem] border border-emerald-100 shadow-xl shadow-emerald-50 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">Documents Received</h2>
            <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
              Your credentials have been sent to the Admin for review. This typically takes 24 hours.
            </p>
          </div>
          <button 
            onClick={() => setStatus("IDLE")}
            className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em]"
          >
            Update Documents
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Guidelines Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
              <Fingerprint size={32} className="mb-4 opacity-50" />
              <h3 className="text-xl font-black italic mb-3">Verification Rules</h3>
              <ul className="text-xs space-y-4 font-bold opacity-90 tracking-tight">
                <li className="flex gap-2"><span>•</span> Government issued ID (Passport/National ID)</li>
                <li className="flex gap-2"><span>•</span> Image must be clear and uncropped</li>
                <li className="flex gap-2"><span>•</span> Company badge (Optional but recommended)</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-3">
              <AlertCircle className="text-amber-600 shrink-0" size={20} />
              <p className="text-[10px] font-black text-amber-800 uppercase leading-tight">
                Access to Support Tickets will be restricted until verified.
              </p>
            </div>
          </div>

          {/* Upload Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleUpload} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Select Document Type</label>
                <select className="w-full p-4 bg-gray-50 border-none rounded-2xl font-black italic outline-none focus:ring-4 focus:ring-indigo-500/10">
                  <option>National ID Card</option>
                  <option>Passport</option>
                  <option>Staff ID Badge</option>
                </select>
              </div>

              <div className="relative group">
                <input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="border-4 border-dashed border-gray-100 rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-4 group-hover:border-indigo-200 transition-all bg-gray-50/30">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-indigo-600 shadow-sm transition-colors">
                    <Upload size={28} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black text-gray-900 uppercase">
                      {file ? file.name : "Click to upload ID"}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">PNG, JPG or PDF (Max 5MB)</p>
                  </div>
                </div>
              </div>

              <button 
                disabled={!file || status === "UPLOADING"}
                className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-indigo-100 hover:bg-gray-900 transition flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
              >
                {status === "UPLOADING" ? <Loader2 className="animate-spin" /> : <ShieldCheck size={18} />}
                {status === "UPLOADING" ? "Uploading Securely..." : "Submit for Verification"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}