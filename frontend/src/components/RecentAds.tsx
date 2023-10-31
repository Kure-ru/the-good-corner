import { useState, useEffect } from "react";
import { AdCard } from "./AdCard";
import { AdCardProps, AdCardType } from "@/types/ads.type";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/RecentAds.module.css";
import axios from "axios";

export default function RecentAds() {
  const [total, setTotal] = useState<number>(0);
  const [ads, setAds] = useState<AdCardType[]>([]);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const startsWith = searchParams.get("startsWith");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query: string = "http://localhost:4000/ad";
        if (categoryId) {
          query += `?categoryId=${categoryId}`;
        }
        if (startsWith) {
          query += `${categoryId ? "&" : "?"}startsWith=${startsWith}`;
        }
        const result = await axios.get<AdCardType[]>(query);
        setAds(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [categoryId, startsWith]);

  if (!ads) {
    return <div>Chargement...</div>;
  } else {
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
                owner={ad.owner}
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
}
