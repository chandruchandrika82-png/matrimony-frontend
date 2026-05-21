import { Link } from "react-router-dom";

function Home() {

  return (

    <div>

      {/* HERO SECTION */}
      <div style={styles.hero}>

        <div style={styles.overlay}>

          <h1 style={styles.title}>
            Find Your Perfect Match 💍
          </h1>

          <p style={styles.subtitle}>
            Trusted matrimony platform for meaningful and genuine connections
          </p>

          <div style={styles.buttons}>

            <Link to="/profiles">
              <button style={styles.btnPrimary}>
                Browse Profiles
              </button>
            </Link>

            <Link to="/add-profile">
              <button style={styles.btnSecondary}>
                Create Profile
              </button>
            </Link>

          </div>

        </div>

      </div>

      {/* ABOUT SECTION */}
      <div style={styles.aboutSection}>

        <h2 style={styles.aboutTitle}>
          About Digi Ghatak
        </h2>

        <p style={styles.aboutText}>
          Digi Ghatak is a modern matrimony platform designed to help people
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

      {/* SUCCESS STORIES */}
<div style={styles.successSection}>

  <h2 style={styles.successTitle}>
    ❤️ Success Story
  </h2>

  <div style={styles.storyGrid}>

    <div style={styles.storyCard}>

      <img
        src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1170&auto=format&fit=crop"
        alt="couple"
        style={styles.storyImage}
      />

      <h3 style={{ marginTop: 15 }}>
        Arjun & Meera
      </h3>

      <p>
        Married on 12 Apr 2025
      </p>

      <button style={styles.storyBtn}>
        View Story
      </button>

    </div>

  </div>

</div>

      {/* STATS SECTION */}
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

      {/* FOOTER */}
      <div style={styles.footer}>

        <h2>📞 Contact Information</h2>

        <p>
          Phone: +91 1234567890
        </p>

        <p>
          Email: digighatak@gmail.com
        </p>

        <p>
          Address: Kerala, India
        </p>

        <p style={{ marginTop: 20 }}>
          © 2026 Digi Ghatak Matrimony. All rights reserved.
        </p>

      </div>

    </div>

  );
}

const styles = {

  hero: {
    height: "90vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1974&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  overlay: {
    background: "rgba(0,0,0,0.55)",
    padding: "50px",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    width: "80%",
    maxWidth: "700px",
    backdropFilter: "blur(4px)"
  },

  title: {
    fontSize: "52px",
    marginBottom: "15px",
    fontWeight: "700"
  },

  subtitle: {
    fontSize: "20px",
    marginBottom: "35px",
    lineHeight: "1.6"
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  },

  btnPrimary: {
    padding: "14px 28px",
    background: "#8B0000",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600"
  },

  btnSecondary: {
    padding: "14px 28px",
    background: "#ff4d6d",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600"
  },

  aboutSection: {
    padding: "80px 20px",
    textAlign: "center",
    background: "#0c0c0bda"
  },

  aboutTitle: {
    fontSize: "38px",
    color: "#8B0000",
    marginBottom: "20px"
  },

  aboutText: {
    maxWidth: "800px",
    margin: "0 auto",
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#090303"
  },

  features: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap"
  },

  card: {
    background: "#fffbf0",
    padding: "30px",
    borderRadius: "18px",
    width: "280px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
  },

  successSection: {
    padding: "80px 20px",
    background: "#121010d0",
    textAlign: "center"
  },

  successTitle: {
    fontSize: "38px",
    color: "#8B0000",
    marginBottom: "40px"
  },

  storyGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap"
  },

  storyCard: {
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    width: "260px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    paddingBottom: "20px"
  },

  storyImage: {
    width: "100%",
    height: "260px",
    objectFit: "cover"
  },

  storyBtn: {
    padding: "10px 18px",
    background: "#ff4d6d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
  },

  statsSection: {
    background: "#8B0000",
    color: "white",
    padding: "60px 20px",
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    flexWrap: "wrap"
  },

  footer: {
    background: "#111",
    color: "white",
    textAlign: "center",
    padding: "50px 20px",
    lineHeight: "2"
  }

};

export default Home;