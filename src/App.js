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
    this.navlinks = [
      { title: "Days calculator", to: "/" },
      { title: "Weather", to: "/weather" },
      { title: "Tasker (Beta)", to: "/tasker" },
    ];
  }

  render() {
    let { appTitle, themeColor } = AppData;

    return (
      <BrowserRouter>
        <Header
          title={appTitle}
          links={this.navlinks}
          background={themeColor}
        />
        <Switch>
          <Route exact path="/" component={DateCalculator} />
          <Route path="/weather" component={Weather} />
          <Route path="/tasker" component={Tasker} />
          <Route path="/days-calc" component={DateCalculator} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
