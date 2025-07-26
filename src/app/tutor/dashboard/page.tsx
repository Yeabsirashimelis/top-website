// 'use client';

// import { useEffect, useState } from 'react';
// import UploadQuestionForm from '@/app/components/UploadQuestionForm';

// export default function TutorDashboard() {
//   const [subjects, setSubjects] = useState<{ id: number; title: string }[]>([]);
//   const [selectedSubject, setSelectedSubject] = useState('');

//   // Notes
//   const [noteFile, setNoteFile] = useState<File | null>(null);
//   const [noteMessage, setNoteMessage] = useState('');

//   // Video
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
//   const [videoMessage, setVideoMessage] = useState('');

//   // Questions
//   // const [questionType, setQuestionType] = useState('conceptual');
//   // const [questionContent, setQuestionContent] = useState('');
//   // const [questionMessage, setQuestionMessage] = useState('');

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       const res = await fetch('/api/tutor/subjects');
//       const data = await res.json();
//       setSubjects(data);
//     };
//     fetchSubjects();
//   }, []);

//   const handleNoteUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!noteFile || !selectedSubject) return alert('Select subject and file.');

//     const formData = new FormData();
//     formData.append('subjectId', selectedSubject);
//     formData.append('file', noteFile);

//     const res = await fetch('/api/tutor/upload-note', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await res.json();
//     setNoteMessage(data.message || 'Note uploaded');
//     setNoteFile(null);
//   };

//   const handleVideoUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!videoFile || !thumbnailFile || !selectedSubject)
//       return alert('Upload video, thumbnail, and select subject.');

//     const formData = new FormData();
//     formData.append('subjectId', selectedSubject);
//     formData.append('video', videoFile);
//     formData.append('thumbnail', thumbnailFile);

//     const res = await fetch('/api/tutor/upload-video', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await res.json();
//     setVideoMessage(data.message || 'Video uploaded');
//     setVideoFile(null);
//     setThumbnailFile(null);
//   };

//   // const handleQuestionUpload = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!questionContent || !selectedSubject) return alert('Write a question and select subject.');

//   //   const res = await fetch('/api/tutor/upload-question', {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({
//   //       subjectId: selectedSubject,
//   //       type: questionType,
//   //       content: questionContent,
//   //     }),
//   //   });

//   //   const data = await res.json();
//   //   setQuestionMessage(data.message || 'Question uploaded');
//   //   setQuestionContent('');
//   // };

//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-10">
//       <h1 className="text-2xl font-bold">Tutor Dashboard</h1>

//       {/* Subject Dropdown */}
//       <label className="block">
//         <span className="font-semibold">Subject:</span>
//         <select
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//           className="w-full border p-2 rounded mt-1"
//           required
//         >
//           <option value="">Select subject</option>
//           {subjects.map((subj) => (
//             <option key={subj.id} value={subj.id}>
//               {subj.title}
//             </option>
//           ))}
//         </select>
//       </label>

//       {/* Upload Note */}
//       <form onSubmit={handleNoteUpload} className="space-y-4 border-t pt-4">
//         <h2 className="text-lg font-semibold">📄 Upload Note</h2>
//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) => setNoteFile(e.target.files?.[0] || null)}
//           className="w-full border p-2 rounded"
//         />
//         <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">
//           Upload Note
//         </button>
//         {noteMessage && <p className="text-green-600">{noteMessage}</p>}
//       </form>

//       {/* Upload Video */}
//       <form onSubmit={handleVideoUpload} className="space-y-4 border-t pt-4">
//         <h2 className="text-lg font-semibold">📹 Upload Video</h2>
//         <label className="block">Video File (MP4 preferred):</label>
//         <input
//           type="file"
//           accept="video/*"
//           onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
//           className="w-full border p-2 rounded"
//         />

//         <label className="block">Thumbnail (image):</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
//           className="w-full border p-2 rounded"
//         />

//         <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
//           Upload Video
//         </button>
//         {videoMessage && <p className="text-green-600">{videoMessage}</p>}
//       </form>

//       {/* Upload Question */}
//       {/* <form onSubmit={handleQuestionUpload} className="space-y-4 border-t pt-4">
//         <h2 className="text-lg font-semibold">❓ Upload Question</h2>

//         <label className="block font-medium">Type:</label>
//         <select
//           value={questionType}
//           onChange={(e) => setQuestionType(e.target.value)}
//           className="w-full border p-2 rounded"
//         >
//           <option value="conceptual">Conceptual</option>
//           <option value="mid">Mid Exam</option>
//           <option value="final">Final Exam</option>
//         </select>

//         <textarea
//           placeholder="Enter question content..."
//           value={questionContent}
//           onChange={(e) => setQuestionContent(e.target.value)}
//           className="w-full border p-2 rounded min-h-[100px]"
//         />

//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//           Upload Question
//         </button>
//         {questionMessage && <p className="text-green-600">{questionMessage}</p>}
//       </form> */}

//       <UploadQuestionForm />
//     </div>
//   );
// }


// File: /tutor/dashboard/page.tsx
'use client';

import TutorLayout from '@/components/layout/TutorLayout';
import { useState } from 'react';


export default function CreateCoursePage() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const courseData = {
      title,
      image,
      price: parseInt(price),
      description,
    };

    try {
      const res = await fetch('/api/tutor/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!res.ok) throw new Error('Failed to create course');
      const data = await res.json();
      setSuccess('Course created successfully!');
      setError('');
      // Clear form fields
      setTitle('');
      setImage('');
      setPrice('');
      setDescription('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setSuccess('');
    }
  };

  return (
    <TutorLayout>
      <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Course
        </button>
      </form>
    </TutorLayout>
  );
}