import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import { 
  Settings, 
  Percent, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Unlock, 
  Globe, 
  Save,
  AlertTriangle,
  RefreshCcw
} from "lucide-react";

export default function SystemSettings() {
  const [isEditable, setIsEditable] = useState(false);
  const [config, setConfig] = useState({
    platformFee: 10,
    minWithdrawal: 1500,
    maxWithdrawal: 50000,
    maintenanceMode: false,
    requireID: true,
    autoApproveJobs: false
  });

  const handleToggle = (key) => {
    if (!isEditable) return;
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (key, val) => {
    if (!isEditable) return;
    setConfig(prev => ({ ...prev, [key]: parseInt(val) || 0 }));
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-8">
      
      {/* Header */}
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        <header className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">
              System Core<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Global Configuration & Logic Overrides</p>
          </div>
          
          <button 
            onClick={() => setIsEditable(!isEditable)}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl active:scale-95 ${
              isEditable ? "bg-amber-500 text-white shadow-amber-200" : "bg-gray-900 text-white shadow-gray-200"
            }`}
          >
            {isEditable ? <Unlock size={18} /> : <Lock size={18} />}
            {isEditable ? "Lock & Discard" : "Edit Configuration"}
          </button>
        </header>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Marketplace Economics */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
          <h3 className="text-xl font-black text-gray-900 italic flex items-center gap-3">
            <Percent className="text-indigo-600" /> Marketplace Fees
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Platform Commission (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  disabled={!isEditable}
                  value={config.platformFee}
                  onChange={(e) => handleInputChange('platformFee', e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-black text-gray-900 text-lg outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-50 transition-all"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-black">%</span>
              </div>
              <p className="text-[9px] text-gray-400 font-bold mt-2 italic">* This percentage is deducted from the total job value upon escrow release.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Min Payout (SSP)</label>
                <input 
                  type="number" 
                  disabled={!isEditable}
                  value={config.minWithdrawal}
                  onChange={(e) => handleInputChange('minWithdrawal', e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-black text-gray-900 text-sm outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Max Payout (SSP)</label>
                <input 
                  type="number" 
                  disabled={!isEditable}
                  value={config.maxWithdrawal}
                  onChange={(e) => handleInputChange('maxWithdrawal', e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-black text-gray-900 text-sm outline-none disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
          <h3 className="text-xl font-black text-gray-900 italic flex items-center gap-3">
            <ShieldCheck className="text-indigo-600" /> Security Protocol
          </h3>

          <div className="space-y-4">
            {[
              { id: 'requireID', label: 'Enforce ID Verification', desc: 'Students cannot apply for jobs without a verified profile.' },
              { id: 'autoApproveJobs', label: 'Auto-Approve Postings', desc: 'Jobs go live instantly without staff moderation.' },
              { id: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Temporarily lock the marketplace for all users.' }
            ].map((toggle) => (
              <button 
                key={toggle.id}
                onClick={() => handleToggle(toggle.id)}
                className={`w-full p-6 rounded-3xl border text-left transition-all flex items-center justify-between ${
                  config[toggle.id] ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-100 opacity-80'
                }`}
              >
                <div className="max-w-[80%]">
                  <p className={`text-xs font-black uppercase tracking-widest mb-1 ${config[toggle.id] ? 'text-indigo-600' : 'text-gray-900'}`}>{toggle.label}</p>
                  <p className="text-[10px] text-gray-400 font-bold leading-relaxed">{toggle.desc}</p>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${config[toggle.id] ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config[toggle.id] ? 'left-7' : 'left-1'}`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Global Action Bar */}
      {isEditable && (
        <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom-10">
          <div className="flex items-center gap-4 text-white">
            <AlertTriangle className="text-amber-400" size={32} />
            <div>
              <p className="font-black italic text-lg tracking-tight leading-none">Unsaved Changes</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Changes affect all users across the platform.</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">
              <Save size={18} /> Apply Changes
            </button>
          </div>
        </div>
      )}

    </div>
  );
}