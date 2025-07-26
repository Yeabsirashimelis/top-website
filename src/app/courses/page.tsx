'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

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
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="max-w-6xl mx-auto p-6 flex-grow">
          <h1 className="text-3xl font-bold mb-4">All Courses</h1>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <div className="border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 bg-white flex flex-col h-full">
                  <img src={course.image} alt={course.title} className="h-40 w-full object-cover rounded-t-lg mb-2" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 flex-grow">{course.title}</h2>
                  <p className="text-blue-900 font-bold text-lg">{course.price} birr</p>
                  <p className="text-gray-600 mt-2 flex-grow">{course.description}</p>
                </div>
              </Link>
            ))}
          </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {courses.map((course: any) => (
    <div key={course.id} className="border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 bg-white flex flex-col h-full">
      <img src={course.image} alt={course.title} className="h-40 w-full object-cover rounded-t-lg mb-2" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2 flex-grow">{course.title}</h2>
      <p className="text-blue-900 font-bold text-lg">{course.price} birr</p>
      <p className="text-gray-600 mt-2 flex-grow">{course.description}</p>
    </div>
  ))}
</div>
        </div>
        
        {/* Footer */}
        <footer className="bg-[#0d1b2a] text-white text-sm text-center py-6">
          &copy; {new Date().getFullYear()} Top Tutor & Mentor. All rights reserved.
        </footer>
      </div>
    </PageContainer>
  );
}