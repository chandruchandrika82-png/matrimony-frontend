import { useLanguage } from "../Language";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FiUser, FiMessageCircle, FiSend, FiExternalLink, FiRefreshCw } from "react-icons/fi";
import { API, resolveMediaUrl } from "../config/api";
import "./Chat.css";

export default function Chat() {
  const { t, language } = useLanguage();
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const userId = currentUser?._id;
  const token = localStorage.getItem("token");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [sendError, setSendError] = useState("");
  const [sending, setSending] = useState(false);
  const [reload, setReload] = useState(0);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(140);
  const thread = useRef(null);
  const nearBottom = useRef(true);
  const forceBottom = useRef(true);
  const sendLock = useRef(false);
  const sendController = useRef(null);

  useEffect(() => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const measure = () => setHeaderHeight(header.getBoundingClientRect().height);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure); observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMessages([]); setText(""); setUser(null); setLoading(true);
    setLoadError(""); setSendError(""); setSending(false); setPhotoFailed(false);
    nearBottom.current = true; forceBottom.current = true; sendLock.current = false;
    return () => sendController.current?.abort();
  }, [id]);

  useEffect(() => {
    const controller = new AbortController(); let timer;
    async function load() {
      try {
        const { data } = await axios.get(`${API}/messages/${userId}/${id}`, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } });
        if (!controller.signal.aborted) { setMessages(Array.isArray(data) ? data : []); setLoadError(""); }
      } catch {
        if (!controller.signal.aborted) setLoadError("Unable to load messages. Please try again.");
      } finally {
        if (!controller.signal.aborted) { setLoading(false); timer = setTimeout(load, 3000); }
      }
    }
    load();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [id, userId, token, reload]);

  useEffect(() => {
    const controller = new AbortController();
    axios.get(`${API}/users/${id}`, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } })
      .then(response => { if (!controller.signal.aborted) setUser(response.data); })
      .catch(() => { if (!controller.signal.aborted) setUser(false); });
    return () => controller.abort();
  }, [id, token, reload]);

  useEffect(() => {
    if (thread.current && (nearBottom.current || forceBottom.current)) {
      thread.current.scrollTop = thread.current.scrollHeight;
      forceBottom.current = false;
    }
  }, [messages, loading]);

  async function sendMessage(event) {
    event.preventDefault();
    const value = text.trim();
    if (!value || sendLock.current || !user) return;
    sendLock.current = true; setSending(true); setSendError("");
    const controller = new AbortController(); sendController.current = controller;
    try {
      await axios.post(`${API}/messages`, { sender: userId, receiver: id, text: value }, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } });
      if (!controller.signal.aborted) { setText(""); forceBottom.current = true; setReload(value => value + 1); }
    } catch {
      if (!controller.signal.aborted) setSendError("Message was not sent. Please try again.");
    } finally {
      if (!controller.signal.aborted) { sendLock.current = false; setSending(false); }
    }
  }

  const photo = user && !user.hidePhotos && resolveMediaUrl(user.image);
  const locale = language === "ta" ? "ta-IN" : "en-IN";
  function dateFor(value) { const date = new Date(value); return Number.isNaN(date.getTime()) ? null : date; }
  function dateLabel(date) {
    if (!date) return "";
    const today = new Date(); const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return t("Today");
    if (date.toDateString() === yesterday.toDateString()) return t("Yesterday");
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  }
  return <main className="conversation-page" style={{ '--chat-header-height': `${headerHeight}px` }}>
    <section className="conversation-panel" aria-label={t("Private conversation")}>
      <header className="conversation-header"><div className="conversation-person"><div className="conversation-avatar">{photo && !photoFailed ? <img src={photo} alt={user.name || t("Member")} onError={() => setPhotoFailed(true)} /> : <FiUser aria-hidden="true" />}</div><div><h1>{user?.name || t(user === false ? "Profile not found" : "Loading...")}</h1><p><FiMessageCircle aria-hidden="true" />{t("Private conversation")}</p></div></div>{user && <Link className="conversation-profile-link" to={`/profile/${id}`} title={t("View Profile")} aria-label={t("View Profile")}><FiExternalLink aria-hidden="true" /></Link>}</header>
      {(loadError || user === false) && <div className="conversation-notice" role="alert"><span>{t(loadError || "Unable to load this profile.")}</span><button type="button" onClick={() => setReload(value => value + 1)} title={t("Try again")}><FiRefreshCw aria-hidden="true" />{t("Try again")}</button></div>}
      <div className="conversation-thread" ref={thread} role="log" aria-label={t("Messages")} aria-live="polite" onScroll={() => { const el = thread.current; nearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80; }}>
        {loading ? <div className="conversation-state" role="status">{t("Loading messages...")}</div> : !messages.length && !loadError ? <div className="conversation-state"><FiMessageCircle aria-hidden="true" /><h2>{t("No messages yet")}</h2><p>{user?.name || t("Private conversation")}</p></div> : messages.map((message, index) => {
          const own = String(message.sender?._id || message.sender) === String(userId);
          const date = dateFor(message.createdAt); const previous = dateFor(messages[index - 1]?.createdAt);
          const newDay = date && (!previous || date.toDateString() !== previous.toDateString());
          return <div key={message._id || `${message.createdAt}-${index}`}>
            {newDay && <div className="conversation-date">{dateLabel(date)}</div>}
            <div className={`conversation-message ${own ? 'outgoing' : 'incoming'}`}><div className="conversation-bubble"><p>{message.text}</p>{date && <time dateTime={date.toISOString()}>{date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</time>}</div></div>
          </div>;
        })}
      </div>
      {sendError && <p className="conversation-send-error" role="alert">{t(sendError)}</p>}
      <form className="conversation-composer" onSubmit={sendMessage}><input type="text" aria-label={t("Message")} placeholder={t("Type your message...")} value={text} disabled={sending || !user} onChange={e => { setText(e.target.value); setSendError(""); }} /><button type="submit" disabled={!text.trim() || sending || !user} aria-label={t(sending ? "Sending..." : "Send message")} title={t(sending ? "Sending..." : "Send message")}><FiSend aria-hidden="true" /></button></form>
    </section>
  </main>;
}
