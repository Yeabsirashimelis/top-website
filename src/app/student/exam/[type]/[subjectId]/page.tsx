'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StudentExamPage() {
  const { type, subjectId } = useParams() as { type: 'mid' | 'final'; subjectId: string };
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadQuestions = async () => {
      const res = await fetch(`/api/tutor/materials/${subjectId}`);
      const data = await res.json();
      const filtered = data.questions?.filter((q: any) => q.type === type) || [];
      setQuestions(filtered);
    };
    loadQuestions();
  }, [subjectId, type]);

  const handleChange = (qid: number, value: string) => {
    if (!submitted) setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      subjectId,
      type,
      answers: Object.entries(answers).map(([qid, selected]) => ({
        questionId: parseInt(qid),
        selected,
      })),
    };

    const res = await fetch('/api/student/submit-exam', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      setScore(data.score);
      setSubmitted(true);
    } else {
      setMessage(data.error || 'Submission failed.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{type} Exam</h1>

      {submitted && score !== null && (
        <div className="mb-4 p-4 bg-green-100 border border-green-600 text-green-800 rounded">
          ✅ You scored {score}% in the {type} exam!
        </div>
      )}

      {message && <p className="text-red-600">{message}</p>}

      {questions.map((q, i) => (
        <div key={q.id} className="mb-6 border p-4 rounded">
          <p className="font-medium mb-2">
            {i + 1}. {q.content}
          </p>
          {(['A', 'B', 'C', 'D'] as const).map((opt) => (
            <label
              key={opt}
              className={`block p-2 border rounded mb-1 cursor-pointer ${
                submitted
                  ? opt === q.correct
                    ? 'bg-green-100 border-green-600'
                    : answers[q.id] === opt
                    ? 'bg-red-100 border-red-600'
                    : ''
                  : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleChange(q.id, opt)}
                disabled={submitted}
                className="mr-2"
              />
              {opt}: {q[`option${opt}`]}
            </label>
          ))}
        </div>
      ))}

      {!submitted && questions.length > 0 && (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Exam
        </button>
      )}
    </div>
  );
}
