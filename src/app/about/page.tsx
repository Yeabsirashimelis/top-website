'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <PageContainer>
      <Navbar />

      {/* Clean About Us Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0d1b2a] mb-6">About Us</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to <strong>Top Tutor and Mentor</strong>!<br /><br />
            We believe that every student deserves the right support, guidance, and tools to reach their full academic potential.
            Whether you're just starting your university journey or aiming for a competitive department, we're here to help you take the next step with confidence.
          </p>
        </div>
      </section>

      {/* Why We Started */}
      <section className="py-16 px-6 bg-[#f9f9f9]">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-left">
          <h2 className="text-3xl font-bold text-[#0d1b2a] mb-4">Why We Started</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Top Tutor and Mentor was founded by passionate students and educators who have been there.
            We've faced the struggles, felt the pressure, and made the journey — and now we want to make it easier for the next generation.
            <br /><br />
            We don’t just provide help — we walk with you as you move toward your goals.
          </p>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-6 bg-white">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-[#0d1b2a] mb-8">Our Team</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
      {[
        {
          name: 'Amanuel Sisay',
          role: 'Math, Physics, and Psychology tutor at Top Tutor and Mentor',
          description: '3rd-year Software Engineering student at HiLCoE. I’ve always enjoyed helping others grasp challenging concepts—especially those I once found difficult myself. My teaching style is straightforward and patient, focusing on clear explanations without any pressure. I’m still learning every day, and I truly believe that we learn best when we support one another.',
          linkedin: 'https://linkedin.com',
        },
        {
          name: 'Tsion Teklay',
          role: 'English tutor',
          description: 'Computer Science student at Addis Ababa University. I am passionate about helping students improve their language skills. My teaching approach is interactive and engaging, ensuring that learning is both effective and enjoyable.',
          linkedin: 'https://linkedin.com',
        },
      ].map((member, i) => (
        <div
          key={i}
          className="bg-[#f9f9f9] rounded-lg shadow p-5"
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          <h3 className="text-lg font-bold text-[#0d1b2a] mb-1">{member.name}</h3>
          <p className="text-sm text-gray-600 mb-2 italic">{member.role}</p>
          <p className="text-gray-700 text-sm mb-3">{member.description}</p>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 text-sm hover:underline inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-1"
            >
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.4h.1c.5-.9 1.6-1.9 3.3-1.9 3.5 0 4.1 2.3 4.1 5.3V24h-4v-8.4c0-2-.1-4.6-2.8-4.6s-3.2 2.2-3.2 4.5V24h-4V8z" />
            </svg>
            LinkedIn
          </a>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-[#0d1b2a] text-white text-sm text-center py-6">
        &copy; {new Date().getFullYear()} Top Tutor & Mentor. All rights reserved.
      </footer>
    </PageContainer>
  );
}
