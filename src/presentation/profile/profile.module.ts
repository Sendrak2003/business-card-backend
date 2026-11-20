import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';
import { GetProfileUseCase } from '../../application/profile/get-profile.use-case.js';
import { ProfileResolver } from './profile.resolver.js';

@Module({
  imports: [PrismaModule],
  providers: [GetProfileUseCase, ProfileResolver],
})
export class ProfileModule {}
