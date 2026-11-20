import { Query, Resolver } from '@nestjs/graphql';
import { GetProfileUseCase } from '../../application/profile/get-profile.use-case.js';
import { ProfileModel } from './models/profile.model.js';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly getProfile: GetProfileUseCase) {}

  @Query(() => ProfileModel)
  profile() {
    return this.getProfile.execute();
  }
}
