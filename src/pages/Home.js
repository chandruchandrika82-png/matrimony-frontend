import { useLanguage } from "../Language";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiSearch, FiShield, FiUsers, FiMapPin, FiHeart } from "react-icons/fi";
import "./Home.css";

const languages = ["Tamil", "Malayalam", "Telugu", "Kannada", "Hindi", "English"];
const religions = ["Hindu", "Muslim", "Christian", "Jain", "Other"];
const districts = ["Namakkal", "Chennai", "Coimbatore", "Erode", "Karur", "Madurai", "Salem", "Tiruchirappalli", "Tiruppur", "Vellore", "Other"];
const values = [
  [FiMapPin, "Closer to your roots", "Discover profiles by district, native place, language, and education."],
  [FiShield, "Privacy in your hands", "Choose how your photos are shared."],
  [FiUsers, "Family comes naturally", "Create a profile for yourself or someone in your family."],
];
const steps = [
  ["Tell your story", "Add your personal details, family background, and partner preferences."],
  ["Explore your possibilities", "Discover profiles and save the people you would like to get to know."],
  ["Make a connection", "Send an interest and begin a conversation once it is accepted."],
];

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const signedIn = Boolean(localStorage.getItem("token"));
  const [gender, setGender] = useState("Female");
  const [minAge, setMinAge] = useState("22");
  const [maxAge, setMaxAge] = useState("30");
  const [religion, setReligion] = useState("");
  const [motherTongue, setMotherTongue] = useState("Tamil");
  const [district, setDistrict] = useState("");
  const [error, setError] = useState("");
  const ages = Array.from({ length: 43 }, (_, i) => i + 18);
  function search(event) {
    event.preventDefault();
    if (+minAge > +maxAge) { setError("Minimum age must be lower than or equal to maximum age."); return; }
    navigate("/profiles", { state: { gender, minAge, maxAge, religion, motherTongue, district } });
  }
  return <main className="home-page">
    <section className="hero-section" aria-labelledby="home-title">
      <img className="hero-photo" src="/tamil-wedding-premium-hero.png" alt={t("Tamil bride and groom wearing traditional wedding attire and flower garlands")} fetchPriority="high" />
      <div className="hero-shade" />
      <div className="home-container hero-content"><p className="hero-kicker">{t("TRADITIONAL ROOTS. MODERN CONNECTIONS.")}</p><h1 id="home-title"><span>{t("New Varan")}</span><span>{t("Kongu Thirumana Matrimony")}</span></h1><div className="hero-title-rule" aria-hidden="true"><span /><FiHeart /><span /></div><p className="hero-copy">{t("Find a life partner who shares your values, culture and dreams.")}</p><div className="home-hero-actions"><Link to={signedIn ? "/profiles" : "/register"} className="home-primary">{t(signedIn ? "Find your match" : "Start your journey")}<FiArrowRight aria-hidden="true" /></Link></div></div>
    </section>

    <section className="search-band" id="find-a-match" aria-labelledby="search-title"><div className="home-container"><div className="search-heading"><div><p className="section-kicker">{t("Find your match")}</p><h2 id="search-title">{t("Find someone who feels right for you")}</h2></div><FiSearch aria-hidden="true" /></div>
      <form className="match-form" onSubmit={search}>
        <label>{t("Looking for")}<select value={gender} onChange={e => setGender(e.target.value)}><option value="Female">{t("Female")}</option><option value="Male">{t("Male")}</option></select></label>
        <fieldset className="age-field"><legend>{t("Age range")}</legend><div><select aria-label={t("Minimum age")} value={minAge} onChange={e => { setMinAge(e.target.value); setError(""); }}>{ages.map(age => <option key={age}>{age}</option>)}</select><span>{t("to")}</span><select aria-label={t("Maximum age")} value={maxAge} onChange={e => { setMaxAge(e.target.value); setError(""); }}>{ages.map(age => <option key={age}>{age}</option>)}</select></div></fieldset>
        <label>{t("Religion")}<select value={religion} onChange={e => setReligion(e.target.value)}><option value="">{t("Any religion")}</option>{religions.map(value => <option key={value} value={value}>{t(value)}</option>)}</select></label>
        <label>{t("Mother tongue")}<select value={motherTongue} onChange={e => setMotherTongue(e.target.value)}><option value="">{t("Any language")}</option>{languages.map(value => <option key={value} value={value}>{t(value)}</option>)}</select></label>
        <label>{t("Location")}<select value={district} onChange={e => setDistrict(e.target.value)}><option value="">{t("Any location")}</option>{districts.map(value => <option key={value} value={value}>{t(value)}</option>)}</select></label>
        <button className="home-primary" type="submit"><FiSearch aria-hidden="true" />{t("Search profiles")}</button>
      </form>{error && <p className="form-error" role="alert">{t(error)}</p>}
    </div></section>

    <section className="confidence-section"><div className="home-container"><div className="home-section-heading"><div><p className="section-kicker">{t("A PERSONAL APPROACH")}</p><h2>{t("Shared values.")} {t("Lasting possibilities.")}</h2></div><p>{t("Finding a life partner is personal. Make space for the details, the conversations, and the family connections that matter to you.")}</p></div><div className="confidence-grid">{values.map(([Icon, title, description]) => <article key={title}><Icon aria-hidden="true" /><h3>{t(title)}</h3><p>{t(description)}</p></article>)}</div></div></section>

    <section className="process-section"><div className="home-container"><div className="home-section-heading"><div><p className="section-kicker">{t("YOUR NEXT CHAPTER")}</p><h2>{t("A connection begins")} {t("with a simple hello.")}</h2></div></div><ol className="process-list">{steps.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{t(title)}</h3><p>{t(description)}</p></li>)}</ol></div></section>

    <section className="final-cta"><div className="home-container"><div><p className="section-kicker"><FiHeart aria-hidden="true" />{t("BEGIN AT YOUR OWN PACE")}</p><h2>{t("Your story deserves")} {t("a beautiful next chapter.")}</h2></div><Link className="home-primary" to={signedIn ? "/profiles" : "/register"}>{t(signedIn ? "Explore profiles" : "Join New Varan Kongu Thirumana Matrimony")}<FiArrowRight aria-hidden="true" /></Link></div></section>
  </main>;
}
