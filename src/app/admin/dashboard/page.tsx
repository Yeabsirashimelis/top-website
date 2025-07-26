// 'use client';

// import { useEffect, useState } from 'react';

// export default function AdminDashboard() {
//   const [enrollments, setEnrollments] = useState<any[]>([]);
//   const [payouts, setPayouts] = useState<any[]>([]);
//   const [message, setMessage] = useState('');
//   const [stats, setStats] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch('/api/admin/enrollments');
//       const data = await res.json();
//       setEnrollments(data);
//     };
//     fetchData();
//   }, []);

//   const handleApprove = async (id: number) => {
//     const res = await fetch(`/api/admin/enrollments/${id}/approve`, {
//       method: 'POST',
//     });
//     if (res.ok) {
//       setEnrollments((prev) => prev.filter((e) => e.id !== id));
//     }
//   };

//   useEffect(() => {
//     const loadPayouts = async () => {
//       const res = await fetch('/api/admin/payouts');
//       const data = await res.json();
//       setPayouts(data);
//     };
//     loadPayouts();
//   }, []);

//   const updateStatus = async (id: number, status: 'approved' | 'rejected') => {
//     const res = await fetch(`/api/admin/payouts/${id}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status }),
//     });

//     const data = await res.json();
//     setMessage(data.message || data.error || '');
//     setPayouts((prev) =>
//       prev.map((p) =>
//         p.id === id ? { ...p, status } : p
//       )
//     );
//   };

//   useEffect(() => {
//     const fetchStats = async () => {
//       const s = await fetch('/api/admin/stats').then((r) => r.json());
//       const p = await fetch('/api/admin/payouts').then((r) => r.json());
//       setStats(s);
//       setPayouts(p);
//     };
//     fetchStats();
//   }, []);

//   return (
//     <><div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Pending Enrollments</h1>
//       {enrollments.length === 0 ? (
//         <p>No pending enrollments.</p>
//       ) : (
//         <ul className="space-y-4">
//           {enrollments.map((e) => (
//             <li key={e.id} className="border p-4 rounded">
//               <p><strong>Student:</strong> {e.student.fullName} ({e.student.email})</p>
//               <p><strong>Course:</strong> {e.course.title}</p>
//               {e.referredBy && <p><strong>Referred By:</strong> {e.referredBy}</p>}
//               <p><strong>Receipt:</strong> <a href={e.receiptUrl} target="_blank" className="text-blue-900 underline">View</a></p>
//               <button
//                 onClick={() => handleApprove(e.id)}
//                 className="mt-3 bg-green-600 text-white px-4 py-1 rounded"
//               >
//                 Approve
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//     <div className="max-w-5xl mx-auto p-6">
//         <h1 className="text-2xl font-bold mb-6"> Payouts</h1>

//         {message && <p className="text-blue-900 mb-4">{message}</p>}

//         {payouts.length === 0 ? (
//           <p>No payout requests.</p>
//         ) : (
//           <table className="w-full border text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-2 py-1">User</th>
//                 <th className="border px-2 py-1">Email</th>
//                 <th className="border px-2 py-1">Role</th>
//                 <th className="border px-2 py-1">Amount</th>
//                 <th className="border px-2 py-1">Date</th>
//                 <th className="border px-2 py-1">Status</th>
//                 <th className="border px-2 py-1">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payouts.map((p) => (
//                 <tr key={p.id}>
//                   <td className="border px-2 py-1">{p.user.fullName}</td>
//                   <td className="border px-2 py-1">{p.user.email}</td>
//                   <td className="border px-2 py-1">{p.user.role}</td>
//                   <td className="border px-2 py-1">{p.amount} birr</td>
//                   <td className="border px-2 py-1">{new Date(p.createdAt).toLocaleDateString()}</td>
//                   <td className="border px-2 py-1 font-semibold">{p.status}</td>
//                   <td className="border px-2 py-1 space-x-2">
//                     {p.status === 'pending' && (
//                       <>
//                         <button
//                           onClick={() => updateStatus(p.id, 'approved')}
//                           className="bg-green-600 text-white px-2 py-1 rounded text-xs"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => updateStatus(p.id, 'rejected')}
//                           className="bg-red-600 text-white px-2 py-1 rounded text-xs"
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {stats && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {['student', 'tutor', 'ambassador', 'admin'].map((role) => (
//             <div key={role} className="bg-gray-100 p-4 rounded shadow">
//               <h3 className="text-sm text-gray-600 capitalize">{role}s</h3>
//               <p className="text-xl font-bold">
//                 {stats.userCounts.find((u: any) => u.role === role)?._count || 0}
//               </p>
//             </div>
//           ))}
//           <div className="bg-gray-100 p-4 rounded shadow">
//             <h3 className="text-sm text-gray-600">Approved Enrollments</h3>
//             <p className="text-xl font-bold">{stats.totalEnrollments}</p>
//           </div>
//           <div className="bg-gray-100 p-4 rounded shadow">
//             <h3 className="text-sm text-gray-600">Total Payouts (birr)</h3>
//             <p className="text-xl font-bold">{stats.totalPayouts}</p>
//           </div>
//         </div>
//       )}

//       {stats?.topReferrers?.length > 0 && (
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">Top Referrers</h2>
//           <ul className="list-disc pl-6 text-sm space-y-1">
//             {stats.topReferrers.map((u: any, i: number) => (
//               <li key={i}>
//                 {u.fullName} ({u.role}) — {u.referrals} referrals
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }

// File: /admin/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const s = await fetch('/api/admin/stats').then((r) => r.json());
      setStats(s);
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {stats && (
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
      )}
    </AdminLayout>
  );
}
