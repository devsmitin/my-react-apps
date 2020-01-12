import React, { Component } from "react";
import { connect } from "react-redux";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }

  onChange = e => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value
    });
  };

  resetInputs = () => {
    this.setState({
      title: "",
      body: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      id: Date.now(),
      title: this.state.title,
      body: this.state.body,
      completed: false
    };
    this.props.dispatch({
      type: "ADD_TASK",
      data
    });
    this.resetInputs();
  };

  render() {
    return (
      <div>
        <h1>Create Task</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Task Title"
            value={this.state.title}
            onChange={this.onChange}
          />
          <textarea
            rows="4"
            name="body"
            placeholder="Enter Task Description"
            value={this.state.body}
            onChange={this.onChange}
          />
          <button>Task</button>
        </form>
      </div>
    );
  }
}
export default connect()(TaskForm);
