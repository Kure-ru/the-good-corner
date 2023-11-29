import { Arg, Query, Resolver } from "type-graphql";
import { Category } from "../entities/category";
import * as CategoryService from "../services/category.service";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(
    @Arg("search", { nullable: true }) search: string
  ): Promise<Category[]> {
    return CategoryService.getCategories(search);
  }

  @Query(() => Category)
  getCategory(@Arg("id") id: number): Promise<Category | null> {
    return CategoryService.findCategoryById(id);
  }
}
