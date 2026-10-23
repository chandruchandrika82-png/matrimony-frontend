import { useLanguage } from "../Language";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiBookmark, FiMapPin, FiBookOpen, FiBriefcase, FiEye, FiMessageCircle, FiTrash2, FiArrowRight } from "react-icons/fi";
import { API } from "../config/api";
import ProfilePhotos from "../components/ProfilePhotos";
import "./Profiles.css";

export default function SavedProfiles() {
  const { t } = useLanguage();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const userId = currentUser?._id;
  const token = localStorage.getItem("token");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [removing, setRemoving] = useState(null);

  const loadFavorites = useCallback(async () => {
    setLoading(true); setError(""); setNeedsSignIn(false);
    if (!userId || !token) {
      setError("Please sign in again to load your saved profiles."); setNeedsSignIn(true); setLoading(false); return;
    }
    try {
      const response = await axios.get(`${API}/users/${userId}/favorites`, { timeout: 20000, headers: { Authorization: `Bearer ${token}` } });
      if (!Array.isArray(response.data)) { setError("The server returned an invalid saved-profile response. Please try again."); return; }
      setFavorites(response.data.filter(profile => profile && profile._id));
    } catch (err) {
      const status = err.response?.status;
      if ([401, 403].includes(status)) {
        setError("Your saved-profile session is no longer valid. Please sign in again."); setNeedsSignIn(true);
      } else if (status === 404) {
        setError("This account could not be found. Please sign in again."); setNeedsSignIn(true);
      } else setError(!err.response ? "Cannot reach the server. Please check your connection and try again." : "Unable to load saved profiles. Please try again.");
    } finally { setLoading(false); }
  }, [userId, token]);
  useEffect(() => { loadFavorites(); }, [loadFavorites]);

  async function removeFavorite(id) {
    setRemoving(id); setError("");
    try {
      await axios.put(`${API}/users/${userId}/favorite/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setFavorites(profiles => profiles.filter(profile => profile._id !== id));
    } catch { setError("Unable to remove favorite"); }
    finally { setRemoving(null); }
  }

  return <main className="directory-page saved-page"><div className="directory-shell">
    <header className="directory-header saved-heading"><div><p className="saved-eyebrow"><FiBookmark aria-hidden="true" />{t("Saved profiles")}{!loading && <span>{favorites.length}</span>}</p><h1>{t("Saved Profiles")}</h1><p>{t("Your favourite Namakkal Matrimony matches.")}</p></div><Link className="saved-browse" to="/profiles">{t("Browse profiles")}<FiArrowRight aria-hidden="true" /></Link></header>
    {error && <div className="saved-error" role="alert"><span>{t(error)}</span>{needsSignIn ? <Link className="saved-browse" to="/login" state={{ from: { pathname: '/saved' } }}>{t("Sign in")}</Link> : <button onClick={loadFavorites} disabled={loading || Boolean(removing)}>{t("Try again")}</button>}</div>}
    {loading ? <div className="directory-status" role="status">{t("Loading...")}</div> : favorites.length ? <div className="profile-grid saved-grid">
      {favorites.map(profile => <article key={profile._id} className="directory-card saved-card" aria-label={profile.name}>
        <ProfilePhotos profile={profile} owner={profile._id === userId} />
        <div className="directory-card-body saved-card-body"><h2>{profile.name || t("Member")}</h2><p className="saved-demographics">{[profile.age && `${profile.age} ${t("years")}`, profile.gender && t(profile.gender)].filter(Boolean).join(" / ") || t("Not shared")}</p>
          <dl className="saved-facts"><div><dt title={t("Location")}><FiMapPin aria-hidden="true" /><span className="saved-sr-only">{t("Location")}</span></dt><dd>{profile.currentCity || profile.district || t("Not shared")}</dd></div><div><dt title={t("Education")}><FiBookOpen aria-hidden="true" /><span className="saved-sr-only">{t("Education")}</span></dt><dd>{profile.education || t("Not shared")}</dd></div><div><dt title={t("Occupation")}><FiBriefcase aria-hidden="true" /><span className="saved-sr-only">{t("Occupation")}</span></dt><dd>{t(profile.occupationType) || t("Not shared")}</dd></div></dl>
          <div className="card-actions saved-actions"><Link to={`/profile/${profile._id}`}><FiEye aria-hidden="true" />{t("View Profile")}</Link>{profile._id !== userId && <Link className="connected-chat" to={`/chat/${profile._id}`}><FiMessageCircle aria-hidden="true" />{t("Chat")}</Link>}</div>
        </div><footer className="saved-card-footer"><button type="button" title={t("Remove from favorites")} disabled={Boolean(removing)} onClick={() => removeFavorite(profile._id)}><FiTrash2 aria-hidden="true" />{t(removing === profile._id ? "Removing..." : "Remove")}</button></footer>
      </article>)}
    </div> : !error && <div className="directory-status saved-empty"><FiBookmark aria-hidden="true" /><h2>{t("No Saved Profiles")}</h2><p>{t("You haven't added any profiles to favourites yet.")}</p><Link className="saved-browse" to="/profiles">{t("Browse profiles")}<FiArrowRight aria-hidden="true" /></Link></div>}
  </div></main>;
}
