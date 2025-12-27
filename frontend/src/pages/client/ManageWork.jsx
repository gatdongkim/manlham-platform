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
  ChevronLeft,
  Star,
  Send,
  MessageSquare
} from "lucide-react";

export default function ManageWork() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // --- Review & Completion State ---
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!jobId || jobId === "undefined") {
      setFetching(false);
      return;
    }

    const fetchJobDetails = async () => {
      try {
        const response = await api.get(`/jobs/${jobId}`);
        setJob(response.data.data || response.data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  // Handler for depositing funds (Initial Hire)
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
      await api.post("/jobs/hire", {
        jobId: job._id,
        phoneNumber: phone,
        region: job.region 
      });
      
      const provider = isKE ? "M-Pesa" : "m-Gurush/Zain";
      alert(`📲 Payment initiated via ${provider}! Check your phone for the PIN prompt.`);
    } catch (err) {
      alert(err.response?.data?.message || "Payment initiation failed.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Handler to Release Escrow & Post Review
  const handleCompleteProject = async () => {
    if (rating === 0) return alert("Please select a star rating for the professional.");
    if (!window.confirm("Are you sure? This will release the SSP funds to the student's wallet.")) return;

    try {
      setIsSubmitting(true);
      await api.post(`/jobs/${jobId}/complete`, {
        rating,
        review,
        professionalId: job.professional?._id || job.professional
      });
      
      alert("Success! Funds released and student reviewed.");
      navigate('/client/jobs');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to complete project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
      <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Opening Workspace...</p>
    </div>
  );

  if (!job) return (
    <div className="text-center py-24">
      <AlertCircle className="mx-auto text-gray-200 mb-4" size={48} />
      <p className="text-gray-500 font-bold italic">Project workspace unavailable.</p>
      <button onClick={() => navigate('/client/jobs')} className="text-indigo-600 font-black uppercase text-xs mt-4">Return to Jobs</button>
    </div>
  );

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
          <h2 className="text-4xl font-black text-gray-900 tracking-tight italic uppercase">Workspace<span className="text-indigo-600">.</span></h2>
          <p className="text-gray-500 font-medium mt-1">Contract Management & Secure Escrow</p>
        </div>
        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Value</p>
          <p className="text-2xl font-black text-indigo-600 leading-none mt-1">{currency} {job.budget?.toLocaleString()}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight tracking-tight italic">{job.title}</h3>
                <span className="inline-block mt-3 px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-tighter">
                   {job.region === 'KE' ? '🇰🇪 Kenya' : '🇸🇸 South Sudan'} • Secured
                </span>
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
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="tel"
                    placeholder="Mobile Money Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 p-4 rounded-2xl border border-indigo-100 outline-none font-black text-gray-700 bg-white"
                  />
                  <button
                    onClick={handleHireAndPay}
                    disabled={loading}
                    className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition shadow-lg"
                  >
                    {loading ? "Processing..." : "Fund & Hire"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                  <CheckCircle2 className="text-emerald-600" size={28} />
                  <div>
                      <p className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">Escrow Protection Active</p>
                      <p className="text-xs text-emerald-700 font-medium">Funds locked. Release them only after work is delivered and verified.</p>
                  </div>
                </div>

                <div className="p-8 bg-white border border-gray-100 rounded-[2rem] flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black italic">
                          {job.professional?.name?.charAt(0) || "P"}
                      </div>
                      <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hired Professional</p>
                          <p className="text-xl font-black text-gray-900 tracking-tight italic">{job.professional?.name || "Wal Gatdong"}</p>
                      </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/client/chats/${job.professional?._id || job.professional}`)}
                    className="px-8 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition shadow-md flex items-center gap-2"
                  >
                      <MessageSquare size={14} /> Chat
                  </button>
                </div>

                {/* ✅ STAR RATING & REVIEW SECTION */}
                <div className="mt-12 bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <Star className="text-indigo-600 fill-indigo-600" size={20} />
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest italic">Finalize & Review</h4>
                    </div>

                    <div className="flex gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`transition-all ${rating >= star ? "text-amber-400 scale-110" : "text-gray-200 hover:text-amber-200"}`}
                            >
                                <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
                            </button>
                        ))}
                    </div>

                    <textarea
                        placeholder="Share your experience working with this student..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full p-6 rounded-3xl border border-gray-100 outline-none focus:ring-4 focus:ring-indigo-500/10 transition min-h-[140px] mb-6 text-sm font-bold text-gray-600"
                    />

                    <button
                        onClick={handleCompleteProject}
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-900 transition shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 disabled:bg-gray-300"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                        Release SSP {job.budget?.toLocaleString()} to Student
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <ShieldCheck className="text-indigo-400 mb-6" size={48} />
            <h3 className="text-2xl font-black mb-4 tracking-tighter leading-tight italic">Manlham Tech Support Escrow Protection<span className="text-indigo-500">.</span></h3>
            <p className="text-gray-400 text-xs font-bold leading-relaxed mb-10 uppercase tracking-widest">
              Your funds are held in a secure vault. The professional is only paid when you click the release button.
            </p>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-4">
              <AlertCircle className="text-amber-400 shrink-0" size={20} />
              <p className="text-[10px] text-gray-300 font-black uppercase leading-relaxed tracking-tight">
                Dispute resolution is available via the Admin Panel if deliverables do not match your requirements.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}