import React, { useState, useEffect } from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';
import { Mail, MessageCircle, Phone, Globe } from 'lucide-react';

const ContactSupport = () => {
  const [region, setRegion] = useState('SS'); // Default to South Sudan
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Auto-detect region based on timezone
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Nairobi')) setRegion('KE');
  }, []);

  const supportDetails = {
    SS: { country: 'South Sudan', phone: '+211 920 000 000', color: 'bg-green-600' },
    KE: { country: 'Kenya', phone: '+254 700 000 000', color: 'bg-blue-600' }
  };

  return (
    <InfoPageLayout title="Contact Support" subtitle="Get in touch with Nexus">
      <div className="grid lg:grid-cols-2 gap-12 mt-8">
        
        {/* LEFT: Contact Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setRegion('SS')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition ${region === 'SS' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}
            >🇸🇸 SOUTH SUDAN</button>
            <button 
              onClick={() => setRegion('KE')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition ${region === 'KE' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}
            >🇰🇪 KENYA</button>
          </div>

          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-indigo-600 outline-none" />
            <input type="email" placeholder="Email Address" className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-indigo-600 outline-none" />
            <textarea placeholder="How can we help you?" rows="5" className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-indigo-600 outline-none"></textarea>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:shadow-xl transition-all">Send Message</button>
          </form>
        </div>

        {/* RIGHT: Region Specific Info */}
        <div className="space-y-6">
          <div className={`${supportDetails[region].color} p-8 rounded-[2.5rem] text-white shadow-2xl`}>
            <Globe className="mb-4 opacity-50" size={32} />
            <h3 className="text-2xl font-black mb-2">Nexus {supportDetails[region].country}</h3>
            <p className="text-sm font-bold opacity-80 mb-8">Local support for M-Pesa & Project Mediation.</p>
            
            <div className="space-y-4">
              <a href={`tel:${supportDetails[region].phone}`} className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition">
                <Phone size={20} />
                <span className="font-bold">{supportDetails[region].phone}</span>
              </a>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl">
                <Mail size={20} />
                <span className="font-bold">support@{region.toLowerCase()}.nexus.com</span>
              </div>
            </div>
          </div>
          
          <div className="p-8 border border-dashed border-gray-200 rounded-[2.5rem]">
            <h4 className="font-black text-gray-900 mb-2 flex items-center gap-2">
              <MessageCircle size={18} className="text-indigo-600" /> Live Chat
            </h4>
            <p className="text-sm text-gray-500 font-medium">Our average response time for {supportDetails[region].country} is under 30 minutes during business hours.</p>
          </div>
        </div>

      </div>
    </InfoPageLayout>
  );
};

export default ContactSupport;