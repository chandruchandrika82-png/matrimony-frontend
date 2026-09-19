import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API, resolveMediaUrl } from "../config/api";
import "./Profiles.css";

const districts = ["", "Namakkal", "Chennai", "Coimbatore", "Erode", "Karur", "Madurai", "Salem", "Tiruchirappalli", "Tiruppur", "Vellore", "Other"];

function Profiles() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ gender: "", minAge: "", maxAge: "", district: "", religion: "", motherTongue: "" });
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    if (location.state) setFilters((current) => ({ ...current, ...location.state }));
  }, [location.state]);

  const loadUsers = async () => {
    try { setLoading(true); const response = await axios.get(`${API}/users`); setUsers(response.data || []); }
    catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadUsers(); }, []);

  const updateFilter = (event) => setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));
  const resetFilters = () => { setSearch(""); setFilters({ gender: "", minAge: "", maxAge: "", district: "", religion: "", motherTongue: "" }); };

  const visibleProfiles = useMemo(() => {
    const matches = users.filter((user) => {
      const haystack = `${user.name || ""} ${user.currentCity || ""} ${user.nativePlace || ""}`.toLowerCase();
      return haystack.includes(search.toLowerCase()) && (!filters.gender || user.gender === filters.gender) && (!filters.minAge || Number(user.age) >= Number(filters.minAge)) && (!filters.maxAge || Number(user.age) <= Number(filters.maxAge)) && (!filters.district || user.district === filters.district) && (!filters.religion || user.religion === filters.religion) && (!filters.motherTongue || user.motherTongue === filters.motherTongue);
    });
    return matches.sort((first, second) => {
      if (sort === "age-low") return Number(first.age || 0) - Number(second.age || 0);
      if (sort === "age-high") return Number(second.age || 0) - Number(first.age || 0);
      if (sort === "name") return (first.name || "").localeCompare(second.name || "");
      return new Date(second.createdAt || 0) - new Date(first.createdAt || 0);
    });
  }, [filters, search, sort, users]);

  const isInterested = (profile) => profile.interestRequests?.some((id) => id.toString() === currentUser?._id);
  const toggleInterest = async (profileId) => {
    try { const response = await axios.put(`${API}/users/${profileId}/interest/${currentUser._id}`); alert(response.data.message); loadUsers(); }
    catch (error) { alert(error.response?.data?.error || "Unable to update interest"); }
  };

  return <main className="directory-page"><div className="directory-shell">
<header className="directory-header">

  <div>
    <button
      className="back-btn"
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>

    <p className="directory-kicker">Member directory</p>

    <h1>Discover compatible profiles</h1>

    <p>Refine your search across Namakkal and Tamil Nadu.</p>
  </div>

  <button
    className="directory-primary"
    onClick={() => navigate("/my-profile")}
  >
    Complete my profile
  </button>

</header>    <div className="directory-layout">
      <aside className="filter-panel"><div className="filter-title"><h2>Filters</h2><button onClick={resetFilters}>Clear all</button></div><label>Search<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name or place" /></label><label>Looking for<select name="gender" value={filters.gender} onChange={updateFilter}><option value="">Anyone</option><option value="Female">Women</option><option value="Male">Men</option></select></label><div className="filter-age"><label>Age from<input name="minAge" type="number" value={filters.minAge} onChange={updateFilter} min="18" /></label><label>Age to<input name="maxAge" type="number" value={filters.maxAge} onChange={updateFilter} min="18" /></label></div><label>District<select name="district" value={filters.district} onChange={updateFilter}><option value="">All districts</option>{districts.slice(1).map((district) => <option key={district}>{district}</option>)}</select></label><label>Religion<select name="religion" value={filters.religion} onChange={updateFilter}><option value="">All religions</option>{["Hindu", "Muslim", "Christian", "Jain", "Other"].map((item) => <option key={item}>{item}</option>)}</select></label><label>Mother tongue<select name="motherTongue" value={filters.motherTongue} onChange={updateFilter}><option value="">All languages</option>{["Tamil", "Malayalam", "Telugu", "Kannada", "Hindi", "English"].map((item) => <option key={item}>{item}</option>)}</select></label></aside>
      <section className="profile-results"><div className="results-bar"><p><strong>{visibleProfiles.length}</strong> profiles found</p><label>Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest</option><option value="age-low">Age: low to high</option><option value="age-high">Age: high to low</option><option value="name">Name</option></select></label></div>{loading ? <div className="directory-status">Loading profiles...</div> : visibleProfiles.length ? <div className="profile-grid">{visibleProfiles.map((profile) => { const owned = profile._id === currentUser?._id; const interested = isInterested(profile); return <article className="directory-card" key={profile._id}><Link to={`/profile/${profile._id}`} className="card-image-link"><img src={resolveMediaUrl(profile.image) || "https://placehold.co/480x540?text=Photo+private"} alt={profile.name || "Member profile"} /><span>{profile.profileVisibility === "Private" ? "Private profile" : "Member profile"}</span></Link><div className="directory-card-body"><div><h2>{profile.name || "Member"}</h2><p className="profile-location">{[profile.age && `${profile.age} years`, profile.currentCity || profile.district].filter(Boolean).join(" | ") || "Tamil Nadu"}</p></div><p className="profile-meta">{[profile.education, profile.occupationType, profile.motherTongue].filter(Boolean).join(" | ") || "Details shared on profile"}</p><div className="card-actions"><Link to={`/profile/${profile._id}`}>View profile</Link>{owned ? <button onClick={() => navigate(`/edit/${profile._id}`)}>Edit profile</button> : <button className={interested ? "interest-active" : "interest-button"} onClick={() => toggleInterest(profile._id)}>{interested ? "Interest sent" : "Send interest"}</button>}</div></div></article>; })}</div> : <div className="directory-status"><h2>No profiles match these filters.</h2><p>Try clearing a filter or expanding your age range.</p><button onClick={resetFilters}>Reset filters</button></div>}</section>
    </div>
  </div></main>;
}

export default Profiles;
