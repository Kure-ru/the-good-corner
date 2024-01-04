import { Like } from "typeorm";
import { Category } from "../entities/category";

export function getCategories(startsWith: string = ""): Promise<Category[]> {
  if (startsWith) {
    return Category.find({
      where: {
        title: Like(`%${startsWith}%`),
      },
    });
  } else {
    return Category.find();
  }
}

export function findCategoryById(id: number): Promise<Category | null> {
  return Category.findOne({
    relations: {
      ads: true,
    },
    where: { id: id },
  });
}

export async function create(categoryTitle: string): Promise<Category> {
  const category = new Category();
  category.title = categoryTitle;
  return category.save();
}
