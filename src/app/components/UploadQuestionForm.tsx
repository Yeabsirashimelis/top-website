'use client';

import { useState, useEffect } from 'react';

export default function UploadQuestionForm() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    subjectId: '',
    type: 'conceptual',
    content: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correct: 'A',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSubjects = async () => {
      const res = await fetch('/api/tutor/subjects');
      const data = await res.json();
      setSubjects(data);
    };
    loadSubjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/tutor/upload-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || data.error || '');
    if (res.ok) {
      setForm({ ...form, content: '', optionA: '', optionB: '', optionC: '', optionD: '' });
    }
  };

  return (
    <div className="mt-10 border p-6 rounded max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload MCQ</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          name="subjectId"
          value={form.subjectId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Subject</option>
          {subjects.map((s: any) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="conceptual">Conceptual</option>
          <option value="mid">Mid Exam</option>
          <option value="final">Final Exam</option>
        </select>

        <textarea
          name="content"
          placeholder="Enter the question"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="optionA"
          placeholder="Option A"
          value={form.optionA}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="optionB"
          placeholder="Option B"
          value={form.optionB}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="optionC"
          placeholder="Option C"
          value={form.optionC}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="optionD"
          placeholder="Option D"
          value={form.optionD}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="correct"
          value={form.correct}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="A">Correct: A</option>
          <option value="B">Correct: B</option>
          <option value="C">Correct: C</option>
          <option value="D">Correct: D</option>
        </select>

        <button className="bg-blue-900 text-white px-4 py-2 rounded">Upload Question</button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
}
