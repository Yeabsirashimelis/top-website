'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AmbassadorProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/user/profile');
      const data = await res.json();
      setUser(data);
    };
    fetchProfile();
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
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
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="border p-4 rounded space-y-2 text-sm">
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Referral Code:</strong> <code>{user.referralCode}</code></p>
      </div>

      <form onSubmit={handlePasswordChange} className="space-y-2">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full border p-2 rounded"
          required
        />
        <button className="bg-blue-900 text-white px-4 py-2 rounded">Change Password</button>
        {message && <p className="text-sm text-blue-900">{message}</p>}
      </form>

  
    </div>
  );
}
