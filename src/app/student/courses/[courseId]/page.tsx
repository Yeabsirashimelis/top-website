'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function StudentCoursePage() {
  const { courseId } = useParams();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [materials, setMaterials] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSubjects = async () => {
      const res = await fetch(`/api/student/subjects/${courseId}`);
      const data = await res.json();
      if (res.ok) setSubjects(data);
      else setError(data.error || 'Access denied.');
    };
    loadSubjects();
  }, [courseId]);

  const loadMaterials = async (subjectId: string) => {
    setSelectedSubject(subjectId);
    const res = await fetch(`/api/tutor/materials/${subjectId}`);
    const data = await res.json();
    setMaterials(data);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Course Content</h1>

        {error && <p className="text-red-600">{error}</p>}

        {/* Subject Cards */}
        {!selectedSubject && (
          <>
            <p className="mb-4 text-gray-600">Choose a subject to continue:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => loadMaterials(s.id)}
                  className="bg-white border hover:shadow rounded p-4 text-left transition text-[#0d1b2a]"
                >
                  <h3 className="font-semibold">{s.title}</h3>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Content */}
        {materials && (
          <>
            <h2 className="text-xl font-semibold my-6">📚 Content</h2>

            {(() => {
  const contentBlocks = [
    ...(materials.notes || []).map((n: any) => ({ ...n, type: 'note' })),
    ...(materials.videos || []).map((v: any) => ({ ...v, type: 'video' })),
  ].sort((a, b) => a.id - b.id);

  const conceptuals = materials.questions?.filter((q: any) => q.type === 'conceptual') || [];
  const conceptualChunks = Array.from({ length: Math.ceil(conceptuals.length / 10) }, (_, i) =>
    conceptuals.slice(i * 10, (i + 1) * 10)
  );

  return contentBlocks.map((item, index) => (
    <div key={item.id} className="mb-10 rounded-lg bg-white shadow-sm p-6 border border-gray-200">
      {item.type === 'note' ? (
        <>
          <h3 className="text-lg font-semibold mb-2">📄 Lecture Note</h3>
          <a
            href={item.fileUrl}
            target="_blank"
            className="text-blue-900 underline hover:text-blue-600 transition"
          >
            View Note (PDF / DOC)
          </a>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">📹 Lecture Video</h3>
          <div className="relative mb-3">
            <img
              src={item.thumbnail}
              alt="Video Thumbnail"
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <video
              src={item.url}
              controls
              className="w-full rounded shadow"
            />
          </div>
        </>
      )}

      {/* Conceptual Questions */}
      {conceptualChunks[index]?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2 text-[#0d1b2a]">🧠 Concept Check</h4>
          <div className="space-y-4">
            {conceptualChunks[index].map((q: any) => (
              <details key={q.id} className="border rounded p-4">
                <summary className="cursor-pointer font-medium text-sm">{q.content}</summary>
                <ConceptualQuestion question={q} />
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  ));
})()}


            {/* Mid & Final Exams */}
            <div className="mt-10 space-y-3">
              <h2 className="text-xl font-semibold">📝 Exams</h2>
              <p className="text-sm text-gray-600">These affect your GPA.</p>
              <a
                href={`/student/exam/mid/${selectedSubject}`}
                className="inline-block bg-blue-900 text-white px-4 py-2 rounded"
              >
                Take Mid Exam
              </a>
              <a
                href={`/student/exam/final/${selectedSubject}`}
                className="inline-block bg-green-600 text-white px-4 py-2 rounded"
              >
                Take Final Exam
              </a>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function ConceptualQuestion({ question }: { question: any }) {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  const isCorrect = selected === question.correct;

  return (
    <div className="mt-3 space-y-2">
      {(['A', 'B', 'C', 'D'] as const).map((opt) => (
        <label
          key={opt}
          className={`block p-2 rounded border cursor-pointer ${
            submitted
              ? opt === question.correct
                ? 'bg-green-100 border-green-600'
                : opt === selected
                ? 'bg-red-100 border-red-600'
                : ''
              : 'hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name={`q-${question.id}`}
            value={opt}
            checked={selected === opt}
            onChange={() => setSelected(opt)}
            disabled={submitted}
            className="mr-2"
          />
          {opt}: {question[`option${opt}`]}
        </label>
      ))}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="bg-blue-900 text-white px-3 py-1 rounded"
        >
          Check Answer
        </button>
      )}

      {submitted && (
        <p
          className={`text-sm mt-2 ${
            isCorrect ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isCorrect ? 'Correct! 🎉' : `Incorrect. Correct answer: ${question.correct}`}
        </p>
      )}
    </div>
  );
}
