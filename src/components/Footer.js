import { Link } from "react-router-dom";
export default function Footer() {
  return <footer className="member-footer"><div><Link className="footer-brand" to="/">Namakkal Matrimony</Link><p>Connections that feel like home.</p></div><nav aria-label="Footer navigation"><Link to="/profiles">Find a match</Link><Link to="/my-dashboard">My account</Link><Link to="/account-settings">Privacy settings</Link></nav><small>Namakkal, Tamil Nadu</small></footer>;
}
