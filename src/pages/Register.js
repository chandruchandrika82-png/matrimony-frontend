import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const API = "https://matrimony-backend-1-ri82.onrender.com/api";
  // const API = "http://localhost:5000/api";

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    registerAs: "Self",
  });

  const handleBack = () => navigate("/");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (!form.name || !form.mobile || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    if (form.mobile.length !== 10) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${API}/register`, {
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        password: form.password,
        registerAs: form.registerAs,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registration Successful 💍");
      navigate("/edit-profile");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <button onClick={handleBack} style={styles.backButton}>
          ← Back
        </button>

        <h1 style={styles.title}>💍 Create Account</h1>

        <p style={styles.subtitle}>Begin your beautiful journey</p>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

<input
  type="tel"
  name="mobile"
  placeholder="Mobile Number"
  maxLength={10}
  value={form.mobile}
  onChange={(e) =>
    setForm({
      ...form,
      mobile: e.target.value.replace(/\D/g, ""),
    })
  }
  style={styles.input}
/>

        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="registerAs"
          value={form.registerAs}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Self">Self Registration</option>
          <option value="Family">Family Registration</option>
        </select>

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
    background: "linear-gradient(to right,#876532ee,#ffe4ea)",
    fontFamily: "Arial",
  },

  card: {
    width: 360,
    background: "#fff",
    padding: "25px 35px",
    borderRadius: 25,
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  title: {
    textAlign: "center",
    color: "#8B0000",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
  },

  input: {
    padding: 8,
    borderRadius: 11,
    border: "1px solid #ddd",
    fontSize: 14,
    outline: "none",
  },

  button: {
    padding: 15,
    border: "none",
    borderRadius: 12,
    background: "#ff4d6d",
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

  backButton: {
    width: 80,
    padding: 8,
    border: "none",
    borderRadius: 10,
    background: "#f3f3f3",
    color: "#8B0000",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Register;