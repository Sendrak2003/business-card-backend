import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SkillModel {
  @Field()
  id!: string;

  @Field()
  name!: string;
}
