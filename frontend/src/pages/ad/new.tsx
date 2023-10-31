import axios from "axios";
import { CategoryType } from "@/types/categories.type";
import { useEffect, useState } from "react";
import styles from "@/styles/new.module.css";
import { AdCardType } from "@/types/ads.type";
import { useRouter } from "next/router";
import AdForm from "@/components/AdForm";

const NewAd = () => {
  const [newAd, setNewAd] = useState<AdCardType>();

  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    axios
      .post("http://localhost:4000/ad", formJson)
      .then((res) => setNewAd(res.data));
    if (newAd) {
      console.log("redirect");
      router.push(`http://localhost:3000/ad/${newAd.id}`);
    }
  }

  return (
    <>
      <AdForm handleSubmit={handleSubmit} />
    </>
  );
};

export default NewAd;
