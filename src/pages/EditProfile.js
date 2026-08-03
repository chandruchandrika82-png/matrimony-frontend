import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProfile() {

  console.log("🔥 NEW EDITPROFILE FILE LOADED 🔥");

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
  name: "",
  mobile: "",
  email: "",
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

  languages: "",
  hobbies: "",

  education: "",
  occupation: "",
  occupationType: "",

  companyName: "",
  businessType: "",
  annualIncome: "",

  businessLocation: "",
  businessWebsite: "",
  businessCategory: "",
  yearsInBusiness: "",
  numberOfEmployees: "",
  branchLocations: "",

  socialMedia: "",
  nri: "",

  religion: "",
  caste: "",
  subCaste: "",

  star: "",
  zodiac: "",
  rashi: "",
  gothram: "",
  dosha: "",
  birthTime: "",
  birthPlace: "",
  horoscopeFile: "",

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
  preferredAgeFrom: "",
preferredAgeTo: "",

preferredHeight: "",
preferredEducation: "",
preferredOccupation: "",

preferredReligion: "",
preferredCaste: "",
preferredLocation: "",

  expectations: "",
  landAcres: "",
landValue: "",
house: "",
vehicle: "",
otherAssets: "",

phone: "",
address: "",

// Privacy Settings
hideMobile: false,
hideIncome: false,
hideCompany: false,
hidePhotos: false,
profileVisibility: "Public",

// Membership & Verification
isPremium: false,
gstVerified: false,
businessVerified: false,
});
  const [imageFile, setImageFile] = useState(null);
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [familyPhotos, setFamilyPhotos] = useState([]);
  const [officePhotos, setOfficePhotos] = useState([]);

const fetchUser = useCallback(async () => {
  try {

   const res = await axios.get(
  `http://localhost:5000/api/users/${id}`
);
    console.log("FULL USER");
    console.log(res.data);
    console.log("IMAGE:", res.data.image);
    console.log("PROFILE PHOTOS:", res.data.profilePhotos);
    setForm({
    
      
  name: res.data.name || "",
  email: res.data.email || "",
  mobile: res.data.mobile || "",
  age: res.data.age || "",
  
  // ...all your editable fields only
});
console.log("FORM AFTER SET");
  } catch (err) {

    console.log(err);

  }

}, [id]);

