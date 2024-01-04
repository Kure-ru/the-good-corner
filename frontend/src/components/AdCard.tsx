import { AdCardProps } from "@/types/ads.type";

export const AdCard = ({
  id,
  title,
  picture,
  price = 0,
  setTotal,
  total = 0,
}: AdCardProps) => {
  return (
    <a className="ad-card-link" href={`/ad/${id}`}>
      <div className="ad-card-container">
        <div className="ad-card-image-container">
          <img className="ad-card-image" src={picture} alt={title} />
        </div>
        <div className="ad-card-text">
          <div>
            <div className="ad-card-title">{title}</div>
            <div className="ad-card-price">{price}€ </div>
          </div>
          <button
            className="button"
            onClick={() => {
              setTotal(total + price);
            }}
          >
            +
          </button>
        </div>
      </div>
    </a>
  );
};
