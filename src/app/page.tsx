'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Button } from '@/components/ui/Button';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';

export default function HomePage() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <PageContainer>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0d1b2a] text-white  px-6">
  <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-10">
    
    {/* Left: Text & Buttons */}
    <div className="flex-1 flex flex-col items-center justify-center text-center " data-aos="fade-up">
      <h1 className="text-3xl md:text-5xl font-bold mt-4 md:mt-6">Top Tutor & Mentor</h1>
      <p className="mt-3 text-base md:text-lg max-w-2xl">We teach, you thrive</p>

      {/* Responsive Buttons */}
      <div className=" mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
        <Link href="/courses">
          <Button size="lg" variant="primary" className="w-full sm:w-auto">Browse Courses</Button>
        </Link>
        <Link href="/register">
          <Button size="lg" variant="secondary" className="w-full sm:w-auto">Register Now</Button>
        </Link>
      </div>
    </div>

    {/* Right: Hero Image */}
    <div className="flex-1 flex justify-center" data-aos="fade-left">
      <Image
        src="/hero.png"
        alt="Hero Image"
        width={250}
        height={250}
        className="w-full max-w-[300px] md:max-w-[350px] h-auto object-contain"
        priority
      />
    </div>

  </div>
</section>

      {/* Features */}
<section className="py-16 px-6 bg-[#f9f9f9]">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
    {[
      { title: 'Expert Tutors', desc: 'Learn from subject matter experts and passionate mentors.', icon: '🎓' },
      { title: 'GPA Tracking', desc: 'Submit exams and view your GPA instantly across subjects.', icon: '📈' },
      { title: 'Smart Practice', desc: '10 conceptual questions after each lesson to test understanding.', icon: '🧠' },
    ].map((f, idx) => (
      <div key={idx} data-aos="zoom-in" data-aos-delay={idx * 100}
        className="bg-white p-6 rounded-2xl shadow-md border-l-8 border-[#0d1b2a] transition">
        <div className="text-4xl mb-3">{f.icon}</div>
        <h3 className="font-semibold text-lg mb-1 text-[#0d1b2a]">{f.title}</h3>
        <p className="text-sm text-gray-600">{f.desc}</p>
      </div>
    ))}
  </div>
</section>

      {/* Mission */}
      <section className="py-16 px-6 bg-white text-center">
  <div className="max-w-3xl mx-auto bg-[#f9f9f9] rounded-2xl p-10 shadow-md border-l-8 border-[#0d1b2a]" data-aos="fade-up">
    <h2 className="text-3xl font-bold text-[#0d1b2a] mb-4">Our Mission</h2>
    <p className="text-gray-700 text-lg leading-relaxed">
      To help students access quality materials, personalized tutoring, and mentorship so they can achieve their dreams — and join the department or university they've always aimed for.
    </p>
  </div>
</section>


      {/* What We Do */}
      <section className="py-16 px-6 bg-[#f9f9f9]">
  <div className="max-w-5xl mx-auto" data-aos="fade-right">
    <h2 className="text-3xl font-bold text-[#0d1b2a] mb-10 text-center">What We Do</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { title: 'Tutoring Support', desc: 'Focused academic help to master difficult topics and improve performance.', icon: '📘' },
        { title: 'Personal Mentorship', desc: 'One-on-one guidance from experienced mentors — including senior students and graduates.', icon: '🤝' },
        { title: 'Study Materials', desc: 'Curated resources like entrance exam guides, past papers, and notes.', icon: '📚' },
        { title: 'Academic Advice', desc: 'Strategic guidance for smarter study plans and long-term success.', icon: '💡' },
      ].map((item, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-6 flex items-start gap-4 hover:shadow-md transition">
          <div className="text-3xl">{item.icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-[#0d1b2a]">{item.title}</h3>
            <p className="text-gray-700 text-sm mt-1">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Who We Help */}
     <section className="py-16 px-6 bg-white">
  <div className="max-w-3xl mx-auto text-center" data-aos="fade-left">
    <div className="text-4xl mb-4 text-[#0d1b2a]">🎓</div>
    <h2 className="text-3xl font-bold text-[#0d1b2a] mb-6">Who We Help</h2>
    <div className="bg-[#f9f9f9] rounded-xl shadow p-6 space-y-3 text-gray-700 text-base leading-relaxed">
      <p>• High school graduates preparing for university</p>
      <p>• Freshman students seeking extra academic support</p>
      <p>• Students aiming to enter top departments like medicine, engineering, law, computer science, and more</p>
    </div>
  </div>
</section>


      {/* Testimonials */}
      {/* <section className="py-16 px-6 bg-[#f9f9f9]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0d1b2a] mb-8">What Students Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Sara M.',
                quote: 'This platform helped me understand subjects I always struggled with. My GPA improved a lot!',
              },
              {
                name: 'Nahom T.',
                quote: 'The mentorship I received was incredibly motivating. I finally got into the engineering department I dreamed of.',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow" data-aos="fade-up" data-aos-delay={i * 100}>
                <p className="text-gray-800 italic mb-2">“{t.quote}”</p>
                <p className="text-sm font-semibold text-[#0d1b2a]">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-[#0d1b2a] mb-8 text-center">FAQs</h2>
          <div className="space-y-6">
            {[
              { q: 'Who can register?', a: 'Anyone interested in academic growth — especially high school grads and university freshmen.' },
              { q: 'Is there a cost?', a: 'Registration is free. Courses require payment.' },
              { q: 'How does GPA tracking work?', a: 'Submit mid/final exams. GPA is automatically calculated by subject and course.' },
              { q: 'How can I become a tutor or mentor?', a: 'Reach out through the contact page. We welcome passionate tutors and mentors.' },
            ].map((faq, idx) => (
              <details key={idx} className="bg-[#f9f9f9] rounded-lg border p-4 shadow">
                <summary className="font-semibold text-[#0d1b2a] cursor-pointer">{faq.q}</summary>
                <p className="mt-2 text-gray-700 text-sm">{faq.a}</p>
              </details>
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
