import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiUser } from "react-icons/fi";
import { resolveMediaUrl } from "../config/api";
import { useLanguage } from "../Language";

export function profilePhotos(profile, owner = false) {
  if (profile.hidePhotos && !owner) return [];
  return [...new Set([profile.image, ...(profile.profilePhotos || []), ...(profile.familyPhotos || []), ...(profile.officePhotos || [])].map(resolveMediaUrl).filter(Boolean))];
}

export default function ProfilePhotos({ profile, owner = false, label }) {
  const { t } = useLanguage();
  const photos = profilePhotos(profile, owner);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState([]);
  const current = photos[index % (photos.length || 1)];
  function move(step) { setIndex((value) => (value + step + photos.length) % photos.length); }
  return <div className="profile-card-gallery">
    <Link to={`/profile/${profile._id}`} className="card-image-link">
      {current && !failed.includes(current) ? <img src={current} alt={profile.name || t("Member profile")} loading="lazy" onError={() => setFailed((values) => [...values, current])} /> : <div className="photo-placeholder"><FiUser /><span>{t("No photo")}</span></div>}
      <span>{label || t(owner ? "My profile" : "Member profile")}</span>
    </Link>
    {photos.length > 1 && <div className="photo-navigation"><button type="button" title={t("Previous photo")} aria-label={t("Previous photo")} onClick={() => move(-1)}><FiChevronLeft /></button><span aria-live="polite">{index % photos.length + 1} / {photos.length}</span><button type="button" title={t("Next photo")} aria-label={t("Next photo")} onClick={() => move(1)}><FiChevronRight /></button></div>}
  </div>;
}
