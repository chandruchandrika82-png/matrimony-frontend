import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();

  const API = "https://matrimony-backend-zbvm.onrender.com/api";

  const [profile, setProfile] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("Logged in user:", user);
    console.log("User ID:", user?._id);

    if (!user) return;

    axios
      .get(`${API}/users/${user._id}`)
      .then((res) => {
        console.log("Profile data:", res.data);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1>👤 My Profile</h1>

      <div style={styles.card}>
        <img
          src={
            profile.image
              ? profile.image
              : "https://via.placeholder.com/150"
          }
          alt="Profile"
          style={styles.image}
        />

        <h2>{profile.name || "No Name"}</h2>

        <p><strong>Email:</strong> {profile.email || "--"}</p>
        <p><strong>Mobile:</strong> {profile.mobile || "--"}</p>
        <p><strong>Age:</strong> {profile.age || "--"}</p>
        <p><strong>Gender:</strong> {profile.gender || "--"}</p>
        <p><strong>Religion:</strong> {profile.religion || "--"}</p>
        <p><strong>Caste:</strong> {profile.caste || "--"}</p>
        <p><strong>Education:</strong> {profile.education || "--"}</p>
        <p><strong>Occupation:</strong> {profile.occupation || "--"}</p>

        <button
          style={styles.button}
          onClick={() => navigate(`/edit-profile/${profile._id}`)}
        >
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "120px 20px",
    background: "#fff5f7",
    minHeight: "100vh",
    textAlign: "center",
  },

  card: {
    maxWidth: "500px",
    margin: "30px auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
  },

  button: {
    marginTop: "20px",
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    background: "#8B0000",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default MyProfile;