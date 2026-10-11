import { useLanguage } from "../Language";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiInbox, FiSend, FiCheckCircle, FiSearch, FiX, FiEye, FiCheck, FiMessageCircle, FiMapPin, FiBookOpen, FiBriefcase, FiArrowRight } from "react-icons/fi";
import { API } from "../config/api";
import ProfilePhotos from "../components/ProfilePhotos";
import { isConnected, includesMember } from "../config/connections";
import "./Profiles.css";
import "./InterestRequests.css";

const tabs = [ ['received', 'Received', FiInbox], ['sent', 'Sent', FiSend], ['accepted', 'Accepted', FiCheckCircle] ];
export default function InterestRequests() {
  const { t } = useLanguage();
  const userId = JSON.parse(localStorage.getItem("user") || "null")?._id;
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("received");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(null);
  const actionLock = useRef(false);
  const loadController = useRef(null);
  const loadUsers = useCallback(async () => {
    loadController.current?.abort();
    const controller = new AbortController(); loadController.current = controller;
    setLoading(true); setError(""); setNotice("");
    try {
      const { data } = await axios.get(`${API}/users`, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } });
      if (!controller.signal.aborted) {
        if (!Array.isArray(data) || !data.some(user => user._id === userId)) throw new Error('Profile unavailable');
        setUsers(data);
      }
    } catch { if (!controller.signal.aborted) setError("Unable to load requests. Please try again."); }
    finally { if (!controller.signal.aborted) setLoading(false); }
  }, [userId, token]);
  useEffect(() => { loadUsers(); return () => loadController.current?.abort(); }, [loadUsers]);

  const requests = useMemo(() => {
    const me = users.find(user => user._id === userId);
    const others = users.filter(user => user._id !== userId);
    return {
      received: others.filter(user => !isConnected(me, user) && includesMember(me?.interestRequests, user._id)),
      sent: others.filter(user => !isConnected(me, user) && includesMember(user.interestRequests, userId)),
      accepted: others.filter(user => isConnected(me, user)),
    };
  }, [users, userId]);
  const profiles = requests[activeTab].filter(profile => `${profile.name || ''} ${profile.currentCity || ''} ${profile.district || ''}`.toLowerCase().includes(search.trim().toLowerCase()));

  async function respond(senderId, action) {
    if (actionLock.current) return;
    actionLock.current = true; setBusy(`${action}:${senderId}`); setError(""); setNotice("");
    try {
      await axios.put(`${API}/users/${userId}/${action}/${senderId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(rows => rows.map(user => user._id !== userId ? user : {
        ...user,
        interestRequests: (user.interestRequests || []).filter(value => String(value?._id || value) !== senderId),
        acceptedRequests: action === 'accept' && !includesMember(user.acceptedRequests, senderId) ? [...(user.acceptedRequests || []), senderId] : user.acceptedRequests,
      }));
      setNotice(action === 'accept' ? "Interest request accepted" : "Interest request rejected");
    } catch { setError(action === 'accept' ? "Unable to accept request" : "Unable to reject request"); }
    finally { actionLock.current = false; setBusy(null); }
  }
  function navigateTab(event, index) {
    const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!offset && !['Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + offset + tabs.length) % tabs.length;
    setActiveTab(tabs[next][0]); event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next].focus();
  }
  return <main className="directory-page requests-page"><div className="directory-shell">
    <header className="directory-header saved-heading"><div><p className="saved-eyebrow"><FiInbox aria-hidden="true" />{t("Requests")}</p><h1>{t("Interest Requests")}</h1><p>{t("View received, sent and accepted interests.")}</p></div><Link className="saved-browse" to="/profiles">{t("Browse profiles")}<FiArrowRight aria-hidden="true" /></Link></header>
    <div className="requests-toolbar"><div className="request-tabs" role="tablist" aria-label={t("Interest Requests")}>{tabs.map(([key, label, Icon], index) => <button key={key} type="button" role="tab" id={`request-tab-${key}`} aria-controls="request-panel" aria-selected={activeTab === key} tabIndex={activeTab === key ? 0 : -1} aria-label={`${t(label)} (${requests[key].length})`} onClick={() => setActiveTab(key)} onKeyDown={event => navigateTab(event, index)}><Icon aria-hidden="true" /><span>{t(label)}</span><span className="request-count">{requests[key].length}</span></button>)}</div><label className="request-search"><FiSearch aria-hidden="true" /><input aria-label={t("Search requests")} placeholder={t("Name or place")} value={search} onChange={event => setSearch(event.target.value)} />{search && <button type="button" onClick={() => setSearch("")} title={t("Clear search")} aria-label={t("Clear search")}><FiX /></button>}</label></div>
    {error && <div className="saved-error" role="alert"><span>{t(error)}</span><button type="button" disabled={loading || Boolean(busy)} onClick={loadUsers}>{t("Try again")}</button></div>}
    {notice && <div className="request-notice" role="status"><FiCheckCircle aria-hidden="true" />{t(notice)}</div>}
    <section id="request-panel" role="tabpanel" aria-labelledby={`request-tab-${activeTab}`}>
      {loading ? <div className="directory-status" role="status">{t("Loading...")}</div> : profiles.length ? <div className="profile-grid saved-grid">
        {profiles.map(profile => <article key={profile._id} className="directory-card saved-card request-card" aria-label={profile.name}>
          <ProfilePhotos profile={profile} />
          <div className="directory-card-body saved-card-body"><div className={`request-state ${activeTab}`}><span />{t(activeTab === 'received' ? 'Awaiting response' : activeTab === 'sent' ? 'Interest sent' : 'Accepted')}</div><h2>{profile.name || t("Member")}</h2><p className="saved-demographics">{[profile.age && `${profile.age} ${t("years")}`, profile.gender && t(profile.gender)].filter(Boolean).join(' / ') || t("Not shared")}</p>
            <dl className="saved-facts"><div><dt title={t("Location")}><FiMapPin aria-hidden="true" /><span className="saved-sr-only">{t("Location")}</span></dt><dd>{profile.currentCity || profile.district || t("Not shared")}</dd></div><div><dt title={t("Education")}><FiBookOpen aria-hidden="true" /><span className="saved-sr-only">{t("Education")}</span></dt><dd>{profile.education || t("Not shared")}</dd></div><div><dt title={t("Occupation")}><FiBriefcase aria-hidden="true" /><span className="saved-sr-only">{t("Occupation")}</span></dt><dd>{t(profile.occupationType) || t("Not shared")}</dd></div></dl>
            <div className="card-actions request-actions"><Link to={`/profile/${profile._id}`}><FiEye aria-hidden="true" />{t("View Profile")}</Link>{activeTab === 'accepted' && <Link className="connected-chat" to={`/chat/${profile._id}`}><FiMessageCircle aria-hidden="true" />{t("Chat")}</Link>}</div>
          </div>{activeTab === 'received' && <footer className="request-response"><button className="request-reject" type="button" disabled={Boolean(busy)} onClick={() => respond(profile._id, 'reject')}><FiX aria-hidden="true" />{t(busy === `reject:${profile._id}` ? "Updating..." : "Reject")}</button><button className="request-accept" type="button" disabled={Boolean(busy)} onClick={() => respond(profile._id, 'accept')}><FiCheck aria-hidden="true" />{t(busy === `accept:${profile._id}` ? "Updating..." : "Accept")}</button></footer>}
        </article>)}
      </div> : !error && <div className="directory-status saved-empty"><FiInbox aria-hidden="true" /><h2>{t(search ? "No matching profiles" : activeTab === 'received' ? "No received requests" : activeTab === 'sent' ? "No sent requests" : "No accepted requests")}</h2><p>{t("There are no profiles to display.")}</p>{search ? <button type="button" onClick={() => setSearch("")}>{t("Clear search")}</button> : <Link className="saved-browse" to="/profiles">{t("Browse profiles")}<FiArrowRight aria-hidden="true" /></Link>}</div>}
    </section>
  </div></main>;
}
