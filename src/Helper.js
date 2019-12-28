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

export function handleDateDiff(newTimestamp, oldTimestamp) {
  let msDiff = newTimestamp - oldTimestamp;
  let secDiff = msDiff / 1000;
  let minDiff = secDiff / 60;
  let hrDiff = minDiff / 60;
  let diffObj = {
    ms: parseInt(msDiff),
    seconds: parseInt(secDiff),
    minuits: parseInt(minDiff),
    hours: parseInt(hrDiff)
  };
  return diffObj;
}

export function checkDevice() {
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile;
}

// useless fun

// getLocationName = location => {
//   let apiEndPoint = "https://geocodeapi.p.rapidapi.com/GetNearestCities";
//   axios
//     .get(apiEndPoint, {
//       headers: {
//         "content-type": "application/octet-stream",
//         "x-rapidapi-host": "geocodeapi.p.rapidapi.com",
//         "x-rapidapi-key": "37144eb94cmsh0830bdd3832cd1bp1160bcjsn0d0ecd6d1400"
//       },
//       params: {
//         latitude: location.latitude,
//         longitude: location.longitude,
//         range: "0"
//       }
//     })
//     .then(response => response.data)
//     .then(data => {
//       console.log(data[0]);
//       // this.setLocation(data[0]);
//     })
//     .catch(err => {
//       this.notif("There was an error. Please try again later", "Error!");
//       console.log(err);
//     });
// };

// setLocation = data => {
//   this.setState({
//     location: {
//       city: data.City,
//       country: data.Country
//     }
//   });
// };
