import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="site-nav">
        <Link to="/" className="brand-link" aria-label="Namakkal Matrimony home">
          <img src="/logo.png" className="brand-logo" alt="Namakkal Matrimony" />
          <span><strong>Namakkal Matrimony</strong><small>Trusted Tamil Nadu matchmaking</small></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/profiles">Profiles</Link>
          {token && <Link to="/interest-requests">Requests</Link>}
          {token && <Link to="/interested">Shortlist</Link>}
        </nav>
        <div className="nav-actions">
          {token ? <><button className="account-link" onClick={() => navigate("/my-dashboard")}>{user?.name || "My account"}</button><button className="logout-link" onClick={logout}>Log out</button></> : <><Link className="login-link" to="/login">Log in</Link><Link className="join-link" to="/register">Create profile</Link></>}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
