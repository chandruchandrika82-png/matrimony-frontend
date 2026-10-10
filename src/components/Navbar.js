import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import "./Navbar.css";
import { LanguageSelect, useLanguage } from "../Language";
import PageBack from "./PageBack";

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    function escape(event) { if (event.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  function logout() { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/"); }
  return <header className="site-header"><div className="site-nav">
    <Link to="/" className="brand-link" aria-label={t("Namakkal Matrimony home")}><img src="/logo.png" className="brand-logo" alt={t("")} /><span><strong>{t("Namakkal Matrimony")}</strong><small>{t("Connections that feel like home")}</small></span></Link>
    <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label={t("Main navigation")}><NavLink to="/" end>{t("Home")}</NavLink><NavLink to="/profiles">{t("Find a match")}</NavLink>{token && <><NavLink to="/interest-requests">{t("Requests")}</NavLink><NavLink to="/saved">{t("Saved profiles")}</NavLink><NavLink to="/account-settings">{t("Settings")}</NavLink></>}</nav>
    <div className="nav-actions"><LanguageSelect />{token ? <><Link className="account-link" to="/my-dashboard" title={user?.name || t("My profile")}><FiUser /><span>{user?.name || t("My profile")}</span></Link><button className="site-icon" title={t("Sign out")} aria-label={t("Sign out")} onClick={logout}><FiLogOut /></button></> : <><Link className="login-link" to="/login">{t("Sign in")}</Link><Link className="join-link" to="/register">{t("Join now")}</Link></>}<button className="site-icon mobile-menu" aria-controls="main-navigation" aria-expanded={open} aria-label={open ? t("Close menu") : t("Open menu")} title={open ? t("Close menu") : t("Open menu")} onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button></div>
  </div>{location.pathname !== "/" && <div className="site-back-row"><PageBack fallback={token && location.pathname !== "/profiles" ? "/profiles" : "/"} /></div>}</header>;
}
