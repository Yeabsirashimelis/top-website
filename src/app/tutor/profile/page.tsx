// File: /tutor/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TutorLayout from '@/components/layout/TutorLayout';

export default function TutorProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/user/profile')
      .then((res) => res.json())
      .then(setUser);
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/user/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setMessage(data.message || data.error || '');
    if (res.ok) setPassword('');
  };

  const handleLogout = async () => {
    await fetch('/api/logout');
    router.push('/login');
  };

  if (!user) return <p className="p-6">Loading profile...</p>;

  return (
    <TutorLayout>
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <div className="border p-4 rounded text-sm">
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Referral Code:</strong> {user.referralCode}</p>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-2">
          <h3 className="font-semibold">Change Password</h3>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button className="bg-blue-900 text-white px-4 py-2 rounded">Change Password</button>
          {message && <p className="text-blue-600 text-sm">{message}</p>}
        </form>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </TutorLayout>
  );
}