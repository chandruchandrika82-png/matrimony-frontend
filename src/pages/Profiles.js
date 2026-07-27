import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Profiles() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const [currentLocation, setCurrentLocation] = useState("");

  const [district, setDistrict] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");

  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");

  const [star, setStar] = useState("");
  const [rashi, setRashi] = useState("");

  const [maritalStatus, setMaritalStatus] = useState("");
  const [nri, setNri] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {

      const res = await axios.get(
        "https://matrimony-backend-1-ri82.onrender.com/api/users"
      );
      console.log(res.data);
      

      setUsers(res.data);

    } catch (err) {
      console.log(err);
    }
  };


 const sendInterest = async (receiverId) => {
  try {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      alert("Please login first.");
      return;
    }

    const senderId = loggedInUser._id;

    console.log("Receiver ID:", receiverId);
    console.log("Sender ID:", senderId);

    await axios.put(
      `https://matrimony-backend-1-ri82.onrender.com/api/users/${receiverId}/interest/${senderId}`
    );

    alert("❤️ Interest request sent!");

  } catch (err) {
    console.log("ERROR:", err);
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);

    alert(err.response?.data?.error || err.message);
  }
};
  const deleteUser = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this profile?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `https://matrimony-backend-1-ri82.onrender.com/api/users/${id}`
    );

    // Refresh the cards
    fetchUsers();

  } catch (err) {
    console.log(err);
    alert("Failed to delete profile");
  }
};
  const filteredUsers = users.filter((user) => {
  return (
    user.name?.toLowerCase().includes(search.toLowerCase()) &&

    (minAge === "" || Number(user.age) >= Number(minAge)) &&
    (maxAge === "" || Number(user.age) <= Number(maxAge)) &&

    (currentLocation === "" ||
      user.currentCity
        ?.toLowerCase()
        .includes(currentLocation.toLowerCase()) ||

      user.nativePlace
        ?.toLowerCase()
        .includes(currentLocation.toLowerCase()) ||

      user.district
        ?.toLowerCase()
        .includes(currentLocation.toLowerCase())) &&

    (district === "" ||
      user.district
        ?.toLowerCase()
        .includes(district.toLowerCase())) &&

    (religion === "" ||
      user.religion
        ?.toLowerCase()
        .includes(religion.toLowerCase())) &&

    (caste === "" ||
      user.caste
        ?.toLowerCase()
        .includes(caste.toLowerCase())) &&

    (education === "" ||
      user.education
        ?.toLowerCase()
        .includes(education.toLowerCase())) &&

    (occupation === "" ||
      user.occupation
        ?.toLowerCase()
        .includes(occupation.toLowerCase())) &&

    (star === "" ||
      user.star
        ?.toLowerCase()
        .includes(star.toLowerCase())) &&

    (rashi === "" ||
      user.rashi
        ?.toLowerCase()
        .includes(rashi.toLowerCase())) &&

    (maritalStatus === "" ||
      user.maritalStatus === maritalStatus) &&

    (nri === "" || user.nri === nri)
    )
});


const sortedUsers = [...filteredUsers];

switch (sortBy) {
  case "newest":
    sortedUsers.reverse();
    break;

  case "oldest":
    break;

  case "ageLow":
    sortedUsers.sort((a, b) => Number(a.age) - Number(b.age));
    break;

  case "ageHigh":
    sortedUsers.sort((a, b) => Number(b.age) - Number(a.age));
    break;

  case "premium":
    sortedUsers.sort(
      (a, b) => Number(b.isPremium) - Number(a.isPremium)
    );
    break;

  case "verified":
    sortedUsers.sort(
      (a, b) => Number(b.businessVerified) - Number(a.businessVerified)
    );
    break;

  case "name":
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    break;

  default:
    break;
}

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>💍 Find Your Match</h1>

<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    marginBottom: "20px",
    flexWrap: "wrap"
  }}
>
  <button
    onClick={() => navigate(-1)}
    style={styles.backBtn}
  >
    ← Back
  </button>

  <button
    onClick={() => navigate("/interest-requests")}
    style={styles.viewBtn}
  >
    📩 Interest Requests
  </button>
