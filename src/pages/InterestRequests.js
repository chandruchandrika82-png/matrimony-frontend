import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InterestRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  fetchRequests();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `https://matrimony-backend-1-ri82.onrender.com/api/users/${loggedInUser._id}`
      );

      if (res.data.interestRequests?.length > 0) {
        const users = await Promise.all(
          res.data.interestRequests.map(async (id) => {
            const user = await axios.get(
              `https://matrimony-backend-1-ri82.onrender.com/api/users/${id}`
            );
            return user.data;
          })
        );

        setRequests(users);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const acceptRequest = async (senderId) => {
    try {
      await axios.put(
        `https://matrimony-backend-1-ri82.onrender.com/api/users/${loggedInUser._id}/accept/${senderId}`
      );

      alert("❤️ Request Accepted");
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectRequest = async (senderId) => {
    try {
      await axios.put(
        `https://matrimony-backend-1-ri82.onrender.com/api/users/${loggedInUser._id}/reject/${senderId}`
      );

      alert("❌ Request Rejected");
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
        

      <div style={styles.headerRow}>

  <button
    onClick={() => navigate(-1)}
    style={styles.backBtn}
  >
    ← Back
  </button>

  <div style={styles.headingCard}>
    <h1 style={styles.heading}>
      📩 Interest Requests
    </h1>
  </div>

  <div style={{ width: 100 }}></div>

      </div>

      {requests.length === 0 ? (
        <div style={styles.emptyCard}>
          <div style={{ fontSize: 60 }}>💌</div>

          <h2 style={{ color: "#8B0000", marginTop: 10 }}>
            No Pending Requests
          </h2>

          <p style={{ color: "#666" }}>
            When someone shows interest in your profile,
            you'll see their request here.
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
          <div
            key={user._id}
            style={styles.card}
          >
            <img
              src={
                user.image ||
                "https://placehold.co/120x120?text=No+Image"
              }
              alt={user.name}
              style={styles.image}
            />

            <div style={{ flex: 1 }}>
              <h2>{user.name}</h2>

              <p>
                {user.age} Years • {user.currentCity}
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
  background: "linear-gradient(to right, #746031f5, #ffe4ea)",
},

 

backBtn: {
  position: "fixed",
  top: "95px",
  left: "25px",
  zIndex: 1001,

  background: "#8B0000",
  color: "#fff",
  border: "none",
  padding: "12px 22px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 5px 15px rgba(0,0,0,0.25)"
},

  headingCard: {
  width: "fit-content",
  margin: "20px auto 40px",
  background: "#fff",
  padding: "18px 35px",
  borderRadius: 20,
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
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