import React, { Component } from "react";
import { connect } from "react-redux";

import "./Task.css";

class Task extends Component {
  onDelete = () => {
    this.props.dispatch({ type: "DELETE_TASK", id: this.props.post.id });
  };

  onComplete = () => {
    this.props.dispatch({ type: "COMPLETE_TASK", id: this.props.post.id });
  };

  render() {
    const { post } = this.props;
    return (
      <div className="post">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-body">{post.body}</p>
        <p></p>
        {!post.completed && (
          <button onClick={this.onComplete} disabled={post.completed}>
            {post.completed ? "Completed" : "Done"}
          </button>
        )}
        <button onClick={this.onDelete}>Delete</button>
      </div>
    );
  }
}
export default connect()(Task);
