// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// import DashboardLayout from '@/components/DashboardLayout';

// export default function StudentDashboard() {
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const res = await fetch('/api/student/dashboard');
//       const json = await res.json();
//       setData(json);
//     };
//     fetchDashboard();
//   }, []);

//   if (!data) return <p className="p-6">Loading...</p>;

//   return (
//     <DashboardLayout>
  
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Welcome, {data.fullName}</h1>
// <Link
//   href="/profile"
//   className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm font-medium"
// >
//   My Profile
// </Link>

//       <section>
//         <h2 className="text-xl font-semibold mb-2">My Courses</h2>
//         {data.courses.length === 0 ? (
//           <p>You haven’t enrolled in any courses yet.</p>
//         ) : (
//           <><ul className="space-y-3">
//                 {data.courses.map((c: any) => (
//                   <li key={c.id} className="flex justify-between items-center border p-3 rounded">
//                     <span>{c.title}</span>
//                     <Link
//                       href={`/student/courses/${c.id}`}
//                       className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
//                     >
//                       View Content
//                     </Link>
//                   </li>
//                 ))}
//               </ul><ul className="space-y-3">
//                   {data.courses.map((c: any) => (
//                     <li key={c.id}>
//                       {c.title} — GPA: {c.gpa ?? 'Not yet graded'}
//                     </li>
//                   ))}

//                 </ul></>
//         )}

//         {data.courses.map((course: any) => (
//   <div key={course.id} className="mb-6">
//     <h3 className="font-semibold">{course.title}</h3>
//     <p>Course GPA: {course.gpa ?? 'Not graded yet'}</p>

//     {course.subjects?.length > 0 && (
//       <ul className="list-disc pl-5 mt-2 text-sm">
//         {course.subjects.map((s: any) => (
//           <li key={s.subjectId}>
//             {s.title} — Mid: {s.midScore}%, Final: {s.finalScore}% → GPA: {s.gpa ?? 'N/A'}
//           </li>
//         ))}
//       </ul>
//     )}
//   </div>
// ))}

//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-2">GPA</h2>
//         <p>{data.gpa ?? 'No exams taken yet.'}</p>
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-2">Referral Earnings</h2>
//         <p>Your referral code: <code>{data.referralCode}</code></p>
//         <p>Total earned: <strong>{data.earnings} birr</strong></p>
//         {data.earnings >= 100 && (
//           <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded">
//             Request Payout
//           </button>
//         )}
//       </section>
//     </div>
//     </DashboardLayout>
//   );
// }
// File: /student/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import CourseCard from '@/components/CourseCard';
import DashboardLayout from '@/components/DashboardLayout';
import PageContainer from '@/components/layout/PageContainer'; // Import your PageContainer

export default function StudentDashboardPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch('/api/courses');
      const data = await res.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <PageContainer>
      <DashboardLayout>
        <div>
          <h1 className="text-2xl font-bold mb-6">All Available Courses</h1>
          {courses.length === 0 ? (
            <p>No courses found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>

        
      </DashboardLayout>
      {/* Footer */}
        <footer className="bg-[#0d1b2a] text-white text-sm text-center py-6">
          &copy; {new Date().getFullYear()} Top Tutor & Mentor. All rights reserved.
        </footer>
    </PageContainer>
  );
}
