'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) setError(data.error);
    else {
      setSuccess('Registered successfully!');
      setTimeout(() => router.push('/login'), 1500);
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#f9f9f9]">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#0d1b2a] mb-6">
            Student Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a261]"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a261]"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a261]"
            />

            <Button type="submit" className="w-full" variant="dark">
              Register
            </Button>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
          </form>
        </div>
      </div>
      <footer className="bg-[#0d1b2a] text-white text-sm text-center py-6">
        &copy; {new Date().getFullYear()} Top Tutor & Mentor. All rights reserved.
      </footer>
    </PageContainer>
  );
}