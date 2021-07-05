import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./scss/App.scss";

import { AppData } from "./config";

import Header from "./components/Header";
import Tasker from "./components/tasker/Tasker";
import Weather from "./components/weather/Weather";
import DateCalculator from "./components/date-calculator/DateCalculator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { apptitle, navlinks } = AppData;

    return (
      <BrowserRouter>
        <Header title={apptitle} links={navlinks} />
        <Switch>
          <Route exact path="/" component={Weather} />
          <Route path="/tasker" component={Tasker} />
          <Route path="/date-duration" component={DateCalculator} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
