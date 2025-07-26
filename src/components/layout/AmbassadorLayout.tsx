// File: src/components/layout/AmbassadorLayout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navLinks = [
  { href: '/ambassador/dashboard', label: 'Dashboard' },
  { href: '/ambassador/profile', label: 'My Profile' },
  { href: '/logout', label: 'Logout' },
];

export default function AmbassadorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <nav className="bg-[#0d1b2a] text-white px-6 py-3 shadow">
        <div className="flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'hover:text-[#f4a261] transition',
                pathname === link.href && 'text-[#f4a261]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
