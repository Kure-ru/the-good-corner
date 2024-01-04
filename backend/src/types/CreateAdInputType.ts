import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAdInputType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  picture: string;

  @Field()
  location: string;

  @Field()
  categoryId: number;
}
