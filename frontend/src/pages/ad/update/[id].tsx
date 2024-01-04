import { useEffect, useState } from "react";
import { AdCardType } from "@/types/ads.type";
import { useRouter } from "next/router";
import AdForm from "@/components/AdForm";
import { useMutation } from "@apollo/client";
import { FormEvent } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_ONE_AD = gql`
  query Ad($getAdId: Float!) {
    getAd(id: $getAdId) {
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

const UPDATE_AD = gql`
  mutation Mutation($ad: UpdateAdInputType!, $categoryId: Float!) {
    updateAd(categoryId: $categoryId, ad: $ad) {
      id
      createdAt
      description
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
  const [imageUrl, setImageUrl] = useState<string>("");
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

    updateAd({
      variables: {
        ad: {
          id: parseFloat(id),
          title: formJson.title,
          price: parseInt(formJson.price as string),
          picture: imageUrl,
          description: formJson.description,
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
  error && <div>Une erreur est survenue</div>;
  return (
    <>
      <AdForm
        ad={ad}
        handleSubmit={handleSubmit}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
    </>
  );
};

export default UpdateAd;
