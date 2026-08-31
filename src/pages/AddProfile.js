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
  numberOfBranches: "",
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
  gothram: "",
  dosha: "",
  birthTime: "",
  birthPlace: "",
  horoscopeFile: "",
  lagnam: "",
  sevvaiDosham: "No",
  rahuKethuDosham: "No",
  horoscopeAvailable: "No",
  horoscopeMatchingPreference: "Preferred",

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
  preferredRashi: "",
  preferredStar: "",
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
  phone: "",
  address: "",

  // Privacy / Extra
  registerAs: "Self",
  profileVisibility: "Public",
  hideMobile: false,
  hideIncome: false,
  hideCompany: false,
  hidePhotos: false,
  isPremium: false,
  gstVerified: false,
  businessVerified: false,

  profilePhotos: [],
  familyPhotos: [],
  officePhotos: [],
};

function AddProfile() {
  const navigate = useNavigate();

  const API = "https://matrimony-backend-zbvm.onrender.com/api";
  // const API = "http://localhost:5000/api";

  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [familyPhotos, setFamilyPhotos] = useState([]);
  const [officePhotos, setOfficePhotos] = useState([]);
  const [horoscopeFile, setHoroscopeFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (
          key !== "profilePhotos" &&
          key !== "familyPhotos" &&
          key !== "officePhotos"
        ) {
          formData.append(key, form[key]);
        }
      });

      if (imageFile) formData.append("image", imageFile);
      if (horoscopeFile) formData.append("horoscopeFile", horoscopeFile);

      profilePhotos.forEach((photo) => formData.append("profilePhotos", photo));
      familyPhotos.forEach((photo) => formData.append("familyPhotos", photo));
      officePhotos.forEach((photo) => formData.append("officePhotos", photo));

      await axios.post(`${API}/users`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile Added Successfully 💍");
      setForm(initialForm);
      setImageFile(null);
      setProfilePhotos([]);
      setFamilyPhotos([]);
      setOfficePhotos([]);
      setHoroscopeFile(null);

      navigate("/profiles");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.error || "Submission Failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Back
        </button>

        <h1 style={styles.title}>💍 Complete Your Profile</h1>

        <div style={styles.section}>
          <h3 style={styles.heading}>👤 Basic Info</h3>

          <input style={styles.input} name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input style={styles.input} name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
          <input style={styles.input} name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input style={styles.input} type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <input style={styles.input} name="age" placeholder="Age" value={form.age} onChange={handleChange} />
          <select style={styles.input} name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input style={styles.input} type="date" name="dob" value={form.dob} onChange={handleChange} />
          <input style={styles.input} name="height" placeholder="Height" value={form.height} onChange={handleChange} />
          <input style={styles.input} name="weight" placeholder="Weight" value={form.weight} onChange={handleChange} />
          <input style={styles.input} name="nativePlace" placeholder="Native Place" value={form.nativePlace} onChange={handleChange} />
          <input style={styles.input} name="currentCity" placeholder="Current City" value={form.currentCity} onChange={handleChange} />
          <input style={styles.input} name="district" placeholder="District" value={form.district} onChange={handleChange} />
          <input style={styles.input} name="state" placeholder="State" value={form.state} onChange={handleChange} />
          <input style={styles.input} name="country" placeholder="Country" value={form.country} onChange={handleChange} />
          <select style={styles.input} name="maritalStatus" value={form.maritalStatus} onChange={handleChange}>
            <option value="">Marital Status</option>
            <option value="Never Married">Never Married</option>
            <option value="Divorcee">Divorcee</option>
            <option value="Widow">Widow</option>
            <option value="Widower">Widower</option>
          </select>

          <h4 style={styles.subHeading}>📸 Profile Photo</h4>
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

          <h4 style={styles.subHeading}>📸 Profile Photos</h4>
          <input type="file" multiple onChange={(e) => setProfilePhotos(Array.from(e.target.files))} />
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>📅 Personal Details</h3>
          <select style={styles.input} name="nri" value={form.nri} onChange={handleChange}>
            <option value="No">NRI - No</option>
            <option value="Yes">NRI - Yes</option>
          </select>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>👨‍👩‍👧 Family Details</h3>
          <input style={styles.input} name="fatherName" placeholder="Father Name" value={form.fatherName} onChange={handleChange} />
          <input style={styles.input} name="fatherOccupation" placeholder="Father Occupation" value={form.fatherOccupation} onChange={handleChange} />
          <input style={styles.input} name="motherName" placeholder="Mother Name" value={form.motherName} onChange={handleChange} />
          <input style={styles.input} name="motherOccupation" placeholder="Mother Occupation" value={form.motherOccupation} onChange={handleChange} />
          <input style={styles.input} name="brothersCount" placeholder="Number of Brothers" value={form.brothersCount} onChange={handleChange} />
          <input style={styles.input} name="brothersMarried" placeholder="Brothers Married" value={form.brothersMarried} onChange={handleChange} />
          <input style={styles.input} name="sistersCount" placeholder="Number of Sisters" value={form.sistersCount} onChange={handleChange} />
          <input style={styles.input} name="sistersMarried" placeholder="Sisters Married" value={form.sistersMarried} onChange={handleChange} />
          <select style={styles.input} name="familyType" value={form.familyType} onChange={handleChange}>
            <option value="">Family Type</option>
            <option value="Joint Family">Joint Family</option>
            <option value="Nuclear Family">Nuclear Family</option>
          </select>
          <select style={styles.input} name="familyStatus" value={form.familyStatus} onChange={handleChange}>
            <option value="">Family Status</option>
            <option value="Middle Class">Middle Class</option>
            <option value="Upper Middle Class">Upper Middle Class</option>
            <option value="Affluent">Affluent</option>
          </select>

          <h4 style={styles.subHeading}>👨‍👩‍👧 Family Photos</h4>
          <input type="file" multiple onChange={(e) => setFamilyPhotos(Array.from(e.target.files))} />
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>🎓 Career</h3>
          <input style={styles.input} name="education" placeholder="Education" value={form.education} onChange={handleChange} />
          <select style={styles.input} name="occupationType" value={form.occupationType} onChange={handleChange}>
            <option value="">Occupation Type</option>
            <option value="Job">Job</option>
            <option value="Business">Business</option>
            <option value="Both">Both</option>
          </select>
          <input style={styles.input} name="annualIncome" placeholder="Annual Income" value={form.annualIncome} onChange={handleChange} />
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>💼 Business Information</h3>
          <input style={styles.input} name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} />
          <select style={styles.input} name="businessType" value={form.businessType} onChange={handleChange}>
            <option value="">Business Type</option>
            <option value="Job">Job</option>
            <option value="Business">Business</option>
            <option value="Both">Both</option>
          </select>
          <input style={styles.input} name="businessCategory" placeholder="Business Category" value={form.businessCategory} onChange={handleChange} />
          <input style={styles.input} name="businessLocation" placeholder="Business Location" value={form.businessLocation} onChange={handleChange} />
          <input style={styles.input} name="numberOfBranches" placeholder="Number of Branches" value={form.numberOfBranches} onChange={handleChange} />
          <input style={styles.input} name="branchLocations" placeholder="Branch Locations" value={form.branchLocations} onChange={handleChange} />
          <input style={styles.input} name="yearsInBusiness" placeholder="Years in Business" value={form.yearsInBusiness} onChange={handleChange} />
          <input style={styles.input} name="numberOfEmployees" placeholder="Number of Employees" value={form.numberOfEmployees} onChange={handleChange} />
          <input style={styles.input} name="businessWebsite" placeholder="Business Website" value={form.businessWebsite} onChange={handleChange} />
          <input style={styles.input} name="socialMedia" placeholder="Social Media" value={form.socialMedia} onChange={handleChange} />
          <input style={styles.input} name="annualIncome" placeholder="Annual Income" value={form.annualIncome} onChange={handleChange} />

          <h4 style={styles.subHeading}>🏢 Office Photos</h4>
          <input type="file" multiple onChange={(e) => setOfficePhotos(Array.from(e.target.files))} />
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>🕉 Religion</h3>
          <input style={styles.input} name="religion" placeholder="Religion" value={form.religion} onChange={handleChange} />
          <input style={styles.input} name="caste" placeholder="Caste" value={form.caste} onChange={handleChange} />
          <input style={styles.input} name="subCaste" placeholder="Sub Caste" value={form.subCaste} onChange={handleChange} />
          <input style={styles.input} name="motherTongue" placeholder="Mother Tongue" value={form.motherTongue} onChange={handleChange} />
          <input style={styles.input} name="kuladeivam" placeholder="Kuladeivam" value={form.kuladeivam} onChange={handleChange} />
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>🔮 Horoscope</h3>
          <input style={styles.input} name="rashi" placeholder="Rashi" value={form.rashi} onChange={handleChange} />
          <input style={styles.input} name="star" placeholder="Star / Nakshatra" value={form.star} onChange={handleChange} />
          <input style={styles.input} name="lagnam" placeholder="Lagnam" value={form.lagnam} onChange={handleChange} />
          <input style={styles.input} name="gothram" placeholder="Gothram" value={form.gothram} onChange={handleChange} />
          <select style={styles.input} name="sevvaiDosham" value={form.sevvaiDosham} onChange={handleChange}>
            <option value="No">Sevvai Dosham - No</option>
            <option value="Yes">Sevvai Dosham - Yes</option>
          </select>
          <select style={styles.input} name="rahuKethuDosham" value={form.rahuKethuDosham} onChange={handleChange}>
            <option value="No">Rahu Kethu Dosham - No</option>
            <option value="Yes">Rahu Kethu Dosham - Yes</option>
          </select>
          <select style={styles.input} name="horoscopeAvailable" value={form.horoscopeAvailable} onChange={handleChange}>
            <option value="No">Horoscope Available - No</option>
            <option value="Yes">Horoscope Available - Yes</option>
          </select>
          <input type="time" style={styles.input} name="birthTime" value={form.birthTime} onChange={handleChange} />
          <input style={styles.input} name="birthPlace" placeholder="Birth Place" value={form.birthPlace} onChange={handleChange} />
          <select style={styles.input} name="horoscopeMatchingPreference" value={form.horoscopeMatchingPreference} onChange={handleChange}>
            <option value="Must Match">Must Match</option>
            <option value="Preferred">Preferred</option>
            <option value="Doesn't Matter">Doesn't Matter</option>
          </select>

          <h4 style={styles.subHeading}>📄 Horoscope Upload</h4>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setHoroscopeFile(e.target.files[0])}
          />
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>❤️ Partner Preferences</h3>
          <input style={styles.input} name="preferredAgeFrom" placeholder="Preferred Age From" value={form.preferredAgeFrom} onChange={handleChange} />
          <input style={styles.input} name="preferredAgeTo" placeholder="Preferred Age To" value={form.preferredAgeTo} onChange={handleChange} />
          <input style={styles.input} name="preferredHeight" placeholder="Preferred Height" value={form.preferredHeight} onChange={handleChange} />
          <input style={styles.input} name="preferredEducation" placeholder="Preferred Education" value={form.preferredEducation} onChange={handleChange} />
          <input style={styles.input} name="preferredOccupation" placeholder="Preferred Occupation" value={form.preferredOccupation} onChange={handleChange} />
          <input style={styles.input} name="preferredReligion" placeholder="Preferred Religion" value={form.preferredReligion} onChange={handleChange} />
          <input style={styles.input} name="preferredCaste" placeholder="Preferred Caste" value={form.preferredCaste} onChange={handleChange} />
          <input style={styles.input} name="preferredLocation" placeholder="Preferred Location" value={form.preferredLocation} onChange={handleChange} />
          <input style={styles.input} name="preferredRashi" placeholder="Preferred Rashi" value={form.preferredRashi} onChange={handleChange} />
          <input style={styles.input} name="preferredStar" placeholder="Preferred Star" value={form.preferredStar} onChange={handleChange} />
          <select style={styles.input} name="acceptSevvaiDosham" value={form.acceptSevvaiDosham} onChange={handleChange}>
            <option value="Yes">Accept Sevvai Dosham - Yes</option>
            <option value="No">Accept Sevvai Dosham - No</option>
          </select>
          <select style={styles.input} name="horoscopeMatchingRequired" value={form.horoscopeMatchingRequired} onChange={handleChange}>
            <option value="Yes">Horoscope Matching Required - Yes</option>
            <option value="No">Horoscope Matching Required - No</option>
          </select>
          <textarea
            style={{ ...styles.input, minHeight: 120, resize: "vertical" }}
            name="expectations"
            placeholder="Additional Expectations"
            value={form.expectations}
            onChange={handleChange}
          />
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>🌾 Assets & Property</h3>
          <input style={styles.input} name="landAcres" placeholder="Land (Acres)" value={form.landAcres} onChange={handleChange} />
          <input style={styles.input} name="landValue" placeholder="Land Value" value={form.landValue} onChange={handleChange} />
          <input style={styles.input} name="house" placeholder="House Details" value={form.house} onChange={handleChange} />
          <input style={styles.input} name="vehicle" placeholder="Vehicle Details" value={form.vehicle} onChange={handleChange} />
          <textarea
            style={{ ...styles.input, minHeight: 100, resize: "vertical" }}
            name="otherAssets"
            placeholder="Other Assets"
            value={form.otherAssets}
            onChange={handleChange}
          />
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>📞 Contact</h3>
          <input style={styles.input} name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input style={styles.input} name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        </div>

        <button onClick={handleSubmit} style={styles.button}>
          Save Profile 💍
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffe4ec",
    padding: "110px 20px 40px",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
  },
  backBtn: {
    padding: "10px 18px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    color: "#8B0000",
    marginBottom: 24,
  },
  section: {
    background: "#fff",
    padding: 20,
    borderRadius: 18,
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  heading: {
    margin: 0,
    color: "#8B0000",
  },
  subHeading: {
    margin: "10px 0 0",
    color: "#8B0000",
  },
  input: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 15,
    outline: "none",
  },
  button: {
    width: "100%",
    padding: 15,
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default AddProfile;