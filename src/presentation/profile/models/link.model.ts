import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LinkModel {
  @Field()
  id!: string;

  @Field()
  label!: string;

  @Field()
  url!: string;
}
