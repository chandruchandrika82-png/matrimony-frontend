import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const API = "https://matrimony-backend-zbvm.onrender.com/api";
  // const API = "http://localhost:5000/api";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      const res = await axios.post(`${API}/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful 💖");
      navigate("/profiles");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.leftPanel}>
          <div style={styles.overlay}>
            <div style={styles.leftContent}>
              <h1 style={styles.brandTitle}>Namakkal Matrimony</h1>
              <p style={styles.brandText}>
                Find your perfect life partner with trust, privacy, and care.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.card}>
            <button onClick={handleBack} style={styles.backButton}>
              ← Back
            </button>

            <div style={styles.logoWrap}>
              <img
                src="/logo.png"
                alt="Namakkal Matrimony Logo"
                style={styles.logo}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <h2 style={styles.title}>User Login</h2>
            <p style={styles.subtitle}>Sign in to continue</p>

            <label style={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />

            <button onClick={handleLogin} style={styles.button}>
              Login
            </button>

            <p style={styles.bottomText}>
              Don’t have an account?
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f6f1f2",
    padding: "20px",
    boxSizing: "border-box",
  },

  wrapper: {
    minHeight: "calc(100vh - 40px)",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
    background: "#fff",
  },

  leftPanel: {
    position: "relative",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1529633036873-8a8d3d0f7d1f?auto=format&fit=crop&w=1200&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "720px",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(30,20,20,0.10), rgba(30,20,20,0.18))",
    display: "flex",
    alignItems: "flex-end",
    padding: "40px",
    boxSizing: "border-box",
  },

  leftContent: {
    maxWidth: "420px",
    color: "#fff",
  },

  brandTitle: {
    margin: 0,
    fontSize: "clamp(34px, 5vw, 58px)",
    fontWeight: 800,
    lineHeight: 1.05,
    textShadow: "0 6px 20px rgba(0,0,0,0.25)",
  },

  brandText: {
    marginTop: "14px",
    fontSize: "clamp(15px, 2vw, 18px)",
    lineHeight: 1.6,
    maxWidth: "360px",
    textShadow: "0 4px 12px rgba(0,0,0,0.18)",
  },

  rightPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px",
    background: "#fff",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background: "#fff",
    borderRadius: "20px",
    padding: "26px",
    boxSizing: "border-box",
  },

  backButton: {
    alignSelf: "flex-start",
    padding: "8px 14px",
    borderRadius: "10px",
    border: "1px solid #8B0000",
    background: "#fff",
    color: "#8B0000",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "18px",
  },

  logoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "18px",
  },

  logo: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
    borderRadius: "50%",
  },

  title: {
    textAlign: "center",
    color: "#8B0000",
    margin: "0 0 8px",
    fontSize: "28px",
    fontWeight: 800,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    margin: "0 0 22px",
    fontSize: "15px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#333",
    fontWeight: 600,
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "14px 15px",
    borderRadius: "12px",
    border: "1px solid #dcdcdc",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    marginBottom: "18px",
    background: "#fff",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#d63b8d",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "6px",
  },

  bottomText: {
    textAlign: "center",
    color: "#666",
    marginTop: "18px",
    fontSize: "14px",
  },

  link: {
    marginLeft: "6px",
    color: "#8B0000",
    textDecoration: "none",
    fontWeight: 700,
  },

  "@media (max-width: 900px)": {
    wrapper: {
      gridTemplateColumns: "1fr",
    },
    leftPanel: {
      minHeight: "260px",
    },
  },
};

export default Login;