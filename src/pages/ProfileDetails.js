import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProfileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_ORIGIN = "https://matrimony-backend-1-ri82.onrender.com";
  const API = `${API_ORIGIN}/api`;

  const [user, setUser] = useState(null);

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const isOwner = currentUser?._id === user?._id;

  const resolveUrl = (value) => {
    if (!value) return null;
    if (value.startsWith("http")) return value;
    return `${API_ORIGIN}${value}`;
  };

  const formatValue = (value, fallback = "Not Mentioned") => {
    if (value === null || value === undefined || value === "") return fallback;
    return value;
  };

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [API, id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/users/${id}`);

      if (isOwner) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      alert("Profile deleted successfully");
      navigate("/profiles");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Failed to delete profile");
    }
  };

  const InfoCard = ({ label, value }) => (
    <div
      style={styles.infoCard}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0px)")
      }
    >
      <strong style={styles.infoLabel}>{label}</strong>
      <p style={styles.infoValue}>{value}</p>
    </div>
  );

  if (!user) {
    return (
      <div style={styles.loadingWrap}>
        <div style={styles.loadingCard}>Loading...</div>
      </div>
    );
  }

  const profileImage =
    resolveUrl(user.image) || "https://placehold.co/300x320?text=No+Image";

  const profilePhotos = user.profilePhotos || [];
  const familyPhotos = user.familyPhotos || [];
  const officePhotos = user.officePhotos || [];

  const badges = [
    user.registerAs ? { text: user.registerAs, style: styles.pillNeutral } : null,
    user.profileVisibility
      ? { text: user.profileVisibility, style: styles.pillNeutral }
      : null,
    user.isPremium ? { text: "Premium", style: styles.pillPremium } : null,
    user.businessVerified
      ? { text: "Business Verified", style: styles.pillVerified }
      : null,
    user.gstVerified ? { text: "GST Verified", style: styles.pillVerified } : null,
    user.nri === "Yes" ? { text: "NRI", style: styles.pillNri } : null,
  ].filter(Boolean);

  const personalCards = [
    ["Gender", user.gender],
    ["Age", user.age],
    ["Date Of Birth", user.dob],
    ["Height", user.height],
    ["Weight", user.weight],
    ["Native Place", user.nativePlace],
    ["Current City", user.currentCity],
    ["District", user.district],
    ["State", user.state],
    ["Country", user.country],
    ["Marital Status", user.maritalStatus],
    ["Languages", user.languages],
    ["Hobbies", user.hobbies],
  ];

  const careerCards = [
    ["Education", user.education],
    ["Occupation Type", user.occupationType || user.occupation],
    ["Company Name", user.hideCompany ? "Hidden" : user.companyName],
    ["Business Type", user.businessType],
    ["Business Category", user.businessCategory],
    ["Business Location", user.businessLocation],
    ["Number of Branches", user.numberOfBranches],
    ["Branch Locations", user.branchLocations],
    ["Years in Business", user.yearsInBusiness],
    ["Number of Employees", user.numberOfEmployees],
    ["Business Website", user.businessWebsite],
    ["Annual Income", user.hideIncome ? "Hidden" : user.annualIncome],
    ["Social Media", user.socialMedia],
    ["NRI", user.nri],
  ];

  const familyCards = [
    ["Father Name", user.fatherName],
    ["Father Occupation", user.fatherOccupation],
    ["Mother Name", user.motherName],
    ["Mother Occupation", user.motherOccupation],
    ["Brothers", user.brothersCount],
    ["Married Brothers", user.brothersMarried],
    ["Sisters", user.sistersCount],
    ["Married Sisters", user.sistersMarried],
    ["Family Type", user.familyType],
    ["Family Status", user.familyStatus],
  ];

  const religionCards = [
    ["Religion", user.religion],
    ["Caste", user.caste],
    ["Sub Caste", user.subCaste],
    ["Mother Tongue", user.motherTongue],
    ["Kuladeivam", user.kuladeivam],
  ];

  const horoscopeCards = [
    ["Rashi", user.rashi],
    ["Star / Nakshatra", user.star],
    ["Lagnam", user.lagnam],
    ["Gothram", user.gothram],
    ["Dosha", user.dosha],
    ["Sevvai Dosham", user.sevvaiDosham],
    ["Rahu Kethu Dosham", user.rahuKethuDosham || user.raguKethuDosham],
    ["Horoscope Available", user.horoscopeAvailable],
    ["Horoscope Matching Preference", user.horoscopeMatchingPreference],
    ["Birth Time", user.birthTime],
    ["Birth Place", user.birthPlace],
  ];

  const partnerCards = [
    [
      "Preferred Age",
      user.preferredAgeFrom && user.preferredAgeTo
        ? `${user.preferredAgeFrom} - ${user.preferredAgeTo} Years`
        : "",
    ],
    ["Preferred Height", user.preferredHeight],
    ["Preferred Education", user.preferredEducation],
    ["Preferred Occupation", user.preferredOccupation],
    ["Preferred Religion", user.preferredReligion],
    ["Preferred Caste", user.preferredCaste],
    ["Preferred Location", user.preferredLocation],
    ["Preferred Rashi", user.preferredRashi],
    ["Preferred Star", user.preferredStar],
    ["Accept Sevvai Dosham", user.acceptSevvaiDosham],
    ["Horoscope Matching Required", user.horoscopeMatchingRequired],
    ["Additional Expectations", user.expectations],
  ];

  const assetCards = [
    ["Land (Acres)", user.landAcres],
    ["Land Value", user.landValue],
    ["House", user.house],
    ["Vehicle", user.vehicle],
    ["Other Assets", user.otherAssets],
  ];

  const contactCards = [
    ["Mobile", user.hideMobile ? "Hidden" : user.mobile],
    ["Email", user.email],
    ["Address", user.address],
  ];

  return (
    <div style={styles.page}>
      <div style={styles.contentWrap}>
        <div style={styles.actionBar}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            ← Back
          </button>

          {isOwner && (
            <button onClick={handleDelete} style={styles.actionBtnDanger}>
              🗑 Delete Profile
            </button>
          )}
        </div>

        <div style={styles.cover} />

        <div style={styles.heroCard}>
          <img src={profileImage} alt="profile" style={styles.heroImage} />

          <div style={styles.heroContent}>
            <h1 style={styles.name}>{user.name}</h1>
            <p style={styles.heroLine}>
              {user.age ? `${user.age} yrs` : "Age not mentioned"} •{" "}
              {user.currentCity ||
                user.nativePlace ||
                user.district ||
                "Location not mentioned"}
            </p>

            <p style={styles.heroLine}>👩 {user.gender || "Not Mentioned"}</p>
            <p style={styles.heroLine}>📍 {user.currentCity || "Not Mentioned"}</p>

            <div style={styles.badgeRow}>
              {badges.map((badge, index) => (
                <span key={index} style={badge.style}>
                  {badge.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📌 Personal Details</h2>
          <div style={styles.grid}>
            {personalCards.map(([label, value]) => (
              <InfoCard key={label} label={label} value={formatValue(value)} />
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🎓 Education & Career</h2>
          <div style={styles.grid}>
            {careerCards.map(([label, value]) => (
              <InfoCard key={label} label={label} value={formatValue(value)} />
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>👨‍👩‍👧 Family Details</h2>
          <div style={styles.grid}>
            {familyCards.map(([label, value]) => (
              <InfoCard key={label} label={label} value={formatValue(value)} />
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🕉 Religion & Additional Details</h2>
          <div style={styles.grid}>
            {religionCards.map(([label, value]) => (
              <InfoCard key={label} label={label} value={formatValue(value)} />
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🔮 Horoscope Details</h2>
          <div style={styles.grid}>
            {horoscopeCards.map(([label, value]) => (
              <InfoCard key={label} label={label} value={formatValue(value)} />
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📄 Horoscope Document</h2>
          {user.horoscopeFile ? (
            <a
              href={resolveUrl(user.horoscopeFile)}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.fileLink}
            >
              📎 View Uploaded Horoscope
            </a>
          ) : (
            <p style={styles.emptyNote}>No Horoscope Uploaded</p>
          )}
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>❤️ Partner Preferences</h2>
          <div style={styles.grid}>
            {partnerCards.map(([label, value]) => (
              <InfoCard key={label} label={label} value={formatValue(value)} />
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🏡 Assets & Property</h2>
          <div style={styles.grid}>
            {assetCards.map(([label, value]) => (
              <InfoCard key={label} label={label} value={formatValue(value)} />
            ))}
          </div>
        </div>

        {!user.hidePhotos ? (
          <>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>📸 Profile Photos</h2>
              <div style={styles.photoGrid}>
                {profilePhotos.length > 0 ? (
                  profilePhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={resolveUrl(photo)}
                      alt={`Profile ${index + 1}`}
                      style={styles.galleryImage}
                    />
                  ))
                ) : (
                  <p style={styles.emptyNote}>No Profile Photos Uploaded</p>
                )}
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>👨‍👩‍👧 Family Photos</h2>
              <div style={styles.photoGrid}>
                {familyPhotos.length > 0 ? (
                  familyPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={resolveUrl(photo)}
                      alt={`Family ${index + 1}`}
                      style={styles.galleryImage}
                    />
                  ))
                ) : (
                  <p style={styles.emptyNote}>No Family Photos Uploaded</p>
                )}
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>🏢 Office Photos</h2>
              <div style={styles.photoGrid}>
                {officePhotos.length > 0 ? (
                  officePhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={resolveUrl(photo)}
                      alt={`Office ${index + 1}`}
                      style={styles.galleryImage}
                    />
                  ))
                ) : (
                  <p style={styles.emptyNote}>No Office Photos Uploaded</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📸 Photos</h2>
            <p style={styles.emptyNote}>Photos are hidden by privacy settings.</p>
          </div>
        )}

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📞 Contact Details</h2>
          <div style={styles.grid}>
            {contactCards.map(([label, value]) => (
              <InfoCard key={label} label={label} value={formatValue(value)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffe4ec",
    padding: "0 20px 80px",
  },

  contentWrap: {
    paddingTop: "92px",
  },

  actionBar: {
    maxWidth: "1100px",
    margin: "0 auto 18px",
    display: "flex",
    justifyContent: "flex-start",
    gap: "14px",
    flexWrap: "wrap",
    padding: "14px 18px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    position: "relative",
    zIndex: 5,
  },

  backBtn: {
    padding: "12px 22px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    boxShadow: "0 8px 18px rgba(139,0,0,0.18)",
  },

  actionBtnDanger: {
    padding: "12px 22px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    boxShadow: "0 8px 18px rgba(220,53,69,0.18)",
  },

  cover: {
    maxWidth: "1100px",
    height: "260px",
    margin: "0 auto",
    borderRadius: "34px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1974&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
  },

  heroCard: {
    maxWidth: "900px",
    margin: "0 auto",
    marginTop: "-96px",
    background: "#fff",
    borderRadius: "26px",
    padding: "34px",
    boxShadow: "0 16px 35px rgba(0,0,0,0.12)",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },

  heroImage: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "6px solid #ffe1ec",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    marginTop: "-104px",
    background: "#fff",
  },

  heroContent: {
    marginTop: "18px",
  },

  name: {
    margin: "12px 0 8px",
    fontSize: "clamp(30px, 4vw, 42px)",
    color: "#8B0000",
  },

  heroLine: {
    color: "#666",
    fontSize: "16px",
    margin: "8px 0",
  },

  badgeRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "18px",
  },

  pillPremium: {
    background: "#8B0000",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "13px",
  },

  pillVerified: {
    background: "#1f8f4a",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "13px",
  },

  pillNri: {
    background: "#007bff",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "13px",
  },

  pillNeutral: {
    background: "#f7e9ee",
    color: "#8B0000",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "13px",
  },

  section: {
    maxWidth: "1100px",
    margin: "28px auto 0",
    background: "#fff",
    borderRadius: "22px",
    padding: "28px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
  },

  sectionTitle: {
    margin: "0 0 22px",
    color: "#8B0000",
    fontSize: "clamp(22px, 3vw, 30px)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },

  infoCard: {
    background: "#fff0f3",
    padding: "18px",
    borderRadius: "16px",
    transition: "0.25s",
    cursor: "default",
    boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
  },

  infoLabel: {
    display: "block",
    color: "#8B0000",
    fontSize: "14px",
    marginBottom: "8px",
  },

  infoValue: {
    margin: 0,
    color: "#2b2325",
    fontSize: "15px",
    fontWeight: 500,
    lineHeight: 1.6,
  },

  photoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },

  galleryImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "16px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
    background: "#f3f3f3",
  },

  fileLink: {
    display: "inline-block",
    color: "#8B0000",
    fontWeight: "bold",
    textDecoration: "none",
    background: "#fff0f3",
    padding: "12px 16px",
    borderRadius: "14px",
  },

  emptyNote: {
    margin: 0,
    color: "#666",
    fontSize: "15px",
  },

  loadingWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffe4ec",
  },

  loadingCard: {
    padding: "18px 26px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    color: "#8B0000",
    fontWeight: 700,
  },
};

export default ProfileDetails;