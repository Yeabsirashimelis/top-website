'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [referralCode, setReferralCode] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`/api/courses/${id}`);
      const data = await res.json();
      setCourse(data);
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receipt) return alert('Please upload your payment receipt.');

    const formData = new FormData();
    formData.append('courseId', String(course.id));
    formData.append('referralCode', referralCode);
    formData.append('receipt', receipt);
    formData.append('fullName', fullName); // for admin only
    formData.append('phone', phone);       // for admin only

    const res = await fetch('/api/enroll', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Enrollment submitted. Awaiting admin approval.');
    } else {
      setMessage(data.error || '❌ Something went wrong.');
    }
  };

  if (!course) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-[#0d1b2a]">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <p className="text-xl font-bold text-[#0d1b2a] mb-6">{course.price} birr</p>

      <form onSubmit={handleEnroll} className="space-y-4 bg-white border rounded p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">Enrollment Information</h2>

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="Referral Code (optional)"
          className="w-full border p-2 rounded"
        />

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 text-sm rounded">
          💳 Please pay <strong>{course.price} birr</strong> to the following CBE Account:
          <br />
          <strong>Account No:</strong> 1000567890123<br />
          <strong>Account Name:</strong> Top Tutor & Mentor PLC
        </div>

        <label className="block mt-2">
          Upload Payment Receipt:
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setReceipt(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-[#f4a261] hover:bg-[#f4b272] text-white font-semibold px-6 py-2 rounded shadow"
        >
          Submit Enrollment
        </button>

        {message && (
          <p className="mt-4 text-sm font-medium text-blue-800">{message}</p>
        )}
      </form>
    </div>  
    
  );
}
