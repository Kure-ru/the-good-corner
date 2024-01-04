import { IsEmail, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./ad";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

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

  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];

  @ManyToOne(() => Ad, (ad) => ad.user)
  user: User;
}
