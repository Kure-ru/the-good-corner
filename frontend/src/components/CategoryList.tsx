import { useState, useEffect } from "react";
import { CategoryType } from "@/types/categories.type";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";

type CategoryProps = {
  category: CategoryType;
};

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
