import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./PageBack.css";
import { useLanguage } from "../Language";

export default function PageBack({ fallback = "/profiles" }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  function goBack() {
    if ((window.history.state?.idx || 0) > 0) navigate(-1);
    else navigate(fallback, { replace: true });
  }
  return <button type="button" className="member-page-back" onClick={goBack} aria-label={t("Go back")} title={t("Go back")}><FiArrowLeft /></button>;
}
