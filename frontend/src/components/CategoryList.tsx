import { CategoryType } from "@/types/categories.type";
import Link from "next/link";

export const CategoryList = ({
  categories,
}: {
  categories: CategoryType[];
}) => (
  <>
    {categories.map((category) => (
      <Link
        key={category.id}
        href={`/?categoryId=${category.id}`}
        className="category-navigation-link"
      >
        {category.title}
      </Link>
    ))}
  </>
);
