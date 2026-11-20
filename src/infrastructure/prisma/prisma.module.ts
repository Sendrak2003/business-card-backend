import { Module } from '@nestjs/common';
import { ProfileRepositoryPort } from '../../application/profile/profile-repository.port.js';
import { PrismaService } from './prisma.service.js';
import { ProfilePrismaRepository } from './profile-prisma.repository.js';

@Module({
  providers: [
    PrismaService,
    { provide: ProfileRepositoryPort, useClass: ProfilePrismaRepository },
  ],
  exports: [ProfileRepositoryPort],
})
export class PrismaModule {}
