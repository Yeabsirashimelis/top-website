'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';

export default function ContactPage() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('✅ Message sent! We’ll get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`❌ ${error.message}`);
      } else {
        setStatus('❌ An unknown error occurred');
      }
    }
  };

  return (
    <PageContainer>
      <Navbar />

      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-[#0d1b2a] mb-6 text-center">Contact Us</h1>
          <p className="text-center text-gray-600 mb-10">
            Have a question, suggestion, or want to collaborate? We'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows={6}
              className="w-full border border-gray-300 p-3 rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-[#0d1b2a] text-white px-6 py-3 rounded hover:bg-[#1a2b3c] transition"
            >
              Send Message
            </button>
            {status && <p className="text-green-600 mt-2 text-sm">{status}</p>}
          </form>
        </div>
      </section>

      <footer className="bg-[#0d1b2a] text-white text-sm text-center py-6">
        &copy; {new Date().getFullYear()} Top Tutor & Mentor. All rights reserved.
      </footer>
    </PageContainer>
  );
}