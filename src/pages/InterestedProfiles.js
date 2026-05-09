import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function InterestedProfiles() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://matrimony-backend-1-ri82.onrender.com/api/users")
      .then(res => {
        // ❤️ filter only interested
        const liked = res.data.filter(user => user.interested);
        setUsers(liked);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h2>❤️ Interested Profiles</h2>

      {users.length === 0 && <p>No interested profiles yet</p>}

      <div style={{
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {users.map(user => (
          <div key={user._id} style={{
            width: 250,
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 10
          }}>
            <img
              src={user.image}
              alt="profile"
              style={{ width: "100%", height: 200, objectFit: "cover" }}
            />

            <h3>{user.name}</h3>
            <p>{user.age} yrs • {user.location}</p>

            <Link to={`/profile/${user._id}`}>
              <button style={{
                background: "#8B0000",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: 5
              }}>
                View
              </button>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default InterestedProfiles;