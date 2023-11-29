import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateAdInputType {
  @Field()
  id: number;

  @Field((type) => String, { nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  owner: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  createdAt: Date;
}
