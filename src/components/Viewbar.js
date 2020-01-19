import React, { Component } from "react";

import { connect } from "react-redux";
import { toggleForm, setView } from "../redux/actions/layoutActions";

class Viewbar extends Component {
  setView = val => {
    this.props.setView(val);
  };

  toggleTaskForm = () => {
    this.props.toggleForm();
  };
  render() {
    return (
      <div className="site-viewbar">
        <button
          onClick={() => this.setView(1)}
          disabled={this.props.state.layout.viewType === 1}
        >
          One List
        </button>
        <button
          onClick={() => this.setView(2)}
          disabled={this.props.state.layout.viewType === 2}
        >
          Two List
        </button>
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
    toggleForm: () => dispatch(toggleForm()),
    setView: value => dispatch(setView(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewbar);
