import { prisma } from '@/lib/prisma';

/**
 * Calculate GPA for a specific subject.
 * Includes mid score, final score, and subject-level GPA.
 */
export async function calculateSubjectGPA(studentId: number, subjectId: number) {
  const midAnswers = await prisma.studentAnswer.findMany({
    where: { studentId, subjectId, type: 'mid' },
  });

  const finalAnswers = await prisma.studentAnswer.findMany({
    where: { studentId, subjectId, type: 'final' },
  });

  const midCorrect = midAnswers.filter((a) => a.isCorrect).length;
  const finalCorrect = finalAnswers.filter((a) => a.isCorrect).length;

  const midScore = midAnswers.length
    ? Math.round((midCorrect / midAnswers.length) * 100)
    : 0;

  const finalScore = finalAnswers.length
    ? Math.round((finalCorrect / finalAnswers.length) * 100)
    : 0;

  const gpa =
    midAnswers.length && finalAnswers.length
      ? Math.round((midScore + finalScore) / 2)
      : null;

  return {
    subjectId,
    midScore,
    finalScore,
    gpa,
  };
}

/**
 * Calculate GPA for an entire course (avg of subject GPAs).
 * Returns course GPA and subject-level details.
 */
export async function calculateCourseGPA(studentId: number, courseId: number) {
  const subjects = await prisma.subject.findMany({
    where: { courseId },
  });

  const subjectScores = await Promise.all(
    subjects.map(async (s) => {
      const result = await calculateSubjectGPA(studentId, s.id);
      return {
        title: s.title,
        ...result,
      };
    })
  );

  const subjectGPAs = subjectScores
    .map((s) => s.gpa)
    .filter((gpa): gpa is number => gpa !== null);

  const courseGpa = subjectGPAs.length
    ? Math.round(subjectGPAs.reduce((a, b) => a + b, 0) / subjectGPAs.length)
    : null;

  return {
    courseGpa,
    subjectBreakdown: subjectScores,
  };
}
