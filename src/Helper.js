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
