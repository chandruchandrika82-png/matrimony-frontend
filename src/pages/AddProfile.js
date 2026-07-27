import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const initialForm = {
  // Basic
  name: "",
  mobile: "",
  email: "",
  password: "",

  age: "",
  gender: "",
  dob: "",
  height: "",
  weight: "",

  nativePlace: "",
  currentCity: "",
  district: "",
  state: "",
  country: "",
  maritalStatus: "",

  // Career
  education: "",
  occupation: "",
  nri: "No",

  occupationType: "",
  companyName: "",
  businessType: "",
  annualIncome: "",
  businessLocation: "",
  businessWebsite: "",
  businessCategory: "",
  numberOfEmployees: "",
  yearsInBusiness: "",
  branchLocations: "",

  socialMedia: "",
  

  // Religion
  religion: "",
  caste: "",
  subCaste: "",

  // Horoscope
  star: "",
  zodiac: "",
  rashi: "",
  gothram: "",
  dosha: "",
  birthTime: "",
  birthPlace: "",
  horoscopeFile: "",

  // Family
  fatherName: "",
fatherOccupation: "",

motherName: "",
motherOccupation: "",

brothersCount: "",
brothersMarried: "",

sistersCount: "",
sistersMarried: "",

familyType: "",
familyStatus: "",
// Partner Preferences
preferredAgeFrom: "",
preferredAgeTo: "",

preferredHeight: "",
preferredEducation: "",
preferredOccupation: "",
preferredReligion: "",
preferredCaste: "",
preferredLocation: "",

  // Others
  languages: "",
  hobbies: "",
  expectations: "",
  landAcres: "",
  landValue: "",
  house: "",
  vehicle: "",
  otherAssets: "",

  phone: "",
  address: "",

  registerAs: "Self",

  profilePhotos: [],
  familyPhotos: [],
  officePhotos: [],

  gstVerified: false,
  businessVerified: false
};

