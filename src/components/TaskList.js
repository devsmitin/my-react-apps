import React, { Component } from "react";
import { connect } from "react-redux";

import Task from "./Task";

class TaskList extends Component {
  renderTask = task => {
    return <Task key={task.updated} task={task} />;
  };

  render() {
    const allTasks = this.props.tasks;
    const incompleteTasks = allTasks.filter(task => !task.completed);
    const completeTasks = allTasks.filter(task => task.completed);

    return (
      <div>
        {console.log("this.props", this.props)}
        {this.props.layout.viewType === 2 && (
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
        )}
        {this.props.layout.viewType === 1 && (
          <>
            <h3>All Tasks ({allTasks.length})</h3>
            <div className="uniform_list">
              {allTasks.map(task => this.renderTask(task))}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    layout: state.layout
  };
};
export default connect(mapStateToProps)(TaskList);
