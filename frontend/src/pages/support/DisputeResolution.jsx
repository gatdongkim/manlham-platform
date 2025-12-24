import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';

const DisputeResolution = () => (
  <InfoPageLayout title="Dispute Resolution" subtitle="Escrow Protection">
    <div className="space-y-6">
      <div className="border-l-4 border-indigo-600 pl-6">
        <h3 className="font-black text-gray-900 uppercase">Step 1: Negotiation</h3>
        <p>Students and Clients are encouraged to resolve milestones directly via the Nexus Chat system.</p>
      </div>
      <div className="border-l-4 border-indigo-600 pl-6">
        <h3 className="font-black text-gray-900 uppercase">Step 2: Admin Mediation</h3>
        <p>If no resolution is reached, Manlham Admins review the 'Requirements.pdf' and the 'Deliverables' to release or refund the escrowed SSP.</p>
      </div>
    </div>
  </InfoPageLayout>
);

export default DisputeResolution;