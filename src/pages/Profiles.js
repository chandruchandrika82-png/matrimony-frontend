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

      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

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

      <div style={styles.grid}>

        {filteredUsers.map((user) => (

          <div key={user._id} style={styles.card}>

            <img
              src={
                user.image
                  ? `https://matrimony-backend-1-ri82.onrender.com${user.image}`
                  : "https://via.placeholder.com/300x320"
              }
              style={styles.image}
              alt="profile"
            />

            <div style={styles.cardContent}>

              <h3 style={styles.name}>
                {user.name}
              </h3>

              <p style={styles.info}>
                {user.age} yrs • {user.location}
              </p>

              <p style={styles.religion}>
                🕉️ {user.religion || "Not Mentioned"}
              </p>

              {user.interested && (
                <p style={styles.badge}>
                  ❤️ Interested
                </p>
              )}

              <div style={styles.buttons}>

                <Link to={`/profile/${user._id}`}>
                  <button style={styles.viewBtn}>
                    View
                  </button>
                </Link>

                <Link to={`/chat/${user._id}`}>
                  <button style={styles.chatBtn}>
                    💬 Chat
                  </button>
                </Link>

                <button
                  onClick={() => toggleInterest(user._id)}
                  style={{
                    ...styles.interestBtn,
                    background: user.interested ? "#bbb" : "#ff4d6d"
                  }}
                >
                  {user.interested ? "Saved" : "❤️ Interested"}
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

const styles = {

  container: {
  minHeight: "100vh",
  padding: "120px 20px 40px",
  background: "linear-gradient(to bottom right, #4e2f0df4, #ffe4ec)",
  },

  title: {
    marginBottom: 25,
    color: "#8B0000",
    fontSize: 42,
    fontWeight: "700"
  },

  search: {
    padding: 15,
    width: "60%",
    maxWidth: 450,
    borderRadius: 30,
    border: "1px solid #eee",
    marginBottom: 25,
    fontSize: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    outline: "none"
  },

  filters: {
    display: "flex",
    gap: 15,
    justifyContent: "center",
    marginBottom: 40,
    flexWrap: "wrap"
  },

  filterInput: {
    padding: "12px 18px",
    borderRadius: 25,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 14
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 30
  },

  card: {
    width: 300,
    background: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    paddingBottom: 20
  },

  image: {
    width: "100%",
    height: 320,
    objectFit: "cover"
  },

  cardContent: {
    padding: 20
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222"
  },

  info: {
    color: "#666",
    marginBottom: 8,
    fontSize: 15
  },

  religion: {
    color: "#888",
    marginBottom: 15,
    fontSize: 14
  },

  badge: {
    background: "#e8fff0",
    color: "green",
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 20,
    fontWeight: "600",
    marginBottom: 18,
    fontSize: 14
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 15
  },

  viewBtn: {
    padding: "10px 16px",
    background: "#8B0000",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer"
  },

  chatBtn: {
    padding: "10px 16px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer"
  },

  interestBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: 10,
    color: "white",
    cursor: "pointer"
  }
};

export default Profiles;