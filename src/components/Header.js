import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleNav = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom mb-2 mb-md-3 sticky-top">
        <NavLink className="navbar-brand p-0" exact to="/">
          {this.props.title}
        </NavLink>
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
          <ul className="navbar-nav ml-lg-auto">
            {this.props.links &&
              this.props.links.map((link, index) => {
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
