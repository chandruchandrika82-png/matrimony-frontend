import { useLanguage } from "../Language";
import { useEffect, useState } from "react";
import {
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { API } from "../config/api";
import "./ProfileSave.css";
import JobDetails from "../components/JobDetails";


const initialForm = {
  // Personal
  name: "",
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
  occupationType: "",
  nri: "No",
  companyName: "",
  jobType: "",
  jobCategory: "",
  jobLocation: "",
  jobExperience: "",
  businessType: "",
  annualIncome: "",
  businessLocation: "",
  businessWebsite: "",
  businessCategory: "",
  yearsInBusiness: "",
  numberOfEmployees: "",
  numberOfBranches: "",
  branchLocations: "",
  socialMedia: "",

  // Religion
  religion: "",
  caste: "",
  subCaste: "",
  motherTongue: "",
  kuladeivam: "",

  // Horoscope
  star: "",
  rashi: "",
  lagnam: "",
  gothram: "",
  dosha: "",
  birthTime: "",
  birthPlace: "",
  horoscopeAvailable: "No",
  sevvaiDosham: "No",
  rahuKethuDosham: "No",

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

  // Partner Preference
  preferredAgeFrom: "",
  preferredAgeTo: "",
  preferredHeight: "",
  preferredEducation: "",
  preferredOccupation: "",
  preferredReligion: "",
  preferredCaste: "",
  preferredLocation: "",
  preferredStar: "",
  preferredRashi: "",
  acceptSevvaiDosham: "Yes",
  horoscopeMatchingRequired: "Yes",
  expectations: "",

  // Assets
  landAcres: "",
  landValue: "",
  house: "",
  vehicle: "",
  otherAssets: "",

  // Contact
  mobile: "",
  address: "",

  // Privacy
  registerAs: "Self",
  profileVisibility: "Public",
  hideMobile: false,
  hideIncome: false,
  hideCompany: false,
  hidePhotos: false,
  isPremium: false,
  gstVerified: false,
  businessVerified: false,
};

function AddProfile() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [imageFile, setImageFile] = useState(null);
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [familyPhotos, setFamilyPhotos] = useState([]);
  const [officePhotos, setOfficePhotos] = useState([]);
  const [horoscopeFile, setHoroscopeFile] = useState(null);
  const [account, setAccount] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser?._id) {
      navigate("/login");
      return;
    }
    setAccount(storedUser);
    setForm((current) => ({ ...current, name: storedUser.name || "", email: storedUser.email || "" }));
  }, [navigate]);
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
const handleSubmit = async () => {
  if (saving) return;
  setSaveError("");
  setSaving(true);
  try {
    const formData = new FormData();

    // എല്ലാ text fields add ചെയ്യുക
    Object.keys(form).forEach((key) => {
      formData.append(key, key === "hideMobile" ? false : form[key]);
    });

    // Profile Photo
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Profile Photos
    profilePhotos.forEach((photo) => {
      formData.append("profilePhotos", photo);
    });

    // Family Photos
    familyPhotos.forEach((photo) => {
      formData.append("familyPhotos", photo);
    });

    // Office Photos
    officePhotos.forEach((photo) => {
      formData.append("officePhotos", photo);
    });

    // Horoscope File
    if (horoscopeFile) {
      formData.append("horoscopeFile", horoscopeFile);
    }

    if (!account?._id) return;
    const response = await axios.put(`${API}/users/${account._id}`, formData);

    localStorage.setItem("user", JSON.stringify(response.data));
    alert("Profile saved successfully!");
    navigate("/profiles");

  } catch (err) {
  const message = err.response?.data?.error;
  setSaveError(typeof message === "string" ? message : !err.response
    ? "Unable to reach the server. Please check your connection and try again."
    : "Your profile could not be saved. The photo upload service may be unavailable. Try saving without photos, or contact the administrator.");
} finally {
  setSaving(false);
}
};
  return (
  <div className="member-editor" style={styles.page}>
    <div style={styles.container}>
      <header className="editor-heading"><p className="section-kicker">{t("YOUR NAMAKKAL MATRIMONY PROFILE")}</p><h1>{t("Tell your story")}</h1></header>
      {/* =========================
    SECTION 1 : PERSONAL DETAILS
========================= */}

<div style={styles.section}>


  <h3 style={styles.heading}>{t("👤 Personal Details")}</h3>
<input
    style={styles.input}
    name="motherTongue"
    placeholder={t("Mother Tongue")}
    value={form.motherTongue}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="name"
    placeholder={t("Full Name")}
    value={form.name}
    onChange={handleChange}
  />


  <input
    style={styles.input}
    name="email"
    type="email"
    placeholder={t("Email Address")}
    value={form.email}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="password"
    type="password"
    placeholder={t("Password")}
    value={form.password}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="age"
    type="number"
    placeholder={t("Age")}
    value={form.age}
    onChange={handleChange}
  />

  <select
    style={styles.input}
    name="gender"
    value={form.gender}
    onChange={handleChange}
  >
    <option value="">{t("Select Gender")}</option>
    <option value="Male">{t("Male")}</option>
    <option value="Female">{t("Female")}</option>
  </select>

  <input
    style={styles.input}
    name="dob"
    type="date"
    value={form.dob}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="height"
    placeholder={t("Height")}
    value={form.height}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="weight"
    placeholder={t("Weight")}
    value={form.weight}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="nativePlace"
    placeholder={t("Native Place")}
    value={form.nativePlace}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="currentCity"
    placeholder={t("Current City")}
    value={form.currentCity}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="district"
    placeholder={t("District")}
    value={form.district}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="state"
    placeholder={t("State")}
    value={form.state}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="country"
    placeholder={t("Country")}
    value={form.country}
    onChange={handleChange}
  />

  <select
    style={styles.input}
    name="maritalStatus"
    value={form.maritalStatus}
    onChange={handleChange}
  >
    <option value="">{t("Marital Status")}</option>
    <option value="Never Married">{t("Never Married")}</option>
    <option value="Divorced">{t("Divorced")}</option>
    <option value="Widowed">{t("Widowed")}</option>
  </select>
  </div>
 
  {/* ================= CAREER ================= */}

<div style={styles.section}>
  <h3 style={styles.heading}>{t("🎓Education & Career")}</h3>

  <input
    style={styles.input}
    name="education"
    placeholder={t("Highest Education")}
    value={form.education}
    onChange={handleChange}
  />

  <select
    style={styles.input}
    name="occupationType"
    value={form.occupationType}
    onChange={handleChange}
  >
    <option value="">{t("Occupation Type")}</option>
    <option value="Job">{t("Job")}</option>
    <option value="Both">{t("Both")}</option>
    <option value="Private Job">{t("Private Job")}</option>
    <option value="Government Job">{t("Government Job")}</option>
    <option value="Business">{t("Business")}</option>
    <option value="Self Employed">{t("Self Employed")}</option>
    <option value="Professional">{t("Professional")}</option>
    <option value="Farmer">{t("Farmer")}</option>
    <option value="Student">{t("Student")}</option>
    <option value="Other">{t("Other")}</option>
  </select>

  <input
    style={styles.input}
    name="annualIncome"
    placeholder={t("Annual Income")}
    value={form.annualIncome}
    onChange={handleChange}
  />

  <select
    style={styles.input}
    name="nri"
    value={form.nri}
    onChange={handleChange}
  >
    <option value="No">{t("NRI - No")}</option>
    <option value="Yes">{t("NRI - Yes")}</option>
  </select>
  <JobDetails form={form} onChange={handleChange} inputStyle={styles.input} />

  <select
    style={styles.input}
    name="businessType"
    value={form.businessType}
    onChange={handleChange}
  >
    <option value="">{t("Business Type")}</option>
    <option value="Manufacturing">{t("Manufacturing")}</option>
    <option value="Wholesale">{t("Wholesale")}</option>
    <option value="Retail">{t("Retail")}</option>
    <option value="IT">{t("IT")}</option>
    <option value="Construction">{t("Construction")}</option>
    <option value="Finance">{t("Finance")}</option>
    <option value="Healthcare">{t("Healthcare")}</option>
    <option value="Education">{t("Education")}</option>
    <option value="Other">{t("Other")}</option>
  </select>

  <input
    style={styles.input}
    name="businessCategory"
    placeholder={t("Business Category")}
    value={form.businessCategory}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="businessLocation"
    placeholder={t("Business Location")}
    value={form.businessLocation}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="businessWebsite"
    placeholder={t("Business Website")}
    value={form.businessWebsite}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="yearsInBusiness"
    placeholder={t("Years In Business")}
    value={form.yearsInBusiness}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="numberOfEmployees"
    placeholder={t("Number of Employees")}
    value={form.numberOfEmployees}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="numberOfBranches"
    placeholder={t("Number of Branches")}
    value={form.numberOfBranches}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="branchLocations"
    placeholder={t("Branch Locations")}
    value={form.branchLocations}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="socialMedia"
    placeholder={t("Social Media Link")}
    value={form.socialMedia}
    onChange={handleChange}
  />

</div>

{/* ================= FAMILY DETAILS ================= */}

<div style={styles.section}>
  <h3 style={styles.heading}>{t("👨‍👩‍👧‍👦 Family Details")}</h3>

  <input
    style={styles.input}
    name="fatherName"
    placeholder={t("Father Name")}
    value={form.fatherName}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="fatherOccupation"
    placeholder={t("Father Occupation")}
    value={form.fatherOccupation}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="motherName"
    placeholder={t("Mother Name")}
    value={form.motherName}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="motherOccupation"
    placeholder={t("Mother Occupation")}
    value={form.motherOccupation}
    onChange={handleChange}
  />

  <input
    type="number"
    style={styles.input}
    name="brothersCount"
    placeholder={t("Number of Brothers")}
    value={form.brothersCount}
    onChange={handleChange}
  />

  <input
    type="number"
    style={styles.input}
    name="brothersMarried"
    placeholder={t("Married Brothers")}
    value={form.brothersMarried}
    onChange={handleChange}
  />

  <input
    type="number"
    style={styles.input}
    name="sistersCount"
    placeholder={t("Number of Sisters")}
    value={form.sistersCount}
    onChange={handleChange}
  />

  <input
    type="number"
    style={styles.input}
    name="sistersMarried"
    placeholder={t("Married Sisters")}
    value={form.sistersMarried}
    onChange={handleChange}
  />

  <select
    style={styles.input}
    name="familyType"
    value={form.familyType}
    onChange={handleChange}
  >
    <option value="">{t("Family Type")}</option>
    <option value="Joint">{t("Joint Family")}</option>
    <option value="Nuclear">{t("Nuclear Family")}</option>
  </select>

  <select
    style={styles.input}
    name="familyStatus"
    value={form.familyStatus}
    onChange={handleChange}
  >
    <option value="">{t("Family Status")}</option>
    <option value="Middle Class">{t("Middle Class")}</option>
    <option value="Upper Middle Class">{t("Upper Middle Class")}</option>
    <option value="Rich">{t("Rich")}</option>
  </select>

  
</div>


{/* =========================
    SECTION 6 : RELIGION
========================= */}

<div style={styles.section}>
  <h3 style={styles.heading}>{t("🛕 Religion & Horoscope")}</h3>

  <input
    style={styles.input}
    name="religion"
    placeholder={t("Religion")}
    value={form.religion}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="caste"
    placeholder={t("Caste")}
    value={form.caste}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="subCaste"
    placeholder={t("Sub Caste")}
    value={form.subCaste}
    onChange={handleChange}
  />

  

  <input
    style={styles.input}
    name="kuladeivam"
    placeholder={t("Kuladeivam")}
    value={form.kuladeivam}
    onChange={handleChange}
  />
  <input
    style={styles.input}
    name="star"
    placeholder={t("Star / Nakshatra")}
    value={form.star}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="rashi"
    placeholder={t("Rashi")}
    value={form.rashi}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="lagnam"
    placeholder={t("Lagnam")}
    value={form.lagnam}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="gothram"
    placeholder={t("Gothram")}
    value={form.gothram}
    onChange={handleChange}
  />

  <select
    style={styles.input}
    name="sevvaiDosham"
    value={form.sevvaiDosham}
    onChange={handleChange}
  >
    <option value="No">{t("Sevvai Dosham - No")}</option>
    <option value="Yes">{t("Sevvai Dosham - Yes")}</option>
  </select>

  <select
    style={styles.input}
    name="rahuKethuDosham"
    value={form.rahuKethuDosham}
    onChange={handleChange}
  >
    <option value="No">{t("Rahu Kethu Dosham - No")}</option>
    <option value="Yes">{t("Rahu Kethu Dosham - Yes")}</option>
  </select>

  <select
    style={styles.input}
    name="horoscopeAvailable"
    value={form.horoscopeAvailable}
    onChange={handleChange}
  >
    <option value="No">{t("Horoscope Available - No")}</option>
    <option value="Yes">{t("Horoscope Available - Yes")}</option>
  </select>

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
    placeholder={t("Birth Place")}
    value={form.birthPlace}
    onChange={handleChange}
  />


  <h4 style={styles.subHeading}>{t("📄 Horoscope File")}</h4>

  <input
    type="file"
    accept=".pdf,.jpg,.jpeg,.png"
    onChange={(e) => setHoroscopeFile(e.target.files[0])}
  />
</div>

{/* ===========================
    PARTNER PREFERENCES
=========================== */}

<div style={styles.section}>
  <h3 style={styles.heading}>{t("💖 Partner Preferences")}</h3>

  <input
    style={styles.input}
    name="preferredAgeFrom"
    placeholder={t("Preferred Age From")}
    value={form.preferredAgeFrom}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredAgeTo"
    placeholder={t("Preferred Age To")}
    value={form.preferredAgeTo}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredHeight"
    placeholder={t("Preferred Height")}
    value={form.preferredHeight}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredEducation"
    placeholder={t("Preferred Education")}
    value={form.preferredEducation}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredOccupation"
    placeholder={t("Preferred Occupation")}
    value={form.preferredOccupation}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredReligion"
    placeholder={t("Preferred Religion")}
    value={form.preferredReligion}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredCaste"
    placeholder={t("Preferred Caste")}
    value={form.preferredCaste}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredLocation"
    placeholder={t("Preferred Location")}
    value={form.preferredLocation}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredStar"
    placeholder={t("Preferred Star")}
    value={form.preferredStar}
    onChange={handleChange}
  />

  <input
    style={styles.input}
    name="preferredRashi"
    placeholder={t("Preferred Rashi")}
    value={form.preferredRashi}
    onChange={handleChange}
  />

  <select
    style={styles.input}
    name="acceptSevvaiDosham"
    value={form.acceptSevvaiDosham}
    onChange={handleChange}
  >
    <option value="Yes">{t("Accept Sevvai Dosham - Yes")}</option>
    <option value="No">{t("Accept Sevvai Dosham - No")}</option>
  </select>

  <select
    style={styles.input}
    name="horoscopeMatchingRequired"
    value={form.horoscopeMatchingRequired}
    onChange={handleChange}
  >
    <option value="Yes">{t("Horoscope Matching Required")}</option>
    <option value="No">{t("Horoscope Matching Not Required")}</option>
  </select>

  <textarea
    style={{ ...styles.input, minHeight: 120 }}
    name="expectations"
    placeholder={t("Additional Expectations")}
    value={form.expectations}
    onChange={handleChange}
  />
</div>
        {/* ==========================================
            SECTION 8 - ASSETS & PROPERTY
        =========================================== */}

        <div style={styles.section}>
          <h3 style={styles.heading}>{t("🌾 Assets & Property")}</h3>

          <input
            style={styles.input}
            name="landAcres"
            placeholder={t("Land (Acres)")}
            value={form.landAcres}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="landValue"
            placeholder={t("Land Value")}
            value={form.landValue}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="house"
            placeholder={t("House Details")}
            value={form.house}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="vehicle"
            placeholder={t("Vehicle Details")}
            value={form.vehicle}
            onChange={handleChange}
          />

          <textarea
            style={{ ...styles.input, minHeight: 120 }}
            name="otherAssets"
            placeholder={t("Other Assets")}
            value={form.otherAssets}
            onChange={handleChange}
          />
        </div>
         

        {/* ==========================================
            SECTION 9 - PRIVACY SETTINGS
        =========================================== */}

        <div style={styles.section}>
          <h3 style={styles.heading}>{t("🔒 Privacy Settings")}</h3>

          

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="hideIncome"
              checked={form.hideIncome}
              onChange={handleChange}
            />{t("Hide Annual Income")}</label>

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="hideCompany"
              checked={form.hideCompany}
              onChange={handleChange}
            />{t("Hide Company Details")}</label>

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              name="hidePhotos"
              checked={form.hidePhotos}
              onChange={handleChange}
            />{t("Hide Photos")}</label>

          <select
            style={styles.input}
            name="profileVisibility"
            value={form.profileVisibility}
            onChange={handleChange}
          >
            <option value="Public">{t("Public")}</option>
            <option value="Members Only">{t("Members Only")}</option>
            <option value="Private">{t("Private")}</option>
          </select>
        </div>

       
        <div style={styles.section}>
  <h3 style={styles.heading}>{t("📷 Photo Uploads")}</h3>

  <h4 style={styles.subHeading}>{t("Profile Photo")}</h4>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImageFile(e.target.files[0])}
  />

  <h4 style={styles.subHeading}>{t("Profile Photos")}</h4>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => setProfilePhotos(Array.from(e.target.files))}
  />

  <h4 style={styles.subHeading}>{t("Family Photos")}</h4>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => setFamilyPhotos(Array.from(e.target.files))}
  />

  <h4 style={styles.subHeading}>{t("Office Photos")}</h4>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => setOfficePhotos(Array.from(e.target.files))}
  />
