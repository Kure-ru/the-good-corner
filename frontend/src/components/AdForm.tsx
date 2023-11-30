import { CategoryType } from "@/types/categories.type";
import React, { useEffect, useState } from "react";
import styles from "@/styles/new.module.css";
import { AdCardType } from "@/types/ads.type";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";

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
  imageUrl?: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

const AdForm: React.FC<AdFormProps> = ({
  handleSubmit,
  ad,
  imageUrl,
  setImageUrl,
}) => {
  const [currentAd, setCurrentAd] = useState<AdCardType | null>(null);
  const [file, setFile] = useState<File>();
  const { data } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    if (ad) {
      setCurrentAd(ad);
    }
  }, [ad]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    if (file) {
      const url = "http://localhost:8000/upload";
      const formData = new FormData();
      formData.append("file", file, file.name);
      try {
        const res = await axios.post(url, formData);
        if (res.data.filename && setImageUrl) {
          setImageUrl(res.data.filename);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

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
            type="file"
            name="picture"
            required
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
          />
          <button type="button" onClick={handleClick}>
            Télécharger l`&apos;image
          </button>
          {imageUrl && <img width="150" alt="uploaded image" src={imageUrl} />}
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
