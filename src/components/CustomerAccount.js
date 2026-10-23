import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiChevronDown, FiSettings, FiLogOut } from "react-icons/fi";
import { useLanguage } from "../Language";

export default function CustomerAccount() {
  const { t } = useLanguage();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [open, setOpen] = useState(false);
  const ref = useRef(null); const location = useLocation(); const navigate = useNavigate();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    function dismiss(event) { if (event.type === 'keydown' ? event.key === 'Escape' : !ref.current?.contains(event.target)) setOpen(false); }
    document.addEventListener('pointerdown', dismiss); document.addEventListener('keydown', dismiss);
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', dismiss); };
  }, []);
  function logout() { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); }
  return <div className="customer-account" ref={ref}><Link className="account-link" to="/my-dashboard" title={user?.name || t("My profile")}><FiUser aria-hidden="true" /><span>{user?.name || t("My profile")}</span></Link><button className="account-options" type="button" aria-expanded={open} aria-controls="customer-account-options" aria-label={t("Account options")} title={t("Account options")} onClick={() => setOpen(value => !value)}><FiChevronDown aria-hidden="true" /></button>{open && <div className="customer-account-dropdown" id="customer-account-options"><Link to="/my-dashboard"><FiUser aria-hidden="true" />{t("My profile")}</Link><Link to="/account-settings"><FiSettings aria-hidden="true" />{t("Settings")}</Link><button type="button" onClick={logout}><FiLogOut aria-hidden="true" />{t("Sign out")}</button></div>}</div>;
}
