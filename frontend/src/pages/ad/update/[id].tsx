import axios from "axios";
import { useEffect, useState } from "react";
import { AdCardType } from "@/types/ads.type";
import { useRouter } from "next/router";
import AdForm from "@/components/AdForm";
import { useMutation } from "@apollo/client";
import { FormEvent } from "react";
import { gql, useLazyQuery } from "@apollo/client";

interface UpdateAdProps {
  ad: AdCardType;
  handleSubmit: (e: React.FormEvent) => void;
}

const GET_ONE_AD = gql`
  query Ad($getAdId: Float!) {
    getAd(id: $getAdId) {
      createdAt
      description
      id
      location
      owner
      picture
      price
      title
    }
  }
`;

const UPDATE_AD = gql`
  mutation Mutation($ad: UpdateAdInputType!, $categoryId: Float!) {
    updateAd(categoryId: $categoryId, ad: $ad) {
      id
      createdAt
      description
      owner
      location
      picture
      price
      title
    }
  }
`;

const UpdateAd = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [ad, setAd] = useState<AdCardType>();
  const [getAd, { loading, error }] = useLazyQuery(GET_ONE_AD, {
    variables: {
      getAdId: Number(id),
    },
    onCompleted: (data: { getAd: AdCardType }) => {
      setAd(data.getAd);
    },
  });

  const [updateAd] = useMutation(UPDATE_AD);

  useEffect(() => {
    if (id) {
      getAd();
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson.category);
    updateAd({
      variables: {
        ad: {
          id: parseFloat(id),
          title: formJson.title,
          price: parseInt(formJson.price as string),
          picture: formJson.picture,
          description: formJson.description,
          owner: formJson.owner,
          location: formJson.location,
        },
        categoryId: parseFloat(formJson.category as string),
      },
      onCompleted: () => {
        router.push("/");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  loading && <div>Chargement...</div>;
  return (
    <>
      <AdForm ad={ad} handleSubmit={handleSubmit} />
    </>
  );
};

export default UpdateAd;
