'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const fetchPayouts = async () => {
    const res = await fetch('/api/admin/payouts');
    const data = await res.json();
    setPayouts(data);
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  const handleApproval = async (id: number) => {
    const res = await fetch(`/api/admin/payouts/${id}/approve`, { method: 'POST' });
    const data = await res.json();
    setMessage(data.message || data.error || '');
    fetchPayouts();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Payout Requests</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {payouts.length === 0 ? (
        <p>No payout requests found.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">User</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Requested At</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id}>
                <td className="border px-2 py-1">{p.user.fullName} ({p.user.email})</td>
                <td className="border px-2 py-1">{p.amount} birr</td>
                <td className="border px-2 py-1 font-medium">{p.status}</td>
                <td className="border px-2 py-1">{new Date(p.createdAt).toLocaleString()}</td>
                <td className="border px-2 py-1">
                  {p.status === 'pending' && (
                    <button
                      onClick={() => handleApproval(p.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
