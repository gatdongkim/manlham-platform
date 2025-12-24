import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import BackButton from "../../components/BackButton"; // ✅ Added Import
import { CreditCard, Smartphone, TrendingUp, Wallet } from "lucide-react";

export default function FinancialAnalytics() {
  const stats = [
    { label: "M-Gurush Volume", value: "SSP 1,250,000", growth: "+12%", color: "bg-emerald-500" },
    { label: "MTN MoMo Volume", value: "SSP 840,000", growth: "+5%", color: "bg-yellow-500" },
    { label: "Card Payments", value: "$4,200", growth: "+18%", color: "bg-indigo-500" },
    { label: "M-Pesa (KSH)", value: "KSh 45,000", growth: "+2%", color: "bg-red-500" },
  ];

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-8 pb-20 max-w-7xl mx-auto">
        
        {/* ✅ BackButton Container */}
        <div className="pt-2">
          <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        </div>

        <header className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 italic">
            Financial Core<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-500 font-semibold uppercase text-[10px] tracking-[0.2em]">
            Cross-Border Payment Analytics
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300">
              <div className={`w-10 h-10 ${s.color} rounded-xl mb-4 flex items-center justify-center text-white shadow-lg`}>
                {s.label.includes("Card") ? <CreditCard size={20} /> : <Smartphone size={20} />}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
              <h3 className="text-2xl font-black text-gray-900 italic mt-1 tracking-tight">{s.value}</h3>
              <div className="flex items-center gap-1 text-emerald-500 font-black text-[10px] mt-2">
                <TrendingUp size={12} /> {s.growth} <span className="text-gray-300 ml-1 italic font-bold text-[8px]">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-xl font-black italic">Platform Revenue Stream</h2>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Aggregated Daily Inflow</p>
            </div>
            <select className="bg-white/10 border-none rounded-xl px-4 py-3 text-xs font-black outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all">
              <option className="bg-gray-900">Last 30 Days</option>
              <option className="bg-gray-900">Last 6 Months</option>
              <option className="bg-gray-900">Year to Date</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end gap-3 md:gap-4">
             {/* Mock Chart Bars */}
             {[40, 70, 45, 90, 65, 80, 50, 85, 100, 75, 60, 95].map((h, i) => (
               <div 
                 key={i} 
                 className="flex-1 bg-indigo-500/80 rounded-t-xl transition-all hover:bg-white hover:scale-105 cursor-pointer group relative" 
                 style={{ height: `${h}%` }}
               >
                 {/* Tooltip on Hover */}
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-2 py-1 rounded text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                   {h}%
                 </div>
               </div>
             ))}
          </div>
          
          <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
             <span>Jan</span>
             <span>Jun</span>
             <span>Dec</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}