import React, { useState, useEffect, useRef } from "react";
import { 
  LifeBuoy, Send, History, AlertTriangle, 
  ChevronRight, MessageSquare, Loader2, X
} from "lucide-react";
import api from "../../api/http"; 

export default function ClientSupport() {
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: 'system', text: 'Welcome to Manlham Support. How can we help you today?' }
  ]);
  const chatEndRef = useRef(null);

  // Auto-scroll logic for Live Chat
  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isChatOpen]);

  const [tickets] = useState([
    { id: "TK-9021", subject: "Payment double charge", status: "Resolved", date: "Dec 10" },
    { id: "TK-9045", subject: "Student hasn't submitted work", status: "Open", date: "Dec 15" },
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMessage = { sender: 'client', text: chatMessage };
    setChatHistory([...chatHistory, newMessage]);
    setChatMessage("");

    try {
      // API call to your backend chat route
      await api.post('/support/live-chat', { message: chatMessage });
      
      // Mocking a quick support acknowledgement
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          sender: 'support', 
          text: 'We have received your message. An agent will be with you shortly.' 
        }]);
      }, 1000);
    } catch (err) {
      console.error("Live chat failed:", err);
    }
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Ticket submitted! Our team will contact you within 24 hours.");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">
          Support Center<span className="text-indigo-600">.</span>
        </h1>
        <p className="text-gray-500 font-medium mt-1">Resolve disputes, billing queries, or technical issues.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: Ticket Submission Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                <LifeBuoy size={28} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Open a New Case</h2>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Inquiry Category</label>
                  <select className="w-full mt-2 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-gray-700">
                    <option>Escrow & Payments</option>
                    <option>Dispute Resolution</option>
                    <option>Account Verification</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject Line</label>
                  <input placeholder="Brief summary" className="w-full mt-2 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Detailed Description</label>
                <textarea placeholder="Describe your issue..." className="w-full mt-2 p-5 bg-gray-50 border border-gray-100 rounded-[2rem] h-40 focus:ring-4 focus:ring-indigo-100 outline-none resize-none font-medium" />
              </div>
              <button disabled={loading} className="flex items-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition shadow-xl disabled:bg-gray-400">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                Submit Case
              </button>
            </form>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-[2rem] p-8 flex gap-6">
            <AlertTriangle className="text-amber-600 shrink-0" size={28} />
            <p className="text-sm text-amber-800 font-medium">
              <span className="font-black uppercase text-[10px] block mb-1">Escrow Warning</span>
              If work is not delivered, <span className="font-black">do not release funds</span>. Open a dispute case immediately for mediation.
            </p>
          </div>
        </div>

        {/* RIGHT: Live Chat & History */}
        <div className="space-y-6">
          <div className={`bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden transition-all duration-500 ${isChatOpen ? 'ring-4 ring-indigo-500' : ''}`}>
            <div className="flex justify-between items-start mb-4 relative z-10">
               <MessageSquare className="text-indigo-400" size={32} />
               <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> LIVE
               </div>
            </div>

            <h4 className="font-black text-lg tracking-tight mb-2 relative z-10">Manlham Live Chat</h4>
            
            {isChatOpen ? (
              <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-80 mt-4">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-xl text-[11px] font-medium ${msg.sender === 'client' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-gray-200'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2">
                  <input 
                    value={chatMessage} 
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Message..." 
                    className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                  <button type="submit" className="bg-indigo-600 p-2 rounded-xl"><Send size={14} /></button>
                </form>
              </div>
            ) : (
              <button onClick={() => setIsChatOpen(true)} className="w-full mt-6 py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition shadow-xl shadow-indigo-500/20">
                Launch Messenger
              </button>
            )}
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2"><History size={16} /> History</h3>
            <div className="space-y-4">
              {tickets.map(t => (
                <div key={t.id} className="p-4 bg-gray-50 rounded-2xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all cursor-pointer">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-indigo-600">{t.id}</span>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-gray-200 text-gray-600 uppercase">{t.status}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 truncate">{t.subject}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}