import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="site-header">
        <div className="container-fluid">
          <div className="site-branding">
            <span className="site-title">Hello World</span>
          </div>
          <div className="site-navigation"></div>
        </div>
      </div>
    );
  }
}

export default Header;
