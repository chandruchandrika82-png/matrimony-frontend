import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    try {

      const res = await axios.post(
        "https://matrimony-backend-1-ri82.onrender.com/api/register",
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

      alert("Registration Successful 💍");

      navigate("/profiles");

    } catch (err) {

      console.log(err);

      alert(
        err?.response?.data?.error ||
        "Registration Failed"
      );

    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          💍 Create Account
        </h1>

        <p style={styles.subtitle}>
          Begin your beautiful journey
        </p>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

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
          onClick={handleRegister}
          style={styles.button}
        >
          Register
        </button>

        <p style={styles.bottomText}>
          Already have an account?

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
    background:
      "linear-gradient(to right, #876532ee, #ffe4ea)",
    fontFamily: "Arial"
  },

  card: {
    width: 380,
    background: "#ffffff",
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
    background: "#ff4d6d",
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

export default Register;