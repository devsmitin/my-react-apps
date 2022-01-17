import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "../assets/Header.scss";

const Header = (props) => {
  let [isOpen, changeOpenState] = useState(false);

  const toggleNav = (e, state) => {
    changeOpenState(state != undefined ? state : !isOpen);
  };

  const { title, background, links } = props;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark mb-2 mb-md-3 border-bottom sticky-top"
      style={{ backgroundColor: background }}
    >
      <div className="container-fluid">
        <NavLink
          className="navbar-brand p-0"
          to={"/"}
          onClick={(e) => toggleNav(e, false)}
          end
        >
          <img
            src="/owl-72.png"
            className="app-logo"
            alt="logo"
            width="30"
            height="30"
          />
          {title}
        </NavLink>
        <button
          className={`navbar-toggler ${isOpen ? "" : " collapsed"}`}
          type="button"
          onClick={toggleNav}
        >
          <span className="toggle-icon">Toggle Navbar</span>
        </button>
        <div
          className={"navbar-collapse flex-lg-fill" + (isOpen ? " show" : "")}
        >
          <ul className="navbar-nav ms-lg-auto">
            {links &&
              links.map((link, index) => {
                return (
                  <li className="nav-item" key={index}>
                    <NavLink
                      className="nav-link"
                      to={link.to}
                      onClick={toggleNav}
                      end
                    >
                      {link.title}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
