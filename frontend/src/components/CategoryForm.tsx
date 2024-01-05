import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const ADD_CATEGORY = gql`
  mutation Mutation($category: String!) {
    createCategory(category: $category) {
      title
    }
  }
`;

const GET_USER = gql`
  query Query {
    getUser {
      role
    }
  }
`;

export const CategoryForm = () => {
  const [category, setCategory] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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

  const [getRole] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      if (data.getUser.role === "ADMIN") {
        setIsAdmin(true);
      }
    },
  });

  useEffect(() => {
    getRole();
  }, []);

  if (isAdmin) {
    return (
      <div>
        <h2>Ajouter une catégorie</h2>
        <form className="category-form" onSubmit={handleSubmit}>
          <label htmlFor="category">Nouvelle catégorie</label>
          <input
            minLength={3}
            className="text-field"
            type="text"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <button className="button" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    );
  }
};
