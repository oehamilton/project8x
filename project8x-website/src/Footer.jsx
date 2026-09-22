import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="sd-footer">
      <div className="sd-footer-inner">
        <p>Contact-center technology consulting · Project8X</p>
        <nav aria-label="Footer">
          <Link to="/CompanyServices">Services</Link>
          <Link to="/AgentForge">AgentForge</Link>
          <Link to="/work">Work</Link>
          <Link to="/about">About</Link>
          <Link to="/ContactUs">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
