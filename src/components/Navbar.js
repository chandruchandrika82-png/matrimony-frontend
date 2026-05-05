import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div style={styles.nav}>

      <div style={styles.logoContainer}>
        <img src={logo} alt="logo" style={styles.logo} />
        <h2 style={styles.title}>Digi Ghatak</h2>
      </div>

      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/profiles" style={styles.link}>Profiles</Link>
        <Link to="/add-profile" style={styles.link}>Add Profile</Link>
        <Link to="/interested" style={styles.link}>❤️</Link>
      </div>

    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "linear-gradient(90deg, #8B0000, #ff4d6d)",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },

  logo: {
    width: 45,
    height: 45,
    borderRadius: "50%"
  },

  title: {
    margin: 0
  },

  link: {
    margin: "0 15px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Navbar;