import React, { useState } from "react";
// ❌ Removed DashboardLayout to maintain single-sidebar consistency
import BackButton from "../../components/BackButton";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Briefcase, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  PieChart
} from "lucide-react";

export default function ClientAnalytics() {
  const [timeframe, setTimeframe] = useState("THIS_MONTH");

  // Sample Data for Visualization
  const stats = [
    { label: "Active MSMEs", value: "142", growth: "+12%", up: true, icon: Users },
    { label: "Total Jobs Posted", value: "1,204", growth: "+8%", up: true, icon: Briefcase },
    { label: "Avg. Project Value", value: "SSP 45k", growth: "-3%", up: false, icon: TrendingUp },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8">
      
      {/* Navigation & Header */}
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        <header className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">
              Market Analytics<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Deep dive into MSME behavior and platform growth.</p>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-900 hover:bg-gray-50 transition shadow-sm active:scale-95">
              <Download size={16} className="text-indigo-600" /> Export CSV
            </button>
          </div>
        </header>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.up ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>} {stat.growth}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-3xl font-black text-gray-900 mt-1 italic tracking-tighter">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Posting Trends Chart */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2 italic">
              <BarChart3 className="text-indigo-600" size={20} /> Posting Trends
            </h3>
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase outline-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          
          <div className="h-64 w-full bg-gray-50/50 rounded-[2rem] flex items-end justify-between p-8 gap-3 border border-gray-100">
            {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-200 rounded-t-xl hover:bg-indigo-600 transition-all cursor-pointer relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-black px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                  {h} Jobs
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

        {/* Sector Breakdown */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-8">
           <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2 italic">
              <PieChart className="text-indigo-600" size={20} /> Industry Split
            </h3>
            <div className="space-y-6">
              {[
                { label: "Software Dev", val: 45, color: "bg-indigo-600" },
                { label: "Digital Marketing", val: 30, color: "bg-indigo-400" },
                { label: "Graphic Design", val: 15, color: "bg-indigo-200" },
                { label: "Others", val: 10, color: "bg-gray-100" }
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="text-gray-900 italic tracking-tighter">{item.val}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} 
                      style={{ width: `${item.val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <p className="text-[10px] text-gray-400 font-bold leading-relaxed italic">
                * Data based on verified project postings from registered MSMEs in the Juba region.
              </p>
            </div>
        </div>
      </div>

    </div>
  );
}