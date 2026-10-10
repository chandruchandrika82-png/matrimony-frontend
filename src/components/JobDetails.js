import { useLanguage } from "../Language";
import "./JobDetails.css";
const jobTypes = ["Private Job", "Government Job", "Full-time", "Part-time", "Contract", "Freelance", "Internship", "Other"];
export default function JobDetails({ form, onChange }) {
  const { t } = useLanguage();
  const hasJob = ["Job", "Both", "Private Job", "Government Job", "Professional", "Self Employed"].includes(form.occupationType);
  return <section className="career-details">
    <h4>{hasJob ? t("Job details") : t("Company details")}</h4>
    <div className="career-details-grid">
      <label className="career-field">{t("Company name")}<input name="companyName" autoComplete="organization" value={form.companyName || ""} onChange={onChange} /></label>
      {hasJob && <>
        <label className="career-field">{t("Job type")}<select name="jobType" value={form.jobType || ""} onChange={onChange}><option value="">{t("Select job type")}</option>{form.jobType && !jobTypes.includes(form.jobType) && <option value={form.jobType}>{form.jobType}</option>}{jobTypes.map(type => <option key={type} value={type}>{t(type)}</option>)}</select></label>
        <label className="career-field">{t("Job category")}<input name="jobCategory" value={form.jobCategory || ""} onChange={onChange} /></label>
        <label className="career-field">{t("Job location")}<input name="jobLocation" value={form.jobLocation || ""} onChange={onChange} /></label>
        <label className="career-field">{t("Experience (years)")}<input name="jobExperience" type="number" min="0" step="any" value={form.jobExperience || ""} onChange={onChange} /></label>
      </>}
    </div>
  </section>;
}