useEffect(() => {

  fetchUser();

}, [fetchUser]);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
const handleUpdate = async () => {
  try {
    const formData = new FormData();
    console.log("========== FORM DATA ==========");

for (const [key, value] of formData.entries()) {
  console.log(key, value);
}

console.log("===============================");
    console.log("FORM OBJECT");
    console.log(form);

   Object.keys(form).forEach((key) => {
  // Don't send MongoDB/system fields
  if (
    [
      "_id",
      "__v",
      "createdAt",
      "updatedAt",

      // Images
      "image",
      "profilePhotos",
      "familyPhotos",
      "officePhotos",

      // Arrays managed by backend
      "interestRequests",
      "acceptedRequests",
      "blockedUsers"
    ].includes(key)
  ) {
    return;
  }

  formData.append(key, form[key] ?? "");
});
    if (profilePhotos) {
      profilePhotos.forEach((photo) => {
        formData.append("profilePhotos", photo);
      });
    }

    if (familyPhotos) {
      familyPhotos.forEach((photo) => {
        formData.append("familyPhotos", photo);
      });
    }

    if (officePhotos) {
      officePhotos.forEach((photo) => {
        formData.append("officePhotos", photo);
      });
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    console.log("======= FormData =======");

for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

console.log("========================");

  await axios.put(
  `http://localhost:5000/api/users/${id}`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

   alert("Profile Updated Successfully ❤️");
  navigate("/profiles");

} catch (err) {

  console.log("========== FRONTEND ERROR ==========");
  console.log(err);

  if (err.response) {
    console.log("Status:", err.response.status);
    console.log("Response:", err.response.data);
    alert(err.response.data.error || "Update Failed");
  } else {
    console.log("No response received");
    alert(err.message);
  }

}
};  
return (
  <div style={styles.page}>
    <div style={styles.container}>
      <h1 style={styles.title}>✏️ Edit Profile</h1>
      <button
  onClick={() => navigate(-1)}
  style={styles.backBtn}
>
  ← Back
</button>
      

      <div style={styles.section}>

        <h3>👤 Basic Information</h3>
        
        <button
  style={{
    marginTop: 20,
    padding: "14px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  }}
  
  onClick={handleUpdate}
>


  💾 Update Profile
  
</button>


        <input
          style={styles.input}
          name="name"
          placeholder="Name"
          value={form.name || ""}
          onChange={handleChange}
        />
        

        <input
          style={styles.input}
          name="mobile"
          placeholder="Mobile"
          value={form.mobile || ""}
          onChange={handleChange}
        />

        
        <input
  style={styles.input}
  name="email"
  placeholder="Email"
  value={form.email || ""}
  onChange={handleChange}
/>

<input
  type="date"
  style={styles.input}
  name="dob"
  value={form.dob || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="age"
  placeholder="Age"
  value={form.age || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="height"
  placeholder="Height"
  value={form.height || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="weight"
  placeholder="Weight"
  value={form.weight || ""}
  onChange={handleChange}
/>

<select
  style={styles.input}
  name="gender"
  value={form.gender || ""}
  onChange={handleChange}
>
  <option value="">Select Gender</option>
  <option>Male</option>
  <option>Female</option>
</select>

<h3 style={styles.heading}>🖼 Main Profile Image</h3>

<input
  type="file"
  onChange={(e) => setImageFile(e.target.files[0])}
/>

{form.image && (
  <img
    src={form.image}
    alt="Profile"
    style={styles.previewImage}
  />
)}

<h3 style={styles.heading}>📍 Personal Details</h3>

<input
  style={styles.input}
  name="nativePlace"
  placeholder="Native Place"
  value={form.nativePlace || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="currentCity"
  placeholder="Current City"
  value={form.currentCity || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="district"
  placeholder="District"
  value={form.district || ""}
  onChange={handleChange}
/>
<input
  style={styles.input}
  name="state"
  placeholder="State"
  value={form.state || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="country"
  placeholder="Country"
  value={form.country || ""}
  onChange={handleChange}
/>
<h3 style={styles.heading}>📞 Contact Details</h3>

<input
  style={styles.input}
  name="phone"
  placeholder="Phone"
  value={form.phone || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="address"
  placeholder="Address"
  value={form.address || ""}
  onChange={handleChange}
/>

<select
  style={styles.input}
  name="maritalStatus"
  value={form.maritalStatus || ""}
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
  name="languages"
  placeholder="Languages Known"
  value={form.languages || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="hobbies"
  placeholder="Hobbies"
  value={form.hobbies || ""}
  onChange={handleChange}
/>
<h3 style={styles.heading}>📸 Profile Photos</h3>

<input
  type="file"
  multiple
  onChange={(e) => setProfilePhotos(Array.from(e.target.files))}
/>

<div style={styles.gallery}>
  {form.profilePhotos?.map((img, index) => (
    <img
      key={index}
      src={img}      alt="Profile"
      style={styles.galleryImage}
    />
  ))}
</div>
<h3>🎓 Education & Career</h3>

<input
  style={styles.input}
  name="education"
  placeholder="Education"
  value={form.education || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="occupation"
  placeholder="Occupation"
  value={form.occupation || ""}
  onChange={handleChange}
/>

<select
  style={styles.input}
  name="occupationType"
  value={form.occupationType || ""}
  onChange={handleChange}
>
  <option value="">Occupation Type</option>
  <option value="Job">Job</option>
  <option value="Business">Business</option>
  <option value="Both">Both</option>
</select>

<h3 style={styles.heading}>💼 Business Information</h3>

<input
  style={styles.input}
  name="businessCategory"
  placeholder="Business Category"
  value={form.businessCategory || ""}
  onChange={handleChange}
/>
<input
  style={styles.input}
  name="businessType"
  placeholder="Business Type"
  value={form.businessType || ""}
  onChange={handleChange}
/>


<input
  style={styles.input}
  name="yearsInBusiness"
  placeholder="Years in Business"
  value={form.yearsInBusiness || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="numberOfEmployees"
  placeholder="Number of Employees"
  value={form.numberOfEmployees || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="branchLocations"
  placeholder="Branch Locations"
  value={form.branchLocations || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="companyName"
  placeholder="Company Name"
  value={form.companyName || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="businessLocation"
  placeholder="Business Location"
  value={form.businessLocation || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="businessWebsite"
  placeholder="Business Website"
  value={form.businessWebsite || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="socialMedia"
  placeholder="Social Media"
  value={form.socialMedia || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="annualIncome"
  placeholder="Annual Income"
  value={form.annualIncome || ""}
  onChange={handleChange}
/>

<select
  style={styles.input}
  name="nri"
  value={form.nri || ""}
  onChange={handleChange}
>
  <option value="">NRI?</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>

<h3 style={styles.heading}>🏢 Office Photos</h3>

<input
  type="file"
  multiple
  onChange={(e) => setOfficePhotos(Array.from(e.target.files))}
/>

{form.officePhotos?.length > 0 && (
  <div style={styles.gallery}>
    {form.officePhotos.map((photo, index) => (
      <img
        key={index}
        src={photo}
        alt=""
        style={styles.galleryImage}
      />
    ))}
  </div>
)}


{/* 🛕 Religion & Horoscope */}

<h3
  style={{
    color: "#8B0000",
    marginTop: 35,
    marginBottom: 15,
    borderBottom: "2px solid #f3d5d5",
    paddingBottom: 8
  }}
>

  🛕 Religion & Horoscope
</h3>

<input
  style={styles.input}
  name="religion"
  placeholder="Religion"
  value={form.religion || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="caste"
  placeholder="Caste"
  value={form.caste || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="subCaste"
  placeholder="Sub Caste"
  value={form.subCaste || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="star"
  placeholder="Star (Nakshatra)"
  value={form.star || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="rashi"
  placeholder="Rashi"
  value={form.rashi || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="zodiac"
  placeholder="Zodiac Sign"
  value={form.zodiac || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="gothram"
  placeholder="Gothram"
  value={form.gothram || ""}
  onChange={handleChange}
/>

<select
  style={styles.input}
  name="dosha"
  value={form.dosha || ""}
  onChange={handleChange}
>
  <option value="">Dosha</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>
<input
  style={styles.input}
  name="birthTime"
  placeholder="Birth Time"
  value={form.birthTime || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="birthPlace"
  placeholder="Birth Place"
  value={form.birthPlace || ""}
  onChange={handleChange}
/>

<h3 style={styles.heading}>📄 Horoscope Upload</h3>

<input
  type="file"
  accept=".pdf,.jpg,.jpeg,.png"
/>

{form.horoscopeFile && (
  <p style={{ color: "#666" }}>
    Uploaded Horoscope Available
  </p>
)}

<h3 style={styles.heading}>👨‍👩‍👧 Family Details</h3>

<input
  style={styles.input}
  name="fatherName"
  placeholder="Father Name"
  value={form.fatherName || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="fatherOccupation"
  placeholder="Father Occupation"
  value={form.fatherOccupation || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="motherName"
  placeholder="Mother Name"
  value={form.motherName || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="motherOccupation"
  placeholder="Mother Occupation"
  value={form.motherOccupation || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="brothersCount"
  placeholder="Number of Brothers"
  value={form.brothersCount || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="brothersMarried"
  placeholder="Married Brothers"
  value={form.brothersMarried || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="sistersCount"
  placeholder="Number of Sisters"
  value={form.sistersCount || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="sistersMarried"
  placeholder="Married Sisters"
  value={form.sistersMarried || ""}
  onChange={handleChange}
/>

<select
  style={styles.input}
  name="familyType"
  value={form.familyType || ""}
  onChange={handleChange}
>
  <option value="">Family Type</option>
  <option>Joint</option>
  <option>Nuclear</option>
</select>

<select
  style={styles.input}
  name="familyStatus"
  value={form.familyStatus || ""}
  onChange={handleChange}
>
  <option value="">Family Status</option>
  <option>Middle Class</option>
  <option>Upper Middle Class</option>
  <option>Rich</option>
</select>

<h3 style={styles.heading}>👨‍👩‍👧 Family Photos</h3>

<input
  type="file"
  multiple
  onChange={(e) => setFamilyPhotos(Array.from(e.target.files))}
/>

{form.familyPhotos?.length > 0 && (
  <div style={styles.gallery}>
    {form.familyPhotos.map((photo, index) => (
      <img
        key={index}
        src={photo}
        alt=""
        style={styles.galleryImage}
      />
    ))}
  </div>
)}

<h3 style={styles.heading}>❤️ Partner Preferences</h3>

<input
  style={styles.input}
  name="preferredAgeFrom"
  placeholder="Preferred Age From"
  value={form.preferredAgeFrom || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="preferredAgeTo"
  placeholder="Preferred Age To"
  value={form.preferredAgeTo || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="preferredHeight"
  placeholder="Preferred Height"
  value={form.preferredHeight || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="preferredEducation"
  placeholder="Preferred Education"
  value={form.preferredEducation || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="preferredOccupation"
  placeholder="Preferred Occupation"
  value={form.preferredOccupation || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="preferredReligion"
  placeholder="Preferred Religion"
  value={form.preferredReligion || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="preferredCaste"
  placeholder="Preferred Caste"
  value={form.preferredCaste || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="preferredLocation"
  placeholder="Preferred Location"
  value={form.preferredLocation || ""}
  onChange={handleChange}
/>

<textarea
  style={styles.textarea}
  name="expectations"
  placeholder="Additional Expectations"
  value={form.expectations || ""}
  onChange={handleChange}
/>

<h3 style={styles.heading}>🔒 Privacy Settings</h3>

<label>
  <input
    type="checkbox"
    name="hideMobile"
    checked={form.hideMobile || false}
    onChange={(e) =>
      setForm({
        ...form,
        hideMobile: e.target.checked
      })
    }
  />
  Hide Mobile Number
</label>

<label>
  <input
    type="checkbox"
    name="hideIncome"
    checked={form.hideIncome || false}
    onChange={(e) =>
      setForm({
        ...form,
        hideIncome: e.target.checked
      })
    }
  />
  Hide Annual Income
</label>

<label>
  <input
    type="checkbox"
    name="hideCompany"
    checked={form.hideCompany || false}
    onChange={(e) =>
      setForm({
        ...form,
        hideCompany: e.target.checked
      })
    }
  />
  Hide Company Name
</label>

<label>
  <input
    type="checkbox"
    name="hidePhotos"
    checked={form.hidePhotos || false}
    onChange={(e) =>
      setForm({
        ...form,
        hidePhotos: e.target.checked
      })
    }
  />
  Hide Personal Photos
</label>

<select
  style={styles.input}
  name="profileVisibility"
  value={form.profileVisibility || "Public"}
  onChange={handleChange}
>
  <option>Public</option>
  <option>Members Only</option>
  <option>Private</option>
</select>

<h3 style={styles.heading}>⭐ Premium</h3>

<label>
  <input
    type="checkbox"
    checked={form.isPremium || false}
    onChange={(e) =>
      setForm({
        ...form,
        isPremium: e.target.checked
      })
    }
  />
  Premium Member
</label>

<label>
  <input
    type="checkbox"
    checked={form.gstVerified || false}
    onChange={(e)=>
      setForm({
        ...form,
        gstVerified:e.target.checked
      })
    }
  />
  GST Verified
</label>

<label>
  <input
    type="checkbox"
    checked={form.businessVerified || false}
    onChange={(e)=>
      setForm({
        ...form,
        businessVerified:e.target.checked
      })
    }
  />
  Business Verified
</label>

<h3 style={styles.heading}>🌾 Assets & Property</h3>

<input
  style={styles.input}
  name="landAcres"
  placeholder="Land (Acres)"
  value={form.landAcres || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="landValue"
  placeholder="Land Value"
  value={form.landValue || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="house"
  placeholder="House Details"
  value={form.house || ""}
  onChange={handleChange}
/>

<input
  style={styles.input}
  name="vehicle"
  placeholder="Vehicle Details"
  value={form.vehicle || ""}
  onChange={handleChange}
/>

<textarea
  style={styles.textarea}
  name="otherAssets"
  placeholder="Other Assets"
  value={form.otherAssets || ""}
  onChange={handleChange}
/>

        
      </div>

    </div>
  </div>
);
}
const styles = {
  page: {
    background: "#fff5f7",
    minHeight: "100vh",
    padding: "120px 20px 40px"
  },

  container: {
    maxWidth: "800px",
    margin: "auto"
  },

  title: {
    textAlign: "center",
    color: "#8B0000",
    marginBottom: 30
  },

  section: {
    background: "#fff",
    padding: 20,
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
  },

  input: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 15
  },
  heading: {
  color: "#8B0000",
  marginTop: 20,
  marginBottom: 10,
},

textarea: {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 15,
  minHeight: 120,
  resize: "vertical",
},

previewImage: {
  width: 180,
  height: 180,
  objectFit: "cover",
  borderRadius: 15,
  marginTop: 10,
},

gallery: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))",
  gap: 15,
  marginTop: 15,
},

galleryImage: {
  width: "100%",
  height: 170,
  objectFit: "cover",
  borderRadius: 12,
  boxShadow: "0 4px 10px rgba(0,0,0,.15)",
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

checkbox: {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "15px",
  marginBottom: "10px",
},


};
export default EditProfile;