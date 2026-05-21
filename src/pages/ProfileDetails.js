import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProfileDetails() {

  const { id } = useParams();

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
    <div style={styles.cover}>

    </div>
      {/* HERO CARD */}
      <div style={styles.card}>

        <img
          src={
            user.image
              ? `https://matrimony-backend-1-ri82.onrender.com${user.image}`
              : "https://via.placeholder.com/300"
          }
          alt="profile"
          style={styles.image}
        />

        <h1 style={styles.name}>
          {user.name}
        </h1>

        <p style={styles.subText}>
          {user.age} yrs • {user.location}
        </p>

        <div style={styles.badge}>
          ❤️ Premium Match
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
            <p>{user.timeOfBirth || "Not Mentioned"}</p>
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
            <p>{user.placeOfBirth || "Not Mentioned"}</p>
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
            <p>{user.job || "Not Mentioned"}</p>
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
            <strong>Income</strong>
            <p>{user.income || "Not Mentioned"}</p>
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

        </div>

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
            <strong>Phone</strong>
            <p>{user.phone || "Not Mentioned"}</p>
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
  }

};

export default ProfileDetails;