import React, { Component } from "react";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom mb-3">
        <a className="navbar-brand d-block mx-auto" href="/">
          Navbar
        </a>
        <button
          className={"navbar-toggler" + (this.state.isOpen ? "" : " collapsed")}
          type="button"
          onClick={this.toggleNav}
        >
          <span className="toggle-icon">Toggle Navbar</span>
        </button>
        <div className={"navbar-collapse flex-lg-fill" + (this.state.isOpen ? " show" : "")}>
          <div className="navbar-nav ml-lg-auto">
            <a className="nav-item nav-link active" href="/">
              Test <span className="sr-only">(current)</span>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
