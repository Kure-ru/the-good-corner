import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AdCardType } from "@/types/ads.type";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

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
      user {
        id
        username
        email
      }
    }
  }
`;

const DELETE_AD = gql`
  mutation deleteAd($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;

const GET_USER = gql`
  query Query {
    getUser {
      id
      role
    }
  }
`;

const AdDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [ad, setAd] = useState<AdCardType>();
  const [isUser, setIsUser] = useState<boolean>(false);

  const [getAd, { loading, error }] = useLazyQuery(GET_ONE_AD, {
    variables: {
      getAdId: Number(id),
    },
    onCompleted: (data: { getAd: AdCardType }) => {
      setAd(data.getAd);
      getUser();
    },
  });

  const [deleteAdRequest] = useMutation(DELETE_AD);

  const [getUser] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      if (data.getUser.id === ad?.user?.id || data.getUser.role === "ADMIN") {
        setIsUser(true);
        console.log("user is matching");
      }
    },
  });

  useEffect(() => {
    if (id) {
      getAd();
    }
  }, [id]);

  if (loading || !ad) return <p>Chargement...Veuillez patienter</p>;
  if (error) return <p>Erreur 🤯</p>;

  const handleDelete = async () => {
    if (ad) {
      deleteAdRequest({
        variables: {
          deleteAdId: ad.id,
        },
      });
      router.push("/");
    }
  };

  return (
    <main className="main-content">
      <h2 className="ad-details-title">{ad.title}</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img className="ad-details-image" src={ad.picture} />
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{ad.price} €</div>
          <div className="ad-details-description">{ad.description}</div>
          <hr className="separator" />
          <div className="ad-details-owner">
            Annoncée publiée par <b>{ad.user?.username}</b>{" "}
            {ad.createdAt &&
              format(new Date(ad.createdAt), "PPPP", { locale: fr })}
            .
          </div>
          <a
            href={`mailto:${ad.user?.email}`}
            className="button button-primary link-button"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              stroke="currentcolor"
              stroke-width="2.5"
              fill="none"
            >
              <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
            </svg>
            Envoyer un email
          </a>
          {isUser && (
            <>
              <button
                onClick={handleDelete}
                className="button button-primary link-button"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                  stroke="currentcolor"
                  strokeWidth="2.5"
                  fill="currentcolor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
                Supprimer l&apos;annonce
              </button>
              <Link
                href={`http://localhost:3030/ad/update/${id}`}
                className="button button-primary link-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  width="16"
                  height="16"
                  className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                  stroke="currentcolor"
                  stroke-width="2.5"
                  fill="currentcolor"
                  viewBox="0 0 512 512"
                >
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg>
                Modifier l&apos;annonce
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdDetail;
