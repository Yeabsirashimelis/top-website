'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageContainer from '@/components/layout/PageContainer'; // Import your PageContainer

export default function ReferralPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/student/dashboard').then(res => res.json()).then(setData);
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <PageContainer>
      <DashboardLayout>
        <h2 className="text-xl font-semibold mb-4">Referral Earnings</h2>
        
        <div className="p-4 border rounded shadow-md bg-white mb-6">
          <p className="mb-2">
            Your referral code: <code className="font-mono">{data.referralCode}</code>
          </p>
          <p className="mb-2">
            Total earned: <strong>{data.earnings} birr</strong>
          </p>
          {data.earnings >= 100 && (
            <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Request Payout
            </button>
          )}
        </div>
      </DashboardLayout>

      {/* Footer */}
      <footer className="bg-[#0d1b2a] text-white text-sm text-center py-6">
        &copy; {new Date().getFullYear()} Top Tutor & Mentor. All rights reserved.
      </footer>
    </PageContainer>
  );
}