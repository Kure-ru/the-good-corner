import axios from "axios";
import { useEffect, useState } from "react";
import { AdCardType } from "@/types/ads.type";
import { useRouter } from "next/router";
import AdForm from "@/components/AdForm";

interface UpdateAdProps {
  ad: AdCardType;
  handleSubmit: (e: React.FormEvent) => void;
}

const UpdateAd = () => {
  const [ad, setAd] = useState<AdCardType>();
  const [updatedAd, setUpdatedAd] = useState<AdCardType>();

  const router = useRouter();
  const { id } = router.query as { id: string};

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const result = await axios.get<AdCardType>(
            `http://localhost:4000/ad/${id}`
          );
          setAd(result.data);
        } catch (err) {
          console.log("error", err);
        }
      };
      fetchData();
    }
  }, [id]);

  function handleSubmit(e: React.FormEvent<Element>): void {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    axios
      .put<AdCardType>(`http://localhost:4000/ad/${id}`, formJson)
      .then((res) => setUpdatedAd(res.data));
    if (updatedAd) {
      console.log("redirect");
      router.push(`http://localhost:3000/ad/${updatedAd.id}`);
    }
  }
  if (ad) {
    return (
      <>
        <AdForm ad={ad} handleSubmit={handleSubmit} />
      </>
    );
  } else {
    return <div>Chargement...</div>;
  }
};

export default UpdateAd;
