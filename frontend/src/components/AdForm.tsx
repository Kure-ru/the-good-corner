import { CategoryType } from "@/types/categories.type";
import React, { useEffect, useState } from "react";
import styles from "@/styles/new.module.css";
import { AdCardType } from "@/types/ads.type";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_CATEGORIES = gql`
  query Categories {
    categories {
      id
      title
    }
  }
`;

interface AdFormProps {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  ad?: AdCardType | null;
}

const AdForm: React.FC<AdFormProps> = ({ handleSubmit, ad }) => {
  const [currentAd, setCurrentAd] = useState<AdCardType | null>(null);
  const { data } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    if (ad) {
      setCurrentAd(ad);
    }
  }, [ad]);

  return (
    <section className={styles["form-container"]}>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <label>
          Titre de l&apos;annonce: <br />
          <input
            name="title"
            className={`text-field ${styles["form-input"]}`}
            required
            value={currentAd?.title}
            onChange={(e) =>
              setCurrentAd({ ...currentAd, title: e.target.value })
            }
          />
        </label>

        <label>
          Description : <br />
          <input
            name="description"
            className={`text-field ${styles["form-input"]}`}
            required
            value={currentAd?.description}
            onChange={(e) =>
              setCurrentAd({ ...currentAd, description: e.target.value })
            }
          />
        </label>

        <label>
          Nom d&apos;utilisateur : <br />
          <input
            name="owner"
            className={`text-field ${styles["form-input"]}`}
            required
            value={currentAd?.owner}
            onChange={(e) =>
              setCurrentAd({ ...currentAd, owner: e.target.value })
            }
          />
        </label>

        <label>
          Photo : <br />
          <input
            name="picture"
            className={`text-field ${styles["form-input"]}`}
            required
            value={currentAd?.picture}
            onChange={(e) =>
              setCurrentAd({ ...currentAd, picture: e.target.value })
            }
          />
        </label>

        <label>
          Ville : <br />
          <input
            name="location"
            className={`text-field ${styles["form-input"]}`}
            required
            value={currentAd?.location}
            onChange={(e) =>
              setCurrentAd({ ...currentAd, location: e.target.value })
            }
          />
        </label>

        <label>
          Prix : <br />
          <input
            name="price"
            className={`text-field ${styles["form-input"]}`}
            required
            value={currentAd?.price}
            onChange={(e) =>
              setCurrentAd({ ...currentAd, price: parseInt(e.target.value) })
            }
          />
        </label>
        <label>Catégorie :</label>
        <select
          className={`text-field ${styles["form-input"]}`}
          name="category"
          value={currentAd?.category}
          onChange={(e) =>
            setCurrentAd({ ...currentAd, category: e.target.value })
          }
        >
          {data?.categories.map((category: CategoryType) => (
            <option value={category.id} key={category.id}>
              {category.title}
            </option>
          ))}
        </select>

        <button className={`button ${styles["confirm-button"]}`}>
          Confirmer
        </button>
      </form>
    </section>
  );
};

export default AdForm;
