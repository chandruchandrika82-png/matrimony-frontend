import { useLanguage } from "../Language";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API, resolveMediaUrl } from "../config/api";
import "./ProfileDetails.css";
import { profilePhotos } from "../components/ProfilePhotos";
import { isConnected } from "../config/connections";

const groups = [
  ["Personal details", [["Age", "age"], ["Gender", "gender"], ["Marital status", "maritalStatus"], ["Height", "height"], ["Native place", "nativePlace"], ["Current city", "currentCity"], ["District", "district"], ["Mother tongue", "motherTongue"]]],
  ["Education and work", [["Education", "education"], ["Occupation", "occupationType"], ["Company", "companyName"], ["Job type", "jobType"], ["Job category", "jobCategory"], ["Job location", "jobLocation"], ["Experience (years)", "jobExperience"], ["Annual income", "annualIncome"], ["NRI", "nri"]]],
  ["Family", [["Family type", "familyType"], ["Family status", "familyStatus"], ["Father's occupation", "fatherOccupation"], ["Mother's occupation", "motherOccupation"], ["Brothers", "brothersCount"], ["Sisters", "sistersCount"]]],
  ["Religion and horoscope", [["Religion", "religion"], ["Community", "caste"], ["Sub community", "subCaste"], ["Rashi", "rashi"], ["Star", "star"], ["Dosham", "dosha"], ["Horoscope available", "horoscopeAvailable"]]],
  ["Partner preferences", [["Preferred age", "preferredAge"], ["Preferred education", "preferredEducation"], ["Preferred occupation", "preferredOccupation"], ["Preferred location", "preferredLocation"], ["Additional expectations", "expectations"]]],
];

function ProfileDetails() {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  useEffect(() => {
    if (currentUser?._id) axios.get(`${API}/users/${currentUser._id}`).then(response => setMyProfile(response.data)).catch(() => setMyProfile(null));
  }, [currentUser?._id]);

useEffect(() => {
  fetchProfile();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

const fetchProfile = async () => {
  try {
    const response = await axios.get(`${API}/users/${id}`);
    setProfile(response.data);
  } catch (err) {
    setProfile(false);
  }
};
  const removeProfile = async () => {
    if (!window.confirm("Delete this account permanently? This cannot be undone.")) return;
    try { await axios.delete(`${API}/users/${id}`); localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/"); }
    catch (error) { alert(error.response?.data?.error || "Unable to delete the profile"); }
  };

  if (profile === null) return <main className="profile-page"><div className="profile-loading">{t("Loading profile...")}</div></main>;
  if (!profile) return <main className="profile-page"><div className="profile-loading"><h1>{t("Profile not found")}</h1></div></main>;

  const owner = profile._id === currentUser?._id;
  const gallery = profilePhotos(profile, owner);
  const mainImage = gallery[0] || "https://placehold.co/640x720?text=Photo+private";
  const preferredAge = profile.preferredAgeFrom && profile.preferredAgeTo ? `${profile.preferredAgeFrom} to ${profile.preferredAgeTo} years` : "";
  const valueFor = (key) => { if (key === "preferredAge") return preferredAge; if (key === "companyName" && profile.hideCompany) return "Private"; if (key === "annualIncome" && profile.hideIncome) return "Private"; return profile[key]; };
  const connected = isConnected(myProfile, profile);
  const interested = profile.interestRequests?.some(
  (id) => id.toString() === currentUser?._id
);

const sendInterest = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `${API}/users/${profile._id}/interest/${currentUser._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    fetchProfile();
  } catch (err) {
    alert(err.response?.data?.error || "Unable to send interest");
  }
};

  return <main className="profile-page"><div className="profile-shell">
    <div className="profile-topbar">{owner && <div><button onClick={() => navigate(`/edit/${profile._id}`)}>{t("Edit profile")}</button><button className="delete-profile" onClick={removeProfile}>{t("Delete account")}</button></div>}</div>
    <section className="profile-intro"><img src={mainImage} alt={profile.name || t("Member profile")} /><div><p className="profile-kicker">{t("Namakkal Matrimony member")}</p><h1>{profile.name || t("Member")}</h1><p className="profile-summary">{[profile.age && `${profile.age} ${t("years")}`, profile.currentCity || profile.district || t("Tamil Nadu"), t(profile.maritalStatus)].filter(Boolean).join(" | ")}</p><div className="profile-tags">{profile.profileVisibility && <span>{profile.profileVisibility}</span>}{profile.isPremium && <span>{t("Premium")}</span>}{profile.businessVerified && <span>{t("Verified")}</span>}</div>{!owner && <p className="contact-note">{t("Contact information is shared only according to this member’s privacy settings.")}</p>}</div></section>
    <div className="detail-sections">{groups.map(([title, fields]) => <section className="detail-section" key={title}><h2>{t(title)}</h2><div className="detail-grid">{fields.map(([label, key]) => <div key={key}><span>{t(label)}</span><strong>{valueFor(key) || t("Not shared")}</strong></div>)}</div></section>)}</div>
    {gallery.length > 0 && <section className="detail-section"><h2>{t("Photos")}</h2><div className="profile-gallery">{gallery.map((photo, index) => <img key={photo} src={resolveMediaUrl(photo)} alt={`${profile.name || t("Member")} ${index + 1}`} />)}</div></section>}
{!owner && (
  <section className="contact-section">

    <div>
      <p className="profile-kicker">{t("Interested in this profile?")}</p>

      <h2>{profile.name}</h2>
      

      {!connected && <p>{t("Send an interest request. Once accepted, contact details can be shared.")}</p>}
         
      {connected ? <Link className="connected-chat" to={`/chat/${profile._id}`}>{t("Chat")}</Link> : <button
  className={interested ? "interest-active" : "interest-button"}
  onClick={sendInterest}
  disabled={interested}
>
  {interested ? t("❤️ Interest Sent") : t("💖 Send Interest")}
</button>}

      
    </div>

    <span>{profile.mobile || t("Not shared")}</span>

  </section>
)}  </div></main>;
}

export default ProfileDetails;
