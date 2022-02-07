import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./assets/App.scss";

import { AppData } from "./config";

import Header from "./components/Header";
import Tasker from "./components/tasker/Tasker2";
import Weather from "./components/weather/Weather";
import DateCalculator from "./components/date-calculator/DateCalculator";

const App = () => {
  const navlinks = [
    // { title: "Weather", to: "/weather" },
    { title: "Days calculator", to: "/days-calc" },
    { title: "Tasker (Beta)", to: "/tasker" },
  ];
  let { appTitle, themeColor } = AppData;

  const theme_color = `:root {--theme-color: ${themeColor};}`;

  return (
    <React.StrictMode>
      <BrowserRouter>
        <style>{theme_color}</style>
        <Header title={appTitle} links={navlinks} />
        <Routes>
          <Route index path="/" element={<DateCalculator />} />
          {/* <Route path="/weather" element={<Weather />} /> */}
          <Route path="/tasker" element={<Tasker />} />
          <Route path="/days-calc" element={<DateCalculator />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
