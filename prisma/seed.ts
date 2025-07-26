import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin
  await prisma.user.create({
    data: {
      fullName: 'Admin User',
      email: 'admin@topmentor.com',
      password: hashedPassword,
      role: 'admin',
      referralCode: nanoid(8),
    },
  });

  // Create Tutor
  const tutor = await prisma.user.create({
    data: {
      fullName: 'John Tutor',
      email: 'tutor@topmentor.com',
      password: hashedPassword,
      role: 'tutor',
      referralCode: nanoid(8),
    },
  });

  // Create Ambassador
  await prisma.user.create({
    data: {
      fullName: 'Amy Ambassador',
      email: 'ambassador@topmentor.com',
      password: hashedPassword,
      role: 'ambassador',
      referralCode: nanoid(8),
    },
  });

  // Create Courses
  await prisma.course.createMany({
    data: [
      {
        title: 'Introduction to Math',
        description: 'A foundational course in university-level math.',
        image: 'https://via.placeholder.com/300x200?text=Math',
        price: 150,
      },
      {
        title: 'Academic English',
        description: 'Improve your academic writing and grammar.',
        image: 'https://via.placeholder.com/300x200?text=English',
        price: 120,
      },
    ],
  });

  console.log('Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
