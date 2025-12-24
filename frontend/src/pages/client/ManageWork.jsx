import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/http";
import { 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Wallet,
  Loader2,
  ChevronLeft
} from "lucide-react";

export default function ManageWork() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // ✅ Guard against undefined jobId to prevent 404 console errors
    if (!jobId || jobId === "undefined") {
      setFetching(false);
      return;
    }

    const fetchJobDetails = async () => {
      try {
        const response = await api.get(`/jobs/${jobId}`);
        // Handle both data.data and data formats
        setJob(response.data.data || response.data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  const handleHireAndPay = async () => {
    const isKE = job?.region === "KE";
    const keRegex = /^254\d{9}$/;
    const ssRegex = /^(?:\+211|211|0)?(?:9[12578]\d{7})$/;

    if (isKE && !phone.match(keRegex)) {
      alert("Kenya: Use format 2547XXXXXXXX");
      return;
    }
    if (!isKE && !phone.match(ssRegex)) {
      alert("South Sudan: Please enter a valid mobile money number");
      return;
    }

    try {
      setLoading(true);
      // ✅ Matches your backend: router.post("/hire", ...)
      await api.post("/jobs/hire", {
        jobId: job._id,
        phoneNumber: phone,
        region: job.region 
      });
      
      const provider = isKE ? "M-Pesa" : "m-Gurush/Zain";
      alert(`📲 Payment initiated via ${provider}! Check your phone for the PIN prompt.`);
    } catch (err) {
      const msg = err.response?.data?.message || "Payment initiation failed.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Clean loading state without DashboardLayout
  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Opening Workspace...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-24">
        <AlertCircle className="mx-auto text-gray-200 mb-4" size={48} />
        <p className="text-gray-500 font-bold italic">Project workspace unavailable.</p>
        <button onClick={() => navigate('/client/jobs')} className="text-indigo-600 font-black uppercase text-xs mt-4">Return to Jobs</button>
      </div>
    );
  }

  const currency = job.region === "SS" ? "SSP" : "KES";

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <button 
          onClick={() => navigate('/client/jobs')}
          className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-8 hover:text-indigo-600 transition group"
      >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Projects
      </button>

      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight italic">Project Workspace<span className="text-indigo-600">.</span></h2>
          <p className="text-gray-500 font-medium mt-1">Manage deliverables and secure payments.</p>
        </div>
        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Budget</p>
          <p className="text-2xl font-black text-indigo-600 leading-none mt-1">{currency} {job.budget?.toLocaleString()}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight">{job.title}</h3>
                <div className="flex gap-2 mt-3">
                   <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-tighter">
                     {job.region === 'KE' ? '🇰🇪 Kenya Region' : '🇸🇸 South Sudan Region'}
                   </span>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                job.status === 'OPEN' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              }`}>
                {job.status}
              </span>
            </div>

            {job.status === "OPEN" ? (
              <div className="bg-indigo-50/50 rounded-[2rem] p-8 border border-indigo-100">
                <div className="flex items-center gap-3 mb-4 text-indigo-900">
                  <Wallet className="text-indigo-600" size={24} />
                  <h4 className="font-black text-lg">Deposit to Escrow</h4>
                </div>
                <p className="text-sm text-indigo-700/80 mb-8 font-medium leading-relaxed">
                  To hire a candidate and start the work, funds must be deposited into Nexus Escrow. 
                  {job.region === 'KE' ? ' Powered by Safaricom M-Pesa.' : ' Powered by m-Gurush/Zain.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="tel"
                    placeholder={job.region === 'KE' ? "2547XXXXXXXX" : "Mobile Number"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 p-4 rounded-2xl border border-indigo-100 outline-none focus:ring-4 focus:ring-indigo-100 transition font-black text-gray-700 bg-white"
                  />
                  <button
                    onClick={handleHireAndPay}
                    disabled={loading}
                    className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition shadow-lg disabled:bg-gray-400 active:scale-95"
                  >
                    {loading ? "Processing..." : "Fund & Hire"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                      <p className="text-xs font-black text-emerald-900 uppercase tracking-widest">Escrow Active</p>
                      <p className="text-xs text-emerald-700 font-medium">Funds are safely locked. Release them only after work is delivered.</p>
                  </div>
                </div>

                <div className="p-8 bg-white border border-gray-100 rounded-[2rem] flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                          <Smartphone size={28}/>
                      </div>
                      <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assigned Talent</p>
                          <p className="text-xl font-black text-gray-900 tracking-tight">{job.professional?.name || "Professional Student"}</p>
                      </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/client/chats/${job.professional?._id || job.professional}`)}
                    className="px-8 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition shadow-md"
                  >
                      Chat
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <h4 className="font-black text-gray-900 mb-8 flex items-center gap-2 uppercase tracking-widest text-[10px]">
              <Clock size={16} className="text-indigo-600" /> Project Milestones
            </h4>
            <div className="space-y-10 ml-4 border-l-2 border-dashed border-gray-100 pl-10 relative">
              <div className="relative">
                <div className="absolute -left-[51px] top-0 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-sm" />
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Completed</p>
                <p className="text-sm font-bold text-gray-900">Project requirements posted & verified.</p>
              </div>
              <div className="relative">
                <div className={`absolute -left-[51px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-sm ${job.status !== 'OPEN' ? 'bg-emerald-500' : 'bg-gray-100'}`} />
                <p className={`text-[10px] font-black uppercase tracking-widest ${job.status !== 'OPEN' ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {job.status !== 'OPEN' ? 'Completed' : 'Pending'}
                </p>
                <p className="text-sm font-bold text-gray-900">Budget deposited into Nexus Secure Escrow.</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <ShieldCheck className="text-indigo-400 mb-6" size={48} />
              <h3 className="text-2xl font-black mb-4 tracking-tighter leading-tight">Secure Professional Engagement<span className="text-indigo-500">.</span></h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-10">
                Manlham Escrow ensures your funds are protected. Professionals only receive payment after you approve the final submission.
              </p>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4">
                <AlertCircle className="text-amber-400 shrink-0" size={20} />
                <p className="text-[10px] text-gray-300 font-black uppercase leading-relaxed tracking-tight">
                  Dispute resolution is available if deliverables don't meet your criteria.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}