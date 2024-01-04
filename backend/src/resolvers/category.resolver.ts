import { Arg, Query, Resolver, Mutation, Authorized } from "type-graphql";
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

  @Authorized("ADMIN")
  @Mutation(() => Category)
  createCategory(@Arg("category") category: string): Promise<Category> {
    return CategoryService.create(category);
  }
}
