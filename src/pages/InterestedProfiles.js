import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function InterestedProfiles() {
  const navigate = useNavigate();
  const API = "https://matrimony-backend-zbvm.onrender.com/api";
  const BASE_URL = "https://matrimony-backend-zbvm.onrender.com";

  const loggedInUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/users`);
      setUsers(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedInUser?._id) {
      navigate("/login");
      return;
    }

    fetchUsers();
  }, [loggedInUser?._id, navigate]);

  const interestedUsers = users.filter((user) =>
    user.interestRequests?.some((id) => id.toString() === loggedInUser?._id)
  );

  const filteredUsers = interestedUsers.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers];

  switch (sortBy) {
    case "name":
      sortedUsers.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      break;
    case "ageLow":
      sortedUsers.sort((a, b) => Number(a.age || 0) - Number(b.age || 0));
      break;
    case "ageHigh":
      sortedUsers.sort((a, b) => Number(b.age || 0) - Number(a.age || 0));
      break;
    case "oldest":
      sortedUsers.reverse();
      break;
    default:
      break;
  }

  const removeInterest = async (receiverId) => {
    try {
      const senderId = loggedInUser?._id;
      if (!senderId) return;

      await axios.put(`${API}/users/${receiverId}/interest/${senderId}`);
      await fetchUsers();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <div style={styles.leftTop}>
            <button onClick={() => navigate(-1)} style={styles.backBtn}>
              ← Back
            </button>

            <div>
              <div style={styles.pagePill}>Your Interested Profiles</div>
              <h1 style={styles.title}>Interested</h1>
              <p style={styles.subtitle}>
                Profiles you have shown interest in appear here.
              </p>
            </div>
          </div>

          <div style={styles.headerActions}>
            <button onClick={() => navigate("/profiles")} style={styles.actionBtn}>
              Browse Profiles
            </button>
          </div>
        </div>

        <div style={styles.summaryRow}>
          <div style={styles.summaryCard}>
            <strong>{interestedUsers.length}</strong>
            <span>Interested Profiles</span>
          </div>
          <div style={styles.summaryCard}>
            <strong>{users.filter((u) => u.isPremium).length}</strong>
            <span>Premium Profiles</span>
          </div>
          <div style={styles.summaryCard}>
            <strong>
              {users.filter((u) => u.businessVerified || u.gstVerified).length}
            </strong>
            <span>Verified Profiles</span>
          </div>
        </div>

        <div style={styles.searchCard}>
          <input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />

          <div style={styles.sortRow}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.filterInput}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="ageLow">Age: Low to High</option>
              <option value="ageHigh">Age: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingCard}>Loading...</div>
        ) : sortedUsers.length > 0 ? (
          <div style={styles.grid}>
            {sortedUsers.map((user) => (
              <div key={user._id} style={styles.card}>
                <div style={styles.imageWrap}>
                  <img
                    src={
                      user.image
                        ? user.image.startsWith("http")
                          ? user.image
                          : `${BASE_URL}${user.image}`
                        : "https://placehold.co/300x320?text=No+Image"
                    }
                    style={styles.image}
                    alt="profile"
                  />

                  <div style={styles.badgeRow}>
                    {user.isPremium && (
                      <span style={styles.premiumBadge}>Premium</span>
                    )}
                    {(user.businessVerified || user.gstVerified) && (
                      <span style={styles.verifiedBadge}>Verified</span>
                    )}
                  </div>
                </div>

                <div style={styles.cardContent}>
                  <h3 style={styles.name}>{user.name}</h3>

                  <p style={styles.info}>
                    {user.age ? `${user.age} yrs` : "--"} •{" "}
                    {user.currentCity ||
                      user.nativePlace ||
                      user.district ||
                      "Location not mentioned"}
                  </p>

                  <div style={styles.metaRow}>
                    <span style={styles.metaChip}>
                      🕉️ {user.religion || "Not Mentioned"}
                    </span>
                    <span style={styles.metaChip}>
                      💍 {user.maritalStatus || "NA"}
                    </span>
                  </div>

                  <p style={styles.interestedBadge}>❤️ Interested</p>

                  <div style={styles.buttons}>
                    <Link to={`/profile/${user._id}`} style={styles.viewBtn}>
                      View
                    </Link>

                    <button
                      onClick={() => removeInterest(user._id)}
                      style={styles.removeBtn}
                    >
                      Remove Interest
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <h3 style={styles.emptyTitle}>No interested profiles yet</h3>
            <p style={styles.emptyText}>
              When you mark someone as interested, they will appear here.
            </p>
            <button onClick={() => navigate("/profiles")} style={styles.actionBtn}>
              Browse Profiles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff8fb",
    padding: "22px",
    color: "#3a2a2a",
  },

  container: {
    maxWidth: 1450,
    margin: "0 auto",
    paddingTop: "96px",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },

  leftTop: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },

  pagePill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 12px",
    borderRadius: 999,
    background: "#ffe3ea",
    color: "#8B0000",
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 6,
  },

  title: {
    margin: 0,
    color: "#8B0000",
    fontSize: 30,
    fontWeight: 900,
    lineHeight: 1.05,
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#6f5b61",
    fontSize: 14,
  },

  headerActions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },

  backBtn: {
    padding: "10px 18px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 700,
    boxShadow: "0 10px 18px rgba(139,0,0,0.15)",
  },

  actionBtn: {
    padding: "10px 18px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 700,
    boxShadow: "0 10px 18px rgba(139,0,0,0.15)",
  },

  summaryRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 14,
    marginBottom: 18,
  },

  summaryCard: {
    background: "#fff",
    border: "1px solid #f1dde1",
    borderRadius: 20,
    padding: "16px 18px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  searchCard: {
    background: "#fff",
    padding: 22,
    borderRadius: 24,
    marginBottom: 22,
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    border: "1px solid #f4d8df",
  },

  search: {
    padding: 15,
    width: "100%",
    borderRadius: 30,
    border: "1px solid #ead2d9",
    fontSize: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    outline: "none",
    boxSizing: "border-box",
  },

  sortRow: {
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
  },

  filterInput: {
    width: "100%",
    maxWidth: 240,
    padding: "12px 16px",
    borderRadius: 24,
    border: "1px solid #e3c7cf",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
  },

  loadingCard: {
    background: "#fff",
    borderRadius: 24,
    padding: "36px 24px",
    textAlign: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    border: "1px solid #f4d8df",
    color: "#666",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
    alignItems: "stretch",
  },

  card: {
    width: "100%",
    background: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
    border: "1px solid #f4d8df",
  },

  imageWrap: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 340,
    objectFit: "cover",
    display: "block",
    background: "#f3f3f3",
  },

  badgeRow: {
    position: "absolute",
    top: 12,
    left: 12,
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },

  premiumBadge: {
    background: "#8B0000",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
  },

  verifiedBadge: {
    background: "#1f8f4a",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
  },

  cardContent: {
    padding: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: 900,
    marginBottom: 10,
    color: "#8B0000",
  },

  info: {
    color: "#666",
    marginBottom: 10,
    fontSize: 15,
  },

  metaRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 10,
  },

  metaChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 10px",
    borderRadius: 999,
    background: "#fff6f8",
    color: "#6a5459",
    border: "1px solid #f1dde1",
    fontSize: 13,
    fontWeight: 700,
  },

  interestedBadge: {
    background: "#e8fff0",
    color: "green",
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 20,
    fontWeight: 700,
    marginBottom: 18,
    fontSize: 14,
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },

  viewBtn: {
    padding: "10px 16px",
    background: "#8B0000",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    boxShadow: "0 10px 18px rgba(139,0,0,0.12)",
  },

  removeBtn: {
    padding: "10px 16px",
    background: "#fff",
    color: "#8B0000",
    border: "1px solid #8B0000",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 800,
    boxShadow: "0 10px 18px rgba(0,0,0,0.06)",
  },

  emptyState: {
    background: "#fff",
    borderRadius: 24,
    padding: "36px 24px",
    textAlign: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    border: "1px solid #f4d8df",
  },

  emptyTitle: {
    margin: 0,
    color: "#8B0000",
    fontSize: 24,
  },

  emptyText: {
    margin: "10px 0 0",
    color: "#666",
    marginBottom: 18,
  },
};

export default InterestedProfiles;