import React, { Component } from "react";

import * as Helper from "../../Helper";
import "../../scss/Weather.scss";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.intervalID = 0;
    this.locationOptions = {
      maximumAge: 5 * 60 * 1000,
      timeout: 10 * 1000,
      enableHighAccuracy: false,
    };
  }

  componentDidMount() {
    let w_data, img_data;
    if (localStorage.getItem("react_user_weather")) {
      w_data = JSON.parse(localStorage.getItem("react_user_weather"));
    }
    if (localStorage.getItem("react_user_background")) {
      img_data = JSON.parse(localStorage.getItem("react_user_background"));
    }

    this.setState(
      {
        unsplash_img: img_data,
        weather: w_data,
      },
      () => {
        this.startTimer(w_data);
      }
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  startTimer = (weather) => {
    if (weather && Object.entries(weather).length) {
      this.intervalID = setInterval(() => {
        let t = this.countDown();
        this.setState({
          timeAgo: t,
        });
      }, 30 * 1000);
    }
  };

  getLocation = () => {
    clearInterval(this.intervalID);
    if (!navigator.geolocation) {
      console.log("Browser does not support location access.");
    } else {
      navigator.geolocation.getCurrentPosition(
        this.getWeatherInfo,
        Helper.geoError,
        this.locationOptions
      );
    }
  };

  getWeatherInfo = async (location) => {
    let { coords } = location;
    let weather = await Helper.getWeatherData(coords);
    let s_country = Helper.regionNamesInEnglish.of(weather.sys.country);

    let w_data = {
      w_temp: weather.main.temp,
      w_temp_feels: weather.main.feels_like,
      w_desc: weather.weather[0].main,
      w_wind: weather.wind.speed + "km/h",
      w_location: weather.name + ", " + s_country,
      w_time: Date.now(),
    };

    let image = await Helper.getRandomPhoto();
    image.fetchedAt = Date.now();

    this.setState(
      {
        weather: w_data,
        unsplash_img: image,
      },
      () => {
        this.startTimer(weather);
      }
    );

    localStorage.setItem("react_user_weather", JSON.stringify(w_data));
    localStorage.setItem("react_user_background", JSON.stringify(image));
  };

  countDown = () => {
    if (this.state.weather) {
      let i = Helper.handleDateDiff(Date.now(), this.state.weather.w_time)
        .minutes;
      return i;
    }
  };

  refresher = (fap) => {
    let btn = (
      <button
        className="btn btn-secondary rounded position-relative"
        onClick={this.getLocation}
      >
        Check Weather
      </button>
    );

    if (fap > 59) {
      return this.getLocation();
    } else if (fap >= 10 || fap === undefined) {
      return btn;
    } else {
      return false;
    }
  };

  render() {
    let { weather, timeAgo, unsplash_img } = this.state;
    let img_url =
      unsplash_img && unsplash_img.urls ? unsplash_img.urls.raw : "";
    let format = "webp";
    let width = window.innerWidth > 1080 ? window.innerWidth : 1080;
    let fap = timeAgo ? timeAgo : this.countDown();

    return (
      <main className="">
        <div className="container-fluid">
          <div
            className="weather-img"
            style={{
              backgroundImage: `url(${img_url}&fm=${format}&w=${width}&q=50)`,
            }}
          />

          {weather && Object.entries(weather).length ? (
            <div className="weather-result">
              <h1 title="Current Temp" className="display-4">
                {weather.w_temp.toFixed(1)}
                &deg;C
              </h1>
              <h4>{weather.w_location}</h4>
              <h5>
                Feels like {weather.w_temp_feels.toFixed(1)}
                &deg;C
              </h5>
              <h5 className="text-capitalize">
                {weather.w_desc}, Wind: {weather.w_wind}
              </h5>
              <p className="">
                {"Checked at: " + Helper.handleDate(weather.w_time, "HH:mm, dd/mm/yyyy")}
              </p>
              {this.refresher(fap)}
            </div>
          ) : (
            <div className="text-center">{this.refresher()}</div>
          )}
        </div>
      </main>
    );
  }
}

export default Weather;
