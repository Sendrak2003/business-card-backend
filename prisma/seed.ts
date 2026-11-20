import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/infrastructure/prisma/generated/client.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const existing = await prisma.profile.findFirst();
  if (existing) {
    console.log('Profile already seeded, skipping.');
    return;
  }

  await prisma.profile.create({
    data: {
      name: 'Mikhail Gusev',
      description:
        'Senior C#/.NET backend-разработчик с опытом 6+ лет: проектирование архитектуры, высоконагруженные сервисы, финтех. Ежедневно использую AI-ассистентов (Claude Code) в разработке.',
      links: {
        create: [{ label: 'GitHub', url: 'https://github.com/Sendrak2003' }],
      },
      skills: {
        create: [
          { name: 'C#/.NET' },
          { name: 'TypeScript' },
          { name: 'NestJS' },
          { name: 'PostgreSQL' },
          { name: 'Docker' },
          { name: 'GraphQL' },
          { name: 'Claude Code / AI-assisted development' },
        ],
      },
      experience: {
        create: [
          {
            company: 'Confidential fintech project (crypto payments)',
            position: 'Fullstack .NET Developer (contract)',
            startDate: new Date('2024-03-01'),
            endDate: new Date('2025-08-31'),
            achievements: [
              'Built ASP.NET Core backend with crypto acquiring integration, raised transaction success rate to 99.5%',
            ],
          },
        ],
      },
      projects: {
        create: [
          {
            name: 'ClaudeTelegramAgent',
            url: 'https://github.com/Sendrak2003/ClaudeTelegramAgent',
          },
        ],
      },
    },
  });

  console.log('Seed completed.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
