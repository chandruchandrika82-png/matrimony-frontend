import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    // 🔥 ensures UI refresh after logout
    window.location.reload();
  };

  return (
    <div style={styles.navbar}>
      
      {/* LOGO */}
      <div style={styles.logoContainer}>
        <img
          src="/logo.png"
          alt="logo"
          style={styles.logoImage}
        />

        <h2 style={styles.logoText}>
          Digi Ghatak
        </h2>
      </div>

      {/* MENU */}
      <div style={styles.links}>
        
        <Link to="/" style={styles.link}>
          Home
        </Link>

        <Link to="/profiles" style={styles.link}>
          Profiles
        </Link>

        <Link to="/add-profile" style={styles.link}>
          Add Profile
        </Link>

        <Link to="/interested" style={styles.link}>
          Interested
        </Link>

        {/* AUTH SECTION */}
        {!token ? (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>

            <Link to="/register" style={styles.registerBtn}>
              Register
            </Link>
          </>
        ) : (
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    padding: "18px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    zIndex: 999,
    boxSizing: "border-box"
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  logoImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  logoText: {
    color: "#8B0000",
    fontSize: "24px",
    fontWeight: "700",
    margin: 0
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "25px"
  },

  link: {
    color: "#333",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
    transition: "0.3s"
  },

  registerBtn: {
    background: "#ff4d6d",
    color: "white",
    padding: "10px 18px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold"
  },

  logoutBtn: {
    background: "#8B0000",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Navbar;