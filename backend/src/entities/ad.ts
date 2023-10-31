import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Min, Length } from "className-validator";
import { Category } from "./category";
import { Tag } from "./tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  @Length(3, 100, {
    message: "Entre 3 et 100 caractères.",
  })
  title: string;

  @Column("text")
  description: string;

  @Column("varchar", { length: 100 })
  @Length(3, 100, {
    message: "Entre 3 et 100 caractères.",
  })
  owner: string;

  @Column("int")
  @Min(0)
  price: number;

  @Column("varchar")
  picture: string;

  @Column("varchar")
  location: string;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
  }

  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  @ManyToMany(() => Tag, {
    cascade: ["insert"],
  })
  @JoinTable()
  tags: Tag[];

  constructor(
    datas: {
      title: string;
      description: string;
      owner: string;
      price: number;
      picture: string;
      location: string;
    } | null = null
  ) {
    super();
    if (datas) {
      this.title = datas.title;
      this.description = datas.description;
      this.owner = datas.owner;
      this.price = datas.price;
      this.picture = datas.picture;
      this.location = datas.location;
      this.createdAt = new Date();
    }
  }
}
