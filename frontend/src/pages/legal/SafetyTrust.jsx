import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';
import { ShieldCheck, Lock, Smartphone, UserCheck, AlertTriangle, Flag } from 'lucide-react';

const SafetyTrust = () => {
  const safetyFeatures = [
    {
      icon: <Lock className="text-indigo-600" size={24} />,
      title: "Escrow Payment Protection",
      desc: "Payments are held securely in escrow and only released once the client approves the completed work milestone."
    },
    {
      icon: <Smartphone className="text-emerald-600" size={24} />,
      title: "Secure Mobile Money",
      desc: "We integrate directly with M-Pesa and m-Gurush. We never store your mobile money PIN or private credentials."
    },
    {
      icon: <UserCheck className="text-blue-600" size={24} />,
      title: "Verified Profiles",
      desc: "Every professional on Manlham undergoes an identity audit to ensure a community of real talent and businesses."
    }
  ];

  return (
    <InfoPageLayout title="Safety & Trust" subtitle="Your Security is Our Top Priority">
      <div className="space-y-12">
        <section>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            At Manlham Tech Support, we've built a multi-layered security system to protect every transaction between South Sudanese talent and global businesses.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-indigo-100 transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-black text-gray-900 italic mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-semibold">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🚨 NEW: Report a User Section */}
        <div className="bg-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md">
              <Flag className="text-white" size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-black italic mb-2">Notice something suspicious?</h2>
              <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-6 md:mb-0">
                Help us keep Juba's tech community safe. If a user is asking for payment outside of Escrow or behaving inappropriately, report them immediately for review.
              </p>
            </div>
            <a 
              href="mailto:mts.manlham@gmail.com?subject=Reporting a User Profile"
              className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-50 hover:text-red-600 transition shadow-xl shrink-0"
            >
              Report User
            </a>
          </div>
        </div>

        {/* Scams Awareness Section */}
        <div className="bg-red-50 rounded-[3rem] p-10 border border-red-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm shrink-0">
              <AlertTriangle className="text-red-600" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-red-900 italic mb-2">Avoid Common Scams</h2>
              <p className="text-red-800/70 font-medium leading-relaxed text-sm">
                Always keep your communication and payments inside the platform. <strong>Never</strong> share your M-Pesa PIN or pay "recruitment fees." We only use official escrow via m-Gurush/M-Pesa gateways.
              </p>
            </div>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
};

export default SafetyTrust;