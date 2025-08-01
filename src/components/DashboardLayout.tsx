'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { useState } from 'react';
import { Button } from '@/components/ui/Button'; // Import your Button component

const dashboardLinks = [
  { href: '/student/dashboard', label: 'Dashboard' },
  { href: '/student/courses', label: 'My Courses' },
  { href: '/student/gpa', label: 'GPA' },
  { href: '/student/referral', label: 'Referral' },
  { href: '/student/profile', label: 'My Profile' },
  { href: '/student/classrooms', label: 'classrooms' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#0d1b2a] font-sans">
      {/* Nav */}
      <nav className="bg-[#0d1b2a] text-white px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
            <span className="font-bold text-lg">Top Tutor & Mentor</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6 text-sm font-medium">
              {dashboardLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      'hover:text-[#f4a261] transition',
                      pathname === link.href && 'text-yellow-300'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="/logout">
                <Button size="sm" variant="primary" className="w-full">
                  Logout
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 pt-2">
            <ul className="flex flex-col gap-3 text-sm font-medium">
              {dashboardLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      'block hover:text-[#f4a261] transition',
                      pathname === link.href && 'text-yellow-300'
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-4">
                <Link href="/logout" onClick={() => setMenuOpen(false)}>
                  <Button size="sm" variant="primary" className="w-full">
                    Logout
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}