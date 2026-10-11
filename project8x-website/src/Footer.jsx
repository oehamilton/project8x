import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="sd-footer">
      <div className="sd-footer-inner">
        <div className="sd-footer-meta">
          <p>Contact-center technology consulting · Project8X</p>
          <p>Texas-based · Fully remote</p>
        </div>
        <nav aria-label="Footer">
          <Link to="/CompanyServices">Services</Link>
          <Link to="/AgentForge">AgentForge</Link>
          <Link to="/work">Work</Link>
          <Link to="/news">News</Link>
          <Link to="/about">About</Link>
          <Link to="/ContactUs">Contact</Link>
          <Link to="/privacy">Privacy</Link>
          <a href="/Privacy Policy SMS.pdf">SMS privacy (PDF)</a>
          <a href="/Terms and Conditions SMS.pdf">SMS terms (PDF)</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
