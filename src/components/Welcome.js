import React, { Component } from "react";
import axios from "axios";

import * as Helper from "../Helper";
// import "./Weather.scss";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationOptions: {
        maximumAge: 5 * 60 * 1000,
        timeout: 10 * 1000,
        enableHighAccuracy: true
      }
    };
  }

  componentDidMount() {
    if (localStorage.getItem("react_user_weather")) {
      let w_data = JSON.parse(localStorage.getItem("react_user_weather"));
      this.setState({
        weather: w_data
      });
    }
    if (localStorage.getItem("react_user_background")) {
      let data = JSON.parse(localStorage.getItem("react_user_background"));
      this.setState({
        unsplash_img: data
      });
    }
  }

  notif = (msg, title) => {
    Helper.pushNotify(msg, title, "owl-72.png");
  };

  getRandomPhoto = () => {
    const API_KEY =
      "cd1ba1edce7d302607850f0bfd96f3220a70eec97b0aced1476398ca880d1a09";

    let term = "snow, nature";
    let apiEndPoint = "https://api.unsplash.com/photos/random";
    axios
      .get(apiEndPoint, {
        params: { query: term },
        headers: {
          Authorization: "Client-ID " + API_KEY
        }
      })
      .then(response => response.data)
      .then(data => {
        data.fetchedAt = Date.now();
        this.setState({ unsplash_img: data });
        localStorage.setItem("react_user_background", JSON.stringify(data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  getWeatherInfo = location => {
    const API_KEY = "3dc98cc5c53896bfed6db93c5b6a03a0";

    // let apiEndPointForcast = "https://api.openweathermap.org/data/2.5/forecast?";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
    let queryString = `?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`;

    axios
      .get(apiEndPoint + queryString)
      .then(response => response.data)
      .then(data => {
        // console.log(data);
        let w_data = {
          w_temp: data.main.temp,
          w_temp_feels: data.main.feels_like,
          w_desc: data.weather[0].description,
          w_wind: data.wind.speed + "km/h",
          w_location: {
            city: data.name,
            country: data.sys.country
          },
          w_time: Date.now()
        };
        this.setState({
          weather: w_data
        });
        localStorage.setItem("react_user_weather", JSON.stringify(w_data));
        this.getRandomPhoto();
      })
      .catch(err => {
        this.notif("There was an error. Please try again later", "Error!");
        console.log(err);
      });
  };

  getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Browser does not support notifications.");
    } else {
      let geoOptions = this.state.locationOptions;

      let geoSuccess = position => {
        let currentPostion = position.coords;
        this.getWeatherInfo(currentPostion);
      };
      let geoError = error => {
        let err;
        switch (error.code) {
          case 1:
            err = "1: permission denied";
            break;
          case 2:
            err =
              "2: position unavailable (error response from location provider)";
            break;
          case 3:
            err = "3: timed out";
            break;
          default:
            err = "0: unknown error";
            break;
        }
        this.notif("Location access error. Try again.", "Error!");
        console.log("Error occurred. Error code: " + err);
      };

      navigator.geolocation.getCurrentPosition(
        geoSuccess,
        geoError,
        geoOptions
      );
    }
  };

  render() {
    let img_url = this.state.unsplash_img
      ? this.state.unsplash_img.urls.raw
      : "";
    let format = "webp";
    let width = window.innerWidth > 1080 ? window.innerWidth : 1080;
    return (
      <main className="">
        <div className="container-fluid">
          {/* <h1 className="h3 my-5">Welcome to {this.props.appname}!</h1> */}
          <div
            className="weather-img"
            style={{
              backgroundImage: `url(${img_url}&fm=${format}&w=${width}&q=50)`
            }}
          />

          {this.state.weather && (
            <div className="mt-5 weather-result">
              <h1 title="Current Temp" className="display-4">
                {this.state.weather.w_temp.toFixed(1)}
                &deg;C
              </h1>
              <h4>
                {this.state.weather.w_location.city +
                  ", " +
                  this.state.weather.w_location.country}
              </h4>
              <h5>
                Feels like {this.state.weather.w_temp_feels.toFixed(1)}
                &deg;C
              </h5>
              <h5 className="text-capitalize">
                {this.state.weather.w_desc}, Wind: {this.state.weather.w_wind}
              </h5>
              <p className="mb-1">
                Checked at:{" "}
                {Helper.handleDate(this.state.weather.w_time, "HH:mm")}
              </p>
              <p>
                {
                  Helper.handleDateDiff(Date.now(), this.state.weather.w_time)
                    .minuits
                }{" "}
                min ago
              </p>
              {Helper.handleDateDiff(Date.now(), this.state.weather.w_time)
                .minuits > 5 ? (
                <button
                  className="btn btn-secondary rounded position-relative"
                  onClick={this.getLocation}
                >
                  Check Weather
                </button>
              ) : null}
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default Welcome;
