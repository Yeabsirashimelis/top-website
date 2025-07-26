'use client';

import { useEffect, useState } from 'react';

export default function ReferralEarningsSection() {
  const [earnings, setEarnings] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fullName: '', bankAccount: '' });

  useEffect(() => {
    fetch('/api/user/earnings').then(res => res.json()).then(setEarnings);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/user/request-payout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || data.error || '');
    if (res.ok) {
      setShowForm(false);
      setForm({ fullName: '', bankAccount: '' });
    }
  };

  if (!earnings) return null;

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Referral Earnings</h2>
      <p className="mb-2">Total earned: <strong>{earnings.earnings} birr</strong></p>

      {earnings.canRequest && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Request Payout
        </button>
      )}

      {message && <p className="mt-2 text-blue-900">{message}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded border space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Bank Account Number"
            value={form.bankAccount}
            onChange={(e) => setForm({ ...form, bankAccount: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">Submit Request</button>
        </form>
      )}

      {earnings.referrals?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-1">Your Referrals:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {earnings.referrals.map((r: any) => (
              <li key={r.id}>
                {r.student.fullName} - {r.course.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
