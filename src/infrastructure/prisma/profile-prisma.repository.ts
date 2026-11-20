import { Injectable } from '@nestjs/common';
import { Profile } from '../../domain/profile.entity.js';
import { ProfileRepositoryPort } from '../../application/profile/profile-repository.port.js';
import { PrismaService } from './prisma.service.js';

const PROFILE_INCLUDE = {
  links: true,
  skills: true,
  experience: true,
  projects: true,
} as const;

@Injectable()
export class ProfilePrismaRepository implements ProfileRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Single-profile app: one Prisma query fetches all related records.
   */
  async findProfile(): Promise<Profile | null> {
    const record = await this.prisma.profile.findFirst({
      include: PROFILE_INCLUDE,
      orderBy: { createdAt: 'asc' },
    });

    if (!record) {
      return null;
    }

    return {
      id: record.id,
      name: record.name,
      description: record.description,
      links: record.links.map((link) => ({
        id: link.id,
        label: link.label,
        url: link.url,
      })),
      skills: record.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
      })),
      experience: record.experience.map((experience) => ({
        id: experience.id,
        company: experience.company,
        position: experience.position,
        startDate: experience.startDate,
        endDate: experience.endDate,
        achievements: [...experience.achievements],
      })),
      projects: record.projects.map((project) => ({
        id: project.id,
        name: project.name,
        url: project.url,
      })),
    };
  }
}
