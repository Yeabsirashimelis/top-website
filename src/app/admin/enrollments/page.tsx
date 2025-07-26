'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/admin/enrollments');
      const data = await res.json();
      setEnrollments(data);
    };
    fetchData();
  }, []);

  const handleApprove = async (id: number) => {
    const res = await fetch(`/api/admin/enrollments/${id}/approve`, {
      method: 'POST',
    });
    if (res.ok) {
      setEnrollments((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Pending Enrollments</h1>

      {enrollments.length === 0 ? (
        <p>No pending enrollments.</p>
      ) : (
        <ul className="space-y-4">
          {enrollments.map((e) => (
            <li key={e.id} className="border p-4 rounded shadow-sm bg-white">
              <p><strong>Student:</strong> {e.user.fullName} ({e.user.email})</p>
              <p><strong>Course:</strong> {e.course.title}</p>

              {e.referredBy && (
                <p><strong>Referral Code:</strong> {e.referredBy}</p>
              )}

              <p>
                <strong>Receipt:</strong>{' '}
                <a
                  href={e.receiptUrl}
                  target="_blank"
                  className="text-blue-900 underline"
                >
                  View
                </a>
              </p>

              <button
                onClick={() => handleApprove(e.id)}
                className="mt-3 bg-green-600 text-white px-4 py-1 rounded"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}
