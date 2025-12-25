import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/http";
import BackButton from "../../components/BackButton";
import {
  Send,
  Loader2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState(""); // Added message state
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/jobs/${id}`);

        // Robust Data Extraction
        const jobData = data?.data || data?.job || (data?._id ? data : null);

        if (jobData) {
          setJob(jobData);
          if (jobData.budget) setBidAmount(jobData.budget);
        } else {
          setJob(null);
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!bidAmount || bidAmount <= 0) {
      return alert("Please enter a valid bid amount.");
    }
    if (!message.trim()) {
      return alert("Please provide a brief proposal message.");
    }

    try {
      setSubmitting(true);
      
      // ✅ Hits /api/v1/applications/ handled by applicationRoutes.js
      await api.post(`/applications`, {
        jobId: id,
        bidAmount,
        message, // Sending the student's proposal text
      });

      alert("Proposal transmitted successfully!");
      navigate("/students/applications");
    } catch (err) {
      console.error("Application Error:", err);
      alert(err.response?.data?.message || "Failed to transmit proposal. Ensure you are logged in as a Verified Pro.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px]">
          Syncing Project Specs
        </p>
      </div>
    );

  if (!job)
    return (
      <div className="max-w-4xl mx-auto text-center py-32 space-y-6">
        <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto border border-gray-100">
          <AlertCircle className="text-gray-300" size={40} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 italic tracking-tight">
          Opportunity Expired<span className="text-indigo-600">.</span>
        </h2>
        <p className="text-gray-500 max-w-xs mx-auto text-sm font-medium">
          This listing might have been removed or the ID is incorrect.
        </p>
        <button
          onClick={() => navigate("/marketplace")}
          className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all"
        >
          Return to Marketplace
        </button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-32 p-4">
      {/* Header & Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <BackButton text="Back to Marketplace" to="/marketplace" />
        <div className="flex items-center gap-3">
          <span className="bg-indigo-50 text-indigo-600 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-indigo-100">
            {job.category || "Expertise Required"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Job Info */}
        <div className="lg:col-span-8 space-y-10">
          <header className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.9] italic uppercase">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-gray-400 text-[10px] font-black uppercase tracking-widest pt-4">
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-indigo-500" /> Payment Verified
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" /> Escrow Protected
              </span>
            </div>
          </header>

          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <div className="space-y-4">
              <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest italic flex items-center gap-2">
                <Briefcase size={16} className="text-indigo-600" /> Project Brief
              </h4>
              <p className="text-gray-600 leading-relaxed font-medium whitespace-pre-wrap text-lg">
                {job.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Bid Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.3em]">
                  Project Budget
                </span>
                <p className="text-5xl font-black italic mt-2 tracking-tighter">
                  <span className="text-sm font-bold mr-1 opacity-40 not-italic">SSP</span>
                  {job.budget?.toLocaleString()}
                </p>
              </div>

              {/* Bid Amount Input */}
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Your Offer
                </label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400 font-black">SSP</div>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-6 text-white font-black text-2xl outline-none focus:ring-4 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              {/* Proposal Textarea - NEW FIELD */}
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Why are you a good fit?
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the client about your experience..."
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-white font-medium text-sm outline-none focus:ring-4 focus:ring-indigo-500/20 min-h-[150px] resize-none"
                />
              </div>

              <button
                onClick={handleApply}
                disabled={submitting}
                className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Send size={16} />
                )}
                {submitting ? "Transmitting..." : "Submit Proposal"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}