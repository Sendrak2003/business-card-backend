import { Field, ObjectType } from '@nestjs/graphql';
import { LinkModel } from './link.model.js';
import { SkillModel } from './skill.model.js';
import { ExperienceModel } from './experience.model.js';
import { ProjectModel } from './project.model.js';

@ObjectType()
export class ProfileModel {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => [LinkModel])
  links!: LinkModel[];

  @Field(() => [SkillModel])
  skills!: SkillModel[];

  @Field(() => [ExperienceModel])
  experience!: ExperienceModel[];

  @Field(() => [ProjectModel])
  projects!: ProjectModel[];
}
