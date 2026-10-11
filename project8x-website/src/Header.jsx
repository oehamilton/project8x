import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { serviceGroups } from "./siteContent.js";

function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const servicesId = useId();
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
        if (navRef.current?.contains(document.activeElement)) {
          document.activeElement.blur();
        }
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
    location.pathname === "/platforms" ||
    location.pathname === "/platform-migrations" ||
    location.pathname.startsWith("/service/");

  const menuPress = useRef({});

  const onMenuPointerDown = (name) => {
    menuPress.current[name] = openMenu === name;
  };

  const onMenuClick = (name) => {
    setOpenMenu(menuPress.current[name] ? null : name);
  };

  const onDesktopEnter = (name) => {
    if (window.matchMedia("(min-width: 1080px)").matches) {
      setOpenMenu(name);
    }
  };

  const onDesktopLeave = (name, dropdown) => {
    if (!window.matchMedia("(min-width: 1080px)").matches) return;
    if (dropdown?.contains(document.activeElement)) return;
    setOpenMenu((current) => (current === name ? null : current));
  };

  const closeIfFocusLeft = (name, event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setOpenMenu((current) => (current === name ? null : current));
  };

  return (
    <header className="sd-header" ref={navRef}>
      <a className="sd-skip" href="#main">
        Skip to content
      </a>
      <NavLink to="/" className="sd-brand" aria-label="Project8X home">
        <img src="/Project8Xwt_tr.png" alt="" aria-hidden="true" />
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
            onMouseLeave={(event) => onDesktopLeave("services", event.currentTarget)}
            onFocusCapture={() => setOpenMenu("services")}
            onBlurCapture={(event) => closeIfFocusLeft("services", event)}
          >
            <button
              type="button"
              aria-expanded={openMenu === "services" || mobileOpen}
              aria-controls={servicesId}
              className={servicesActive ? "is-active" : undefined}
              onMouseDown={() => onMenuPointerDown("services")}
              onClick={() => onMenuClick("services")}
            >
              Services
              <span className="sd-caret" aria-hidden="true" />
            </button>
            <div id={servicesId} className="sd-dropdown-panel sd-services-panel" role="group" aria-label="Services">
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

          <NavLink
            to="/AgentForge"
            className={() =>
              location.pathname.toLowerCase() === "/agentforge"
                ? "sd-nav-link is-active"
                : "sd-nav-link"
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
            to="/news"
            className={({ isActive }) =>
              isActive ? "sd-nav-link is-active" : "sd-nav-link"
            }
          >
            <span className="sd-nav-accent">
              News
              <svg
                className="sd-nav-accent-star"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  className="sd-nav-accent-trail"
                  d="M5.5 6.5C10 2 19.5 1.8 21.6 7.4c1.6 4.4-2.2 8.6-7.6 9.4"
                />
                <path
                  className="sd-nav-accent-core"
                  d="M8.6 9.4l1.45 2.95 3.25.47-2.35 2.3.55 3.24-2.9-1.53-2.9 1.53.55-3.24-2.35-2.3 3.25-.47z"
                />
              </svg>
            </span>
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
          <NavLink to="/ContactUs" className="sd-btn sd-btn-primary sd-nav-cta">
            Talk to an architect
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
