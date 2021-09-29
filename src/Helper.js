import React from "react";
import axios from "axios";
import { countryData, unsplash, weather } from "./config";

export function pushNotify(msg, title, i) {
  let isProd = true;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    isProd = false;
  }

  if (isProd) {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, {
          body: msg,
          icon: i ? i : "",
        });
      });
    }
  } else {
    console.log(title, msg);
  }
}

export function showLoader(show) {
  return show !== "hide" ? (
    <div className="loading-screen d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : null;
}

export function handleDate(timestamp, format) {
  let time = new Date(timestamp);
  const formatNumber = (n) => ("0" + n).slice(-2);

  let date = time.getDate(),
    month = time.getMonth() + 1,
    year = time.getFullYear(),
    hours = formatNumber(time.getHours()),
    min = formatNumber(time.getMinutes()),
    sec = formatNumber(time.getSeconds()),
    strOut;

  switch (format) {
    case "dd/mm/yyyy":
      strOut = date + "/" + month + "/" + year;
      break;
    case "mm/dd/yyyy":
      strOut = month + "/" + date + "/" + year;
      break;
    case "dd-mm-yyyy":
      strOut = date + "-" + month + "-" + year;
      break;
    case "mm-dd-yyyy":
      strOut = month + "-" + date + "-" + year;
      break;
    case "HH:mm":
      strOut = hours + ":" + min;
      break;
    default:
      strOut =
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec;
      break;
  }
  return strOut;
}

export function getWeatherData(location) {
  const { latitude, longitude } = location;

  const key = weather.API_KEY;
  const apiEndPoint = weather.EndPoint;
  const units = weather.Units;

  let queryString = `?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;

  let res = axios
    .get(apiEndPoint + queryString)
    .then((response) => response.data)
    .catch((err) => {
      pushNotify(
        "There was an error. Please try again later",
        "Error!",
        "owl-72.png"
      );
      console.log(err);
    });

  return res;
}

export function getRandomPhoto(term) {
  const API_KEY = unsplash.API_KEY;
  const apiEndPoint = unsplash.EndPoint;

  let res = axios
    .get(apiEndPoint, {
      params: { query: term },
      headers: {
        Authorization: "Client-ID " + API_KEY,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });

  return res;
}

export function getCountryName(code) {
  const apiEndPoint = countryData.EndPoint;
  let res = axios
    .get(apiEndPoint + code)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
  return res;
}

export const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
  type: "region",
});

export function geoError(error) {
  let err;
  switch (error.code) {
    case 1:
      err = "1: permission denied";
      break;
    case 2:
      err = "2: position unavailable (error response from location provider)";
      break;
    case 3:
      err = "3: timed out";
      break;
    default:
      err = "0: unknown error";
      break;
  }
  console.log("Error occurred. Error code: " + err);
  pushNotify("Location access error. Try again.", "Error!", "owl-72.png");
}

export function handleDateDiff(newTimestamp, oldTimestamp) {
  let msDiff = newTimestamp - oldTimestamp;
  let secDiff = msDiff / 1000;
  let minDiff = secDiff / 60;
  let hrDiff = minDiff / 60;
  let diffObj = {
    ms: parseInt(msDiff),
    seconds: parseInt(secDiff),
    minuits: parseInt(minDiff),
    hours: parseInt(hrDiff),
  };
  return diffObj;
}

export function checkDevice() {
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile;
}

export function aRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}
