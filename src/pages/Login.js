import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Backend API
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
      const res = await axios.post(
        `${API}/login`,
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful 💖");
      navigate("/profiles");

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Login Failed");
    }
  };

  

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <button
          onClick={handleBack}
          style={styles.backButton}
        >
          ← Back
        </button>

        <h1 style={styles.title}>
          💍 Digi Ghatak Login
        </h1>

        <p style={styles.subtitle}>
          Find your perfect life partner
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button
          onClick={handleLogin}
          style={styles.button}
        >
          Login
        </button>

        <p style={styles.bottomText}>
          Don't have an account?

          <Link
            to="/register"
            style={styles.link}
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    background: "linear-gradient(to right, #746031f5, #ffe4ea)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },

  card: {
    width: "90%",
    maxWidth: 380,
    background: "#fff",
    padding: 30,
    borderRadius: 25,
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    boxSizing: "border-box",
  },

  backButton: {
  alignSelf: "flex-start",
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid #8B0000",
  background: "#fff",
  color: "#8B0000",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "15px",
  transition: "0.3s",
},

  title: {
    textAlign: "center",
    color: "#8B0000",
    margin: 0,
    fontSize: "clamp(24px, 5vw, 32px)",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginTop: 0,
    fontSize: "clamp(14px, 3vw, 16px)",
  },

  input: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 15,
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: 15,
    border: "none",
    borderRadius: 12,
    background: "#8B0000",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },

  bottomText: {
    textAlign: "center",
    color: "#666",
  },

  link: {
    marginLeft: 6,
    color: "#ff4d6d",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;