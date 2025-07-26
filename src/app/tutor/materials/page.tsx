// File: /tutor/materials/page.tsx
'use client';

import { useEffect, useState } from 'react';
import TutorLayout from '@/components/layout/TutorLayout';

export default function TutorMaterialsBySubject() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [materials, setMaterials] = useState<any>({ notes: [], videos: [], questions: [] });

  const fetchSubjects = async () => {
    const res = await fetch('/api/tutor/subjects');
    const data = await res.json();
    setSubjects(data);
  };

  const fetchMaterials = async (subjectId: string) => {
    const res = await fetch(`/api/tutor/materials/${subjectId}`);
    const data = await res.json();
    setMaterials(data);
  };

  const handleDelete = async (type: 'note' | 'video' | 'question', id: number) => {
    const res = await fetch(`/api/tutor/delete-${type}/${id}`, { method: 'DELETE' });
    const result = await res.json();
    alert(result.message);
    fetchMaterials(selectedSubject);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <TutorLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Tutor Materials</h1>

        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            fetchMaterials(e.target.value);
          }}
          className="w-full border p-2 rounded mb-6"
        >
          <option value="">Select a subject</option>
          {subjects.map((s: any) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        {selectedSubject && (
          <>
            {/* Notes */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">📄 Notes</h2>
              {materials.notes.length === 0 ? (
                <p>No notes found.</p>
              ) : (
                <ul className="space-y-2">
                  {materials.notes.map((note: any) => (
                    <li key={note.id} className="flex justify-between items-center border p-2 rounded">
                      <a href={note.fileUrl} target="_blank" className="text-blue-900 underline">
                        View Note
                      </a>
                      <button onClick={() => handleDelete('note', note.id)} className="text-red-600">
                        🗑 Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Videos */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">📹 Videos</h2>
              {materials.videos.length === 0 ? (
                <p>No videos found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {materials.videos.map((v: any) => (
                    <div key={v.id} className="border p-2 rounded space-y-2">
                      <img src={v.thumbnail} alt="Thumbnail" className="w-full h-40 object-cover" />
                      <video controls src={v.url} className="w-full" />
                      <button
                        onClick={() => handleDelete('video', v.id)}
                        className="text-red-600"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Questions */}
            <div>
              <h2 className="text-lg font-semibold mb-2">❓ Questions</h2>
              {materials.questions.length === 0 ? (
                <p>No questions found.</p>
              ) : (
                <ul className="space-y-3">
                  {materials.questions.map((q: any) => (
                    <li key={q.id} className="border p-3 rounded">
                      <div className="text-sm text-gray-500 mb-1">Type: {q.type}</div>
                      <div className="font-medium mb-2">{q.content}</div>
                      <ul className="ml-4 space-y-1 text-sm">
                        <li className={q.correct === 'A' ? 'text-green-700 font-semibold' : ''}>A. {q.optionA}</li>
                        <li className={q.correct === 'B' ? 'text-green-700 font-semibold' : ''}>B. {q.optionB}</li>
                        <li className={q.correct === 'C' ? 'text-green-700 font-semibold' : ''}>C. {q.optionC}</li>
                        <li className={q.correct === 'D' ? 'text-green-700 font-semibold' : ''}>D. {q.optionD}</li>
                      </ul>
                      <button
                        onClick={() => handleDelete('question', q.id)}
                        className="text-red-600 mt-3 inline-block"
                      >
                        🗑 Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </TutorLayout>
  );
}
