import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    function escape(event) { if (event.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  function logout() { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/"); }
  return <header className="site-header"><div className="site-nav">
    <Link to="/" className="brand-link" aria-label="Namakkal Matrimony home"><img src="/logo.png" className="brand-logo" alt="" /><span><strong>Namakkal Matrimony</strong><small>Connections that feel like home</small></span></Link>
    <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/profiles">Find a match</NavLink>{token && <><NavLink to="/interest-requests">Requests</NavLink><NavLink to="/saved">Saved profiles</NavLink><NavLink to="/account-settings">Settings</NavLink></>}</nav>
    <div className="nav-actions">{token ? <><Link className="account-link" to="/my-dashboard" title="My account"><FiUser /><span>My account</span></Link><button className="site-icon" title="Sign out" aria-label="Sign out" onClick={logout}><FiLogOut /></button></> : <><Link className="login-link" to="/login">Sign in</Link><Link className="join-link" to="/register">Join now</Link></>}<button className="site-icon mobile-menu" aria-controls="main-navigation" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} title={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button></div>
  </div></header>;
}
