// File: /tutor/upload/page.tsx
'use client';

import UploadQuestionForm from '@/app/components/UploadQuestionForm';
import { useEffect, useState } from 'react';
import TutorLayout from '@/components/layout/TutorLayout';

export default function TutorUploadPage() {
  const [subjects, setSubjects] = useState<{ id: number; title: string }[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [noteMessage, setNoteMessage] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoMessage, setVideoMessage] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await fetch('/api/tutor/subjects');
      const data = await res.json();
      setSubjects(data);
    };
    fetchSubjects();
  }, []);

  const handleNoteUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteFile || !selectedSubject) return alert('Select subject and file.');

    const formData = new FormData();
    formData.append('subjectId', selectedSubject);
    formData.append('file', noteFile);

    const res = await fetch('/api/tutor/upload-note', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setNoteMessage(data.message || 'Note uploaded');
    setNoteFile(null);
  };

  const handleVideoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile || !selectedSubject)
      return alert('Upload video, thumbnail, and select subject.');

    const formData = new FormData();
    formData.append('subjectId', selectedSubject);
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);

    const res = await fetch('/api/tutor/upload-video', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setVideoMessage(data.message || 'Video uploaded');
    setVideoFile(null);
    setThumbnailFile(null);
  };

  return (
    <TutorLayout>
      <div className="max-w-2xl mx-auto space-y-10">
        <h1 className="text-2xl font-bold">Upload Materials</h1>

        <label className="block">
          <span className="font-semibold">Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
          >
            <option value="">Select subject</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.title}
              </option>
            ))}
          </select>
        </label>

        {/* Note Upload */}
        <form onSubmit={handleNoteUpload} className="space-y-4 border-t pt-4">
          <h2 className="text-lg font-semibold">📄 Upload Note</h2>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setNoteFile(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded"
          />
          <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">
            Upload Note
          </button>
          {noteMessage && <p className="text-green-600">{noteMessage}</p>}
        </form>

        {/* Video Upload */}
        <form onSubmit={handleVideoUpload} className="space-y-4 border-t pt-4">
          <h2 className="text-lg font-semibold">📹 Upload Video</h2>
          <label className="block">Video File:</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded"
          />

          <label className="block">Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded"
          />

          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
            Upload Video
          </button>
          {videoMessage && <p className="text-green-600">{videoMessage}</p>}
        </form>

        <UploadQuestionForm />
      </div>
    </TutorLayout>
  );
}
