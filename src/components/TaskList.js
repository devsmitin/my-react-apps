import React, { Component } from "react";
import { connect } from "react-redux";

import Task from "./Task";

class TaskList extends Component {
  renderTask = task => {
    return <Task key={task.id} task={task} />;
  };

  render() {
    const incompleteTasks = this.props.tasks.filter(task => !task.completed);
    const completeTasks = this.props.tasks.filter(task => task.completed);

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h3>Pending Tasks ({incompleteTasks.length})</h3>
            {incompleteTasks.map(task => this.renderTask(task))}
          </div>

          <div className="col-md-6">
            <h3>Completed Tasks ({completeTasks.length})</h3>
            {completeTasks.map(task => this.renderTask(task))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state
  };
};
export default connect(mapStateToProps)(TaskList);
