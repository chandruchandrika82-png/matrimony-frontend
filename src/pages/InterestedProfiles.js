import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function InterestedProfiles() {
  const navigate = useNavigate();
  const API = "https://matrimony-backend-zbvm.onrender.com/api";

  const [users, setUsers] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");

  const fetchInterestedProfiles = useCallback(async () => {
    try {
      if (!loggedInUser?._id) {
        setUsers([]);
        return;
      }

      const res = await axios.get(`${API}/users`);

      const interestedOnly = res.data.filter((user) =>
        user.interestRequests?.some(
          (id) => id.toString() === loggedInUser._id
        )
      );

      setUsers(interestedOnly);
    } catch (err) {
      console.log(err);
      setUsers([]);
    }
  }, [API, loggedInUser?._id]);

  useEffect(() => {
    fetchInterestedProfiles();
  }, [fetchInterestedProfiles]);

  const getImageSrc = (user) => {
    if (!user.image) return "https://placehold.co/300x320?text=No+Image";
    return user.image.startsWith("http")
      ? user.image
      : `https://matrimony-backend-zbvm.onrender.com${user.image}`;
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>❤️ Interested Profiles</h2>

        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Back
        </button>

        {users.length === 0 ? (
          <div style={styles.emptyCard}>
            <p style={styles.emptyText}>No interested profiles yet</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {users.map((user) => (
              <div key={user._id} style={styles.card}>
                <img
                  src={getImageSrc(user)}
                  alt={user.name}
                  style={styles.image}
                />

                <div style={styles.content}>
                  <h3 style={styles.name}>{user.name}</h3>
                  <p style={styles.info}>
                    {user.age ? `${user.age} yrs` : "--"} •{" "}
                    {user.currentCity || user.nativePlace || user.district || "Location not mentioned"}
                  </p>

                  <p style={styles.badge}>❤️ Interested</p>

                  <Link to={`/profile/${user._id}`} style={styles.viewBtn}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "120px 20px 40px",
    background: "linear-gradient(to bottom right, #d79861, #ffe4ec)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    color: "#8B0000",
    marginBottom: 18,
  },
  backBtn: {
    padding: "10px 18px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "24px",
    fontSize: "16px",
    fontWeight: "600",
  },
  emptyCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 30,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    maxWidth: 500,
    margin: "0 auto",
  },
  emptyText: {
    margin: 0,
    color: "#333",
    fontSize: 18,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
    marginTop: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: 260,
    objectFit: "cover",
    display: "block",
  },
  content: {
    padding: 16,
  },
  name: {
    margin: "0 0 8px",
    color: "#8B0000",
  },
  info: {
    margin: 0,
    color: "#666",
  },
  badge: {
    display: "inline-block",
    marginTop: 12,
    marginBottom: 14,
    padding: "6px 12px",
    borderRadius: 999,
    background: "#ffedf3",
    color: "#d63b8d",
    fontWeight: 700,
  },
  viewBtn: {
    display: "inline-block",
    padding: "10px 16px",
    background: "#8B0000",
    color: "#fff",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 700,
  },
};

export default InterestedProfiles;