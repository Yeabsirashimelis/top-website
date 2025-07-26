// 'use client';

// import { useEffect, useState } from 'react';

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState<any[]>([]);
//   const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'student' });
//   const [message, setMessage] = useState('');

//   const loadUsers = async () => {
//     const res = await fetch('/api/admin/users');
//     const data = await res.json();
//     setUsers(data);
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('/api/admin/create-user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     setMessage(data.message || data.error || '');
//     if (res.ok) {
//       setForm({ fullName: '', email: '', password: '', role: 'student' });
//       loadUsers();
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm('Are you sure you want to delete this user?')) return;
//     await fetch(`/api/admin/delete-user/${id}`, { method: 'DELETE' });
//     loadUsers();
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

//       <form onSubmit={handleCreate} className="space-y-3 mb-6 border p-4 rounded">
//         <h2 className="text-lg font-semibold">Add New User</h2>
//         <input
//           name="fullName"
//           placeholder="Full Name"
//           value={form.fullName}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded">
//           <option value="student">Student</option>
//           <option value="tutor">Tutor</option>
//           <option value="ambassador">Ambassador</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button className="bg-blue-900 text-white px-4 py-2 rounded">Create User</button>
//         {message && <p className="text-green-600">{message}</p>}
//       </form>

//       <h2 className="text-lg font-semibold mb-2">All Users</h2>
//       <table className="w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Email</th>
//             <th className="border px-2 py-1">Role</th>
//             <th className="border px-2 py-1">Actions</th>
//             <th>Referral Code</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id}>
//               <td className="border px-2 py-1">{u.fullName}</td>
//               <td className="border px-2 py-1">{u.email}</td>
//               <td className="border px-2 py-1">{u.role}</td>
//               <td className="border px-2 py-1">
//               <td>{u.referralCode}</td>
//                 <button onClick={() => handleDelete(u.id)} className="text-red-600">
//                   🗑 Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// File: /admin/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'student' });
  const [message, setMessage] = useState('');

  const loadUsers = async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || data.error || '');
    if (res.ok) {
      setForm({ fullName: '', email: '', password: '', role: 'student' });
      loadUsers();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    await fetch(`/api/admin/delete-user/${id}`, { method: 'DELETE' });
    loadUsers();
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

        <form onSubmit={handleCreate} className="space-y-3 mb-6 border p-4 rounded">
          <h2 className="text-lg font-semibold">Add New User</h2>
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="ambassador">Ambassador</option>
            <option value="admin">Admin</option>
          </select>
          <button className="bg-blue-900 text-white px-4 py-2 rounded">Create User</button>
          {message && <p className="text-green-600">{message}</p>}
        </form>

        <h2 className="text-lg font-semibold mb-2">All Users</h2>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Referral Code</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border px-2 py-1">{u.fullName}</td>
                <td className="border px-2 py-1">{u.email}</td>
                <td className="border px-2 py-1">{u.role}</td>
                <td className="border px-2 py-1">{u.referralCode}</td>
                <td className="border px-2 py-1">
                  <button onClick={() => handleDelete(u.id)} className="text-red-600">
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
