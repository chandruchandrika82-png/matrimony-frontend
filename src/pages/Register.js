import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../config/api";

function Register() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
  console.log("API URL =", API);

  const res = await axios.post(`${API}/register`, {
    name: form.name,
    email: form.email,
    password: form.password,
  });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registered successfully 💖");

      // direct to profile details form
      navigate("/my-profile");
    } catch (err) {
  console.log("FULL ERROR:", err);

  if (err.response) {
    console.log("STATUS:", err.response.status);
    console.log("DATA:", err.response.data);
  } else {
    console.log("NO RESPONSE FROM SERVER");
  }

  alert(err.response?.data?.error || err.message);
}
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>💍 Namakkal Matrimony</h1>
        <p style={styles.subtitle}>
          Create your account and complete your profile
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <p style={styles.bottomText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
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
    background: "linear-gradient(to right, #ffe4ec, #fbe9ef)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },

  card: {
    width: "90%",
    maxWidth: 420,
    background: "#fff",
    padding: 32,
    borderRadius: 24,
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxSizing: "border-box",
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
    margin: 0,
  },

  link: {
    marginLeft: 6,
    color: "#ff4d6d",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;
