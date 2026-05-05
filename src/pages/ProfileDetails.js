import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProfileDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  // ✅ LIVE BACKEND URL
  const API = "https://matrimony-backend-1-ri82.onrender.com/api";

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log("API ERROR:", err);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [fetchUser, id]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <img src={user.image} style={styles.image} alt="profile" />

      <h1>{user.name}</h1>
      <p>{user.age} yrs</p>
      <p>{user.location}</p>

      <hr />

      <h3>📌 Personal Details</h3>
      <p>Gender: {user.gender}</p>
      <p>DOB: {user.dob}</p>
      <p>Birth Place: {user.placeOfBirth || "Not provided"}</p>

      <h3>🎓 Education & Job</h3>
      <p>{user.education}</p>
      <p>{user.job}</p>
      <p>{user.income}</p>

      <h3>👨‍👩‍👧 Family</h3>
      <p>Father: {user.fatherName}</p>
      <p>Mother: {user.motherName}</p>

      <h3>🔮 Horoscope</h3>

      {user.zodiacImage ? (
        <img src={user.zodiacImage} style={styles.horoImg} alt="zodiac" />
      ) : (
        <p>No Zodiac Image</p>
      )}

      {user.navamsaImage ? (
        <img src={user.navamsaImage} style={styles.horoImg} alt="navamsa" />
      ) : (
        <p>No Navamsa Image</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    textAlign: "center",
    background: "#f5f5f5",
    minHeight: "100vh",
  },

  image: {
    width: 250,
    height: 250,
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: 20,
  },

  horoImg: {
    width: 300,
    marginTop: 10,
    borderRadius: 10,
  },
};

export default ProfileDetails;