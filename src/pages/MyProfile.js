import React, { useEffect, useState } from "react";
import axios from "axios";

function MyProfile() {
    
    const [profile, setProfile] = useState({});
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("Logged in user:", user);
  console.log("User ID:", user?._id);

  if (!user) return;

  axios
  .get(`https://matrimony-backend.onrender.com/api/users/${user._id}`)
    .then((res) => {
      console.log("Profile data:", res.data);
      setProfile(res.data);
    })
    .catch((err) => console.log(err));
}, []);
  return (
    <div style={styles.container}>
      <h1>👤 My Profile</h1>

      <div style={styles.card}>
        <img
          src={
  profile.image
    ? `https://matrimony-backend-1-ri82.onrender.com${profile.image}`
    : "https://via.placeholder.com/150"
}
          alt="Profile"
          style={styles.image}
        />

        <h2>{profile.name || "No Name"}</h2>
        <p>Age: {profile.age || "--"}</p>
        <p>Gender: {profile.gender || "--"}</p>
        <p>Religion: {profile.religion || "--"}</p>
        <p>Education: {profile.education || "--"}</p>
        <p>Occupation: {profile.occupation || "--"}</p>
        <button style={styles.button}>
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
    textAlign: "center"
  },

  card: {
    maxWidth: "500px",
    margin: "30px auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px"
  },

  button: {
    marginTop: "20px",
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    background: "#8B0000",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default MyProfile;