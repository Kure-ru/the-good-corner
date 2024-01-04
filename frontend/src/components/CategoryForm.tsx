import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const ADD_CATEGORY = gql`
  mutation Mutation($category: String!) {
    createCategory(category: $category) {
      title
    }
  }
`;

export const CategoryForm = () => {
  const [category, setCategory] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCategory();
    setCategory("");
  };

  const [addCategory] = useMutation(ADD_CATEGORY, {
    variables: {
      category,
    },
  });

  return (
    <div>
      <h2>Ajouter une catégorie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Nouvelle catégorie</label>
        <input
          type="text"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};
