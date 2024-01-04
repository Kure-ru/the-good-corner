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

        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <input
            className={`text-field ${styles["form-input"]}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </div>

        <button className={`button ${styles["confirm-button"]}`}>
          Confirmer
        </button>
      </form>
    </section>
  );
};

export default AdForm;
