import React, { useState, useEffect } from "react";
import API from "../../api/http"; // ✅ Use your custom API utility
import BackButton from "../../components/BackButton";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  Download,
  Wallet,
  CheckCircle2,
  Clock,
  Loader2
} from "lucide-react";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/admin/payments');
      setPayments(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
      // Fallback Mock Data for Development
      setPayments([
        { id: "TX1002", user: "Mary John", amount: 30000, type: "Escrow Deposit", status: "Completed", date: "2025-12-16", ref: "SCL9023KJ" },
        { id: "TX1003", user: "James Lado", amount: 12000, type: "Student Payout", status: "Pending", date: "2025-12-17", ref: "SCL9055LL" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8">
      
      {/* Navigation & Header */}
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight italic">
              Financial <span className="text-indigo-600">Ledger.</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
              Global Transaction Tracking & Fee Management
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-900 hover:bg-gray-50 transition shadow-sm active:scale-95">
              <Download size={16} className="text-indigo-600" /> Export CSV
            </button>
          </div>
        </header>
      </div>

      {/* Global Finance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group hover:shadow-md transition-all">
          <div className="flex items-center gap-4 text-indigo-600 mb-4">
            <div className="p-3 bg-indigo-50 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Wallet size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total in Escrow</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 italic">SSP 840,200</h2>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group hover:shadow-md transition-all">
          <div className="flex items-center gap-4 text-emerald-600 mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ArrowUpRight size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Revenue (Fees)</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 italic">SSP 42,100</h2>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group hover:shadow-md transition-all">
          <div className="flex items-center gap-4 text-amber-500 mb-4">
            <div className="p-3 bg-amber-50 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Clock size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pending Payouts</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 italic">SSP 18,500</h2>
        </div>
      </div>

      {/* Transaction Table Card */}
      <div className="bg-white rounded-[3rem] border border-gray-50 shadow-xl shadow-gray-200/40 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/20">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Reference, Name or ID..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold outline-none shadow-inner focus:ring-4 focus:ring-indigo-500/5 transition-all"
            />
          </div>
          <button className="w-full md:w-auto px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-indigo-600 bg-white border border-gray-100 rounded-2xl shadow-sm transition hover:bg-indigo-50 flex items-center justify-center gap-2">
            <Filter size={16} /> Advanced Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-10 py-6">Transaction / Ref</th>
                <th className="px-10 py-6">User</th>
                <th className="px-10 py-6">Type</th>
                <th className="px-10 py-6">Amount</th>
                <th className="px-10 py-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-24 text-center">
                    <Loader2 className="animate-spin text-indigo-600 mx-auto mb-4" size={48} />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Auditing Platform Ledger...</p>
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-indigo-50/20 transition-all group">
                    <td className="px-10 py-8">
                      <p className="font-black text-gray-900 text-sm tracking-tight mb-1 italic">{p.id}</p>
                      <p className="text-[9px] text-indigo-500 font-black uppercase tracking-tighter bg-indigo-50 w-fit px-1.5 py-0.5 rounded">{p.ref}</p>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-bold text-gray-700 italic tracking-tight">{p.user}</p>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`flex items-center gap-2 text-[9px] font-black px-3 py-1.5 rounded-xl w-fit uppercase tracking-widest border ${
                        p.type.includes('Deposit') 
                          ? 'bg-blue-50 text-blue-600 border-blue-100' 
                          : 'bg-purple-50 text-purple-600 border-purple-100'
                      }`}>
                        {p.type.includes('Deposit') ? <ArrowDownLeft size={14}/> : <ArrowUpRight size={14}/>}
                        {p.type}
                      </span>
                    </td>
                    <td className="px-10 py-8 font-black text-gray-900 text-lg italic tracking-tighter">
                      SSP {p.amount.toLocaleString()}
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        {p.status === 'Completed' ? (
                          <div className="p-1 bg-emerald-100 rounded-full text-emerald-600"><CheckCircle2 size={16} /></div>
                        ) : (
                          <div className="p-1 bg-amber-100 rounded-full text-amber-600"><Clock size={16} /></div>
                        )}
                        <span className={`text-[10px] font-black uppercase tracking-widest ${p.status === 'Completed' ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {p.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}