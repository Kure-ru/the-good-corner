import { gql, useQuery } from "@apollo/client";
import { AdCard } from "@/components/AdCard";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { AdCardType } from "@/types/ads.type";
import styles from "@/styles/RecentAds.module.css";

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

const Search = () => {
  const [ads, setAds] = useState<AdCardType[]>([]);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const terms = searchParams.get("terms");

  const { loading, error, data } = useQuery(GET_ALL_ADS, {
    variables: {
      search: terms,
    },
    onCompleted: (data) => {
      setAds(data.ads);
    },
  });

  useEffect(() => {
    if (data && data.ads) {
      setAds(data.ads);
    }
  }, [data]);

  loading && <p>Chargement...Veuillez patienter</p>;
  error && <p>Erreur 🤯</p>;
  return (
    <>
      <h2>Recherche: {}</h2>
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
              total={0}
              setTotal={null}
            />
          </div>
        ))}
      </section>
    </>
  );
};

export default Search;
