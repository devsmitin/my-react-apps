import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Tasker from "./Tasker";
// import List from "./List";
import Test from "./Test";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apptitle: "Task Manager"
    };
  }
  render() {
    return (
      <BrowserRouter>
        <Header title={this.state.apptitle} />
        <Switch>
          <Route exact path="/" component={Tasker} />
          <Route path="/test" component={Test} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
