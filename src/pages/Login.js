import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "https://matrimony-backend-1-ri82.onrender.com/api/login",
        form
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful 💖");

      navigate("/profiles");

    } catch (err) {

      console.log(err);

      alert(
        err?.response?.data?.error ||
        "Login Failed"
      );

    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          🔐 Welcome Back
        </h1>

        <p style={styles.subtitle}>
          Login to continue your journey
        </p>

        <input
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
          Don’t have an account?

          <Link to="/register" style={styles.link}>
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
    background:
      "linear-gradient(to right, #746031f5, #ffe4ea)",
    fontFamily: "Arial"
  },

  card: {
    width: 380,
    background: "#fff",
    padding: 40,
    borderRadius: 25,
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 18
  },

  title: {
    textAlign: "center",
    marginBottom: 0,
    color: "#8B0000"
  },

  subtitle: {
    textAlign: "center",
    marginTop: 0,
    color: "#777"
  },

  input: {
    padding: 15,
    borderRadius: 12,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 15
  },

  button: {
    padding: 15,
    border: "none",
    borderRadius: 12,
    background: "#8B0000",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer"
  },

  bottomText: {
    textAlign: "center",
    color: "#666"
  },

  link: {
    marginLeft: 6,
    color: "#ff4d6d",
    textDecoration: "none",
    fontWeight: "bold"
  }

};

export default Login;