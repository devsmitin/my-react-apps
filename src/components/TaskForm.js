import React, { Component } from "react";
import { connect } from "react-redux";
import { addTask } from "../redux/actions";

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
    if (this.state.title.trim().length && this.state.body.trim().length) {
      const data = {
        id: Date.now(),
        title: this.state.title.trim(),
        body: this.state.body.trim(),
        completed: false,
        updated: false
      };
      this.props.addTask(data);
      this.resetInputs();
    } else {
      alert("Invalid or missing inputs. Both fields are required");
    }
  };

  render() {
    return (
      <div>
        <h3>Create Task</h3>
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

function mapDispatchToProps(dispatch) {
  return {
    addTask: task => dispatch(addTask(task))
  };
}

export default connect(null, mapDispatchToProps)(TaskForm);
