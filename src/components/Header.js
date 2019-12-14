import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-white border-bottom mb-3">
        <h1 className="navbar-brand mb-0">Welcome user {this.props.userId}</h1>
      </nav>
    );
  }
}

export default Header;
