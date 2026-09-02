import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [lookingFor, setLookingFor] = useState("Woman");
const [ageFrom, setAgeFrom] = useState("22");
const [ageTo, setAgeTo] = useState("27");
const [religion, setReligion] = useState("");
const [motherTongue, setMotherTongue] = useState("");

const beginSearch = () => {
  navigate("/profiles", {
    state: {
      gender: lookingFor === "Woman" ? "Female" : "Male",
      minAge: ageFrom,
      maxAge: ageTo,
      religion,
      motherTongue,
    },
  });
};

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.overlay} />

        <div style={styles.heroInner}>
          {/* Brand Block Removed - Navbar already displays logo and title */}

          <div style={styles.heroContent}>
            <h2 style={styles.heroTitle}>
              Find Someone Special. Build a Beautiful Future.
            </h2>

            <p style={styles.heroText}>
              Trusted matrimonial profiles from Namakkal and surrounding communities.
            </p>

            <div style={styles.searchCard}>
              <div style={styles.searchGrid}>
                <div style={styles.field}>
                  <label style={styles.label}>I’m looking for a</label>
                  <select
                    value={lookingFor}
                    onChange={(e) => setLookingFor(e.target.value)}
                    style={styles.input}
                  >
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                  </select>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>aged</label>
                  <select
                    value={ageFrom}
                    onChange={(e) => setAgeFrom(e.target.value)}
                    style={styles.input}
                  >
                    {Array.from({ length: 23 }, (_, i) => i + 18).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>to</label>
                  <select
                    value={ageTo}
                    onChange={(e) => setAgeTo(e.target.value)}
                    style={styles.input}
                  >
                    {Array.from({ length: 18 }, (_, i) => i + 21).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>of religion</label>
                  <select
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                    style={styles.input}
                  >
                    <option value="">Select</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Jain">Jain</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={styles.fieldWide}>
                  <label style={styles.label}>and mother tongue</label>
                  <select
                    value={motherTongue}
                    onChange={(e) => setMotherTongue(e.target.value)}
                    style={styles.input}
                  >
                    <option value="">Select</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <button onClick={beginSearch} style={styles.beginBtn}>
                  Let&apos;s Begin
                </button>
              </div>
            </div>

            <div style={styles.trustBar}>
              <div style={styles.trustItem}>Fastest Growing Matchmaking Service</div>
              <div style={styles.trustDivider} />
              <div style={styles.trustItem}>
                <span style={styles.star}>★ ★ ★ ★ ★</span>
                Ratings trusted by families
              </div>
              <div style={styles.trustDivider} />
              <div style={styles.trustItem}>Success stories across communities</div>
            </div>

            <div style={styles.quickCta}>
              <div>
                <h3 style={styles.quickCtaTitle}>Ready to begin your journey?</h3>
                <p style={styles.quickCtaText}>
                  Create your profile, explore matches, and connect with meaningful people.
                </p>
              </div>

              <div style={styles.quickCtaButtons}>
                <button onClick={() => navigate("/profiles")} style={styles.ctaPrimary}>
                  Browse Profiles
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.infoSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>Why Families Trust Us</span>
          <h3 style={styles.sectionTitle}>A safe and elegant way to connect</h3>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🛡️</span>
            <h4 style={styles.infoTitle}>Verified Profiles</h4>
            <p style={styles.infoText}>Profiles checked for authenticity.</p>
          </div>

          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>👨‍👩‍👧</span>
            <h4 style={styles.infoTitle}>Family Friendly</h4>
            <p style={styles.infoText}>Designed for individuals and families.</p>
          </div>

          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🔒</span>
            <h4 style={styles.infoTitle}>Privacy Protected</h4>
            <p style={styles.infoText}>Your contact information stays private.</p>
          </div>

          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>❤️</span>
            <h4 style={styles.infoTitle}>Genuine Connections</h4>
            <p style={styles.infoText}>Connect with people looking for marriage.</p>
          </div>
        </div>
      </section>

      <section style={styles.statsSection}>
        <div style={styles.statsCard}>
          <div style={styles.statsText}>
            <strong>10,000+</strong> Profiles
          </div>
          <div style={styles.statsDivider} />
          <div style={styles.statsText}>
            <strong>2,500+</strong> Interests Sent
          </div>
          <div style={styles.statsDivider} />
          <div style={styles.statsText}>
            <strong>500+</strong> Successful Matches
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff8fb",
    overflowX: "hidden",
    color: "#3a2a2a",
  },

  hero: {
    position: "relative",
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: 84,
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(208, 92, 136, 0.42) 0%, rgba(153, 22, 58, 0.66) 48%, rgba(18, 18, 18, 0.58) 100%)",
  },

  heroInner: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1320,
    margin: "0 auto",
    padding: "18px 24px 40px",
  },


  heroContent: {
    textAlign: "center",
    paddingTop: 44,
  },

  heroTitle: {
    margin: 0,
    color: "#fff",
    fontSize: "clamp(34px, 4vw, 42px)",
    lineHeight: 1.12,
    fontWeight: 700,
    textShadow: "0 6px 18px rgba(0,0,0,0.22)",
    maxWidth: 1060,
    marginInline: "auto",
  },

  heroText: {
    margin: "16px auto 0",
    maxWidth: 860,
    color: "#fff",
    fontSize: "clamp(16px, 1.8vw, 21px)",
    lineHeight: 1.55,
    fontWeight: 500,
    textShadow: "0 4px 12px rgba(0,0,0,0.18)",
  },

  searchCard: {
    margin: "34px auto 0",
    maxWidth: 1140,
    background: "rgba(25, 18, 24, 0.60)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 20,
    padding: 16,
    backdropFilter: "blur(12px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.22)",
  },

  searchGrid: {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.8fr 0.8fr 1fr 1.5fr 0.95fr",
    gap: 12,
    alignItems: "end",
  },

  field: {
    textAlign: "left",
  },

  fieldWide: {
    textAlign: "left",
  },

  label: {
    display: "block",
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 700,
  },

  input: {
    width: "100%",
    height: 46,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.85)",
    background: "#fff",
    padding: "0 12px",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    color: "#222",
  },

  beginBtn: {
    height: 46,
    border: "none",
    borderRadius: 8,
    background: "#58b7d4",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 16,
    boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
  },

  trustBar: {
    marginTop: 18,
    background: "rgba(0,0,0,0.84)",
    color: "#fff",
    padding: "16px 18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
    borderRadius: 0,
  },

  trustItem: {
    fontSize: 16,
    fontWeight: 600,
  },

  trustDivider: {
    width: 1,
    height: 20,
    background: "rgba(255,255,255,0.35)",
  },

  star: {
    color: "#ffd84d",
    marginRight: 8,
    letterSpacing: 2,
  },

  quickCta: {
    marginTop: 18,
    background: "#ffffff",
    borderRadius: 24,
    padding: "28px 30px",
    color: "#3a2a2a",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
    boxShadow: "0 18px 40px rgba(139,0,0,0.10)",
    border: "1px solid #f0d6de",
  },

  quickCtaTitle: {
    margin: 0,
    fontSize: 30,
    fontWeight: 900,
    color: "#8B0000",
  },

  quickCtaText: {
    margin: "10px 0 0",
    maxWidth: 760,
    lineHeight: 1.7,
    fontSize: 16,
    color: "#5f5050",
  },

  quickCtaButtons: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },

  ctaPrimary: {
    padding: "13px 20px",
    borderRadius: 12,
    border: "none",
    background: "#8B0000",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 10px 18px rgba(139,0,0,0.18)",
  },

  sectionHeader: {
    textAlign: "center",
    marginBottom: 22,
  },

  sectionTag: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: 999,
    background: "#ffe3ea",
    color: "#8B0000",
    fontWeight: 800,
    fontSize: 13,
    marginBottom: 12,
  },

  sectionTitle: {
    margin: 0,
    color: "#8B0000",
    fontSize: "clamp(24px, 2.8vw, 36px)",
    lineHeight: 1.2,
    fontWeight: 900,
  },

  infoSection: {
    maxWidth: 1320,
    margin: "0 auto",
    padding: "54px 24px 0",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 18,
  },

  infoCard: {
    background: "#fff",
    borderRadius: 20,
    border: "1px solid #f1dde1",
    padding: 24,
    boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
  },

  infoIcon: {
    display: "inline-flex",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    background: "#fff0f4",
    fontSize: 24,
    marginBottom: 16,
  },

  infoTitle: {
    margin: "0 0 10px",
    fontSize: 22,
    color: "#8B0000",
    fontWeight: 800,
  },

  infoText: {
    margin: 0,
    color: "#66575a",
    lineHeight: 1.7,
    fontSize: 15,
  },

  statsSection: {
    maxWidth: 1320,
    margin: "0 auto",
    padding: "28px 24px 70px",
  },

  statsCard: {
    background: "linear-gradient(135deg, #8B0000, #d63b8d)",
    borderRadius: 24,
    padding: "20px 24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
    color: "#fff",
    boxShadow: "0 18px 40px rgba(139,0,0,0.22)",
  },

  statsText: {
    fontSize: 18,
    fontWeight: 700,
  },

  statsDivider: {
    width: 1,
    height: 22,
    background: "rgba(255,255,255,0.35)",
  },
};

export default Home;