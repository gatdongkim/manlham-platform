import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';
import { 
  UserCheck, 
  ShieldAlert, 
  FileSearch, 
  BadgeCheck, 
  LockKeyhole 
} from 'lucide-react';

export default function VettingProcess() {
  const steps = [
    {
      icon: <FileSearch className="text-indigo-600" />,
      title: "Identity Verification",
      desc: "We verify South Sudanese/Kenyan National IDs or Student IDs to ensure every profile represents a real individual."
    },
    {
      icon: <UserCheck className="text-indigo-600" />,
      title: "Skill Assessment",
      desc: "Students undergo a portfolio review or technical assessment before they are granted 'PRO' status for high-tier gigs."
    },
    {
      icon: <ShieldAlert className="text-indigo-600" />,
      title: "Client Background",
      desc: "MSME (Client) accounts are screened for business legitimacy to protect students from predatory or fake job postings."
    }
  ];

  return (
    <InfoPageLayout title="Vetting Process" subtitle="Ensuring Trust & Quality at Manlham">
      <div className="space-y-12">
        <section>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Our vetting process is the backbone of the Manlham ecosystem. We bridge the gap between local talent and businesses by maintaining a high standard of accountability for both parties.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-indigo-200 transition-colors">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  {step.icon}
                </div>
                <h3 className="font-black text-gray-900 italic mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-semibold">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-indigo-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black italic mb-4 flex items-center gap-3">
              <BadgeCheck size={28} /> The "Verified" Badge
            </h2>
            <p className="text-indigo-100 font-medium max-w-2xl">
              Profiles with the blue verification badge have completed all stages of our audit. This includes KYC (Know Your Customer) and successful completion of at least one milestone on the platform.
            </p>
          </div>
          <LockKeyhole className="absolute -right-10 -bottom-10 text-white/5" size={240} />
        </section>
      </div>
    </InfoPageLayout>
  );
}