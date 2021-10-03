import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../scss/Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleNav = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    let { title, background, links } = this.props;
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light mb-2 mb-md-3 border-bottom sticky-top"
        style={{ backgroundColor: background }}
      >
        <span className="navbar-brand p-0">
          <img
            src="/owl-72.png"
            className="app-logo"
            alt="logo"
            width="30"
            height="30"
          />
          {title}
        </span>
        <button
          className={"navbar-toggler" + (this.state.isOpen ? "" : " collapsed")}
          type="button"
          onClick={this.toggleNav}
        >
          <span className="toggle-icon">Toggle Navbar</span>
        </button>
        <div
          className={
            "navbar-collapse flex-lg-fill" + (this.state.isOpen ? " show" : "")
          }
        >
          <ul className="navbar-nav ms-lg-auto">
            {links &&
              links.map((link, index) => {
                return (
                  <li className="nav-item" key={index}>
                    <NavLink
                      className="nav-link"
                      exact
                      to={link.to}
                      onClick={this.toggleNav}
                    >
                      {link.title}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
