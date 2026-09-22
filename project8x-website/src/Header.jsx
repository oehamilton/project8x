import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { platforms, serviceGroups } from "./siteContent.js";

function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const servicesId = useId();
  const platformsId = useId();
  const location = useLocation();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onPointer = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  const servicesActive =
    location.pathname === "/CompanyServices" ||
    location.pathname.startsWith("/service/");
  const platformsActive = location.pathname === "/platforms";

  const toggle = (name) => {
    setOpenMenu((current) => (current === name ? null : name));
  };

  const onDesktopEnter = (name) => {
    if (window.matchMedia("(min-width: 1080px)").matches) {
      setOpenMenu(name);
    }
  };

  const onDesktopLeave = (name) => {
    if (window.matchMedia("(min-width: 1080px)").matches) {
      setOpenMenu((current) => (current === name ? null : current));
    }
  };

  return (
    <header className="sd-header" ref={navRef}>
      <a className="sd-skip" href="#main">
        Skip to content
      </a>
      <NavLink to="/" className="sd-brand" aria-label="Project8X home">
        <img src="/Project8Xwt_tr.png" alt="" />
      </NavLink>
      <nav className="sd-nav" aria-label="Primary">
        <button
          type="button"
          className="sd-menu-toggle"
          aria-expanded={mobileOpen}
          aria-controls="site-menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
        <div
          id="site-menu"
          className={mobileOpen ? "sd-nav-panel is-open" : "sd-nav-panel"}
        >
          <div
            className={
              openMenu === "services" ? "sd-dropdown is-open" : "sd-dropdown"
            }
            onMouseEnter={() => onDesktopEnter("services")}
            onMouseLeave={() => onDesktopLeave("services")}
          >
            <button
              type="button"
              aria-expanded={openMenu === "services" || mobileOpen}
              aria-controls={servicesId}
              className={servicesActive ? "is-active" : undefined}
              onClick={() => toggle("services")}
            >
              Services
              <span className="sd-caret" aria-hidden="true" />
            </button>
            <div id={servicesId} className="sd-dropdown-panel" role="group" aria-label="Services">
              {serviceGroups.map((group) => (
                <div key={group.id}>
                  <p className="sd-menu-label">{group.label}</p>
                  {group.items.map((item) => (
                    <NavLink key={item.to} to={item.to} className="sd-menu-link">
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              ))}
              <NavLink to="/CompanyServices" className="sd-menu-all">
                All services
              </NavLink>
            </div>
          </div>

          <div
            className={
              openMenu === "platforms" ? "sd-dropdown is-open" : "sd-dropdown"
            }
            onMouseEnter={() => onDesktopEnter("platforms")}
            onMouseLeave={() => onDesktopLeave("platforms")}
          >
            <button
              type="button"
              aria-expanded={openMenu === "platforms" || mobileOpen}
              aria-controls={platformsId}
              className={platformsActive ? "is-active" : undefined}
              onClick={() => toggle("platforms")}
            >
              Platforms
              <span className="sd-caret" aria-hidden="true" />
            </button>
            <div id={platformsId} className="sd-dropdown-panel" role="group" aria-label="Platforms">
              {platforms.map((platform) => (
                <NavLink key={platform.id} to={platform.to} className="sd-menu-link">
                  {platform.label}
                </NavLink>
              ))}
              <NavLink to="/platforms" className="sd-menu-all">
                All platforms
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/agentforge"
            className={({ isActive }) =>
              isActive ? "sd-nav-link is-active" : "sd-nav-link"
            }
          >
            AgentForge
          </NavLink>
          <NavLink
            to="/work"
            className={({ isActive }) =>
              isActive ? "sd-nav-link is-active" : "sd-nav-link"
            }
          >
            Work
          </NavLink>
          <NavLink
            to="/about"
            className={() =>
              location.pathname === "/about" ||
              location.pathname === "/ExecutiveLeadership"
                ? "sd-nav-link is-active"
                : "sd-nav-link"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/ContactUs"
            className={({ isActive }) =>
              isActive ? "sd-nav-link is-active" : "sd-nav-link"
            }
          >
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
