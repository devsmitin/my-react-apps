import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Tasker from "./Tasker";
import Welcome from "./Welcome";
import Test from "./Test";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apptitle: "My Apps",
      navlinks: [
        { title: "Home", to: "/" },
        { title: "Tasker", to: "/tasker" },
        { title: "Reminder", to: "/reminder" }
      ]
    };
  }
  render() {
    return (
      <BrowserRouter>
        <Header title={this.state.apptitle} links={this.state.navlinks} />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/tasker" component={Tasker} />
          <Route path="/reminder" component={Test} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
