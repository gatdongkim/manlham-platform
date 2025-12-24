import React, { useState } from "react";
// ❌ Removed DashboardLayout import to prevent layout nesting
import BackButton from "../../components/BackButton";
import { 
  CheckCircle, 
  XCircle, 
  Smartphone, 
  CreditCard, 
  Search, 
  ExternalLink,
  Clock
} from "lucide-react";

export default function WithdrawalRequests() {
  const [requests, setRequests] = useState([
    { 
      id: "WDR-901", 
      user: "John Akot", 
      amount: 15000, 
      method: "M_GURUSH", 
      phone: "+211 921 000 000", 
      status: "PENDING", 
      date: "20 Dec 2025" 
    },
    { 
      id: "WDR-902", 
      user: "Sarah Nyibol", 
      amount: 8500, 
      method: "MTN_MOMO", 
      phone: "+211 912 000 000", 
      status: "PENDING", 
      date: "19 Dec 2025" 
    },
    { 
      id: "WDR-903", 
      user: "Emmanuel Keji", 
      amount: 4500, 
      method: "M_PESA", 
      phone: "+254 712 000 000", 
      status: "PENDING", 
      date: "20 Dec 2025" 
    }
  ]);

  const getMethodStyle = (method) => {
    switch(method) {
      case 'M_GURUSH': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'MTN_MOMO': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'M_PESA': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-indigo-100 text-indigo-600 border-indigo-200';
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    // In a real app, you would call API.patch(`/admin/withdrawals/${id}`, { status: newStatus })
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    alert(`Request ${id} marked as ${newStatus}`);
  };

  // ✅ Return only the content. Layout is provided by the parent Route in App.jsx
  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8">
      
      <div className="space-y-4">
        <BackButton text="Back to Control Panel" to="/admin/dashboard" />
        <header className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 italic tracking-tighter">
              Payout Vault<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
              Manage Outbound Liquidity & Withdrawals
            </p>
          </div>
          <div className="flex gap-2">
             <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm text-center">
                <p className="text-[8px] font-black text-gray-400 uppercase">Pending Total</p>
                <p className="text-lg font-black text-gray-900">SSP 28,000</p>
             </div>
          </div>
        </header>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[250px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search by user or ID..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold outline-none shadow-inner" />
        </div>
        <select className="bg-gray-50 border-none rounded-xl px-6 py-3 text-xs font-black uppercase outline-none cursor-pointer hover:bg-gray-100 transition">
          <option>All Providers</option>
          <option>M-Gurush</option>
          <option>MTN MoMo</option>
          <option>M-Pesa</option>
        </select>
      </div>

      {/* Request List */}
      <div className="grid grid-cols-1 gap-4">
        {requests.filter(r => r.status === "PENDING").map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              
              {/* User & Info */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${getMethodStyle(req.method)} shadow-inner transition-transform group-hover:scale-110`}>
                  {req.method === 'CARD' ? <CreditCard size={24}/> : <Smartphone size={24}/>}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-gray-900 italic text-lg tracking-tight">{req.user}</h3>
                    <span className={`text-[8px] px-2 py-0.5 rounded-full font-black border uppercase tracking-widest ${getMethodStyle(req.method)}`}>
                      {req.method.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-bold flex items-center gap-1 mt-0.5">
                    <Clock size={12} /> Requested on {req.date}
                  </p>
                </div>
              </div>

              {/* Amount & Destination */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-auto">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Phone/Card</p>
                  <p className="text-sm font-black text-gray-900 tracking-wider flex items-center gap-2">
                    {req.phone} <ExternalLink size={12} className="text-indigo-400" />
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Payout Amount</p>
                  <p className="text-lg font-black text-gray-900 italic">SSP {req.amount.toLocaleString()}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0">
                <button 
                  onClick={() => handleStatusUpdate(req.id, 'COMPLETED')}
                  className="flex-1 lg:flex-none bg-gray-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
                >
                  <CheckCircle size={16} /> Confirm Payment
                </button>
                <button 
                  onClick={() => handleStatusUpdate(req.id, 'REJECTED')}
                  className="p-4 bg-white border border-red-100 text-red-500 rounded-2xl hover:bg-red-50 transition-all active:scale-95"
                  title="Reject Request"
                >
                  <XCircle size={20} />
                </button>
              </div>

            </div>
          </div>
        ))}

        {requests.filter(r => r.status === "PENDING").length === 0 && (
          <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
             <CheckCircle size={48} className="mx-auto text-gray-200 mb-4" />
             <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Payout Queue is Empty</p>
          </div>
        )}
      </div>
    </div>
  );
}