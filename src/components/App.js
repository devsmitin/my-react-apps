import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.scss";

import Header from "./Header";
import Tasker from "./Tasker";
import Welcome from "./Welcome";
import Product from "./Product";
import Test from "./Test";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apptitle: "My Apps",
      navlinks: [
        { title: "Home", to: "/" },
        { title: "Tasker", to: "/tasker" },
        // { title: "Product", to: "/product" },
        { title: "Reminder", to: "/reminder" }
      ]
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
            component={() => <Welcome appname={this.state.apptitle} />}
          />
          <Route path="/tasker" component={Tasker} />
          <Route path="/product" component={Product} />
          <Route path="/reminder" component={Test} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
