import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SavedProfiles() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchSavedUsers();
  }, []);

  const fetchSavedUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");

    // ✅ Only interested users
    const saved = res.data.filter(user => user.interested === true);
    setUsers(saved);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>❤️ Saved Profiles</h1>

      {users.length === 0 && <p>No saved profiles yet</p>}

      <div style={styles.grid}>
        {users.map(user => (
          <div key={user._id} style={styles.card}>
            <img src={user.image} style={styles.image} alt="profile" />

            <h3>{user.name}</h3>
            <p>{user.age} yrs • {user.location}</p>

            <Link to={`/profile/${user._id}`}>
              <button style={styles.viewBtn}>View</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    textAlign: "center",
    background: "#fff5f7",
    minHeight: "100vh"
  },

  title: {
    color: "#8B0000",
    marginBottom: 20
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 25
  },

  card: {
    width: 250,
    padding: 20,
    background: "white",
    borderRadius: 15,
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
  },

  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 10,
    marginBottom: 10
  },

  viewBtn: {
    padding: "6px 12px",
    background: "#8B0000",
    color: "white",
    border: "none",
    borderRadius: 5
  }
};

export default SavedProfiles;