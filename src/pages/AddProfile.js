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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // add all fields
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // add image
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

      alert("Profile Added 💍");

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
      console.log(err);
      alert("Error adding profile");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Profile 💍</h2>

      {/* BASIC */}
      <h3>👤 Basic Info</h3>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      {/* IMAGE */}
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      {/* PERSONAL */}
      <h3>📅 Personal Details</h3>
      <input name="gender" placeholder="Gender" onChange={handleChange} />
      <input name="dob" placeholder="Date of Birth" onChange={handleChange} />
      <input name="timeOfBirth" placeholder="Time of Birth" onChange={handleChange} />
      <input name="placeOfBirth" placeholder="Place of Birth" onChange={handleChange} />

      {/* FAMILY */}
      <h3>👪 Family</h3>
      <input name="fatherName" placeholder="Father Name" onChange={handleChange} />
      <input name="motherName" placeholder="Mother Name" onChange={handleChange} />

      {/* CAREER */}
      <h3>🎓 Career</h3>
      <input name="education" placeholder="Education" onChange={handleChange} />
      <input name="job" placeholder="Job" onChange={handleChange} />
      <input name="income" placeholder="Income" onChange={handleChange} />

      {/* RELIGION */}
      <h3>🕉️ Religion</h3>
      <input name="religion" placeholder="Religion" onChange={handleChange} />
      <input name="caste" placeholder="Caste" onChange={handleChange} />
      <input name="star" placeholder="Star" onChange={handleChange} />
      <input name="zodiac" placeholder="Zodiac" onChange={handleChange} />
      <input name="dosha" placeholder="Dosha" onChange={handleChange} />

      {/* CONTACT */}
      <h3>📞 Contact</h3>
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />

      {/* HOROSCOPE */}
      <h3>🔮 Horoscope</h3>
      <input
        name="zodiacImage"
        placeholder="Zodiac Image URL"
        onChange={handleChange}
      />
      <input
        name="navamsaImage"
        placeholder="Navamsa Image URL"
        onChange={handleChange}
      />

      <br /><br />
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