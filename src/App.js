import React from "react";
import "./App.scss";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <TaskForm />
          </div>
          <div className="col-md-8">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
