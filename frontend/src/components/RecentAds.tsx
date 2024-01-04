import { useState } from "react";
import { AdCard } from "./AdCard";
import { AdCardType } from "@/types/ads.type";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/RecentAds.module.css";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_ADS = gql`
  query Ad($categoryId: Float, $search: String) {
    ads(categoryId: $categoryId, search: $search) {
      createdAt
      description
      id
      location
      picture
      price
      title
    }
  }
`;

export default function RecentAds() {
  const [total, setTotal] = useState<number>(0);
  const [ads, setAds] = useState<AdCardType[]>([]);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const terms = searchParams.get("terms");

  const { loading, error } = useQuery(GET_ALL_ADS, {
    variables: {
      categoryId: categoryId !== "" ? parseInt(categoryId as string) : null,
      terms: terms !== "" ? terms : null,
    },
    onCompleted: (data) => {
      setAds(data.ads);
    },
  });

  loading && <p>Chargement...Veuillez patienter</p>;
  error && <p>Erreur 🤯</p>;
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Total du panier : {total} €</p>
      <section className={styles["recent-ads"]}>
        {ads.map((ad) => (
          <div key={ad.title}>
            <AdCard
              id={ad.id}
              picture={ad.picture}
              location={ad.location}
              price={ad.price}
              category={ad.category}
              title={ad.title}
              description={ad.description}
              createdAt={ad.createdAt}
              setTotal={setTotal}
              total={total}
            />
          </div>
        ))}
      </section>
    </>
  );
}
