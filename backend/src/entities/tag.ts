import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./ad";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("varchar", { length: 50 })
  name: string;

  @ManyToMany(() => Ad)
  @JoinTable()
  ads: Ad[];
}
