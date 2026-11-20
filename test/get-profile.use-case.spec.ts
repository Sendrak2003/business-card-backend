import { describe, expect, it, vi } from 'vitest';
import { GetProfileUseCase } from '../src/application/profile/get-profile.use-case.js';
import { ProfileRepositoryPort } from '../src/application/profile/profile-repository.port.js';

describe('GetProfileUseCase', () => {
  it('returns the profile from the repository', async () => {
    const profile = {
      id: 'profile-1',
      name: 'Ada Lovelace',
      description: 'Engineer',
      links: [],
      skills: [],
      experience: [],
      projects: [],
    };
    const repository = {
      findProfile: vi.fn().mockResolvedValue(profile),
    } satisfies ProfileRepositoryPort;
    const useCase = new GetProfileUseCase(repository);

    await expect(useCase.execute()).resolves.toEqual(profile);
  });

  it('returns null when no profile exists', async () => {
    const repository = {
      findProfile: vi.fn().mockResolvedValue(null),
    } satisfies ProfileRepositoryPort;
    const useCase = new GetProfileUseCase(repository);

    await expect(useCase.execute()).resolves.toBeNull();
  });
});
