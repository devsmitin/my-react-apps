import React, { Component } from "react";
import "./App.scss";

import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
import Viewbar from "./components/Viewbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { connect } from "react-redux";
import { toggleForm } from "./redux/actions/layoutActions";

class App extends Component {
  render() {
    const layout = this.props.state.layout;
    return (
      <div className="App">
        <Header />
        {/* <Sidebar /> */}
        <div className="main-content">
          <Viewbar />
          <div className="container-fluid">
            <TaskList />
          </div>
        </div>
        {layout.formVisible && <TaskForm />}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
