import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Min, Length } from "class-validator";
import { Category } from "./category";
import { Tag } from "./tag";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("varchar", { length: 100 })
  @Length(3, 100, {
    message: "Entre 3 et 100 caractères.",
  })
  title?: string;

  @Field()
  @Column("text")
  description?: string;

  @Field()
  @Column("int")
  @Min(0)
  price?: number;

  @Field()
  @Column("varchar")
  picture?: string;

  @Field()
  @Column("varchar")
  location?: string;

  @Field()
  @Column()
  createdAt?: Date;

  @ManyToOne(() => Category, (category) => category.ads)
  category?: Category;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ads)
  @JoinTable()
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  constructor(
    datas: {
      title: string;
      description: string;
      price: number;
      picture: string;
      location: string;
    } | null = null
  ) {
    super();
    if (datas) {
      this.title = datas.title;
      this.description = datas.description;
      this.price = datas.price;
      this.picture = datas.picture;
      this.location = datas.location;
      this.createdAt = new Date();
    }
  }
}
