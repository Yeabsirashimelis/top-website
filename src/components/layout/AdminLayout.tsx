// File: src/components/layout/AdminLayout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/enrollments', label: 'Enrollments' },
  { href: '/admin/payouts', label: 'Payouts' },
  { href: '/admin/analytics', label: 'Analytics' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#0d1b2a]">
      <nav className="bg-[#0d1b2a] text-white px-6 py-4 sticky top-0 z-50 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={36} height={36} />
          <span className="font-bold text-lg"> Admin Panel</span>
        </Link>
          <ul className="flex gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    'hover:text-[#f4a261] transition',
                    pathname === link.href && 'text-[#f4a261]'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/logout"
                className="bg-[#f4a261] text-[#0d1b2a] px-3 py-1 rounded hover:bg-[#f4b272]"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
