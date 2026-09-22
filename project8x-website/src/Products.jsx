// src/Products.js
import { Link } from "react-router-dom";
import Page from "./Page.jsx";

const AZIMUTH_DOWNLOAD =
  "https://github.com/oehamilton/AZIMUTH/releases/download/v0.2.0/AZIMUTH.Setup.0.2.0.exe";
const AZIMUTH_REPO = "https://github.com/oehamilton/AZIMUTH";
const AZIMUTH_RELEASES = "https://github.com/oehamilton/AZIMUTH/releases";

function Products() {
  const products = [
    {
      name: "COMMS",
      tagline: "Secure Messaging for Technicians",
      description: "Android app that integrates with AWS and emails to provide clients with a secure and private, no spam, messaging system to technicians to receive alerts regarding EndPoint devices or any system that alerting is email enabled. Registration is completed via SMS for enhanced security.",
      features: [
        "Android mobile application",
        "AWS cloud integration",
        "Email alert integration",
        "SMS registration for security",
        "Secure and private messaging",
        "No spam messaging system",
        "Real-time technician alerts",
        "EndPoint device monitoring",
        "Email-enabled system alerts",
        "1024 character message limit"
      ],
      technologies: ["Android", "AWS", "SMS", "Email Integration", "Real-time Messaging"],
      status: "Available Now"
    },
    {
      name: "EZ-SMS.NET",
      tagline: "Standard SMS Messaging Solution",
      description: "Similar to COMMS but delivers messages via standard SMS messaging directly to user's phones. Features the same inbound spam filtering as COMMS, providing secure and reliable SMS delivery for EndPoint device alerts and email-enabled system notifications.",
      features: [
        "Standard SMS delivery",
        "Direct phone messaging",
        "Same spam filtering as COMMS",
        "AWS cloud integration",
        "Email alert integration",
        "Secure message delivery",
        "No spam messaging system",
        "Real-time technician alerts",
        "EndPoint device monitoring",
        "Email-enabled system alerts",
        "160 character message limit"
      ],
      technologies: [".NET", "AWS", "SMS", "Email Integration", "Real-time Messaging"],
      status: "Available Now"
    },
    {
      name: "AZIMUTH",
      tagline: "Smarter antenna pointing on the map",
      description:
        "Plan where to aim your antenna with confidence. AZIMUTH puts your home at the center of a clear world map, lets you pick a target, and shows direction and distance—without tying you to paid map services. The latest release adds rich, zoomable colored maps so you can get the detail you need on Windows 11.",
      features: [
        "World map view with your location at the center",
        "Choose a target and see bearing and distance at a glance",
        "No paid map subscriptions—bundled map plus optional caching",
        "Version 0.2.0: detailed colored maps with zoom",
        "Windows desktop installer—ready to run",
        "Open source—inspect the code and follow releases on GitHub"
      ],
      technologies: ["Windows 11", "Electron", "JavaScript"],
      status: "v0.2.0",
      downloadUrl: AZIMUTH_DOWNLOAD,
      repoUrl: AZIMUTH_REPO,
      releasesUrl: AZIMUTH_RELEASES
    }
  ];

  return (
    <Page title="Products">
      <p className="sd-kicker">Products</p>
      <h1 className="sd-h1">Software we ship.</h1>
      <hr className="sd-rule" />
      <p className="sd-lede">
        COMMS, EZ-SMS.NET, and AZIMUTH. Messaging products keep their legal
        documents. AZIMUTH keeps its Windows download.
      </p>

      {products.map((product) => (
        <article className="sd-product" key={product.name}>
          <p className="sd-kicker">{product.status}</p>
          <h2>{product.name}</h2>
          <p className="sd-meta">{product.tagline}</p>
          <div className="sd-prose">
            <p>{product.description}</p>
          </div>
          <ul className="sd-chips" aria-label={`${product.name} technologies`}>
            {product.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <h3 className="sd-subhead">Key features</h3>
          <ul className="sd-feature-list">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          {!product.downloadUrl && (
            <div className="sd-prose">
              <h3 className="sd-subhead">Legal and compliance</h3>
              <p>
                <a className="sd-text-link" href="/Privacy Policy SMS.pdf" target="_blank" rel="noopener noreferrer">
                  Privacy Policy (PDF)
                </a>
                {" · "}
                <a className="sd-text-link" href="/Terms and Conditions SMS.pdf" target="_blank" rel="noopener noreferrer">
                  Terms and Conditions (PDF)
                </a>
              </p>
              <p>
                Both products use SMS for messaging and registration. Review the
                privacy policy and terms before using the applications.
              </p>
            </div>
          )}

          <div className="sd-actions">
            {product.downloadUrl ? (
              <>
                <a className="sd-btn sd-btn-primary" href={product.downloadUrl}>
                  Download for Windows (v0.2.0)
                </a>
                <a className="sd-btn sd-btn-secondary" href={product.repoUrl} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
                <a className="sd-btn sd-btn-secondary" href={product.releasesUrl} target="_blank" rel="noopener noreferrer">
                  All releases
                </a>
              </>
            ) : (
              <>
                <Link to="/ContactUs" className="sd-btn sd-btn-primary">
                  Request demo
                </Link>
                <Link to="/CompanyServices" className="sd-btn sd-btn-secondary">
                  View services
                </Link>
              </>
            )}
          </div>
        </article>
      ))}

      <section className="sd-section">
        <h2>Custom product development</h2>
        <div className="sd-prose">
          <p>
            Need a custom solution for a specific requirement? The same team can
            build against the systems you already run.
          </p>
        </div>
        <div className="sd-actions">
          <Link to="/ContactUs" className="sd-btn sd-btn-primary">
            Talk to an architect
          </Link>
        </div>
      </section>
    </Page>
  );
}

export default Products;
