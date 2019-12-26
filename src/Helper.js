import React from "react";

export function pushNotify(msg, title, i) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, {
        body: msg,
        icon: i ? i : ""
      });
    });
  }
  console.log(msg);
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
  const formatNumber = n => ("0" + n).slice(-2);

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

export function handleDateDiff(newTimestamp, oldTimestamp, diffIn) {
  var diff = newTimestamp - oldTimestamp;
  if (diffIn === "mins") {
    return diff / 60000;
  }
  return diff / 1;
}

export function checkDevice() {
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile;
}
