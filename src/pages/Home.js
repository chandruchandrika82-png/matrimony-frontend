import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>Find Your Perfect Match 💍</h1>
      <p style={styles.subtitle}>
        Trusted matrimony platform for meaningful connections
      </p>

      <div style={styles.buttons}>
        <Link to="/profiles">
          <button style={styles.btnPrimary}>Browse Profiles</button>
        </Link>

        <Link to="/add-profile">
          <button style={styles.btnSecondary}>Create Profile</button>
        </Link>
      </div>

    </div>
  );
}

const styles = {
  container: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #fff0f3, #ffe5ec)",
    textAlign: "center"
  },

  title: {
    fontSize: 40,
    marginBottom: 10,
    color: "#8B0000"
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 30
  },

  buttons: {
    display: "flex",
    gap: 20
  },

  btnPrimary: {
    padding: "12px 20px",
    background: "#8B0000",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  },

  btnSecondary: {
    padding: "12px 20px",
    background: "#ff4d6d",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  }
};

export default Home;