import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="sd-footer">
      <div className="sd-footer-inner">
        <p>Project8X · Contact center delivery</p>
        <nav aria-label="Footer">
          <Link to="/CompanyServices">Services</Link>
          <Link to="/platforms">Platforms</Link>
          <Link to="/agentforge">AgentForge</Link>
          <Link to="/work">Work</Link>
          <Link to="/about">About</Link>
          <Link to="/ContactUs">Contact</Link>
          <Link to="/Products">Products</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
