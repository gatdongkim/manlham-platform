import React, { useState, useEffect } from 'react';
import api from '../../api/http'; 
import { Clock, ChevronRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // ✅ CHANGED: Hit the specific applications endpoint
        // This ensures you get the full list of your bids from the database
        const { data } = await api.get('/applications');
        
        // ✅ UPDATED: API usually returns { success: true, data: [...] }
        setApplications(data?.data || []);
      } catch (err) {
        console.error("Error loading applications:", err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'ACCEPTED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'REJECTED': return 'bg-red-50 text-red-600 border-red-100';
      case 'WITHDRAWN': return 'bg-gray-50 text-gray-400 border-gray-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 animate-pulse">
          Syncing Applications...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4">
      <header>
        <h1 className="text-3xl font-black text-gray-900 italic tracking-tight">
          My Bids<span className="text-indigo-600">.</span>
        </h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
          Track your project proposals and work history
        </p>
      </header>

      <Card title="Active Proposals">
        <div className="mt-4 -mx-6 md:-mx-8 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Project</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Applied On</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Bid Amount</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications?.length > 0 ? (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                          <Briefcase size={18} />
                        </div>
                        <div>
                          {/* ✅ Backend populate('job') provides the title */}
                          <p className="font-bold text-gray-900">{app.job?.title || 'Untitled Project'}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase italic">
                            ID: {app._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-gray-600">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-indigo-600 italic">
                        <span className="text-[10px] font-bold opacity-50 mr-0.5">SSP</span>
                        {app.bidAmount?.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border ${getStatusStyle(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {app.status === 'ACCEPTED' ? (
                        <Link 
                          to={`/workspace/${app.job?._id || app.job}`}
                          className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-600 transition inline-flex items-center gap-2"
                        >
                          Enter Workspace <ChevronRight size={14} />
                        </Link>
                      ) : (
                        <span className="text-[10px] font-black text-gray-300 uppercase">
                          {app.status === 'REJECTED' ? 'Closed' : 'Under Review'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                       <Clock size={40} className="text-gray-200" />
                       <p className="text-sm font-bold text-gray-300 uppercase tracking-[0.2em]">No active history</p>
                       <Link to="/marketplace" className="text-indigo-600 font-black text-[10px] uppercase hover:underline">Find your first gig →</Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}