import React, { Component } from "react";
import { connect } from "react-redux";

import Task from "./Task";

class TaskList extends Component {
  renderTask = post => {
    return <Task key={post.id} post={post} />;
  };

  render() {
    const incompleteTasks = this.props.posts.filter(post => !post.completed);
    const completeTasks = this.props.posts.filter(post => post.completed);

    return (
      <div>
        <h1>All Tasks</h1>
        <div className="row">
          <div className="col-md-6">
            <h3>Pending Tasks ({incompleteTasks.length})</h3>
            {incompleteTasks.map(post => this.renderTask(post))}
          </div>

          <div className="col-md-6">
            <h3>Completed Tasks ({completeTasks.length})</h3>
            {completeTasks.map(post => this.renderTask(post))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state
  };
};
export default connect(mapStateToProps)(TaskList);
