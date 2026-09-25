import { Link } from "react-router-dom";
import Page from "./Page.jsx";

const capabilities = [
  {
    title: "Consulting & delivery",
    text: "Contact-center architecture, integration, and program leadership for programs that have to work on day one — and keep working.",
    to: "/CompanyServices",
    mark: "delivery",
  },
  {
    title: "Contact-center platforms",
    text: "Genesys, Avaya, Cisco, Amazon Connect, and Verint — architecture and integration grounded in how the floor and the stack actually run.",
    to: "/platforms",
    mark: "platforms",
  },
  {
    title: "AgentForge",
    text: "An AgenticAI backbone for agent communication and governance — isolation, schemas, and control from pilot to production.",
    to: "/AgentForge",
    mark: "agents",
  },
];

function Mark({ kind }) {
  if (kind === "platforms") {
    return (
      <svg className="sd-mark" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="1.5" y="1.5" width="61" height="61" rx="10" fill="var(--sd-ground)" stroke="var(--sd-teal)" />
        <rect x="16" y="38" width="32" height="8" rx="2" fill="var(--sd-teal)" fillOpacity="0.35" stroke="var(--sd-teal)" />
        <rect x="20" y="28" width="24" height="8" rx="2" fill="var(--sd-teal)" fillOpacity="0.55" stroke="var(--sd-teal)" />
        <rect x="24" y="18" width="16" height="8" rx="2" fill="var(--sd-teal)" stroke="var(--sd-teal)" />
      </svg>
    );
  }
  if (kind === "agents") {
    return (
      <svg className="sd-mark" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="1.5" y="1.5" width="61" height="61" rx="10" fill="var(--sd-ground)" stroke="var(--sd-teal)" />
        <circle cx="32" cy="32" r="5" fill="var(--sd-teal)" />
        <circle cx="32" cy="14" r="3" fill="none" stroke="var(--sd-teal)" strokeWidth="1.5" />
        <circle cx="16" cy="44" r="3" fill="none" stroke="var(--sd-teal)" strokeWidth="1.5" />
        <circle cx="48" cy="44" r="3" fill="none" stroke="var(--sd-teal)" strokeWidth="1.5" />
        <path d="M32 27 V17 M28 35 L18 42 M36 35 L46 42" fill="none" stroke="var(--sd-teal)" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg className="sd-mark" viewBox="0 0 64 64" aria-hidden="true">
      <rect x="1.5" y="1.5" width="61" height="61" rx="10" fill="var(--sd-ground)" stroke="var(--sd-teal)" />
      <path d="M14 42 H28 L36 22 H50" fill="none" stroke="var(--sd-teal)" strokeWidth="1.5" />
      <circle cx="14" cy="42" r="3" fill="var(--sd-teal)" />
      <circle cx="28" cy="42" r="3" fill="var(--sd-teal)" />
      <circle cx="36" cy="22" r="3" fill="var(--sd-cyan-fill)" />
      <circle cx="50" cy="22" r="3" fill="var(--sd-teal)" />
    </svg>
  );
}

function HeroSchematic() {
  const seats = Array.from({ length: 12 }, (_, index) => 72 + index * 36);
  return (
    <svg
      className="sd-hero-visual"
      viewBox="0 0 560 440"
      role="img"
      aria-label="Contact-center routing holding steady under load"
    >
      <defs>
        <radialGradient id="sd-hero-glow" cx="50%" cy="46%" r="58%">
          <stop offset="0%" stopColor="var(--sd-teal)" stopOpacity="0.42" />
          <stop offset="68%" stopColor="var(--sd-teal)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--sd-ground)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="560" height="440" rx="16" fill="var(--sd-ground)" />
      <rect width="560" height="440" rx="16" fill="url(#sd-hero-glow)" />
      <rect
        x="1.5"
        y="1.5"
        width="557"
        height="437"
        rx="15"
        fill="none"
        stroke="var(--sd-teal)"
        strokeOpacity="0.85"
      />
      <g stroke="var(--sd-teal)" strokeOpacity="0.16">
        {Array.from({ length: 11 }, (_, index) => (
          <line key={`v-${index}`} x1={48 + index * 46} y1="32" x2={48 + index * 46} y2="408" />
        ))}
        {Array.from({ length: 8 }, (_, index) => (
          <line key={`h-${index}`} x1="32" y1={40 + index * 48} x2="528" y2={40 + index * 48} />
        ))}
      </g>
      <line
        x1="48"
        y1="72"
        x2="512"
        y2="72"
        stroke="var(--sd-teal)"
        strokeDasharray="4 7"
      />
      <path
        d="M48 128 C 96 128, 118 96, 160 100 S 230 146, 270 114 S 340 84, 392 102 S 470 138, 512 108"
        fill="none"
        stroke="var(--sd-cyan-fill)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g fill="none" stroke="var(--sd-teal)" strokeWidth="1.5">
        <rect x="78" y="158" width="96" height="176" rx="8" />
        <rect x="232" y="158" width="96" height="176" rx="8" />
        <rect x="386" y="158" width="96" height="176" rx="8" />
      </g>
      <rect x="86" y="252" width="80" height="74" rx="4" fill="var(--sd-teal)" fillOpacity="0.45" />
      <rect x="240" y="186" width="80" height="140" rx="4" fill="var(--sd-teal)" fillOpacity="0.78" />
      <rect x="394" y="220" width="80" height="106" rx="4" fill="var(--sd-teal)" fillOpacity="0.58" />
      <g stroke="var(--sd-teal)" fill="var(--sd-teal)">
        <path d="M126 128 V158" fill="none" />
        <path d="M280 108 V158" fill="none" />
        <path d="M434 116 V158" fill="none" />
        <circle cx="126" cy="128" r="4" stroke="none" />
        <circle cx="280" cy="108" r="4" stroke="none" />
        <circle cx="434" cy="116" r="4" stroke="none" />
      </g>
      <path d="M126 334 V362 M280 334 V362 M434 334 V362" stroke="var(--sd-teal)" />
      <line x1="56" y1="362" x2="504" y2="362" stroke="var(--sd-teal)" strokeOpacity="0.7" />
      {seats.map((x, index) => (
        <rect
          key={x}
          x={x}
          y="376"
          width="16"
          height="16"
          rx="3"
          fill={index % 3 === 1 ? "var(--sd-teal)" : "var(--sd-ground)"}
          stroke="var(--sd-teal)"
        />
      ))}
    </svg>
  );
}

function DefaultPage() {
  return (
    <Page>
      <header className="sd-hero">
        <div className="sd-hero-copy">
          <img className="sd-hero-mark" src="/Project8Xwt_tr.png" alt="" />
          <h1>Contact-center systems that hold under real load.</h1>
          <hr className="sd-rule" />
          <p className="sd-lede">
            Project8X designs, integrates, and stabilizes contact-center platforms
            for Fortune 500 operations — Genesys, Avaya, Cisco, Amazon Connect, and
            Verint — with 35+ years in the chair.
          </p>
          <div className="sd-actions">
            <Link to="/ContactUs" className="sd-btn sd-btn-primary">
              Talk to an architect
            </Link>
            <Link to="/AgentForge" className="sd-btn sd-btn-secondary">
              See AgentForge
            </Link>
          </div>
        </div>
        <HeroSchematic />
      </header>

      <section className="sd-trust" aria-label="Trusted in production">
        <svg className="sd-trust-trace" viewBox="0 0 800 160" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 108 C 70 108, 90 48, 160 52 S 250 124, 330 86 S 430 36, 510 64 S 620 128, 700 78 S 760 48, 800 60"
            fill="none"
            stroke="var(--sd-teal)"
            strokeWidth="2"
          />
          <path d="M0 128 H800" stroke="var(--sd-teal)" strokeOpacity="0.45" />
          <g fill="var(--sd-teal)">
            <circle cx="160" cy="52" r="4" />
            <circle cx="330" cy="86" r="4" />
            <circle cx="510" cy="64" r="4" />
            <circle cx="700" cy="78" r="4" />
          </g>
        </svg>
        <div className="sd-trust-copy">
          <p className="sd-kicker">Trusted in production</p>
          <p className="sd-trust-line">
            35+ years in contact-center and telecom delivery · Fortune 500 programs · Genesys · Avaya · Cisco · Amazon Connect · Verint
          </p>
          <p className="sd-trust-names">
            Bank of America · Expedia · Lockheed Martin · IBM · Disney · IKEA
          </p>
        </div>
      </section>

      <section className="sd-section" aria-labelledby="capabilities-heading">
        <h2 id="capabilities-heading" className="sd-sr">
          Capabilities
        </h2>
        <div className="sd-capability-grid">
          {capabilities.map((item) => (
            <article className="sd-capability" key={item.title}>
              <Mark kind={item.mark} />
              <h3>
                <Link to={item.to}>{item.title}</Link>
              </h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="sd-note">
        <Link to="/news" className="sd-text-link">
          Industry notes from the platforms we deliver on.
        </Link>
      </p>

      <section className="sd-band" aria-labelledby="cutover-heading">
        <h2 id="cutover-heading">Need an architect on the next cutover?</h2>
        <p>
          Tell us the platform, the constraint, and the date. We’ll answer with a
          clear plan — not a pitch deck.
        </p>
        <div className="sd-actions">
          <Link to="/ContactUs" className="sd-btn sd-btn-primary">
            Talk to an architect
          </Link>
        </div>
      </section>
    </Page>
  );
}

export default DefaultPage;
