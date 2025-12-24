import React, { useState } from "react";
// ❌ Removed DashboardLayout to prevent layout nesting
import BackButton from "../../components/BackButton";
import { 
  Percent, 
  DollarSign, 
  ShieldCheck, 
  Save, 
  AlertTriangle,
  Info,
  RefreshCw,
  TrendingUp,
  Clock
} from "lucide-react";

export default function RevenueSettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    platformCommission: 10, // 10%
    minimumWithdrawal: 1000, // SSP
    processingFee: 50, // Fixed SSP
    taxRate: 2, // 2% 
    escrowHoldDays: 3
  });

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const saveConfig = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API: PATCH /api/v1/admin/finance-settings
    setTimeout(() => {
      setLoading(false);
      alert("Financial configurations updated successfully!");
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8">
      
      {/* Header */}
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 italic tracking-tighter">
              Revenue Model<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Configure Platform Fees & Payout Logic</p>
          </div>
          <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <TrendingUp size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Economy: Stable</span>
          </div>
        </header>
      </div>

      <form onSubmit={saveConfig} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Financial Controls */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Commission Setting */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  Platform Commission <Percent size={14} className="text-indigo-500" />
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    name="platformCommission"
                    value={settings.platformCommission}
                    onChange={handleUpdate}
                    className="w-full p-6 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/10 outline-none font-black text-2xl italic shadow-inner"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-300 text-xl">%</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold leading-relaxed">Amount deducted from project value upon successful milestone completion.</p>
              </div>

              {/* Processing Fee Setting */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  System Processing Fee <DollarSign size={14} className="text-indigo-500" />
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    name="processingFee"
                    value={settings.processingFee}
                    onChange={handleUpdate}
                    className="w-full p-6 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/10 outline-none font-black text-2xl italic shadow-inner"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-300 text-sm">SSP</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold leading-relaxed">Flat surcharge per transaction to cover mobile money provider costs.</p>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Minimum Withdrawal */}
               <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Min. Payout Threshold</label>
                <div className="relative">
                  <input 
                    type="number" 
                    name="minimumWithdrawal"
                    value={settings.minimumWithdrawal}
                    onChange={handleUpdate}
                    className="w-full p-6 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/10 outline-none font-black text-xl italic shadow-inner"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-300 text-xs">SSP</span>
                </div>
              </div>

              {/* Escrow Hold */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <Clock size={12} /> Escrow Hold (Days)
                </label>
                <input 
                  type="number" 
                  name="escrowHoldDays"
                  value={settings.escrowHoldDays}
                  onChange={handleUpdate}
                  className="w-full p-6 bg-gray-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/10 outline-none font-black text-xl italic shadow-inner"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-600 transition shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
              {loading ? "Updating Ledger Config..." : "Apply Financial Changes"}
            </button>
          </div>
        </div>

        {/* Sidebar: Strategic Context */}
        <div className="space-y-6">
          <div className="bg-indigo-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-200 border-b-4 border-indigo-700">
             <ShieldCheck className="mb-6 text-indigo-400" size={40} />
             <h3 className="text-xl font-black italic tracking-tight">Platform Safety</h3>
             <p className="text-xs mt-4 opacity-70 leading-relaxed font-bold uppercase tracking-wide">
               Financial changes are **Non-Retroactive**. Active contracts will remain locked at the commission rate agreed upon at the time of posting.
             </p>
          </div>

          <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100">
             <div className="flex items-start gap-4 text-amber-700">
                <AlertTriangle size={24} className="shrink-0" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Economic Alert</h4>
                  <p className="text-xs font-bold mt-2 leading-relaxed italic">
                    Current market analysis suggests a maximum **12% commission** for the South Sudan freelance sector to remain competitive.
                  </p>
                </div>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-5">
             <div className="p-4 bg-gray-50 text-gray-400 rounded-2xl border border-gray-100"><Info size={24}/></div>
             <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-2">Last Audit</h4>
                <p className="text-xs font-black text-gray-900 italic uppercase">Dec 20, 2025</p>
                <p className="text-[9px] font-bold text-indigo-600 mt-0.5">By SuperAdmin</p>
             </div>
          </div>
        </div>

      </form>
    </div>
  );
}