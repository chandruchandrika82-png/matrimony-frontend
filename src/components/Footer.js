import { useLanguage } from "../Language";
import { Link } from "react-router-dom";
import { defaultBranding, fetchBranding } from "../config/branding";
import { useEffect, useState } from "react";
export default function Footer() {
  const { t } = useLanguage();
  const [branding, setBranding] = useState(defaultBranding);
  useEffect(() => { fetchBranding().then(setBranding); }, []);
  return <footer className="member-footer"><div><Link className="footer-brand" to="/">{branding.name}</Link><p>{t("Connections that feel like home.")}</p></div><nav aria-label={t("Footer navigation")}><Link to="/profiles">{t("Find a match")}</Link><Link to="/my-dashboard">{t("My account")}</Link><Link to="/account-settings">{t("Privacy settings")}</Link></nav><small>{branding.address} · {branding.phone} · {branding.website}</small></footer>;
}
