import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>
          <div style={styles.logo}>♥</div>
          <div>
            <h1 style={styles.brandTitle}>Namakkal Matrimony</h1>
            <p style={styles.brandSubTitle}>Trusted matrimonial platform</p>
          </div>
        </Link>

        <nav style={styles.navLinks}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/profiles" style={styles.link}>
            Profiles
          </Link>
          {token && (
            <Link to="/interested" style={styles.link}>
              Interested
            </Link>
          )}
        </nav>

        <div style={styles.actions}>
          {!token ? (
            <>
              <Link to="/login" style={styles.textBtn}>
                Login
              </Link>
              <Link to="/register" style={styles.primaryBtn}>
                Register
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/account-settings")}
                style={styles.userBtn}
              >
                👋 Hi, {user?.name || "User"}
              </button>
              <button onClick={logout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid #f1dde1",
    boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
  },

  container: {
    maxWidth: 1320,
    margin: "0 auto",
    padding: "14px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    flexWrap: "wrap",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    color: "inherit",
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #8B0000, #d63b8d)",
    color: "#fff",
    fontSize: 20,
    fontWeight: 900,
    boxShadow: "0 10px 20px rgba(139,0,0,0.18)",
    flexShrink: 0,
  },

  brandTitle: {
    margin: 0,
    fontSize: 22,
    lineHeight: 1.1,
    color: "#8B0000",
    fontWeight: 900,
  },

  brandSubTitle: {
    margin: "3px 0 0",
    fontSize: 13,
    color: "#6f5b61",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  link: {
    textDecoration: "none",
    color: "#3a2a2a",
    fontWeight: 700,
    fontSize: 15,
    padding: "8px 12px",
    borderRadius: 999,
    transition: "0.2s ease",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  textBtn: {
    textDecoration: "none",
    color: "#8B0000",
    fontWeight: 800,
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #f1dde1",
    background: "#fff",
  },

  primaryBtn: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: 900,
    padding: "10px 16px",
    borderRadius: 12,
    background: "linear-gradient(135deg, #8B0000, #d63b8d)",
    boxShadow: "0 10px 18px rgba(139,0,0,0.18)",
  },

  userBtn: {
    border: "1px solid #f1dde1",
    background: "#fff",
    color: "#8B0000",
    fontWeight: 800,
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
  },

  logoutBtn: {
    border: "none",
    background: "#8B0000",
    color: "#fff",
    fontWeight: 800,
    padding: "10px 16px",
    borderRadius: 12,
    cursor: "pointer",
  },
};

export default Navbar;