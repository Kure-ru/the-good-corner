import { useState, useEffect } from "react";
import { CategoryType } from "@/types/categories.type";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";

export const Category = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: AxiosResponse<CategoryType[]> = await axios.get<CategoryType[]>(
          "http://localhost:4000/category"
        );
        setCategories(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, []);

  return (
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
};
