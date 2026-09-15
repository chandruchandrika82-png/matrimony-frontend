import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const religions = ["Hindu", "Muslim", "Christian", "Jain", "Other"];
const languages = ["Tamil", "Malayalam", "Telugu", "Kannada", "Hindi", "English"];

function Home() {
  const navigate = useNavigate();
  const [lookingFor, setLookingFor] = useState("Woman");
  const [ageFrom, setAgeFrom] = useState("22");
  const [ageTo, setAgeTo] = useState("27");
  const [religion, setReligion] = useState("");
  const [motherTongue, setMotherTongue] = useState("Tamil");

  const beginSearch = () => {
    navigate("/profiles", { state: { gender: lookingFor === "Woman" ? "Female" : "Male", minAge: ageFrom, maxAge: ageTo, religion, motherTongue } });
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="home-container hero-content">
          <p className="eyebrow">A trusted Tamil Nadu matrimonial service</p>
          <h1>Meaningful matches, with your family at the heart of every step.</h1>
          <p className="hero-copy">Discover compatible profiles from Namakkal and across Tamil Nadu in a respectful, private space.</p>
          <form className="match-form" onSubmit={(event) => { event.preventDefault(); beginSearch(); }}>
            <div className="match-field"><label htmlFor="lookingFor">Looking for</label><select id="lookingFor" value={lookingFor} onChange={(event) => setLookingFor(event.target.value)}><option value="Woman">A woman</option><option value="Man">A man</option></select></div>
            <div className="match-field"><label htmlFor="ageFrom">Age</label><div className="age-selects"><select id="ageFrom" value={ageFrom} onChange={(event) => setAgeFrom(event.target.value)}>{Array.from({ length: 43 }, (_, index) => index + 18).map((age) => <option key={age} value={age}>{age}</option>)}</select><span>to</span><select aria-label="Maximum age" value={ageTo} onChange={(event) => setAgeTo(event.target.value)}>{Array.from({ length: 43 }, (_, index) => index + 18).map((age) => <option key={age} value={age}>{age}</option>)}</select></div></div>
            <div className="match-field"><label htmlFor="religion">Religion</label><select id="religion" value={religion} onChange={(event) => setReligion(event.target.value)}><option value="">Any religion</option>{religions.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
            <div className="match-field"><label htmlFor="language">Mother tongue</label><select id="language" value={motherTongue} onChange={(event) => setMotherTongue(event.target.value)}><option value="">Any language</option>{languages.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
            <button className="search-button" type="submit">Search profiles</button>
          </form>
        </div>
      </section>
      <section className="home-container confidence-section">
        <div className="section-heading"><p className="section-kicker">Built for serious intentions</p><h2>A straightforward way for families to find a good match.</h2></div>
        <div className="confidence-grid">
          <article><span>01</span><h3>Profile privacy</h3><p>Members choose what photos and contact information are visible.</p></article>
          <article><span>02</span><h3>Family-friendly</h3><p>Register for yourself or support a son, daughter, relative, or friend.</p></article>
          <article><span>03</span><h3>Local discovery</h3><p>Search by Namakkal, district, native place, language, education, and more.</p></article>
        </div>
      </section>
      <section className="process-section"><div className="home-container process-layout"><div><p className="section-kicker">A considered journey</p><h2>Start with a profile that feels like you.</h2></div><ol className="process-list"><li><strong>Create your profile</strong><span>Share only the details you are comfortable showing.</span></li><li><strong>Find compatible profiles</strong><span>Use Tamil Nadu-focused filters and partner preferences.</span></li><li><strong>Connect with confidence</strong><span>Send an interest first, then start a conversation when it is accepted.</span></li></ol></div></section>
      <section className="home-container final-cta"><div><p className="section-kicker">Begin when you are ready</p><h2>Take the first step toward a meaningful partnership.</h2></div><button type="button" onClick={() => navigate("/register")}>Create a profile</button></section>
    </main>
  );
}

export default Home;
