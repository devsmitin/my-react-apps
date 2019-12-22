import React, { Component } from "react";
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

  notif = (msg, title) => {
    Helper.pushNotify(msg, title, "owl-72.png");
  };

  setLocation = data => {
    this.setState({
      location: {
        city: data.City,
        country: data.Country
      }
    });
  };

  getWeatherInfo = location => {
    const API_KEY = "3dc98cc5c53896bfed6db93c5b6a03a0";

    // let apiEndPointForcast = "https://api.openweathermap.org/data/2.5/forecast?";
    let apiEndPointNow = "https://api.openweathermap.org/data/2.5/weather";
    let queryString = `?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`;

    fetch(apiEndPointNow + queryString, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          weather: {
            w_temp: data.main.temp,
            w_temp_feels: data.main.feels_like,
            w_desc: data.weather[0].description,
            w_wind: data.wind.speed + "km/h",
            w_location: {
              city: data.name,
              country: data.sys.country
            }
          }
        });
      })
      .catch(err => {
        this.notif("There was an error. Please try again later", "Error!");
        console.log(err);
      });
  };

  getLocationName = location => {
    let apiEndPoint = "https://geocodeapi.p.rapidapi.com/GetNearestCities";
    let queryString = `?latitude=${location.latitude}&longitude=${location.longitude}&range=0`;
    fetch(apiEndPoint + queryString, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "geocodeapi.p.rapidapi.com",
        "x-rapidapi-key": "37144eb94cmsh0830bdd3832cd1bp1160bcjsn0d0ecd6d1400"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setLocation(data[0]);
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
        // this.getLocationName(currentPostion);
        this.getWeatherInfo(currentPostion);
      };
      let geoError = error => {
        console.log("Error occurred. Error code: " + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };

      navigator.geolocation.getCurrentPosition(
        geoSuccess,
        geoError,
        geoOptions
      );
    }
  };
  render() {
    return (
      <main className="">
        <div className="container-fluid text-center">
          <h1 className="h3 my-5">Welcome to {this.props.appname}!</h1>
          <button
            className={
              "btn btn-secondary rounded" +
              (this.state.weather ? " d-none" : "")
            }
            onClick={this.getLocation}
          >
            Check Weather
          </button>
          {this.state.weather ? (
            <div>
              <h1 title="Current Temp" className="display-4">
                {this.state.weather.w_temp}
                &deg;C
              </h1>
              <h4>
                {this.state.weather.w_location.city +
                  ", " +
                  this.state.weather.w_location.country}
              </h4>
              <h5>Feels like {this.state.weather.w_temp_feels}&deg;C</h5>
              <h5 className="text-capitalize">
                {this.state.weather.w_desc}, Wind: {this.state.weather.w_wind}
              </h5>
            </div>
          ) : null}
        </div>
      </main>
    );
  }
}

export default Welcome;
