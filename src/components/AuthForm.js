import { useLanguage } from "../Language";
import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { API } from "../config/api";

export default function AuthForm({ register = false }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  function change(event) { setForm({ ...form, [event.target.name]: event.target.value }); setError(""); }
  async function submit(event) {
    event.preventDefault(); setError("");
    if (register && form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/${register ? "register" : "login"}`, { ...(register ? { name: form.name.trim() } : {}), email: form.email.trim().toLowerCase(), password: form.password }, { timeout: 30000 });
      if (!data.token || !data.user) throw new Error("Invalid login response");
      localStorage.setItem("user", JSON.stringify(data.user)); localStorage.setItem("token", data.token);
      const from = location.state?.from;
      navigate(register ? "/my-profile" : from?.pathname || "/profiles", { replace: true, state: from?.state });
    } catch (err) {
      const message = err.response?.data?.error;
      setError(typeof message === "string" ? message
        : err.code === "ECONNABORTED" ? "The server took too long to respond. Please try again."
        : !err.response ? "Cannot reach the server. Check your connection; the backend may be offline or blocking this website."
        : "Unable to continue. Please check your details.");
    }
    finally { setLoading(false); }
  }
  return <main className="member-auth-page"><div className="member-auth-shell"><section className="member-auth-form"><div className="auth-brand"><img src="/logo.png" alt={t("Namakkal Matrimony logo")} /><span>{t("Namakkal Matrimony")}</span></div><p className="section-kicker">{register ? t("YOUR JOURNEY BEGINS HERE") : t("GOOD TO SEE YOU AGAIN")}</p><h1>{register ? t("Create your account") : t("Welcome back")}</h1><p className="auth-subtitle">{register ? t("Make room for a meaningful connection.") : t("Sign in to continue your search.")}</p><form onSubmit={submit}>{error && <p className="auth-error" role="alert">{error}</p>}{register && <label>{t("Full name")}<input name="name" autoComplete="name" required maxLength={100} value={form.name} onChange={change} placeholder={t("Your full name")} /></label>}<label>{t("Email address")}<input name="email" type="email" autoComplete="username" required value={form.email} onChange={change} placeholder={t("you@example.com")} /></label><label>{t("Password")}<div className="auth-password"><input name="password" type={show ? "text" : "password"} autoComplete={register ? "new-password" : "current-password"} required minLength={register ? 8 : undefined} value={form.password} onChange={change} placeholder={register ? t("At least 8 characters") : t("Enter your password")} /><button type="button" title={show ? t("Hide password") : t("Show password")} aria-label={show ? t("Hide password") : t("Show password")} onClick={() => setShow(!show)}>{show ? <FiEyeOff /> : <FiEye />}</button></div></label>{register && <label>{t("Confirm password")}<input type="password" name="confirmPassword" autoComplete="new-password" required value={form.confirmPassword} onChange={change} placeholder={t("Re-enter your password")} /></label>}<button className="home-primary auth-submit" disabled={loading}>{loading ? t("Please wait...") : register ? t("Create account") : t("Sign in")}<FiArrowRight /></button></form><p className="auth-alternative">{register ? t("Already a member?") : t("New to Namakkal Matrimony?")} <Link to={register ? "/login" : "/register"} state={location.state}>{register ? t("Sign in") : t("Create an account")}</Link></p></section></div></main>;
}
