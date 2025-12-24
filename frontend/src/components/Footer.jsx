import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Twitter, ShieldCheck } from "lucide-react";

export default function Footer() {
  const socials = [
    { name: "WhatsApp", icon: <FaWhatsapp size={20} />, href: "https://wa.me/211929267673", color: "hover:bg-[#25D366] hover:text-white text-[#25D366]", bg: "bg-green-50" },
    { name: "Facebook", icon: <FaFacebookF size={18} />, href: "https://facebook.com/mtsupport1", color: "hover:bg-[#1877F2] hover:text-white text-[#1877F2]", bg: "bg-blue-50" },
    { name: "Twitter", icon: <Twitter size={18} />, href: "https://x.com/ManlhamSupport", color: "hover:bg-black hover:text-white text-black", bg: "bg-gray-100" },
    { name: "Instagram", icon: <FaInstagram size={20} />, href: "https://instagram.com/manlhamtechsupport", color: "hover:bg-[#E4405F] hover:text-white text-[#E4405F]", bg: "bg-pink-50" },
    { name: "LinkedIn", icon: <FaLinkedinIn size={18} />, href: "https://linkedin.com/company/manlhamtechsupport", color: "hover:bg-[#0A66C2] hover:text-white text-[#0A66C2]", bg: "bg-indigo-50" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 tracking-tighter italic">
              MANLHAM <span className="text-indigo-600">TECH</span> SUPPORT
            </h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Bridging the gap between student talent and global opportunities in South Sudan & Kenya.
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl ${social.bg} ${social.color} flex items-center justify-center transition-all duration-300 shadow-sm`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ✅ Platform Section: Matches App.jsx Paths */}
          <div>
            <h4 className="font-black text-gray-900 uppercase text-[10px] tracking-[0.2em] mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              <li><Link to="/marketplace" className="hover:text-indigo-600 transition">Browse Gigs</Link></li>
              <li><Link to="/vetting" className="hover:text-indigo-600 transition">Vetting Process</Link></li>
              <li><Link to="/success-stories" className="hover:text-indigo-600 transition">Success Stories</Link></li>
            </ul>
          </div>

          {/* ✅ Support & Legal Section: Matches App.jsx Paths */}
          <div>
            <h4 className="font-black text-gray-900 uppercase text-[10px] tracking-[0.2em] mb-6">Support & Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              <li><Link to="/help" className="hover:text-indigo-600 transition">Help Center</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-indigo-600 transition">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Trust Badge */}
          <div className="bg-indigo-50 rounded-[2.5rem] p-8 border border-indigo-100/50 self-start shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="text-indigo-600" size={24} />
              <span className="font-black text-indigo-900 text-sm italic">Escrow Secured</span>
            </div>
            <p className="text-[11px] text-indigo-700/70 font-bold leading-relaxed">
              Payments are protected via regional mobile money gateways (M-Pesa / m-Gurush). Funds released only on completion.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-gray-400">
            © 2025 Manlham Tech Support. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Regional Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}