</div>

        
        {/* ===========================
            Section 10 - Contact Details
        ============================ */}

        <div style={styles.section}>
          <h3 style={styles.heading}>{t("📞 Contact Details")}</h3>

          <input
            style={styles.input}
    name="mobile"
            placeholder={t("Phone Number")}
    value={form.mobile}
            onChange={handleChange}
          />

          <textarea
            style={{
              ...styles.input,
              minHeight: 100,
              resize: "vertical",
            }}
            name="address"
            placeholder={t("Full Address")}
            value={form.address}
            onChange={handleChange}
          />
        </div>

        

        {/* ===========================
            Save Button
        ============================ */}

        {saveError && <p role="alert" className="profile-save-error">{saveError}</p>}
        <button
         type="button"
          disabled={saving}
          aria-busy={saving}
          style={styles.button}
          onClick={handleSubmit}
        >{t("💍 Save Profile")}</button>

      </div>
    </div>
  );
}

/* ===========================
   Styles
=========================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff5f7",
    padding: "110px 20px 40px",
  },

  container: {
    maxWidth: "900px",
    margin: "auto",
  },

  backBtn: {
    background: "#8B0000",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: 20,
  },

  title: {
    textAlign: "center",
    color: "#8B0000",
    marginBottom: 25,
  },

  section: {
    background: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  heading: {
    color: "#8B0000",
    marginBottom: 10,
  },

  subHeading: {
    color: "#8B0000",
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 15,
    width: "100%",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: 15,
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
};

export default AddProfile;