function AddProfile() {

const navigate = useNavigate();

const [form, setForm] = useState(initialForm);
const [imageFile, setImageFile] = useState(null);
const [profilePhotos, setProfilePhotos] = useState([]);
const [familyPhotos, setFamilyPhotos] = useState([]);
const [officePhotos, setOfficePhotos] = useState([]);
const [horoscopeFile, setHoroscopeFile] = useState(null);

  const handleChange = (e) => {
  setForm((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};  
  

  const handleSubmit = async () => {
  try {

    const formData = new FormData();

    // All text fields
    Object.keys(form).forEach((key) => {
  if (
    key !== "profilePhotos" &&
    key !== "familyPhotos" &&
    key !== "officePhotos" 
  
  ) {
    formData.append(key, form[key]);
  }
});

    // Main Profile Image
    if (imageFile) {
      formData.append("image", imageFile);
    }
    // Horoscope File
if (horoscopeFile) {
  formData.append("horoscopeFile", horoscopeFile);
}
    
    
    // Multiple Profile Photos
    for (let photo of profilePhotos) {
      formData.append("profilePhotos", photo);
    }

    // Family Photos
    for (let photo of familyPhotos) {
      formData.append("familyPhotos", photo);
    }

    // Office Photos
    for (let photo of officePhotos) {
      formData.append("officePhotos", photo);
    }

    await axios.post(
      "http://localhost:5000/api/users",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Profile Added Successfully 💍");

    setForm(initialForm);

    setImageFile(null);
    setProfilePhotos([]);
    setFamilyPhotos([]);
    setOfficePhotos([]);

  } catch (err) {

    console.log(err);

    alert(
      err?.response?.data?.error ||
      "Submission Failed"
    );
  }
};
  return (
    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.title}>💍 Add Profile</h1>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
  <button
    onClick={() => navigate(-1)}
    style={styles.backBtn}
  >
    ← Back
  </button>
</div>

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
  name="height"
  placeholder="Height (e.g. 5'6&quot;)"
  value={form.height}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="weight"
  placeholder="Weight (kg)"
  value={form.weight}
  onChange={handleChange}
/>
          <input
  style={styles.input}
  name="nativePlace"
  placeholder="Native Place"
  value={form.nativePlace}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="currentCity"
  placeholder="Current City"
  value={form.currentCity}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="district"
  placeholder="District"
  value={form.district}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="state"
  placeholder="State"
  value={form.state}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="country"
  placeholder="Country"
  value={form.country}
  onChange={handleChange}
/>

<select
  style={styles.input}
  name="maritalStatus"
  value={form.maritalStatus}
  onChange={handleChange}
>
  <option value="">Marital Status</option>
  <option value="Never Married">Never Married</option>
  <option value="Divorcee">Divorcee</option>
  <option value="Widow">Widow</option>
  <option value="Widower">Widower</option>
</select>

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

          <h3 style={styles.heading}>📸 Profile Photos</h3>

<input
  type="file"
  multiple
  onChange={(e) => setProfilePhotos(Array.from(e.target.files))}
/>

        </div>

        {/* PERSONAL DETAILS */}
        <div style={styles.section}>
          <h3>📅 Personal Details</h3>

          <select
  style={styles.input}
  name="gender"
  value={form.gender}
  onChange={handleChange}
>
  <option value="">Select Gender</option>
  <option>Male</option>
  <option>Female</option>
</select>

          <input
  type="date"
  style={styles.input}
  name="dob"
  value={form.dob}
  onChange={handleChange}
/>
          <select
style={styles.input}
name="nri"
value={form.nri}
onChange={handleChange}
>
<option>No</option>
<option>Yes</option>
</select>

          
        </div>

       {/* FAMILY DETAILS */}
<div style={styles.section}>
  <h3>👨‍👩‍👧‍👦 Family Details</h3>

  <input
    style={styles.input}
    name="fatherName"
    placeholder="Father Name"
    value={form.fatherName}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="fatherOccupation"
    placeholder="Father Occupation"
    value={form.fatherOccupation}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="motherName"
    placeholder="Mother Name"
    value={form.motherName}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="motherOccupation"
    placeholder="Mother Occupation"
    value={form.motherOccupation}
    onChange={handleChange}
  />

  <input
    type="number"
    style={styles.input}
    name="brothersCount"
    placeholder="Number of Brothers"
    value={form.brothersCount}
    onChange={handleChange}
  />

  <input
    type="number"
    style={styles.input}
    name="brothersMarried"
    placeholder="Brothers Married"
    value={form.brothersMarried}
    onChange={handleChange}
  />

  <input
    type="number"
    style={styles.input}
    name="sistersCount"
    placeholder="Number of Sisters"
    value={form.sistersCount}
    onChange={handleChange}
  />

  <input
    type="number"
    style={styles.input}
    name="sistersMarried"
    placeholder="Sisters Married"
    value={form.sistersMarried}
    onChange={handleChange}
  />

  <select
    style={styles.input}
    name="familyType"
    value={form.familyType}
    onChange={handleChange}
  >
    <option value="">Family Type</option>
    <option value="Joint Family">Joint Family</option>
    <option value="Nuclear Family">Nuclear Family</option>
  </select>

  <select
    style={styles.input}
    name="familyStatus"
    value={form.familyStatus}
    onChange={handleChange}
  >
    <option value="">Family Status</option>
    <option value="Middle Class">Middle Class</option>
    <option value="Upper Middle Class">Upper Middle Class</option>
    <option value="Affluent">Affluent</option>
  </select>

  <h3 style={styles.heading}>👨‍👩‍👧‍👦 Family Photos</h3>

  <input
    type="file"
    multiple
    onChange={(e) => setFamilyPhotos(Array.from(e.target.files))}
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
  name="occupation"
  placeholder="Occupation"
  value={form.occupation}
  onChange={handleChange}
/>

<select
  style={styles.input}
  name="occupationType"
  value={form.occupationType}
  onChange={handleChange}
>
  <option value="">Occupation Type</option>
  <option value="Job">Job</option>
  <option value="Business">Business</option>
  <option value="Both">Both</option>
</select>

          <input
  style={styles.input}
  name="annualIncome"
  placeholder="Annual Income"
  value={form.annualIncome}
  onChange={handleChange}
/>
        </div>
        {/* BUSINESS INFORMATION */}
<div style={styles.section}>
  <h3>💼 Business Information</h3>

 

  <input
  style={styles.input}
  name="businessCategory"
  placeholder="Business Category"
  value={form.businessCategory}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="yearsInBusiness"
  placeholder="Years in Business"
  value={form.yearsInBusiness}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="numberOfEmployees"
  placeholder="Number of Employees"
  value={form.numberOfEmployees}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="branchLocations"
  placeholder="Branch Locations"
  value={form.branchLocations}
  onChange={handleChange}
/>

  <input
    style={styles.input}
    name="companyName"
    placeholder="Company Name"
    value={form.companyName}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="businessType"
    placeholder="Business Type"
    value={form.businessType}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="businessLocation"
    placeholder="Business Location"
    value={form.businessLocation}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="annualIncome"
    placeholder="Annual Income"
    value={form.annualIncome}
    onChange={handleChange}
  />

  <select
    style={styles.input}
    name="nri"
    value={form.nri}
    onChange={handleChange}
  >
    <option value="No">NRI - No</option>
    <option value="Yes">NRI - Yes</option>
  </select>

  <h3 style={styles.heading}>🏢 Office Photos</h3>

<input
  type="file"
  multiple
  onChange={(e) => setOfficePhotos(Array.from(e.target.files))}
/>

</div>
        {/* LANGUAGES & HOBBIES */}
<div style={styles.section}>
  <h3>🗣 Languages & Hobbies</h3>

  <input
    style={styles.input}
    name="languages"
    placeholder="Languages Known"
    value={form.languages}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="hobbies"
    placeholder="Hobbies"
    value={form.hobbies}
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
          <input
  type="time"
  style={styles.input}
  name="birthTime"
  value={form.birthTime}
  onChange={handleChange}
/>
<input
  style={styles.input}
  name="birthPlace"
  placeholder="Birth Place"
  value={form.birthPlace}
  onChange={handleChange}
/>
<h3 style={styles.heading}>📄 Horoscope Upload</h3>

<input
  type="file"
  accept=".pdf,.jpg,.jpeg,.png"
  onChange={(e) => setHoroscopeFile(e.target.files[0])}
/>

        </div>
         {/* PARTNER EXPECTATIONS */}
<div style={styles.section}>
  <h3>❤️ Partner Expectations</h3>

  <input
    style={styles.input}
    name="preferredAgeFrom"
    placeholder="Preferred Age From"
    value={form.preferredAgeFrom}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredAgeTo"
    placeholder="Preferred Age To"
    value={form.preferredAgeTo}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredHeight"
    placeholder="Preferred Height"
    value={form.preferredHeight}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredEducation"
    placeholder="Preferred Education"
    value={form.preferredEducation}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredOccupation"
    placeholder="Preferred Occupation"
    value={form.preferredOccupation}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredReligion"
    placeholder="Preferred Religion"
    value={form.preferredReligion}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredCaste"
    placeholder="Preferred Caste"
    value={form.preferredCaste}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredLocation"
    placeholder="Preferred Location"
    value={form.preferredLocation}
    onChange={handleChange}
  />

  <textarea
    style={{
      ...styles.input,
      minHeight: "120px",
      resize: "vertical"
    }}
    name="expectations"
    placeholder="Additional Expectations"
    value={form.expectations}
    onChange={handleChange}
  />
</div>
{/* ASSETS & PROPERTY */}
<div style={styles.section}>
  <h3>🌾 Assets & Property</h3>

  <input
    style={styles.input}
    name="landAcres"
    placeholder="Land (Acres)"
    value={form.landAcres}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="landValue"
    placeholder="Land Value"
    value={form.landValue}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="house"
    placeholder="House Details"
    value={form.house}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="vehicle"
    placeholder="Vehicle Details"
    value={form.vehicle}
    onChange={handleChange}
  />

  <textarea
    style={{
      ...styles.input,
      minHeight: "100px",
      resize: "vertical"
    }}
    name="otherAssets"
    placeholder="Other Assets"
    value={form.otherAssets}
    onChange={handleChange}
  />
</div>
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
},

backBtn: {
  padding: "10px 20px",
  background: "#8B0000",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "15px"
}



};

export default AddProfile;