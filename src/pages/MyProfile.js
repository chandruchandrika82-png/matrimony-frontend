import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API, resolveMediaUrl } from "../config/api";
import "./MyProfile.css";

function MyProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const [profile, setProfile] = useState(null);

  useEffect(() => { if (!storedUser?._id) { navigate("/login"); return; } axios.get(`${API}/users/${storedUser._id}`).then((response) => setProfile(response.data)).catch(() => setProfile(false)); }, [navigate, storedUser?._id]);
  if (profile === null) return <main className="dashboard-page"><div className="dashboard-shell dashboard-status">Loading your profile...</div></main>;
  if (!profile) return <main className="dashboard-page"><div className="dashboard-shell dashboard-status">We could not load your profile.</div></main>;

  const completion = [profile.name, profile.age, profile.gender, profile.district, profile.religion, profile.education, profile.image].filter(Boolean).length;
  const completionPercent = Math.round((completion / 7) * 100);
  return <main className="dashboard-page"><div className="dashboard-shell">
    <header className="dashboard-header"><div><p>My account</p><h1>Welcome back</h1></div><button onClick={() => navigate(`/edit/${profile._id}`)}>Edit profile</button></header>
    <section className="dashboard-main"><img src={resolveMediaUrl(profile.image) || "https://placehold.co/300x360?text=Add+a+photo"} alt={profile.name || "Your profile"} /><div><p className="dashboard-kicker">Your Namakkal Matrimony profile</p><h2>{profile.name || "Complete your profile"}</h2><p>{[profile.age && `${profile.age} years`, profile.currentCity || profile.district || "Tamil Nadu", profile.maritalStatus].filter(Boolean).join(" | ") || "Add your details to help us find compatible matches."}</p><div className="dashboard-buttons"><button onClick={() => navigate(`/profile/${profile._id}`)}>Preview profile</button><button onClick={() => navigate("/profiles")}>Browse profiles</button></div></div></section>
    <section className="dashboard-grid"><article className="completion-card"><p>Profile completion</p><strong>{completionPercent}%</strong><div><span style={{ width: `${completionPercent}%` }} /></div><small>Complete your personal, family, and preference details for better matches.</small></article><article><p>Interest requests</p><strong>Review people who want to connect.</strong><button onClick={() => navigate("/interest-requests")}>View requests</button></article><article><p>Saved profiles</p><strong>Keep track of the profiles you are considering.</strong><button onClick={() => navigate("/interested")}>View favorite profiles</button></article></section>
  </div></main>;
}

export default MyProfile;
