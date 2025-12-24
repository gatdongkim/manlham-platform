import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from "../../components/DashboardLayout";
import { Wallet, ArrowDownCircle, ArrowUpCircle, History, Landmark } from 'lucide-react';

export default function Earnings() {
  const [stats, setStats] = useState({
    totalEarned: 0,
    inEscrow: 0,
    withdrawable: 0,
    history: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const { data } = await axios.get('/api/v1/students/dashboard-summary');
        // We calculate stats from the response
        setStats({
          totalEarned: data.stats.earned,
          inEscrow: 5000, // Example placeholder for active jobs
          withdrawable: data.stats.earned, 
          history: data.applications.filter(app => app.status === 'ACCEPTED')
        });
      } catch (err) {
        console.error("Error fetching financial data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  return (
    <DashboardLayout role="student">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Financial Overview</h2>
        <p className="text-gray-500">Manage your payments and withdrawal history.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <Wallet size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">Total Earned</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">KES {stats.totalEarned.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-blue-600 mb-2">
            <History size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">In Escrow</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">KES {stats.inEscrow.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">Pending approval from clients</p>
        </div>

        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-200 text-white">
          <div className="flex items-center gap-3 mb-2 opacity-80">
            <Landmark size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">Withdrawable</span>
          </div>
          <p className="text-3xl font-bold">KES {stats.withdrawable.toLocaleString()}</p>
          <button className="mt-4 w-full bg-white text-indigo-600 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition">
            Withdraw to M-Pesa
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Transaction History</h3>
          <button className="text-sm text-indigo-600 font-medium hover:underline">Download CSV</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase">
              <tr>
                <th className="p-4">Description</th>
                <th className="p-4">Date</th>
                <th className="p-4">Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.history.length > 0 ? stats.history.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-900">{item.job.title}</td>
                  <td className="p-4 text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
                      <ArrowDownCircle size={14} className="text-emerald-500" /> Payment
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-900">KES {item.bidAmount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold">COMPLETED</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-400">No transactions found yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}