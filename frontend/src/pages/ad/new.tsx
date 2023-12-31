import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import AdForm from "@/components/AdForm";
import { FormEvent } from "react";
import { useState } from "react";
import isAuth from "@/components/secure/isAuth";

const CREATE_AD = gql`
  mutation Mutation($ad: CreateAdInputType!) {
    createAd(ad: $ad) {
      location
      description
      picture
      price
      title
    }
  }
`;

const NewAd = () => {
  const router = useRouter();
  const [createAd] = useMutation(CREATE_AD);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    createAd({
      variables: {
        ad: {
          title: formJson.title,
          price: parseInt(formJson.price as string),
          picture: imageUrl,
          description: formJson.description,
          location: formJson.location,
          categoryId: parseInt(formJson.category as string),
        },
      },
      onCompleted: () => {
        router.push("/");
      },
    });
  };

  return (
    <>
      <AdForm
        handleSubmit={handleSubmit}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
    </>
  );
};

export default isAuth(NewAd);
