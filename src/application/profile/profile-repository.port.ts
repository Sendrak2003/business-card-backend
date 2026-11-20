import { Profile } from '../../domain/profile.entity.js';

// The application layer depends on this abstraction, not on Prisma.
export abstract class ProfileRepositoryPort {
  abstract findProfile(): Promise<Profile | null>;
}
