import React, { Component } from "react";
import { connect } from "react-redux";
import { addTask } from "../redux/actions/taskActions";
import { toggleForm } from "../redux/actions/layoutActions";

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
        updated: Date.now(),
        id: Date.now(),
        title: this.state.title.trim(),
        body: this.state.body.trim(),
        completed: false
      };
      this.props.addTask(data);
      this.props.toggleForm();
    } else {
      alert("Invalid or missing inputs. Both fields are required");
    }
  };

  handleCancel = () => {
    this.props.toggleForm();
  };

  render() {
    return (
      <div className="overlay">
        <div className="overlay-body task-from">
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
            <button
              type="submit"
              disabled={
                this.state.title.trim().length === 0 ||
                this.state.body.trim().length === 0
              }
            >
              Add Task
            </button>
            <button type="button" onClick={this.handleCancel}>
              Cancel
            </button>
          </form>
        </div>
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
    addTask: task => dispatch(addTask(task)),
    toggleForm: () => dispatch(toggleForm())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
