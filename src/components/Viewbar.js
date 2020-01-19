import React, { Component } from "react";

import { connect } from "react-redux";
import { toggleForm } from "../redux/actions/layoutActions";

class Viewbar extends Component {
  toggleTaskForm = () => {
    console.log("test");
    this.props.toggleForm();
  };
  render() {
    return (
      <div className="site-viewbar">
        <button>One List</button>
        <button>Two List</button>
        <button onClick={this.toggleTaskForm}>Add Task</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleForm: () => dispatch(toggleForm())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewbar);
