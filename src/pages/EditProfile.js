import { FiSave, FiTrash2, FiUpload } from "react-icons/fi";
import "./EditProfile.css";
import { useLanguage } from "../Language";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import JobDetails from "../components/JobDetails";

const cleanTitle = value => value.replace(/^[^\p{L}\p{N}]+/u, "");

function EditProfile() {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
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
    occupationType: "",

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
    branchLocations: "",

    socialMedia: "",
    nri: "",

    religion: "",
    caste: "",
    subCaste: "",

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

    motherTongue: "",
    kuladeivam: "",

    preferredRashi: "",
    preferredStar: "",

    acceptSevvaiDosham: "Yes",
    horoscopeMatchingRequired: "Yes",

    numberOfBranches: "",
    registerAs: "Self",

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

    mobile: "",
    address: "",

    hideMobile: false,
    hideIncome: false,
    hideCompany: false,
    hidePhotos: false,
    profileVisibility: "Public",

    isPremium: false,
    gstVerified: false,
    businessVerified: false,

    image: "",
    profilePhotos: [],
    familyPhotos: [],
    officePhotos: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [familyPhotos, setFamilyPhotos] = useState([]);
  const [officePhotos, setOfficePhotos] = useState([]);
  const [horoscopeFile, setHoroscopeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API}/users/${id}`);
      setForm((prev) => ({
        ...prev,
        ...res.data,
      }));
    } catch (err) {
      setError(t("Unable to load profile. Please try again."));
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    if (saving || loading) return;
    setSaving(true);
    setError("");
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (
          [
            "_id",
            "__v",
            "createdAt",
            "updatedAt",
            "image",
            "profilePhotos",
            "familyPhotos",
            "officePhotos",
            "interestRequests",
            "favoriteProfiles",
            "acceptedRequests",
            "blockedUsers",
          ].includes(key)
        ) {
          return;
        }

        formData.append(key, key === "hideMobile" ? false : form[key] ?? "");
      });

      if (profilePhotos.length > 0) {
        profilePhotos.forEach((photo) => {
          formData.append("profilePhotos", photo);
        });
      }

      if (familyPhotos.length > 0) {
        familyPhotos.forEach((photo) => {
          formData.append("familyPhotos", photo);
        });
      }

      if (officePhotos.length > 0) {
        officePhotos.forEach((photo) => {
          formData.append("officePhotos", photo);
        });
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (horoscopeFile) {
        formData.append("horoscopeFile", horoscopeFile);
      }

      const { data } = await axios.put(`${API}/users/${id}`, formData);
      const account = JSON.parse(localStorage.getItem("user") || "null");
      if (account?._id === id) localStorage.setItem("user", JSON.stringify({ ...account, ...data }));

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
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this profile?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`${API}/users/${id}`);

    alert("Profile deleted successfully.");

    navigate("/profiles");
  } catch (err) {
    console.log(err);
    alert("Failed to delete profile.");
  }
};

  return (<div className="member-editor premium-editor" style={styles.page}><div style={styles.container}>
<header className="edit-page-header"><div><p className="edit-eyebrow">{t("My profile")}</p><h1>{cleanTitle(t("✏️ Edit Profile"))}</h1><p className="edit-member-name">{form.name || t("Name")}</p></div><button className="edit-save" onClick={handleUpdate} disabled={saving || loading}><FiSave aria-hidden="true" />{t(saving ? "Updating..." : "Save Profile")}</button></header>
{error && <div className="edit-feedback" role="alert">{error}<button onClick={fetchUser}>{t("Try again")}</button></div>}

<main className="edit-content" aria-busy={loading}><section className="edit-section" id="edit-section-0"><header><span className="edit-section-number">01</span><h2>{cleanTitle(t("👤 Basic Information"))}</h2></header><div className="edit-fields"><label className="edit-field"><span>{t("Name")}</span><input style={styles.input} name="name" placeholder={t("Name")} value={form.name || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Email")}</span><input style={styles.input} name="email" placeholder={t("Email")} value={form.email || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Date of birth")}</span><input type="date" style={styles.input} name="dob" value={form.dob || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Age")}</span><input style={styles.input} name="age" placeholder={t("Age")} value={form.age || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Height")}</span><input style={styles.input} name="height" placeholder={t("Height")} value={form.height || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Weight")}</span><input style={styles.input} name="weight" placeholder={t("Weight")} value={form.weight || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Select Gender")}</span><select style={styles.input} name="gender" value={form.gender || ""} onChange={handleChange}>
            <option value="">{t("Select Gender")}</option>
            <option value="Male">{t("Male")}</option>
            <option value="Female">{t("Female")}</option>
          </select></label></div></section>
<section className="edit-section" id="edit-section-1"><header><span className="edit-section-number">02</span><h2>{cleanTitle(t("🖼 Main Profile Image"))}</h2></header><div className="edit-fields"><label className="edit-upload"><FiUpload aria-hidden="true" /><input type="file" onChange={e => setImageFile(e.target.files[0])} /></label>
{form.image && <img src={form.image} alt={t("Profile")} style={styles.previewImage} />}</div></section>
<section className="edit-section" id="edit-section-2"><header><span className="edit-section-number">03</span><h2>{cleanTitle(t("📍 Personal Details"))}</h2></header><div className="edit-fields"><label className="edit-field"><span>{t("Mother Tongue")}</span><input style={styles.input} name="motherTongue" placeholder={t("Mother Tongue")} value={form.motherTongue || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Native Place")}</span><input style={styles.input} name="nativePlace" placeholder={t("Native Place")} value={form.nativePlace || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Current City")}</span><input style={styles.input} name="currentCity" placeholder={t("Current City")} value={form.currentCity || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("District")}</span><input style={styles.input} name="district" placeholder={t("District")} value={form.district || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("State")}</span><input style={styles.input} name="state" placeholder={t("State")} value={form.state || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Country")}</span><input style={styles.input} name="country" placeholder={t("Country")} value={form.country || ""} onChange={handleChange} /></label></div></section>
<section className="edit-section" id="edit-section-3"><header><span className="edit-section-number">04</span><h2>{cleanTitle(t("📞 Contact Details"))}</h2></header><div className="edit-fields"><label className="edit-field"><span>{t("Phone")}</span><input style={styles.input} name="mobile" placeholder={t("Phone")} value={form.mobile || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Address")}</span><input style={styles.input} name="address" placeholder={t("Address")} value={form.address || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Marital Status")}</span><select style={styles.input} name="maritalStatus" value={form.maritalStatus || ""} onChange={handleChange}>
            <option value="">{t("Marital Status")}</option>
            <option value="Never Married">{t("Never Married")}</option>
            <option value="Divorcee">{t("Divorcee")}</option>
            <option value="Widow">{t("Widow")}</option>
            <option value="Widower">{t("Widower")}</option>
          </select></label>
<label className="edit-field"><span>{t("Languages Known")}</span><input style={styles.input} name="languages" placeholder={t("Languages Known")} value={form.languages || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Hobbies")}</span><input style={styles.input} name="hobbies" placeholder={t("Hobbies")} value={form.hobbies || ""} onChange={handleChange} /></label></div></section>
<section className="edit-section" id="edit-section-4"><header><span className="edit-section-number">05</span><h2>{cleanTitle(t("📸 Profile Photos"))}</h2></header><div className="edit-fields"><label className="edit-upload"><FiUpload aria-hidden="true" /><input type="file" multiple onChange={e => setProfilePhotos(Array.from(e.target.files))} /></label>
<div style={styles.gallery}>
            {form.profilePhotos?.map((img, index) => <img key={index} src={img} alt={t("Profile")} style={styles.galleryImage} />)}
          </div></div></section>
<section className="edit-section" id="edit-section-5"><header><span className="edit-section-number">06</span><h2>{cleanTitle(t("🎓 Education & Career"))}</h2></header><div className="edit-fields"><label className="edit-field"><span>{t("Education")}</span><input style={styles.input} name="education" placeholder={t("Education")} value={form.education || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Occupation Type")}</span><select style={styles.input} name="occupationType" value={form.occupationType || ""} onChange={handleChange}>
            <option value="">{t("Occupation Type")}</option>
            <option value="Job">{t("Job")}</option>
            <option value="Business">{t("Business")}</option>
            <option value="Both">{t("Both")}</option>
          </select></label>
<JobDetails form={form} onChange={handleChange} inputStyle={styles.input} />
<label className="edit-field"><span>{t("Business Type")}</span><select style={styles.input} name="businessType" value={form.businessType || ""} onChange={handleChange}>
            <option value="">{t("Business Type")}</option>
            <option value="Job">{t("Job")}</option>
            <option value="Business">{t("Business")}</option>
            <option value="Both">{t("Both")}</option>
          </select></label>
<label className="edit-field"><span>{t("Business Category")}</span><input style={styles.input} name="businessCategory" placeholder={t("Business Category")} value={form.businessCategory || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Business Location")}</span><input style={styles.input} name="businessLocation" placeholder={t("Business Location")} value={form.businessLocation || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Number of Branches")}</span><input style={styles.input} name="numberOfBranches" placeholder={t("Number of Branches")} value={form.numberOfBranches || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Branch Locations")}</span><input style={styles.input} name="branchLocations" placeholder={t("Branch Locations")} value={form.branchLocations || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Years in Business")}</span><input style={styles.input} name="yearsInBusiness" placeholder={t("Years in Business")} value={form.yearsInBusiness || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Number of Employees")}</span><input style={styles.input} name="numberOfEmployees" placeholder={t("Number of Employees")} value={form.numberOfEmployees || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Business Website")}</span><input style={styles.input} name="businessWebsite" placeholder={t("Business Website")} value={form.businessWebsite || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Social Media")}</span><input style={styles.input} name="socialMedia" placeholder={t("Social Media")} value={form.socialMedia || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Annual Income")}</span><input style={styles.input} name="annualIncome" placeholder={t("Annual Income")} value={form.annualIncome || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("NRI?")}</span><select style={styles.input} name="nri" value={form.nri || ""} onChange={handleChange}>
            <option value="">{t("NRI?")}</option>
            <option value="Yes">{t("Yes")}</option>
            <option value="No">{t("No")}</option>
          </select></label></div></section>
<section className="edit-section" id="edit-section-6"><header><span className="edit-section-number">07</span><h2>{cleanTitle(t("🏢 Office Photos"))}</h2></header><div className="edit-fields"><label className="edit-upload"><FiUpload aria-hidden="true" /><input type="file" multiple onChange={e => setOfficePhotos(Array.from(e.target.files))} /></label>
{form.officePhotos?.length > 0 && <div style={styles.gallery}>
              {form.officePhotos.map((photo, index) => <img key={index} src={photo} alt={t("")} style={styles.galleryImage} />)}
            </div>}</div></section>
<section className="edit-section" id="edit-section-7"><header><span className="edit-section-number">08</span><h2>{cleanTitle(t("🛕 Religion & Horoscope"))}</h2></header><div className="edit-fields"><label className="edit-field"><span>{t("Religion")}</span><input style={styles.input} name="religion" placeholder={t("Religion")} value={form.religion || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Caste")}</span><input style={styles.input} name="caste" placeholder={t("Caste")} value={form.caste || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Sub Caste")}</span><input style={styles.input} name="subCaste" placeholder={t("Sub Caste")} value={form.subCaste || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Kuladeivam")}</span><input style={styles.input} name="kuladeivam" placeholder={t("Kuladeivam")} value={form.kuladeivam || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Star (Nakshatra)")}</span><input style={styles.input} name="star" placeholder={t("Star (Nakshatra)")} value={form.star || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Rashi")}</span><input style={styles.input} name="rashi" placeholder={t("Rashi")} value={form.rashi || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Lagnam")}</span><input style={styles.input} name="lagnam" placeholder={t("Lagnam")} value={form.lagnam || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Gothram")}</span><input style={styles.input} name="gothram" placeholder={t("Gothram")} value={form.gothram || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Dosha")}</span><select style={styles.input} name="dosha" value={form.dosha || ""} onChange={handleChange}>
            <option value="">{t("Dosha")}</option>
            <option value="Yes">{t("Yes")}</option>
            <option value="No">{t("No")}</option>
          </select></label>
<label className="edit-field"><span>{t("Sevvai Dosham - No")}</span><select style={styles.input} name="sevvaiDosham" value={form.sevvaiDosham || "No"} onChange={handleChange}>
            <option value="No">{t("Sevvai Dosham - No")}</option>
            <option value="Yes">{t("Sevvai Dosham - Yes")}</option>
          </select></label>
<label className="edit-field"><span>{t("Rahu Kethu Dosham - No")}</span><select style={styles.input} name="rahuKethuDosham" value={form.rahuKethuDosham || "No"} onChange={handleChange}>
            <option value="No">{t("Rahu Kethu Dosham - No")}</option>
            <option value="Yes">{t("Rahu Kethu Dosham - Yes")}</option>
          </select></label>
<label className="edit-field"><span>{t("Horoscope Available - No")}</span><select style={styles.input} name="horoscopeAvailable" value={form.horoscopeAvailable || "No"} onChange={handleChange}>
            <option value="No">{t("Horoscope Available - No")}</option>
            <option value="Yes">{t("Horoscope Available - Yes")}</option>
          </select></label>
<label className="edit-field"><span>{t("Birth Time")}</span><input type="time" style={styles.input} name="birthTime" value={form.birthTime || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Birth Place")}</span><input style={styles.input} name="birthPlace" placeholder={t("Birth Place")} value={form.birthPlace || ""} onChange={handleChange} /></label></div></section>
<section className="edit-section" id="edit-section-8"><header><span className="edit-section-number">09</span><h2>{cleanTitle(t("📄 Horoscope Upload"))}</h2></header><div className="edit-fields"><label className="edit-upload"><FiUpload aria-hidden="true" /><input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setHoroscopeFile(e.target.files[0])} /></label>
{form.horoscopeFile && <p style={{
  color: "#666"
}}>{t("📄 Horoscope file uploaded")}</p>}</div></section>
<section className="edit-section" id="edit-section-9"><header><span className="edit-section-number">10</span><h2>{cleanTitle(t("👨‍👩‍👧 Family Details"))}</h2></header><div className="edit-fields"><label className="edit-field"><span>{t("Father Name")}</span><input style={styles.input} name="fatherName" placeholder={t("Father Name")} value={form.fatherName || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Father Occupation")}</span><input style={styles.input} name="fatherOccupation" placeholder={t("Father Occupation")} value={form.fatherOccupation || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Mother Name")}</span><input style={styles.input} name="motherName" placeholder={t("Mother Name")} value={form.motherName || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Mother Occupation")}</span><input style={styles.input} name="motherOccupation" placeholder={t("Mother Occupation")} value={form.motherOccupation || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Number of Brothers")}</span><input style={styles.input} name="brothersCount" placeholder={t("Number of Brothers")} value={form.brothersCount || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Married Brothers")}</span><input style={styles.input} name="brothersMarried" placeholder={t("Married Brothers")} value={form.brothersMarried || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Number of Sisters")}</span><input style={styles.input} name="sistersCount" placeholder={t("Number of Sisters")} value={form.sistersCount || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Married Sisters")}</span><input style={styles.input} name="sistersMarried" placeholder={t("Married Sisters")} value={form.sistersMarried || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Family Type")}</span><select style={styles.input} name="familyType" value={form.familyType || ""} onChange={handleChange}>
            <option value="">{t("Family Type")}</option>
            <option value="Joint">{t("Joint")}</option>
            <option value="Nuclear">{t("Nuclear")}</option>
          </select></label>
<label className="edit-field"><span>{t("Family Status")}</span><select style={styles.input} name="familyStatus" value={form.familyStatus || ""} onChange={handleChange}>
            <option value="">{t("Family Status")}</option>
            <option value="Middle Class">{t("Middle Class")}</option>
            <option value="Upper Middle Class">{t("Upper Middle Class")}</option>
            <option value="Rich">{t("Rich")}</option>
          </select></label></div></section>
<section className="edit-section" id="edit-section-10"><header><span className="edit-section-number">11</span><h2>{cleanTitle(t("👨‍👩‍👧 Family Photos"))}</h2></header><div className="edit-fields"><label className="edit-upload"><FiUpload aria-hidden="true" /><input type="file" multiple onChange={e => setFamilyPhotos(Array.from(e.target.files))} /></label>
{form.familyPhotos?.length > 0 && <div style={styles.gallery}>
              {form.familyPhotos.map((photo, index) => <img key={index} src={photo} alt={t("")} style={styles.galleryImage} />)}
            </div>}</div></section>
<section className="edit-section" id="edit-section-11"><header><span className="edit-section-number">12</span><h2>{cleanTitle(t("❤️ Partner Preferences"))}</h2></header><div className="edit-fields"><label className="edit-field"><span>{t("Preferred Age From")}</span><input style={styles.input} name="preferredAgeFrom" placeholder={t("Preferred Age From")} value={form.preferredAgeFrom || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Preferred Age To")}</span><input style={styles.input} name="preferredAgeTo" placeholder={t("Preferred Age To")} value={form.preferredAgeTo || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Preferred Height")}</span><input style={styles.input} name="preferredHeight" placeholder={t("Preferred Height")} value={form.preferredHeight || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Preferred Education")}</span><input style={styles.input} name="preferredEducation" placeholder={t("Preferred Education")} value={form.preferredEducation || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Preferred Occupation")}</span><input style={styles.input} name="preferredOccupation" placeholder={t("Preferred Occupation")} value={form.preferredOccupation || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Preferred Religion")}</span><input style={styles.input} name="preferredReligion" placeholder={t("Preferred Religion")} value={form.preferredReligion || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Preferred Caste")}</span><input style={styles.input} name="preferredCaste" placeholder={t("Preferred Caste")} value={form.preferredCaste || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Preferred Location")}</span><input style={styles.input} name="preferredLocation" placeholder={t("Preferred Location")} value={form.preferredLocation || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Additional Expectations")}</span><textarea style={styles.textarea} name="expectations" placeholder={t("Additional Expectations")} value={form.expectations || ""} onChange={handleChange} /></label></div></section>
<section className="edit-section" id="edit-section-12"><header><span className="edit-section-number">13</span><h2>{cleanTitle(t("🔒 Privacy Settings"))}</h2></header><div className="edit-fields"><label style={styles.checkbox}>
            <input type="checkbox" name="hideIncome" checked={form.hideIncome || false} onChange={handleChange} />{t("Hide Annual Income")}</label>
<label style={styles.checkbox}>
            <input type="checkbox" name="hideCompany" checked={form.hideCompany || false} onChange={handleChange} />{t("Hide Company Name")}</label>
<label style={styles.checkbox}>
            <input type="checkbox" name="hidePhotos" checked={form.hidePhotos || false} onChange={handleChange} />{t("Hide Personal Photos")}</label>
<label className="edit-field"><span>{t("Profile visibility")}</span><select style={styles.input} name="profileVisibility" value={form.profileVisibility || "Public"} onChange={handleChange}>
            <option value="Public">{t("Public")}</option>
            <option value="Members Only">{t("Members Only")}</option>
            <option value="Private">{t("Private")}</option>
          </select></label></div></section>
<section className="edit-section" id="edit-section-13"><header><span className="edit-section-number">14</span><h2>{cleanTitle(t("⭐ Premium"))}</h2></header><div className="edit-fields"><label style={styles.checkbox}>
            <input type="checkbox" checked={form.isPremium || false} onChange={e => setForm({
    ...form,
    isPremium: e.target.checked
  })} />{t("Premium Member")}</label>
<label style={styles.checkbox}>
            <input type="checkbox" checked={form.gstVerified || false} onChange={e => setForm({
    ...form,
    gstVerified: e.target.checked
  })} />{t("GST Verified")}</label>
<label style={styles.checkbox}>
            <input type="checkbox" checked={form.businessVerified || false} onChange={e => setForm({
    ...form,
    businessVerified: e.target.checked
  })} />{t("Business Verified")}</label></div></section>
<section className="edit-section" id="edit-section-14"><header><span className="edit-section-number">15</span><h2>{cleanTitle(t("🌾 Assets & Property"))}</h2></header><div className="edit-fields"><label className="edit-field"><span>{t("Land (Acres)")}</span><input style={styles.input} name="landAcres" placeholder={t("Land (Acres)")} value={form.landAcres || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Land Value")}</span><input style={styles.input} name="landValue" placeholder={t("Land Value")} value={form.landValue || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("House Details")}</span><input style={styles.input} name="house" placeholder={t("House Details")} value={form.house || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Vehicle Details")}</span><input style={styles.input} name="vehicle" placeholder={t("Vehicle Details")} value={form.vehicle || ""} onChange={handleChange} /></label>
<label className="edit-field"><span>{t("Other Assets")}</span><textarea style={styles.textarea} name="otherAssets" placeholder={t("Other Assets")} value={form.otherAssets || ""} onChange={handleChange} /></label></div></section></main>
<footer className="edit-bottom-actions"><button className="edit-cancel" onClick={() => navigate("/my-dashboard")}>{t("Cancel")}</button><button className="edit-save" onClick={handleUpdate} disabled={saving || loading}><FiSave aria-hidden="true" />{t(saving ? "Updating..." : "Save Profile")}</button></footer>
<section className="edit-danger"><div><h2>{cleanTitle(t("Delete Profile"))}</h2></div><button onClick={handleDelete}><FiTrash2 aria-hidden="true" />{t("Delete Profile")}</button></section>
</div></div>);
}

const styles = {
  page: {
    background: "#fff5f7",
    minHeight: "100vh",
    padding: "120px 20px 40px",
  },

  container: {
    maxWidth: "800px",
    margin: "auto",
  },

  title: {
    textAlign: "center",
    color: "#8B0000",
    marginBottom: 30,
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
    fontWeight: "600",
  },

  updateBtn: {
    marginTop: 20,
    padding: "14px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  section: {
    background: "#fff",
    padding: 20,
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  input: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 15,
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

  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
    marginBottom: "10px",
  },

  deleteBtn: {
  marginTop: 10,
  width: "100%",
  padding: "15px",
  background: "#8B0000",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
},
};

export default EditProfile;
