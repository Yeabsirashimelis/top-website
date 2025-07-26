'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import PageContainer from '@/components/layout/PageContainer'; // Import your PageContainer

export default function MyCoursesPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/student/dashboard').then(res => res.json()).then(setData);
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <PageContainer>
      <DashboardLayout>
        <h2 className="text-xl font-semibold mb-4">My Courses</h2>
        {data.courses.length === 0 ? (
          <p>You haven’t enrolled in any courses yet.</p>
        ) : (
          <ul className="space-y-3">
            {data.courses.map((c: any) => (
              <li key={c.id} className="flex justify-between items-center border p-3 rounded">
                <span>{c.title}</span>
                <Link
                  href={`/student/courses/${c.id}`}
                  className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  View Content
                </Link>
              </li>
            ))}
          </ul>
        )}
      </DashboardLayout>
      
      {/* Footer */}
      <footer className="bg-[#0d1b2a] text-white text-sm text-center py-6">
        &copy; {new Date().getFullYear()} Top Tutor & Mentor. All rights reserved.
      </footer>
    </PageContainer>
  );
}