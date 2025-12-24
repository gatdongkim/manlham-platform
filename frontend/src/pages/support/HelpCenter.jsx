import React, { useState } from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';
import { Search, ChevronRight, Wallet, ShieldAlert, Activity, CheckCircle2 } from 'lucide-react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  // Gateway Status Data
  const systemStatus = [
    { name: "M-Pesa Kenya", status: "Operational", color: "text-emerald-500" },
    { name: "m-Gurush S.Sudan", status: "Operational", color: "text-emerald-500" },
    { name: "Escrow System", status: "Operational", color: "text-emerald-500" }
  ];

  const helpData = [
    {
      title: "M-Pesa Payments (KES & SSP)",
      type: "grid",
      items: [
        {
          id: "kenya",
          title: "🇰🇪 Kenya Users",
          bg: "bg-blue-50",
          border: "border-blue-100",
          text: "text-blue-900",
          content: ["STK Push (PIN popup) is triggered automatically.", "Max transaction: KES 250,000.", "Use Safaricom App or SIM Toolkit if Push fails."]
        },
        {
          id: "ssudan",
          title: "🇸🇸 South Sudan Users",
          bg: "bg-green-50",
          border: "border-green-100",
          text: "text-green-900",
          content: ["Direct wallet payments via m-Gurush or M-Pesa.", "Liquidity Note: Ensure your agent has float before withdrawal.", "Regional ID is required for verification."]
        }
      ]
    },
    {
      title: "Common Issues",
      type: "accordion",
      items: [
        { q: "I paid but the job status didn't update", a: "Sometimes the M-Pesa callback is delayed. Please wait 5 minutes or contact support with your M-Pesa Receipt ID." },
        { q: "What is the Platform Fee?", a: "We charge 5-10% depending on the gig size to cover escrow security and cross-border currency conversion." },
        { q: "How do I report a suspicious user?", a: "Navigate to the Safety & Trust page or use the Report button in the user's profile." }
      ]
    }
  ];

  const filteredData = helpData.map(section => ({
    ...section,
    items: section.items.filter(item => {
      const searchIn = (item.title || item.q || "").toLowerCase();
      return searchIn.includes(searchQuery.toLowerCase());
    })
  })).filter(section => section.items.length > 0);

  return (
    <InfoPageLayout title="Help Center" subtitle="Payments & Account Support">
      <div className="space-y-12">
        
        {/* 🟢 Live Systems Status Bar */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-4 shadow-sm flex flex-wrap justify-center gap-6 md:gap-12">
          {systemStatus.map((sys, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-emerald-500 animate-pulse`} />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{sys.name}:</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${sys.color}`}>{sys.status}</span>
            </div>
          ))}
        </div>

        {/* 🔍 Premium Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={22} />
          </div>
          <input 
            type="text"
            placeholder="Search payments, fees, or issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white border-2 border-gray-100 rounded-[2rem] text-base font-bold text-gray-900 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm"
          />
        </div>

        {/* Dynamic Content Rendering */}
        {filteredData.length > 0 ? (
          filteredData.map((section, idx) => (
            <section key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black mb-6 italic">{section.title}</h2>
              
              {section.type === "grid" ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {section.items.map((card, i) => (
                    <div key={i} className={`p-8 ${card.bg} rounded-[2.5rem] border ${card.border} shadow-sm`}>
                      <h4 className={`font-black ${card.text} mb-4 flex items-center gap-2`}>
                        <CheckCircle2 size={18} /> {card.title}
                      </h4>
                      <ul className="text-sm space-y-3 font-semibold text-gray-700">
                        {card.content.map((line, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="opacity-40">•</span> {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {section.items.map((faq, i) => (
                    <details key={i} className="group p-6 bg-white border border-gray-100 rounded-3xl cursor-pointer hover:border-indigo-200 transition-all">
                      <summary className="font-black text-gray-800 flex justify-between items-center list-none">
                        {faq.q}
                        <ChevronRight className="group-open:rotate-90 transition-transform text-gray-400" size={20} />
                      </summary>
                      <p className="mt-4 text-sm font-medium text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              )}
            </section>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <ShieldAlert className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="font-black text-gray-400 italic">No matching articles found.</p>
          </div>
        )}

        {/* Support CTA */}
        <div className="bg-indigo-900 rounded-[3rem] p-10 text-center text-white shadow-xl shadow-indigo-100">
          <Activity className="mx-auto mb-4 text-indigo-400" size={32} />
          <h3 className="text-xl font-black italic mb-2">Still having trouble?</h3>
          <p className="text-indigo-200 text-sm font-medium mb-8">Our regional support staff is available to manually verify transactions.</p>
          <a href="/contact" className="inline-block px-10 py-4 bg-white text-indigo-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-50 transition">
            Contact Support Team
          </a>
        </div>
      </div>
    </InfoPageLayout>
  );
}