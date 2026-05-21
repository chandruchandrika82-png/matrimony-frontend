import { useState } from "react";
import axios from "axios";

function AddProfile() {

  const [form, setForm] = useState({
    name: "",
    age: "",
    location: "",
    email: "",
    password: "",

    gender: "",
    dob: "",
    timeOfBirth: "",
    placeOfBirth: "",

    fatherName: "",
    motherName: "",

    education: "",
    job: "",
    income: "",

    religion: "",
    caste: "",

    star: "",
    zodiac: "",
    rashi: "",
    dosha: "",

    phone: "",
    address: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post(
        "https://matrimony-backend-1-ri82.onrender.com/api/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Profile Added Successfully 💍");

      setForm({
        name: "",
        age: "",
        location: "",
        email: "",
        password: "",

        gender: "",
        dob: "",
        timeOfBirth: "",
        placeOfBirth: "",

        fatherName: "",
        motherName: "",

        education: "",
        job: "",
        income: "",

        religion: "",
        caste: "",

        star: "",
        zodiac: "",
        rashi: "",
        dosha: "",

        phone: "",
        address: ""
      });

      setImageFile(null);

    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Submission Failed");
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.title}>💍 Add Profile</h1>

        {/* BASIC INFO */}
        <div style={styles.section}>
          <h3>👤 Basic Info</h3>

          <input
            style={styles.input}
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        {/* PERSONAL DETAILS */}
        <div style={styles.section}>
          <h3>📅 Personal Details</h3>

          <input
            style={styles.input}
            name="gender"
            placeholder="Gender"
            value={form.gender}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="dob"
            placeholder="Date of Birth"
            value={form.dob}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="timeOfBirth"
            placeholder="Time of Birth"
            value={form.timeOfBirth}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="placeOfBirth"
            placeholder="Place of Birth"
            value={form.placeOfBirth}
            onChange={handleChange}
          />
        </div>

        {/* FAMILY */}
        <div style={styles.section}>
          <h3>👪 Family</h3>

          <input
            style={styles.input}
            name="fatherName"
            placeholder="Father Name"
            value={form.fatherName}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="motherName"
            placeholder="Mother Name"
            value={form.motherName}
            onChange={handleChange}
          />
        </div>

        {/* CAREER */}
        <div style={styles.section}>
          <h3>🎓 Career</h3>

          <input
            style={styles.input}
            name="education"
            placeholder="Education"
            value={form.education}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="job"
            placeholder="Job"
            value={form.job}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="income"
            placeholder="Income"
            value={form.income}
            onChange={handleChange}
          />
        </div>

        {/* RELIGION */}
        <div style={styles.section}>
          <h3>🕉️ Religion</h3>

          <input
            style={styles.input}
            name="religion"
            placeholder="Religion"
            value={form.religion}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="caste"
            placeholder="Caste"
            value={form.caste}
            onChange={handleChange}
          />
        </div>

        {/* ASTROLOGY */}
        <div style={styles.astroBox}>

          <h3>🔮 Select Zodiac</h3>

          <div style={styles.zodiacGrid}>

            {[
              "Aries",
              "Taurus",
              "Gemini",
              "Cancer",
              "Leo",
              "Virgo",
              "Libra",
              "Scorpio",
              "Sagittarius",
              "Capricorn",
              "Aquarius",
              "Pisces"
            ].map((z) => (

              <div
                key={z}
                onClick={() => setForm({ ...form, zodiac: z })}
                style={{
                  ...styles.zodiacCard,
                  background: form.zodiac === z ? "#ff4d6d" : "#fff",
                  color: form.zodiac === z ? "#fff" : "#000"
                }}
              >
                {z}
              </div>

            ))}

          </div>

          <input
            style={styles.input}
            name="star"
            placeholder="Star / Nakshatra"
            value={form.star}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="rashi"
            placeholder="Rashi"
            value={form.rashi}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="dosha"
            placeholder="Dosha"
            value={form.dosha}
            onChange={handleChange}
          />

        </div>

        {/* CONTACT */}
        <div style={styles.section}>
          <h3>📞 Contact</h3>

          <input
            style={styles.input}
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={styles.button}
        >
          Save Profile 💍
        </button>

      </div>

    </div>
  );
}

const styles = {

  page: {
    background: "#fff5f7",
    minHeight: "100vh",
    padding: 30
  },

  container: {
  minHeight: "100vh",
  padding: "120px 20px 40px",
  background: "linear-gradient(to bottom right, #5e421e, #ffe4ec)",
},

  title: {
    textAlign: "center",
    color: "#8B0000",
    marginBottom: 10
  },

  section: {
    background: "#fff7fb",
    padding: 20,
    borderRadius: 15,
    border: "1px solid #ffe1ec",
    display: "flex",
    flexDirection: "column",
    gap: 12
  },

  input: {
    padding: 14,
    borderRadius: 10,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 15
  },

  button: {
    padding: 15,
    background: "#ff4d6d",
    color: "white",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold"
  },

  astroBox: {
    background: "#fff0f6",
    padding: 20,
    borderRadius: 15,
    border: "1px solid #ffd6e8",
    display: "flex",
    flexDirection: "column",
    gap: 12
  },

  zodiacGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12
  },

  zodiacCard: {
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 12,
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "bold",
    transition: "0.2s"
  }

};

export default AddProfile;