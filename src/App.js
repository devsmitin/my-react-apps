import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./scss/App.scss";

import Header from "./components/Header";
import Tasker from "./components/tasker/Tasker";
import Weather from "./components/weather/Weather";
import Test from "./components/Test";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apptitle: "My Apps",
      navlinks: [
        { title: "Home", to: "/" },
        { title: "Tasker", to: "/tasker" },
        { title: "Reminder", to: "/reminder" },
      ],
    };
  }
  render() {
    return (
      <BrowserRouter>
        <Header title={this.state.apptitle} links={this.state.navlinks} />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Weather appname={this.state.apptitle} />}
          />
          <Route path="/tasker" component={Tasker} />
          <Route path="/reminder" component={Test} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
