import "@/styles/components/ClinicCard.css";
import LikeIcon from "@/components/icons/LikeIcon";

interface Clinic {
  id: string;
  name: string;
  image: string;
  phone: string;
  address: string;
  color: string;
}

export function ClinicCard({
  id,
  name,
  phone,
  address,
  image,
  color,
}: Clinic) {
  return (
    <div
      key={id}
      className="clinic-card"
    >
      <div className={`clinic-card-image-container ${color}`}>
        <img
          src={image}
          alt={name}
          className="clinic-card-image"
        />
      </div>

      <div className="clinic-card-content">
        <div className="clinic-card-info">
          <h2 className="clinic-card-name">
            {name}
          </h2>

          <div className="clinic-card-phone-container">
            <div className="clinic-card-phone">
              {phone}
            </div>
          </div>

          <div className="clinic-card-address-container">
            <div className="clinic-card-address">{address}</div>
          </div>
        </div>

        <button className="clinic-card-button">
          Contactar
        </button>
      </div>
    </div>
  );
}
