import { useEffect, useRef } from "react";
import { FiX, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLanguage } from "../Language";
import ProfileDetails from "../pages/ProfileDetails";
import ProfilePhotos from "./ProfilePhotos";
import "./ProfilePreview.css";

export default function ProfilePreview({ profile, owner, onClose }) {
  const { t } = useLanguage();
  const dialog = useRef(null);
  const trigger = useRef(document.activeElement);
  useEffect(() => {
    const element = dialog.current;
    const returnFocus = trigger.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={dialog} className="profile-preview" aria-label={t("View profile")} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === dialog.current) onClose(); }}>
    <div className="profile-preview-panel">
      <header className="profile-preview-toolbar"><span>{t("Member profile")}</span><div>
        <Link to={`/profile/${profile._id}`} title={t("View profile")} aria-label={t("View profile")}><FiExternalLink /></Link>
        <button type="button" autoFocus onClick={onClose} title={t("Close")} aria-label={t("Close")}><FiX /></button>
      </div></header>
      <div className="profile-preview-scroll">
        <ProfilePhotos profile={profile} owner={owner} />
        <ProfileDetails key={profile._id} profileId={profile._id} />
      </div>
    </div>
  </dialog>;
}
