import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InterestRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const loggedInUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const API = "https://matrimony-backend-zbvm.onrender.com/api";

  const fetchRequests = useCallback(async () => {
    if (!loggedInUser?._id) {
      setRequests([]);
      return;
    }

    try {
      const res = await axios.get(`${API}/users/${loggedInUser._id}`);

      const interestIds = res.data.interestRequests || [];

      if (interestIds.length > 0) {
        const users = await Promise.all(
          interestIds.map(async (id) => {
            const userRes = await axios.get(`${API}/users/${id}`);
            return userRes.data;
          })
        );

        setRequests(users);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.log(err);
      setRequests([]);
    }
  }, [API, loggedInUser?._id]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const acceptRequest = async (senderId) => {
    try {
      if (!loggedInUser?._id) return;

      await axios.put(
        `${API}/users/${loggedInUser._id}/accept/${senderId}`
      );

      alert("❤️ Request Accepted");
      fetchRequests();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Accept failed");
    }
  };

  const rejectRequest = async (senderId) => {
    try {
      if (!loggedInUser?._id) return;

      await axios.put(
        `${API}/users/${loggedInUser._id}/reject/${senderId}`
      );

      alert("❌ Request Rejected");
      fetchRequests();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Reject failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Back
        </button>

        <div style={styles.headingCard}>
          <h1 style={styles.heading}>📩 Interest Requests</h1>
        </div>

        <div style={{ width: 100 }} />
      </div>

      {requests.length === 0 ? (
        <div style={styles.emptyCard}>
          <div style={{ fontSize: 60 }}>💌</div>

          <h2 style={{ color: "#8B0000", marginTop: 10 }}>
            No Pending Requests
          </h2>

          <p style={{ color: "#666" }}>
            When someone shows interest in your profile, you'll see their request here.
          </p>

          <button
            onClick={() => navigate("/profiles")}
            style={styles.browseBtn}
          >
            Browse Profiles
          </button>
        </div>
      ) : (
        requests.map((user) => (
          <div key={user._id} style={styles.card}>
            <img
              src={user.image || "https://placehold.co/120x120?text=No+Image"}
              alt={user.name}
              style={styles.image}
            />

            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>{user.name}</h2>
              <p style={{ marginTop: 8 }}>
                {user.age ? `${user.age} Years` : "Age not mentioned"} •{" "}
                {user.currentCity || "Location not mentioned"}
              </p>

              <div style={{ marginTop: 15 }}>
                <button
                  onClick={() => acceptRequest(user._id)}
                  style={styles.accept}
                >
                  ✅ Accept
                </button>

                <button
                  onClick={() => rejectRequest(user._id)}
                  style={styles.reject}
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "100px 40px 40px",
    background: "linear-gradient(to right, #ffe4ec, #fff7fb)",
  },

  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
    marginBottom: 30,
  },

  backBtn: {
    background: "#8B0000",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
  },

  headingCard: {
    width: "fit-content",
    margin: "0 auto",
    background: "#fff",
    padding: "18px 35px",
    borderRadius: 20,
    boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
  },

  heading: {
    margin: 0,
    color: "#8B0000",
    fontSize: 34,
    fontWeight: "bold",
  },

  emptyCard: {
    maxWidth: 550,
    margin: "50px auto",
    background: "#fff",
    borderRadius: 20,
    padding: 40,
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },

  browseBtn: {
    marginTop: 20,
    padding: "12px 25px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
  },

  card: {
    display: "flex",
    alignItems: "center",
    gap: 25,
    background: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #8B0000",
  },

  accept: {
    padding: "10px 20px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginRight: 10,
    fontWeight: "bold",
  },

  reject: {
    padding: "10px 20px",
    background: "crimson",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default InterestRequests;