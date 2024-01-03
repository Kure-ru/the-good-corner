import { IsEmail, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsEmail()
  email: string;

  @Field()
  @Column()
  @MinLength(8)
  password: string;

  @Field()
  @Column()
  role: string;
}
