import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProfileDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const API = "https://matrimony-backend-1-ri82.onrender.com/api";
  const fetchUser = useCallback(async () => {

    try {

      const res = await axios.get(`${API}/users/${id}`);

      setUser(res.data);

    } catch (err) {

      console.log(err);

    }

  }, [id]);

  useEffect(() => {

    fetchUser();

  }, [fetchUser]);

  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: 120 }}>
        Loading...
      </h2>
    );
  }

  return (

    <div style={styles.page}>
      <button
        onClick={() => navigate(-1)}
        style={styles.backBtn}
      >
        ← Back
      </button>
      <div style={styles.cover}>

      </div>
      {/* HERO CARD */}
      <div style={styles.card}>

        <img
          src={
            user.image
              ? user.image.startsWith("http")
                ? user.image
                : `https://matrimony-backend-1-ri82.onrender.com${user.image}`
              : "https://placehold.co/300x320?text=No+Image"
          }
          alt="profile"
          style={styles.image}
        />

        <h1 style={styles.name}>
          {user.name}
        </h1>

        <p style={styles.subText}>
          {user.age} yrs • {user.currentCity || user.nativePlace || "Not Mentioned"}
        </p>

        <p style={styles.subText}>
          👩 {user.gender || "Not Mentioned"}
        </p>

        <p style={styles.subText}>
          💼 {user.occupation || "Not Mentioned"}
        </p>

        <p style={styles.subText}>
          📍 {user.currentCity || "Not Mentioned"}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "20px"
          }}
        >

          <span style={styles.verifyBadge}>
            ⭐ Premium
          </span>

          {user.businessVerified && (
            <span style={styles.verifyBadge}>
              🏢 Business Verified
            </span>
          )}

          {user.gstVerified && (
            <span style={styles.verifyBadge}>
              ✅ GST Verified
            </span>
          )}

          {user.nri === "Yes" && (
            <span style={styles.verifyBadge}>
              🌍 NRI
            </span>
          )}

        </div>

      </div>

      {/* PROFILE PHOTO GALLERY */}
      <div style={styles.section}>
        <h2 style={styles.heading}>📸 Profile Photos</h2>

        <div style={styles.gallery}>
          {user.profilePhotos && user.profilePhotos.length > 0 ? (
            user.profilePhotos.map((photo, index) => (

              <img
                key={index}
                src={
                  photo.startsWith("http")
                    ? photo
                    : `https://matrimony-backend-1-ri82.onrender.com${photo}`
                }
                alt={`Profile ${index + 1}`}
                style={styles.galleryImage}
              />

            ))
          ) : (
            <p>No Profile Photos Uploaded</p>
          )}
        </div>
      </div>

      {/* PERSONAL DETAILS */}
      <div style={styles.section}>

        <h2 style={styles.heading}>
          📌 Personal Details
        </h2>

        <div style={styles.grid}>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Gender</strong>
            <p>{user.gender || "Not Mentioned"}</p>
          </div>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Date Of Birth</strong>
            <p>{user.dob || "Not Mentioned"}</p>
          </div>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Birth Time</strong>
            <p>{user.birthTime || "Not Mentioned"}</p>
          </div>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Birth Place</strong>
            <p>{user.birthPlace || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Native Place</strong>
            <p>{user.nativePlace || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Current City</strong>
            <p>{user.currentCity || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>District</strong>
            <p>{user.district || "Not Mentioned"}</p>
          </div>
          <div style={styles.infoCard}>
            <strong>State</strong>
            <p>{user.state || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Country</strong>
            <p>{user.country || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Height</strong>
            <p>{user.height || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Weight</strong>
            <p>{user.weight || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Marital Status</strong>
            <p>{user.maritalStatus || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Languages</strong>
            <p>{user.languages || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Hobbies</strong>
            <p>{user.hobbies || "Not Mentioned"}</p>
          </div>
        </div>

      </div>

      {/* CAREER */}
      <div style={styles.section}>

        <h2 style={styles.heading}>
          🎓 Education & Career
        </h2>

        <div style={styles.grid}>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Education</strong>
            <p>{user.education || "Not Mentioned"}</p>
          </div>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Profession</strong>
            <p>{user.occupation || "Not Mentioned"}</p>
          </div>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Annual Income</strong>
            <p>{user.annualIncome || "Not Mentioned"}</p>
          </div>
          <div style={styles.infoCard}>
            <strong>Occupation Type</strong>
            <p>{user.occupationType || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Company Name</strong>
            <p>{user.companyName || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Business Category</strong>
            <p>{user.businessCategory || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Business Type</strong>
            <p>{user.businessType || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Years in Business</strong>
            <p>{user.yearsInBusiness || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Employees</strong>
            <p>{user.numberOfEmployees || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Branch Locations</strong>
            <p>{user.branchLocations || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Business Website</strong>
            <p>{user.businessWebsite || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>NRI</strong>
            <p>{user.nri || "No"}</p>
          </div>
        </div>

      </div>

      {/* FAMILY */}
      <div style={styles.section}>

        <h2 style={styles.heading}>
          👨‍👩‍👧 Family Details
        </h2>

        <div style={styles.grid}>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Father Name</strong>
            <p>{user.fatherName || "Not Mentioned"}</p>
          </div>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Mother Name</strong>
            <p>{user.motherName || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Father Occupation</strong>
            <p>{user.fatherOccupation || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Mother Occupation</strong>
            <p>{user.motherOccupation || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Brothers</strong>
            <p>{user.brothersCount ?? "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Married Brothers</strong>
            <p>{user.brothersMarried ?? "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Sisters</strong>
            <p>{user.sistersCount ?? "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Married Sisters</strong>
            <p>{user.sistersMarried ?? "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Family Type</strong>
            <p>{user.familyType || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Family Status</strong>
            <p>{user.familyStatus || "Not Mentioned"}</p>
          </div>

        </div>

      </div>

      {/* PARTNER PREFERENCES */}

      <div style={styles.section}>

        <h2 style={styles.heading}>
          ❤️ Partner Preferences
        </h2>

        <div style={styles.grid}>

          <div style={styles.infoCard}>
            <strong>Preferred Age</strong>
            <p>
              {user.preferredAgeFrom && user.preferredAgeTo
                ? `${user.preferredAgeFrom} - ${user.preferredAgeTo} Years`
                : "Not Mentioned"}
            </p>
          </div>

          <div style={styles.infoCard}>
            <strong>Preferred Height</strong>
            <p>{user.preferredHeight || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Preferred Education</strong>
            <p>{user.preferredEducation || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Preferred Occupation</strong>
            <p>{user.preferredOccupation || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Preferred Religion</strong>
            <p>{user.preferredReligion || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Preferred Caste</strong>
            <p>{user.preferredCaste || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Preferred Location</strong>
            <p>{user.preferredLocation || "Not Mentioned"}</p>
          </div>

        </div>

      </div>

      {/* ASSETS & PROPERTIES */}

      <div style={styles.section}>

        <h2 style={styles.heading}>
          🏡 Assets & Properties
        </h2>

        <div style={styles.grid}>

          <div style={styles.infoCard}>
            <strong>Land (Acres)</strong>
            <p>{user.landAcres || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Land Value</strong>
            <p>{user.landValue || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>House</strong>
            <p>{user.house || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Vehicle</strong>
            <p>{user.vehicle || "Not Mentioned"}</p>
          </div>

          <div style={styles.infoCard}>
            <strong>Other Assets</strong>
            <p>{user.otherAssets || "Not Mentioned"}</p>
          </div>

        </div>

      </div>

      {/* HOROSCOPE DOCUMENT */}

      <div style={styles.section}>

        <h2 style={styles.heading}>
          📄 Horoscope Document
        </h2>

        {user.horoscopeFile ? (

          <a
            href={user.horoscopeFile}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#8B0000",
              fontWeight: "bold",
              textDecoration: "none"
            }}
          >
            📎 View Uploaded Horoscope
          </a>

        ) : (

          <p>No Horoscope Uploaded</p>

        )}

      </div>


      {/* HOROSCOPE */}
      <div style={styles.section}>

        <h2 style={styles.heading}>
          🔮 Horoscope Details
        </h2>

        <div style={styles.grid}>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Zodiac</strong>
            <p>{user.zodiac || "Not Mentioned"}</p>
          </div>


          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Star / Nakshatra</strong>
            <p>{user.star || "Not Mentioned"}</p>
          </div>


          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Rashi</strong>
            <p>{user.rashi || "Not Mentioned"}</p>
          </div>


          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Dosha</strong>
            <p>{user.dosha || "Not Mentioned"}</p>
          </div>


        </div>

      </div>


      {/* FAMILY PHOTO GALLERY */}
      <div style={styles.section}>

        <h2 style={styles.heading}>
          👨‍👩‍👧 Family Photos
        </h2>

        <div style={styles.gallery}>

          {user.familyPhotos && user.familyPhotos.length > 0 ? (

            user.familyPhotos.map((photo, index) => (

              <img
                key={index}
                src={
                  photo.startsWith("http")
                    ? photo
                    : `https://matrimony-backend-1-ri82.onrender.com${photo}`
                }
                alt={`Family ${index + 1}`}
                style={styles.galleryImage}
              />

            ))

          ) : (

            <p>No Family Photos Uploaded</p>

          )}

        </div>

      </div>


      {/* OFFICE PHOTO GALLERY */}
      <div style={styles.section}>

        <h2 style={styles.heading}>
          🏢 Office Photos
        </h2>

        <div style={styles.gallery}>

          {user.officePhotos && user.officePhotos.length > 0 ? (

            user.officePhotos.map((photo, index) => (

              <img
                key={index}
                src={
                  photo.startsWith("http")
                    ? photo
                    : `https://matrimony-backend-1-ri82.onrender.com${photo}`
                }
                alt={`Office ${index + 1}`}
                style={styles.galleryImage}
              />

            ))

          ) : (

            <p>No Office Photos Uploaded</p>

          )}

        </div>



      </div>
      {/* CONTACT */}
      <div style={styles.section}>

        <h2 style={styles.heading}>
          📞 Contact Details
        </h2>

        <div style={styles.grid}>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Mobile</strong>
            <p>{user.mobile || "Not Mentioned"}</p>
          </div>

          <div
            style={styles.infoCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <strong>Address</strong>
            <p>{user.address || "Not Mentioned"}</p>
          </div>

        </div>

      </div>
      </div> 
      );
}

      const styles = {

        page: {
        background: "linear-gradient(to bottom right, #fff0f5, #ffe4ec)",
      minHeight: "100vh",
      padding: "120px 20px 80px"
  },

      cover: {
        height: "320px",
      backgroundImage:
      "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1974&auto=format&fit=crop')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderBottomLeftRadius: "40px",
      borderBottomRightRadius: "40px"
  },

      card: {
        background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(10px)",
      maxWidth: "850px",
      margin: "-120px auto 0",
      padding: "40px",
      borderRadius: "25px",
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      position: "relative",
      zIndex: 2
  },

      image: {
        width: "220px",
      height: "220px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "6px solid #ffe1ec",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
  },

      name: {
        marginTop: "20px",
      fontSize: "42px",
      color: "#8B0000"
  },

      subText: {
        color: "#666",
      fontSize: "18px"
  },

      badge: {
        marginTop: "15px",
      display: "inline-block",
      background: "#ff4d6d",
      color: "white",
      padding: "10px 18px",
      borderRadius: "30px",
      fontWeight: "600"
  },

      section: {
        background: "#fff",
      maxWidth: "850px",
      margin: "30px auto",
      padding: "30px",
      borderRadius: "20px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
  },

      heading: {
        marginBottom: "25px",
      color: "#8B0000"
  },

      grid: {
        display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px"
  },

      infoCard: {
        background: "#fff0f3",
      padding: "20px",
      borderRadius: "15px",
      transition: "0.3s",
      cursor: "pointer"
  },

      gallery: {
        display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "15px",
      marginTop: "20px"
},

      galleryImage: {
        width: "100%",
      height: "220px",
      objectFit: "cover",
      borderRadius: "15px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
      transition: "0.3s",
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

      verifyBadge: {
        background: "#8B0000",
      color: "#fff",
      padding: "8px 15px",
      borderRadius: "25px",
      fontWeight: "bold",
      fontSize: "14px",
},

};

      export default ProfileDetails;