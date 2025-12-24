import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import BackButton from "../../components/BackButton";
import { 
  ShieldCheck, 
  XCircle, 
  CheckCircle, 
  Eye, 
  Search, 
  Filter,
  UserCheck,
  Building2,
  Calendar
} from "lucide-react";

export default function StaffReview() {
  const [reviews, setReviews] = useState([
    {
      id: "STF-101",
      name: "Kelvin Kibet",
      email: "kibet@manlham.tech",
      department: "TECH_SUPPORT",
      status: "PENDING",
      joined: "20 Dec 2025",
      idUrl: "https://via.placeholder.com/400x250?text=Staff+ID+Sample"
    },
    {
      id: "STF-102",
      name: "Sarah Nyibol",
      email: "sarah.n@manlham.tech",
      department: "FINANCE",
      status: "PENDING",
      joined: "19 Dec 2025",
      idUrl: "https://via.placeholder.com/400x250?text=Passport+Sample"
    }
  ]);

  const handleAction = (id, action) => {
    setReviews(prev => prev.filter(req => req.id !== id));
    alert(`Staff member ${action === 'approve' ? 'Approved' : 'Rejected'} successfully.`);
  };

  return (
    <DashboardLayout role="ADMIN">
      <div className="max-w-6xl mx-auto pb-20 space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <BackButton text="Back to Control Panel" to="/admin/dashboard" />
          <header className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 italic">
                Staff Approvals<span className="text-indigo-600">.</span>
              </h1>
              <p className="text-gray-500 font-semibold mt-1">Review credentials for internal team onboarding.</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <UserCheck size={16} /> {reviews.length} Pending
               </div>
            </div>
          </header>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search by name or email..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold outline-none" />
          </div>
          <button className="p-3 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100"><Filter size={20}/></button>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((staff) => (
            <div key={staff.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row">
              
              {/* Profile Preview */}
              <div className="p-8 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-50 bg-gray-50/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100">
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 italic text-lg">{staff.name}</h3>
                    <p className="text-xs text-gray-400 font-bold">{staff.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">
                        {staff.department.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    <Calendar size={14} className="text-indigo-400" /> Joined {staff.joined}
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    <Building2 size={14} className="text-indigo-400" /> ID: {staff.id}
                  </div>
                </div>
              </div>

              {/* ID Document Preview */}
              <div className="p-8 flex-1 flex flex-col md:flex-row gap-8 items-center justify-between bg-white">
                <div className="relative group">
                   <img 
                    src={staff.idUrl} 
                    alt="ID Proof" 
                    className="w-full max-w-[300px] h-44 object-cover rounded-2xl border-4 border-gray-50 grayscale hover:grayscale-0 transition-all duration-500"
                   />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <button className="text-white flex items-center gap-2 font-black uppercase text-[10px] tracking-widest">
                        <Eye size={20}/> View Full Size
                      </button>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 w-full md:w-auto">
                   <button 
                    onClick={() => handleAction(staff.id, 'approve')}
                    className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all shadow-xl shadow-indigo-100 active:scale-95"
                   >
                     <CheckCircle size={18} /> Approve Staff
                   </button>
                   <button 
                    onClick={() => handleAction(staff.id, 'reject')}
                    className="flex items-center justify-center gap-3 bg-white text-red-500 border border-red-100 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-50 transition-all active:scale-95"
                   >
                     <XCircle size={18} /> Reject Access
                   </button>
                </div>
              </div>

            </div>
          ))}

          {reviews.length === 0 && (
            <div className="bg-white py-20 rounded-[3rem] border-2 border-dashed border-gray-100 text-center space-y-4">
               <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto">
                 <ShieldCheck size={32} />
               </div>
               <p className="text-gray-400 font-black italic">No pending staff applications found.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}