'use client';

import Link from 'next/link';

interface Props {
  course: {
    id: number;
    title: string;
    image: string;
    price: number;
  };
}

export default function CourseCard({ course }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 space-y-2 text-[#0d1b2a]">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm font-medium">
          Price: <span className="font-bold">{course.price} birr</span>
        </p>

        <Link href={`/courses/${course.id}`}>
          <button className="bg-[#f4a261] hover:bg-[#f4b272] text-white font-medium px-4 py-2 rounded shadow transition w-full">
            Enroll
          </button>
        </Link>
      </div>
    </div>
  );
}
