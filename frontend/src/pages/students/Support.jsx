import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { 
  MessageCircle, 
  LifeBuoy, 
  FileQuestion, 
  ShieldAlert, 
  Send, 
  ExternalLink 
} from "lucide-react";

export default function Support() {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("Technical Issue");
  const [loading, setLoading] = useState(false);

  const faqs = [
    { q: "How does the M-Pesa Escrow work?", a: "When a client hires you, the money is held by SkillLink. Once you submit work and the client approves, funds are released to your wallet." },
    { q: "What if a client doesn't pay?", a: "You can raise a dispute via this support page. Our admins will review the deliverables in the Workspace and mediate." },
    { q: "How long do withdrawals take?", a: "M-Pesa B2C withdrawals are usually instant, but can take up to 24 hours during peak times." }
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      alert(`Support ticket [${category}] created successfully!`);
      setMessage("");
      setLoading(false);
    }, 1500);
  }

  return (
    <DashboardLayout role="student">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-gray-900">Support Center</h1>
          <p className="text-gray-500 text-lg mt-2">Get help with your projects, payments, or account.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Submit a Ticket</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Issue Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  >
                    <option>Payment/Escrow Issue</option>
                    <option>Technical Bug</option>
                    <option>Dispute with Client</option>
                    <option>Account Access</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Message</label>
                  <textarea
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Provide details like Job ID or Transaction ID to help us solve your issue faster..."
                    className="w-full mt-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl h-40 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  />
                </div>

                <button 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 disabled:bg-gray-400"
                >
                  <Send size={20} />
                  {loading ? "Sending..." : "Submit Request"}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Resources & FAQs */}
          <div className="space-y-6">
            {/* Quick Stats/Alert */}
            <div className="bg-amber-50 border border-amber-100 p-5 rounded-3xl flex gap-4">
              <ShieldAlert className="text-amber-600 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-800 text-sm">Safe Working Tip</h4>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  Always keep communications on SkillLink. Never share your personal number for payments.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileQuestion size={18} className="text-indigo-600" /> Common Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="group">
                    <p className="text-sm font-bold text-gray-700 group-hover:text-indigo-600 transition cursor-help">
                      {faq.q}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="p-4 bg-gray-900 rounded-3xl text-white">
              <h4 className="font-bold text-sm mb-3">Developer Documentation</h4>
              <a href="#" className="flex items-center justify-between text-xs text-gray-400 hover:text-white transition">
                Platform Rules <ExternalLink size={12} />
              </a>
              <div className="h-px bg-gray-800 my-2" />
              <a href="#" className="flex items-center justify-between text-xs text-gray-400 hover:text-white transition">
                Escrow Terms <ExternalLink size={12} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}