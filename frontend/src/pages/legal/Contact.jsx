import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';
import { FaWhatsapp } from "react-icons/fa"; 
import { Mail, MapPin, Clock } from 'lucide-react';

export default function ContactUs() {
  const contactMethods = [
    {
      icon: <Mail className="text-indigo-600" size={24} />,
      title: "Email Support",
      detail: (
        <a 
          href="mailto:mts.manlham@gmail.com" 
          className="hover:text-indigo-800 transition-colors underline decoration-indigo-200 underline-offset-4"
        >
          mts.manlham@gmail.com
        </a>
      ),
      sub: "Average response: 2 hours"
    },
    {
      icon: <FaWhatsapp className="text-emerald-600" size={24} />, 
      title: "WhatsApp Business",
      detail: (
        <a 
          href="https://wa.me/211929267673" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-emerald-800 transition-colors underline decoration-emerald-200 underline-offset-4"
        >
          +211 929 267 673
        </a>
      ),
      sub: "Available 8AM - 6PM"
    },
    {
      icon: <MapPin className="text-red-500" size={24} />,
      title: "Regional Office",
      // ✅ Clickable Google Maps Link
      detail: (
        <a 
          href="https://www.google.com/maps/search/?api=1&query=Tech+Hub+Plaza+Juba+South+Sudan" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-red-700 transition-colors underline decoration-red-200 underline-offset-4"
        >
          Tech Hub Plaza, 2nd Floor
        </a>
      ),
      sub: "Juba, South Sudan"
    }
  ];

  return (
    <InfoPageLayout title="Contact Us" subtitle="We're here to support your journey">
      <div className="space-y-12">
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-indigo-100 transition-all group">
              <div className="mb-4 transform group-hover:scale-110 transition-transform">
                {method.icon}
              </div>
              <h3 className="font-black text-gray-900 italic text-lg">{method.title}</h3>
              <div className="text-indigo-600 font-bold mt-1 text-sm md:text-base">
                {method.detail}
              </div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">
                {method.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-[3rem] p-10 border border-amber-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm shrink-0">
              <Clock className="text-amber-600" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-amber-900 italic mb-2">Escrow & Payment Disputes</h2>
              <p className="text-amber-800/70 font-medium leading-relaxed text-sm">
                If you are experiencing issues with a payment milestone or M-Pesa/m-Gurush transaction, please include your <strong>Transaction ID</strong> and <strong>Job Reference Number</strong> in your message. Our staff monitors financial tickets 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}