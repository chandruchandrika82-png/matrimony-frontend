import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profiles() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [location, setLocation] = useState("");
  const [religion, setReligion] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://matrimony-backend-1-ri82.onrender.com/api/users"
      );

      setUsers(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const toggleInterest = async (id) => {
    try {
      await axios.put(
        `https://matrimony-backend-1-ri82.onrender.com/api/users/${id}/toggle`
      );

      fetchUsers();

    } catch (err) {
      console.log(err);
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(search.toLowerCase()) &&
      (minAge === "" || user.age >= Number(minAge)) &&
      (maxAge === "" || user.age <= Number(maxAge)) &&
      (location === "" ||
        user.location?.toLowerCase().includes(location.toLowerCase())) &&
      (religion === "" ||
        user.religion?.toLowerCase().includes(religion.toLowerCase()))
    );
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💍 Find Your Match</h1>

      {/* SEARCH */}
      <input
        placeholder="Search name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* FILTERS */}
      <div style={styles.filters}>
        <input
          type="number"
          placeholder="Min Age"
          value={minAge}
          onChange={(e) => setMinAge(e.target.value)}
          style={styles.filterInput}
        />

        <input
          type="number"
          placeholder="Max Age"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
          style={styles.filterInput}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.filterInput}
        />

        <input
          placeholder="Religion"
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          style={styles.filterInput}
        />
      </div>

      {/* PROFILE CARDS */}
      <div style={styles.grid}>
        {filteredUsers.map((user) => (
          <div key={user._id} style={styles.card}>
            <img
              src={`https://matrimony-backend-1-ri82.onrender.com${user.image}`}
              style={styles.image}
              alt="profile"
            />

            <h3 style={styles.name}>{user.name}</h3>

            <p style={styles.info}>
              {user.age} yrs • {user.location}
            </p>

            {user.interested && (
              <p style={styles.badge}>❤️ Interested</p>
            )}

            <div style={styles.buttons}>
              <Link to={`/profile/${user._id}`}>
                <button style={styles.viewBtn}>View</button>
              </Link>

              {/* CHAT BUTTON */}
              <Link to={`/chat/${user._id}`}>
                <button style={styles.chatBtn}>💬 Chat</button>
              </Link>

              <button
                onClick={() => toggleInterest(user._id)}
                style={{
                  ...styles.interestBtn,
                  background: user.interested ? "#ccc" : "#ff4d6d"
                }}
              >
                {user.interested ? "Saved" : "❤️ Interested"}
              </button>
            </div>
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
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  title: {
    marginBottom: 20,
    color: "#8B0000",
    fontSize: 28
  },

  search: {
    padding: 12,
    width: "60%",
    maxWidth: 400,
    borderRadius: 25,
    border: "1px solid #ddd",
    marginBottom: 20
  },

  filters: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    marginBottom: 30,
    flexWrap: "wrap"
  },

  filterInput: {
    padding: 10,
    borderRadius: 20,
    border: "1px solid #ccc"
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 25
  },

  card: {
    width: 260,
    padding: 20,
    background: "white",
    borderRadius: 15,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
  },

  image: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    borderRadius: 12,
    marginBottom: 10
  },

  name: {
    fontSize: 18,
    fontWeight: "bold"
  },

  info: {
    color: "#555",
    marginBottom: 10
  },

  badge: {
    color: "green",
    fontWeight: "bold",
    marginBottom: 10
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10
  },

  viewBtn: {
    padding: "6px 12px",
    background: "#8B0000",
    color: "white",
    border: "none",
    borderRadius: 5
  },

  chatBtn: {
    padding: "6px 12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 5
  },

  interestBtn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: 5,
    color: "white"
  }
};

export default Profiles;