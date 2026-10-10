import { useLanguage } from "../Language";
import { Link } from "react-router-dom";
export default function Footer() {
  const { t } = useLanguage();
  return <footer className="member-footer"><div><Link className="footer-brand" to="/">{t("Namakkal Matrimony")}</Link><p>{t("Connections that feel like home.")}</p></div><nav aria-label={t("Footer navigation")}><Link to="/profiles">{t("Find a match")}</Link><Link to="/my-dashboard">{t("My account")}</Link><Link to="/account-settings">{t("Privacy settings")}</Link></nav><small>{t("Namakkal, Tamil Nadu")}</small></footer>;
}