</div>


    <div style={{ textAlign: "center", marginBottom: 20 }}>
  <input
    placeholder="Search by name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={styles.search}
  />
</div>

<div style={{ textAlign: "center", marginBottom: 20 }}>
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    style={styles.filterInput}
  >
    <option value="">Sort By</option>
    <option value="newest">Newest Profiles</option>
    <option value="oldest">Oldest Profiles</option>
    <option value="ageLow">Age: Low to High</option>
    <option value="ageHigh">Age: High to Low</option>
    <option value="premium">Premium Members</option>
    <option value="verified">Verified Businesses</option>
    <option value="name">Name (A-Z)</option>
  </select>
</div>

<h2
  style={{
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  }}
>
  🔍 Search Filters
</h2>

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
    value={currentLocation}
    onChange={(e) => setCurrentLocation(e.target.value)}
    style={styles.filterInput}
  />

  <input
    placeholder="District"
    value={district}
    onChange={(e) => setDistrict(e.target.value)}
    style={styles.filterInput}
  />

  <input
    placeholder="Religion"
    value={religion}
    onChange={(e) => setReligion(e.target.value)}
    style={styles.filterInput}
  />

  <input
    placeholder="Caste"
    value={caste}
    onChange={(e) => setCaste(e.target.value)}
    style={styles.filterInput}
  />

  <input
    placeholder="Education"
    value={education}
    onChange={(e) => setEducation(e.target.value)}
    style={styles.filterInput}
  />

  <input
    placeholder="Occupation"
    value={occupation}
    onChange={(e) => setOccupation(e.target.value)}
    style={styles.filterInput}
  />

  <input
    placeholder="Star"
    value={star}
    onChange={(e) => setStar(e.target.value)}
    style={styles.filterInput}
  />

  <input
    placeholder="Rashi"
    value={rashi}
    onChange={(e) => setRashi(e.target.value)}
    style={styles.filterInput}
  />

  <select
    value={maritalStatus}
    onChange={(e) => setMaritalStatus(e.target.value)}
    style={styles.filterInput}
  >
    <option value="">Marital Status</option>
    <option value="Never Married">Never Married</option>
    <option value="Divorcee">Divorcee</option>
    <option value="Widow">Widow</option>
    <option value="Widower">Widower</option>
  </select>

  <select
    value={nri}
    onChange={(e) => setNri(e.target.value)}
    style={styles.filterInput}
  >
    <option value="">NRI</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>

</div>

      <div style={styles.grid}>

        {sortedUsers.map((user) => (

          <div key={user._id} style={styles.card}>

            <img
  src={
    user.image
      ? user.image
      : "https://placehold.co/300x320?text=No+Image"
  }
  style={styles.image}
  alt="profile"
/>

            <div style={styles.cardContent}>

              <h3 style={styles.name}>
                {user.name}
              </h3>

              <p style={styles.info}>
  {user.age} yrs • {user.currentCity || user.nativePlace || user.district}
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

  <Link to={`/edit/${user._id}`}>
    <button style={styles.viewBtn}>
      ✏️ Edit
    </button>
  </Link>

  <Link to={`/chat/${user._id}`}>
    <button style={styles.chatBtn}>
      💬 Chat
    </button>
  </Link>

  <button
    onClick={() => sendInterest(user._id)}
    style={{
      ...styles.interestBtn,
      background: user.interested ? "#bbb" : "#ff4d6d"
    }}
  >
    {user.interested ? "Saved" : "❤️ Interested"}
  </button>
  <button
  onClick={() => deleteUser(user._id)}
  style={styles.deleteBtn}
>
  🗑 Delete
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
  width: "180px",
  padding: "12px 18px",
  borderRadius: 25,
  border: "1px solid #ddd",
  fontSize: 15,
  outline: "none",
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
  },

  deleteBtn: {
  padding: "10px 16px",
  background: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
},

backBtn: {
  padding: "10px 18px",
  background: "#8B0000",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "20px",
  fontSize: "16px",
  fontWeight: "600"
},

filterCard: {
  background: "#fff",
  borderRadius: "20px",
  padding: "30px",
  margin: "30px auto",
  maxWidth: "1400px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
},
};

export default Profiles;