'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PageContainer from '@/components/layout/PageContainer'; // Import your PageContainer

export default function GPAPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/student/dashboard').then(res => res.json()).then(setData);
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <PageContainer>
      <DashboardLayout>
        <h2 className="text-xl font-semibold mb-4">GPA Overview</h2>
        <p className="mb-4">Overall GPA: {data.gpa ?? 'No exams taken yet.'}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.courses.map((course: any) => (
            <div key={course.id} className="p-4 border rounded shadow-md bg-white">
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-sm mb-2">Course GPA: {course.gpa ?? 'Not graded yet'}</p>

              {course.subjects?.length > 0 && (
                <ul className="list-disc pl-5 mt-2 text-sm">
                  {course.subjects.map((s: any) => (
                    <li key={s.subjectId}>
                      {s.title} — Mid: {s.midScore}%, Final: {s.finalScore}% → GPA: {s.gpa ?? 'N/A'}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </DashboardLayout>

      {/* Footer */}
      <footer className="bg-[#0d1b2a] text-white text-sm text-center py-6">
        &copy; {new Date().getFullYear()} Top Tutor & Mentor. All rights reserved.
      </footer>
    </PageContainer>
  );
}