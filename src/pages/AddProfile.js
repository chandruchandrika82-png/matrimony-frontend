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
    dosha: "",

    phone: "",
    address: "",

    zodiacImage: "",
    navamsaImage: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    console.log("FINAL SUBMIT CLICKED");

    try {
      const formData = new FormData();

      // append all fields
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // append image
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.post(
        "https://matrimony-backend-1-ri82.onrender.com/api/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("SUCCESS:", res.data);

      alert("Profile Added Successfully 💍");

      // reset form
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
        dosha: "",
        phone: "",
        address: "",
        zodiacImage: "",
        navamsaImage: ""
      });

      setImageFile(null);

    } catch (err) {
      console.log("FULL ERROR:", err);

      alert(
        err?.response?.data?.message ||
        err.message ||
        "Submission Failed"
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Profile 💍</h2>

      {/* BASIC */}
      <h3>👤 Basic Info</h3>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      {/* IMAGE */}
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      {/* PERSONAL */}
      <h3>📅 Personal Details</h3>

      <input
        name="gender"
        placeholder="Gender"
        value={form.gender}
        onChange={handleChange}
      />

      <input
        name="dob"
        placeholder="Date of Birth"
        value={form.dob}
        onChange={handleChange}
      />

      <input
        name="timeOfBirth"
        placeholder="Time Of Birth"
        value={form.timeOfBirth}
        onChange={handleChange}
      />

      <input
        name="placeOfBirth"
        placeholder="Place Of Birth"
        value={form.placeOfBirth}
        onChange={handleChange}
      />

      {/* FAMILY */}
      <h3>👪 Family</h3>

      <input
        name="fatherName"
        placeholder="Father Name"
        value={form.fatherName}
        onChange={handleChange}
      />

      <input
        name="motherName"
        placeholder="Mother Name"
        value={form.motherName}
        onChange={handleChange}
      />

      {/* CAREER */}
      <h3>🎓 Career</h3>

      <input
        name="education"
        placeholder="Education"
        value={form.education}
        onChange={handleChange}
      />

      <input
        name="job"
        placeholder="Job"
        value={form.job}
        onChange={handleChange}
      />

      <input
        name="income"
        placeholder="Income"
        value={form.income}
        onChange={handleChange}
      />

      {/* RELIGION */}
      <h3>🕉️ Religion</h3>

      <input
        name="religion"
        placeholder="Religion"
        value={form.religion}
        onChange={handleChange}
      />

      <input
        name="caste"
        placeholder="Caste"
        value={form.caste}
        onChange={handleChange}
      />

      <input
        name="star"
        placeholder="Star"
        value={form.star}
        onChange={handleChange}
      />

      <input
        name="zodiac"
        placeholder="Zodiac"
        value={form.zodiac}
        onChange={handleChange}
      />

      <input
        name="dosha"
        placeholder="Dosha"
        value={form.dosha}
        onChange={handleChange}
      />

      {/* CONTACT */}
      <h3>📞 Contact</h3>

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      {/* HOROSCOPE */}
      <h3>🔮 Horoscope</h3>

      <input
        name="zodiacImage"
        placeholder="Zodiac Image URL"
        value={form.zodiacImage}
        onChange={handleChange}
      />

      <input
        name="navamsaImage"
        placeholder="Navamsa Image URL"
        value={form.navamsaImage}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={handleSubmit} style={styles.button}>
        Save
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    maxWidth: 600,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10
  },

  button: {
    padding: 10,
    background: "#8B0000",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  }
};

export default AddProfile;