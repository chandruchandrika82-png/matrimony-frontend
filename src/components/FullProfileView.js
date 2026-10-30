import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiBookOpen, FiUsers, FiCompass, FiHeart, FiImage, FiMapPin, FiBriefcase, FiEdit2, FiChevronLeft, FiChevronRight, FiMessageCircle, FiSend, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { useLanguage } from "../Language";
import { resolveMediaUrl } from "../config/api";
import "./FullProfileView.css";

const icons = [FiUser, FiBookOpen, FiUsers, FiCompass, FiHeart];
export default function FullProfileView({ profile, owner, gallery, groups, valueFor, connected, interested, sendInterest, removeProfile, favorite, saveFavorite, savingFavorite }) {
  const { t } = useLanguage();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("member-overview");
  const [failedPhotos, setFailedPhotos] = useState([]);
  const photo = gallery[photoIndex % (gallery.length || 1)];
  const location = [profile.currentCity || profile.district, profile.state].filter(Boolean).join(", ");
  const navigation = [["member-overview", "Overview", FiUser], ...groups.map(([title], index) => [`member-details-${index}`, title, icons[index]]), ["member-photos", "Photos", FiImage]];
  function changePhoto(index) { setPhotoIndex((index + gallery.length) % gallery.length); }
  function openPhoto(index) { changePhoto(index); document.getElementById("member-overview")?.scrollIntoView({ behavior: "smooth" }); }
  return <main className="profile-page full-member-page"><div className="profile-shell">
    <header className="member-profile-hero" id="member-overview">
      <div className="member-photo-area">
        <div className="member-main-photo">{photo && !failedPhotos.includes(photo) ? <img src={resolveMediaUrl(photo)} alt={profile.name || t("Member profile")} onError={() => setFailedPhotos(items => [...items, photo])} /> : <div className="member-photo-empty"><FiUser /><span>{t("No photo")}</span></div>}
          {gallery.length > 1 && <div className="member-gallery-controls"><button aria-label={t("Previous photo")} title={t("Previous photo")} onClick={() => changePhoto(photoIndex - 1)}><FiChevronLeft /></button><span aria-live="polite">{photoIndex + 1} / {gallery.length}</span><button aria-label={t("Next photo")} title={t("Next photo")} onClick={() => changePhoto(photoIndex + 1)}><FiChevronRight /></button></div>}
        </div>
      </div>
      <div className="member-summary profile-intro">
        <p className="member-label">{t("New Varan Kongu Thirumana Matrimony member")}{profile.businessVerified && <FiCheckCircle aria-label={t("Verified")} />}</p>
        <h1>{profile.name || t("Member")}</h1>
        <p className="member-demographics">{[profile.age && `${profile.age} ${t("years")}`, profile.religion && t(profile.religion), profile.maritalStatus && t(profile.maritalStatus)].filter(Boolean).join("  |  ") || t("Not shared")}</p>
        <p className="member-location"><FiMapPin aria-hidden="true" /><span>{location || t("Not shared")}</span></p>
        <p className="member-id">{t("Profile ID")}: <span>{profile._id}</span></p>
        {profile.expectations && <blockquote>{profile.expectations}</blockquote>}
        <dl className="member-summary-facts">{[["Occupation", profile.occupationType, FiBriefcase], ["Education", profile.education, FiBookOpen], ["Height", profile.height, FiUser]].map(([label, value, Icon]) => <div key={label}><Icon aria-hidden="true" /><div><dd>{value ? t(String(value)) : t("Not shared")}</dd><dt>{t(label)}</dt></div></div>)}</dl>
        {gallery.length > 1 && <div className="member-thumbnails">{gallery.slice(0, 4).map((url, index) => <button key={url} onClick={() => changePhoto(index)} aria-label={`${t("Photos")} ${index + 1}`} aria-pressed={photoIndex === index}><img src={resolveMediaUrl(url)} alt="" />{index === 3 && gallery.length > 4 && <span>+{gallery.length - 4}</span>}</button>)}</div>}
      </div>
      <div className="member-profile-actions">{owner ? <>
        <Link className="member-action-primary" to={`/edit/${profile._id}`}><FiEdit2 />{t("Edit profile")}</Link>
        <button className="member-delete-action" onClick={removeProfile}><FiTrash2 />{t("Delete account")}</button>
      </> : <>
        {connected ? <Link className="member-action-primary" to={`/chat/${profile._id}`}><FiMessageCircle />{t("Chat")}</Link> : <button className="member-action-primary" onClick={sendInterest} disabled={interested}><FiSend />{t(interested ? "Interest sent" : "Send interest")}</button>}
        <button onClick={saveFavorite} disabled={savingFavorite} aria-pressed={favorite}><FiHeart />{t(favorite ? "Remove from favorites" : "Save Profile")}</button>
      </>}</div>
    </header>
    <div className="member-details-layout">
      <nav className="member-section-navigation" aria-label={t("Member profile")}>{navigation.map(([id, label, Icon]) => <a key={id} href={`#${id}`} onClick={() => setActiveSection(id)} aria-current={activeSection === id ? "location" : undefined}><Icon aria-hidden="true" /><span>{t(label)}</span></a>)}</nav>
      <div className="member-details-content">
        {groups.map(([title, fields], index) => { const Icon = icons[index]; return <section className="member-detail-band" id={`member-details-${index}`} key={title}>
          <header><h2><Icon aria-hidden="true" />{t(title)}</h2>{owner && <Link to={`/edit/${profile._id}`} aria-label={`${t("Edit profile")}: ${t(title)}`}><FiEdit2 />{t("Edit")}</Link>}</header>
          <dl>{fields.map(([label, key]) => <div key={key}><dt>{t(label)}</dt><dd>{valueFor(key) || t("Not shared")}</dd></div>)}</dl>
        </section>; })}
        <section className="member-detail-band" id="member-photos"><header><h2><FiImage aria-hidden="true" />{t("Photos")} <span className="member-photo-count">{gallery.length}</span></h2></header>
          {gallery.length ? <div className="member-all-photos">{gallery.map((url, index) => <button key={url} onClick={() => openPhoto(index)} aria-label={`${t("Photos")} ${index + 1}`}><img src={resolveMediaUrl(url)} alt={`${profile.name || t("Member")} ${index + 1}`} loading="lazy" /></button>)}</div> : <p className="member-no-photos">{t("No photo")}</p>}
        </section>
      </div>
    </div>
  </div></main>;
}
