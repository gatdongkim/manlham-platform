import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

const PrivacyPolicy = () => (
  <InfoPageLayout title="Privacy Policy" subtitle="Last Updated: December 2025">
    <div className="max-w-4xl mx-auto space-y-10 pb-20 px-4">
      <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-3 italic mb-4">
          <Lock size={20} className="text-indigo-600" /> 1. Data Collection
        </h2>
        <p className="text-gray-500 font-medium leading-relaxed">
          We collect information you provide directly to us when you create an account, such as your name, South Sudanese or Kenyan ID details, and M-Pesa contact info.
        </p>
      </section>

      <section className="bg-indigo-50/30 p-8 rounded-[2.5rem] border border-indigo-100/50">
        <h2 className="text-xl font-black text-indigo-900 flex items-center gap-3 italic mb-4">
          <ShieldCheck size={20} className="text-indigo-600" /> 2. Escrow Transparency
        </h2>
        <p className="text-indigo-900/70 font-medium leading-relaxed">
          Financial data is processed securely through M-Pesa. Manlham Tech Support does not store your mobile money PIN.
        </p>
      </section>

      <section className="p-8">
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-3 italic mb-4">
          <EyeOff size={20} className="text-indigo-600" /> 3. Third-Party Sharing
        </h2>
        <p className="text-gray-500 font-medium leading-relaxed">
          We do not sell your personal data. Information is only shared with our payment partners (Safaricom/Zain/MTN) to facilitate secure project payouts.
        </p>
      </section>
    </div>
  </InfoPageLayout>
);

export default PrivacyPolicy;