import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '../../domain/profile.entity.js';
import { ProfileRepositoryPort } from './profile-repository.port.js';

@Injectable()
export class GetProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepositoryPort) {}

  async execute(): Promise<Profile> {
    const profile = await this.profileRepository.findProfile();

    if (!profile) {
      throw new NotFoundException('Profile is not seeded');
    }

    return profile;
  }
}
