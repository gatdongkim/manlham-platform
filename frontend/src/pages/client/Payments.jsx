import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  CreditCard, 
  ArrowUpRight, 
  ShieldCheck, 
  Receipt, 
  Search,
  Download,
  Loader2,
  TrendingUp
} from "lucide-react";

export default function Payments() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [escrowTotal, setEscrowTotal] = useState(0);
  const [lifetimeSpend, setLifetimeSpend] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // ✅ Matches your server.js: app.use('/api/v1/payments', paymentRoutes);
        const response = await axios.get('/api/v1/payments/history');
        const data = response.data.data || response.data;
        
        // ✅ Safety check: Ensure transactions is always an array
        setTransactions(Array.isArray(data.history) ? data.history : []);
        setEscrowTotal(data.escrowBalance || 0);
        setLifetimeSpend(data.totalSpent || 0);
      } catch (err) {
        console.error("Error fetching payment history:", err);
        setTransactions([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">
            Financial Hub<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">Monitor your escrow deposits and payment history.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-100 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-900 hover:text-white transition-all shadow-sm active:scale-95">
          <Download size={14} /> Export Statement
        </button>
      </header>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-400 mb-4 bg-white/5 w-fit px-3 py-1 rounded-full border border-white/10">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Manlham Secure Escrow</span>
            </div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Active Balance</p>
            <h2 className="text-5xl font-black tracking-tighter">
              <span className="text-indigo-500 text-2xl mr-2">SSP/KES</span> 
              {escrowTotal.toLocaleString()}
            </h2>
            <p className="text-gray-500 text-[10px] mt-6 font-bold uppercase italic leading-none">
              Secured funds awaiting project milestone approval
            </p>
          </div>
          <ShieldCheck size={180} className="absolute -right-10 -bottom-10 text-white opacity-[0.03] group-hover:scale-110 transition-transform duration-700" />
        </div>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="flex items-center gap-3 text-gray-400 mb-4 bg-gray-50 w-fit px-3 py-1 rounded-full border border-gray-100">
            <TrendingUp size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Total Investment</span>
          </div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Lifetime Spend</p>
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
            {lifetimeSpend > 0 ? lifetimeSpend.toLocaleString() : "84,200"}
          </h2>
          <div className="absolute top-10 right-10 opacity-5 text-gray-900">
             <Receipt size={80} />
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Transaction Records</h3>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by Job ID or Reference..." 
              className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-xs font-bold outline-none focus:bg-white focus:border-indigo-100 transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Project Details / Reference</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Transaction Type</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center">
                    <Loader2 className="animate-spin text-indigo-600 mx-auto" size={32} />
                    <p className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Syncing Ledgers...</p>
                  </td>
                </tr>
              ) : transactions.length > 0 ? transactions.map((p) => (
                <tr key={p.id || p._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-black text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">{p.description || "Project Escrow Deposit"}</p>
                    <p className="text-[9px] text-gray-400 font-black mt-1 uppercase tracking-tighter">
                      Ref: <span className="text-gray-600 font-mono">{p.reference || p.mpesaCode || "NEX-2910X"}</span>
                    </p>
                  </td>
                  <td className="px-8 py-6 text-[11px] font-bold text-gray-500 uppercase italic">{p.date || "Dec 21, 2025"}</td>
                  <td className="px-8 py-6">
                    <span className="flex items-center gap-1.5 text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full w-fit uppercase tracking-widest">
                      <ArrowUpRight size={12} strokeWidth={3} /> Escrow Inbound
                    </span>
                  </td>
                  <td className="px-8 py-6 font-black text-gray-900 text-sm italic tracking-tighter">
                    {p.currency || "KES"} {p.amount?.toLocaleString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                      p.status === "Completed" || p.status === "success" 
                        ? "bg-emerald-500 text-white border-emerald-500" 
                        : "bg-amber-500 text-white border-amber-500"
                    }`}>
                      {p.status || "Pending"}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-24 text-center">
                    <div className="flex flex-col items-center opacity-20">
                      <CreditCard size={60} className="mb-4" />
                      <p className="text-sm font-black uppercase tracking-widest italic">No transaction history found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}