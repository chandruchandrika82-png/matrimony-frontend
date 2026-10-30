import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";
import { LanguageSelect, useLanguage } from "../Language";
import PageBack from "./PageBack";
import CustomerAccount from "./CustomerAccount";

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    function escape(event) { if (event.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  return <header className="site-header"><div className="site-nav">
    <Link to="/" className="brand-link" aria-label={t("New Varan Kongu Thirumana Matrimony home")}><img src="/logo.png" className="brand-logo" alt={t("")} /><span><strong>{t("New Varan Kongu Thirumana Matrimony")}</strong><small>{t("Connections that feel like home")}</small></span></Link>
    <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label={t("Main navigation")}><NavLink to="/" end>{t("Home")}</NavLink><NavLink to="/profiles">{t("Find a match")}</NavLink>{token && <><NavLink to="/interest-requests">{t("Requests")}</NavLink><NavLink to="/saved">{t("Saved profiles")}</NavLink></>}</nav>
    <div className="nav-actions"><LanguageSelect />{token ? <CustomerAccount /> : <><Link className="login-link" to="/login">{t("Sign in")}</Link><Link className="join-link" to="/register">{t("Join now")}</Link></>}<button className="site-icon mobile-menu" aria-controls="main-navigation" aria-expanded={open} aria-label={open ? t("Close menu") : t("Open menu")} title={open ? t("Close menu") : t("Open menu")} onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button></div>
  </div>{location.pathname !== "/" && <div className="site-back-row"><PageBack fallback={token && location.pathname !== "/profiles" ? "/profiles" : "/"} /></div>}</header>;
}
