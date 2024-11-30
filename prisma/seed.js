import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.vote.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  const userData = [
    { firstName: "Student", lastName: "One", email: "student1@example.com", matricNo: "20201234590", role: "STUDENT" },
    { firstName: "Chike", lastName: "Nwagbaoso", email: "student2@example.com", matricNo: "20201234561", role: "STUDENT" },
    { firstName: "Gabriel", lastName: "Moses", email: "student3@example.com", matricNo: "20201234564", role: "STUDENT" },
    { firstName: "Olaoluwa", lastName: "Ademola", email: "student4@example.com", matricNo: "20201234567", role: "STUDENT" },
    { firstName: "Aregbesola", lastName: "Olamide", email: "student5@example.com", matricNo: "20201234563", role: "STUDENT" },
    { firstName: "Chikadibia", lastName: "Onyenso", email: "student6@example.com", matricNo: "20171029922", role: "STUDENT" },
    { firstName: "Admin", lastName: "User", email: "admin@example.com", matricNo: "20200000000", role: "ADMIN" }
  ];

  // Use create instead of createMany for more reliable insertion
  for (const user of userData) {
    await prisma.user.create({ data: user });
  }

  console.log('Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;