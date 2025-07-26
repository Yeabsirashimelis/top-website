// File: /admin/analytics/page.tsx
'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Analytics Overview</h1>

      {stats ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {['student', 'tutor', 'ambassador', 'admin'].map((role) => (
              <div key={role} className="bg-gray-100 p-4 rounded shadow">
                <h3 className="text-sm text-gray-600 capitalize">{role}s</h3>
                <p className="text-xl font-bold">
                  {stats.userCounts.find((u: any) => u.role === role)?._count || 0}
                </p>
              </div>
            ))}
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-sm text-gray-600">Approved Enrollments</h3>
              <p className="text-xl font-bold">{stats.totalEnrollments}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-sm text-gray-600">Total Payouts (birr)</h3>
              <p className="text-xl font-bold">{stats.totalPayouts}</p>
            </div>
          </div>

          {stats?.topReferrers?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Top Referrers</h2>
              <ul className="list-disc pl-6 text-sm space-y-1">
                {stats.topReferrers.map((u: any, i: number) => (
                  <li key={i}>
                    {u.fullName} ({u.role}) — {u.referrals} referrals
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p>Loading stats...</p>
      )}
    </AdminLayout>
  );
}
