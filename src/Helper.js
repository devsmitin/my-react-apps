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
