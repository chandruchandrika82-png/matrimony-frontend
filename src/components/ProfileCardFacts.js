import { FaComments, FaUsers, FaStar, FaGraduationCap, FaRulerVertical, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FiCompass } from "react-icons/fi";
import { useLanguage } from "../Language";
import "./ProfileCardFacts.css";

export function ProfileCardIdentity({ profile }) {
  const { t } = useLanguage();
  const location = [profile.currentCity || profile.district, profile.state].filter(Boolean).join(", ");
  return <div className="match-card-identity">
    <h2>{profile.name || t("Member")}</h2>
    <p className="match-card-location"><FaMapMarkerAlt aria-hidden="true" /><span>{location || t("Not shared")}</span></p>
    <p className="match-card-age"><FaCalendarAlt aria-hidden="true" /><span>{t("Age")}: <strong>{profile.age || t("Not shared")}</strong></span></p>
  </div>;
}

export default function ProfileCardFacts({ profile }) {
  const { t } = useLanguage();
  const facts = [
    ["Mother tongue", profile.motherTongue, FaComments],
    ["Caste", profile.caste, FaUsers],
    ["Rashi", profile.rashi, FiCompass],
    ["Star", profile.star, FaStar],
    ["Education", profile.education, FaGraduationCap],
    ["Height", profile.height, FaRulerVertical],
    ["Occupation", profile.occupationType === "Business" ? profile.businessCategory || profile.occupationType : profile.jobCategory || profile.occupationType, FaBriefcase],
  ];
  return <dl className="match-card-facts">{facts.map(([label, value, Icon]) => <div key={label} className={label === "Occupation" ? "match-card-occupation" : undefined}>
    <Icon aria-hidden="true" /><div><dt>{t(label)}</dt><dd>{value ? t(String(value)) : t("Not shared")}</dd></div>
  </div>)}</dl>;
}
