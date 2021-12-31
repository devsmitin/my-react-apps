import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./assets/App.scss";

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
      { title: "Days calculator", to: "/days-calc" },
      { title: "Weather", to: "/weather" },
      { title: "Tasker (Beta)", to: "/tasker" },
    ];
  }

  render() {
    let { appTitle, themeColor } = AppData;

    return (
      <React.StrictMode>
        <BrowserRouter>
          <Header
            title={appTitle}
            links={this.navlinks}
            background={themeColor}
          />
          <Routes>
            <Route index path="/" element={<Weather />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/tasker" element={<Tasker />} />
            <Route path="/days-calc" element={<DateCalculator />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
}

export default App;
