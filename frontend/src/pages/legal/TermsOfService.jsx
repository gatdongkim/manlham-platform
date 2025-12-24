import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';
import { ShieldCheck, Globe, AlertTriangle } from 'lucide-react';

const TermsOfService = () => (
  <InfoPageLayout title="Terms of Service" subtitle="Manlham Tech Support Platform Governance">
    <div className="max-w-4xl mx-auto space-y-10 pb-20 px-4">
      
      <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3 italic">
          <ShieldCheck className="text-indigo-600" /> 1. Escrow Agreement
        </h3>
        <p className="text-gray-600 leading-relaxed font-medium">
          By using Manlham Tech Support, the Client agrees to deposit the full project budget into our secure Escrow wallet. 
          Funds are only released when the Client clicks <span className="text-indigo-600 font-bold italic">"Approve"</span> or after an Admin resolves a dispute.
        </p>
      </section>

      <section className="p-8">
        <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3 italic">
          <Globe className="text-indigo-600" /> 2. Currency & Conversion
        </h3>
        <p className="text-gray-600 leading-relaxed font-medium">
          Payments are accepted in <span className="font-bold text-gray-900 uppercase">KES</span> or <span className="font-bold text-gray-900 uppercase">SSP</span>. 
          Users are responsible for any mobile money transaction fees charged by their respective network providers (Safaricom/Zain/MTN).
        </p>
      </section>

      <section className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100">
        <h3 className="text-xl font-black text-red-600 mb-4 flex items-center gap-3 italic">
          <AlertTriangle /> 3. Prohibited Conduct
        </h3>
        <p className="text-red-900/70 leading-relaxed font-medium">
          Users may not attempt to circumvent the platform by paying students directly. Doing so voids all escrow protection and may lead to account suspension.
        </p>
      </section>

    </div>
  </InfoPageLayout>
);

export default TermsOfService;