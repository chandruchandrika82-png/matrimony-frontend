import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.overlay}>
          <h1 style={styles.title}>Find Your Perfect Match 💍</h1>

          <p style={styles.subtitle}>
            Trusted Namakkal Matrimony platform for meaningful and genuine connections
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
      </div>

      <div style={styles.aboutSection}>
        <h2 style={styles.aboutTitle}>About Namakkal Matrimony</h2>

        <p style={styles.aboutText}>
          Namakkal Matrimony is a modern matrimony platform designed to help people
          discover meaningful relationships with trust, privacy, and simplicity.
          We believe every journey to marriage should begin with genuine
          connections and family values.
        </p>

        <div style={styles.features}>
          <div style={styles.card}>
            <h3>🔒 Trusted Profiles</h3>
            <p>Safe and genuine matchmaking experience.</p>
          </div>

          <div style={styles.card}>
            <h3>💖 Meaningful Connections</h3>
            <p>Find compatible partners with shared values.</p>
          </div>

          <div style={styles.card}>
            <h3>🌍 Modern Platform</h3>
            <p>Simple, elegant, and user-friendly experience.</p>
          </div>
        </div>
      </div>

      <div style={styles.successSection}>
        <h2 style={styles.successTitle}>❤️ Success Story</h2>

        <div style={styles.storyGrid}>
          <div style={styles.storyCard}>
            <img
              src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1170&auto=format&fit=crop"
              alt="couple"
              style={styles.storyImage}
            />

            <h3 style={{ marginTop: 15 }}>Arjun & Meera</h3>

            <p>Married on 12 Apr 2025</p>

            <button style={styles.storyBtn}>View Story</button>
          </div>
        </div>
      </div>

      <div style={styles.statsSection}>
        <div>
          <h2>10K+</h2>
          <p>Profiles</p>
        </div>

        <div>
          <h2>5K+</h2>
          <p>Successful Matches</p>
        </div>

        <div>
          <h2>100%</h2>
          <p>Trusted Platform</p>
        </div>
      </div>

      <div style={styles.footer}>
        <h2>📞 Contact Information</h2>
        <p>Phone: +91 1234567890</p>
        <p>Email: namakkalmatrimony@gmail.com</p>
        <p>Address: Namakkal, Tamil Nadu</p>
        <p style={{ marginTop: 20 }}>
          © 2026 Namakkal Matrimony. All rights reserved.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffe4ec",
    paddingTop: "88px",
  },

  hero: {
    minHeight: "calc(90vh - 88px)",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1974&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px 20px 40px",
    boxSizing: "border-box",
  },

  overlay: {
    background: "rgba(255,255,255,0.95)",
    padding: "42px",
    borderRadius: "24px",
    textAlign: "left",
    width: "100%",
    maxWidth: "760px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "clamp(42px, 4.5vw, 64px)",
    margin: "0 0 14px",
    fontWeight: "800",
    color: "#9a0000",
    lineHeight: 1.05,
    maxWidth: "620px",
  },

  subtitle: {
    fontSize: "18px",
    marginBottom: "34px",
    lineHeight: "1.7",
    color: "#5e4d52",
    maxWidth: "580px",
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "16px",
    flexWrap: "wrap",
  },

  btnPrimary: {
    padding: "14px 28px",
    background: "#8B0000",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "700",
  },

  btnSecondary: {
    padding: "14px 28px",
    background: "#ff4d6d",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "700",
  },

  aboutSection: {
    padding: "80px 20px",
    textAlign: "center",
    background: "#fff7fb",
  },

  aboutTitle: {
    fontSize: "38px",
    color: "#8B0000",
    marginBottom: "20px",
  },

  aboutText: {
    maxWidth: "800px",
    margin: "0 auto",
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#333",
  },

  features: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    width: "280px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  successSection: {
    padding: "80px 20px",
    background: "#fff",
    textAlign: "center",
  },

  successTitle: {
    fontSize: "38px",
    color: "#8B0000",
    marginBottom: "40px",
  },

  storyGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  storyCard: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    width: "260px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    paddingBottom: "20px",
  },

  storyImage: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
  },

  storyBtn: {
    padding: "10px 18px",
    background: "#ff4d6d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },

  statsSection: {
    background: "#8B0000",
    color: "white",
    padding: "60px 20px",
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    flexWrap: "wrap",
  },

  footer: {
    background: "#111",
    color: "white",
    textAlign: "center",
    padding: "50px 20px",
    lineHeight: "2",
  },
};

export default Home;