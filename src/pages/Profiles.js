import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const stateOptions = [
  "",
  "Tamil Nadu",
  "Kerala",
  "Karnataka",
  "Andhra Pradesh",
  "Telangana",
  "Puducherry",
  "Other",
];

const districtOptions = [
  "",
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
];

const religionOptions = [
  "",
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Jain",
  "Other",
];

function Profiles() {
  const navigate = useNavigate();

  const API = "https://matrimony-backend-zbvm.onrender.com/api";
  // const API = "http://localhost:5000/api";

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [userState, setUserState] = useState("");
  const [district, setDistrict] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [education, setEducation] = useState("");
  const [occupationType, setOccupationType] = useState("");
  const [star, setStar] = useState("");
  const [rashi, setRashi] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nri, setNri] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showEditIcons, setShowEditIcons] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [API]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const isInterested = useCallback(
    (user) => {
      if (!loggedInUser?._id) return false;

      return user.interestRequests?.some(
        (id) => id.toString() === loggedInUser._id
      );
    },
    [loggedInUser?._id]
  );

  const sendInterest = async (receiverId) => {
    try {
      if (!loggedInUser) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const senderId = loggedInUser._id;
      const res = await axios.put(`${API}/users/${receiverId}/interest/${senderId}`);

      alert(res?.data?.message || "❤️ Interest updated!");
      fetchUsers();
    } catch (err) {
      console.log("ERROR:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);

      alert(err.response?.data?.error || err.message);
    }
  };

  const goToAddProfile = () => {
    navigate("/my-profile");
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(search.toLowerCase()) &&
      (minAge === "" || Number(user.age) >= Number(minAge)) &&
      (maxAge === "" || Number(user.age) <= Number(maxAge)) &&
      (userState === "" ||
        user.state?.toLowerCase().includes(userState.toLowerCase())) &&
      (district === "" ||
        user.district?.toLowerCase().includes(district.toLowerCase())) &&
      (religion === "" ||
        user.religion?.toLowerCase().includes(religion.toLowerCase())) &&
      (caste === "" ||
        user.caste?.toLowerCase().includes(caste.toLowerCase())) &&
      (education === "" ||
        user.education?.toLowerCase().includes(education.toLowerCase())) &&
      (occupationType === "" ||
        user.occupationType?.toLowerCase().includes(occupationType.toLowerCase())) &&
      (star === "" || user.star?.toLowerCase().includes(star.toLowerCase())) &&
      (rashi === "" || user.rashi?.toLowerCase().includes(rashi.toLowerCase())) &&
      (maritalStatus === "" || user.maritalStatus === maritalStatus) &&
      (nri === "" || user.nri === nri)
    );
  });

  const sortedUsers = [...filteredUsers];

  switch (sortBy) {
    case "oldest":
      sortedUsers.reverse();
      break;
    case "ageLow":
      sortedUsers.sort((a, b) => Number(a.age) - Number(b.age));
      break;
    case "ageHigh":
      sortedUsers.sort((a, b) => Number(b.age) - Number(a.age));
      break;
    case "premium":
      sortedUsers.sort((a, b) => Number(b.isPremium) - Number(a.isPremium));
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
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <div style={styles.leftTop}>
            <button onClick={() => navigate(-1)} style={styles.backBtn}>
              ← Back
            </button>

            <div>
              <h1 style={styles.title}>💍 Find Your Match</h1>
              <p style={styles.subtitle}>
                Browse genuine profiles and connect with meaningful matches.
              </p>
            </div>
          </div>

          <div style={styles.headerActions}>
            <button onClick={goToAddProfile} style={styles.actionBtn}>
              ➕ Add Profile
            </button>

            <button
              onClick={() => setShowEditIcons((prev) => !prev)}
              style={{
                ...styles.actionBtn,
                background: showEditIcons ? "#d63b8d" : "#8B0000",
              }}
            >
              ✏️ {showEditIcons ? "Hide Edit" : "Edit Profile"}
            </button>
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
              <option value="">Sort By</option>
              <option value="oldest">Oldest Profiles</option>
              <option value="ageLow">Age: Low to High</option>
              <option value="ageHigh">Age: High to Low</option>
              <option value="premium">Premium Members</option>
              <option value="verified">Verified Businesses</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <div style={styles.filtersCard}>
          <h2 style={styles.filtersTitle}>🔍 Search Filters</h2>

          <div style={styles.filtersGrid}>
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

            <select
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
              style={styles.filterInput}
            >
              <option value="">State</option>
              {stateOptions.slice(1).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              style={styles.filterInput}
            >
              <option value="">District</option>
              {districtOptions.slice(1).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              style={styles.filterInput}
            >
              <option value="">Religion</option>
              {religionOptions.slice(1).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

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

            <select
              value={occupationType}
              onChange={(e) => setOccupationType(e.target.value)}
              style={styles.filterInput}
            >
              <option value="">Occupation Type</option>
              <option value="Job">Job</option>
              <option value="Business">Business</option>
              <option value="Both">Both</option>
            </select>

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
        </div>

        <div style={styles.grid}>
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user) => {
              const interested = isInterested(user);
              const isOwnProfile = loggedInUser?._id === user._id;

              return (
                <div key={user._id} style={styles.card}>
                  <div style={styles.imageWrap}>
                    <img
                      src={
                        user.image
                          ? user.image
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

                    {showEditIcons && (
  <button
    onClick={() => navigate(`/edit/${user._id}`)}
    style={styles.editIconBtn}
    title="Edit profile"
  >
    ✏️
  </button>
)}
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

                    <p style={styles.religion}>
                       {user.religion || "Not Mentioned"}
                    </p>

                    {interested && (
                      <p style={styles.interestedBadge}>❤️ Interested</p>
                    )}

                    <div style={styles.buttons}>
                      <Link to={`/profile/${user._id}`} style={styles.viewBtn}>
                        View
                      </Link>

                      <button
                        onClick={() => sendInterest(user._id)}
                        style={{
                          ...styles.interestBtn,
                          background: interested ? "#ff4d6d" : "#fff",
                          color: interested ? "#fff" : "#8B0000",
                          border: interested
                            ? "1px solid #ff4d6d"
                            : "1px solid #8B0000",
                        }}
                      >
                        {interested ? "❤️ Interested" : "♡ Interested"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyTitle}>No profiles found</h3>
              <p style={styles.emptyText}>
                Try changing the search or filter options.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffe4ec",
    padding: "20px",
  },

  container: {
    maxWidth: "1450px",
    margin: "0 auto",
    paddingTop: "90px",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },

  leftTop: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },

  title: {
    margin: 0,
    color: "#8B0000",
    fontSize: 42,
    fontWeight: 800,
  },

  subtitle: {
    margin: "8px 0 0",
    color: "#6f5b61",
    fontSize: 15,
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
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },

  actionBtn: {
    padding: "10px 18px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },

  searchCard: {
    background: "#fff",
    padding: "22px",
    borderRadius: "24px",
    marginBottom: "22px",
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

  filtersCard: {
    background: "#fff",
    padding: "24px",
    borderRadius: "24px",
    marginBottom: "28px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    border: "1px solid #f4d8df",
  },

  filtersTitle: {
    color: "#8B0000",
    textAlign: "center",
    marginBottom: 18,
    fontSize: 24,
    fontWeight: 800,
  },

  filtersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 14,
  },

  filterInput: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 24,
    border: "1px solid #e3c7cf",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
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
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
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

  editIconBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "none",
    background: "#fff",
    color: "#8B0000",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cardContent: {
    padding: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 10,
    color: "#8B0000",
  },

  info: {
    color: "#666",
    marginBottom: 8,
    fontSize: 15,
  },

  religion: {
    color: "#888",
    marginBottom: 14,
    fontSize: 14,
  },

  interestedBadge: {
    background: "#e8fff0",
    color: "green",
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 20,
    fontWeight: 600,
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
    fontWeight: 700,
  },

  interestBtn: {
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  },

  emptyState: {
    gridColumn: "1 / -1",
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
  },
};

export default Profiles;