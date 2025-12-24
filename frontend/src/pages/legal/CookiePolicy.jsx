import React from 'react';
import InfoPageLayout from '../../components/InfoPageLayout';

const CookiePolicy = () => (
  <InfoPageLayout title="Cookie Policy" subtitle="Transparency first">
    <p>We use cookies to keep you logged in and to remember your regional currency preference (Kenya vs South Sudan).</p>
    <table className="min-w-full border mt-4 text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Cookie Type</th>
          <th className="p-2 border">Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 border">Essential</td>
          <td className="p-2 border">User authentication and secure sessions.</td>
        </tr>
        <tr>
          <td className="p-2 border">Functional</td>
          <td className="p-2 border">Language and Currency settings.</td>
        </tr>
      </tbody>
    </table>
  </InfoPageLayout>
);

export default CookiePolicy;