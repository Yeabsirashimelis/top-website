'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch('/api/logout');
      router.push('/');
    };
    logout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-[#0d1b2a]">
      <p className="text-lg">Logging you out...</p>
    </div>
  );
}
