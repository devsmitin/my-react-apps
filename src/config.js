const AppData = {
  apptitle: "My Apps",
  navlinks: [
    { title: "Weather", to: "/" },
    { title: "Tasker", to: "/tasker" },
    { title: "Days calculator", to: "/days-calc" },
  ],
};

const weather = {
  API_KEY: "3dc98cc5c53896bfed6db93c5b6a03a0",
  EndPoint: "https://api.openweathermap.org/data/2.5/weather",
  Units: "metric",
};

const unsplash = {
  API_KEY: "cd1ba1edce7d302607850f0bfd96f3220a70eec97b0aced1476398ca880d1a09",
  EndPoint: "https://api.unsplash.com/photos/random",
};

const countryData = {
  EndPoint: "https://restcountries.eu/rest/v2/alpha/",
};

const qrProvider = {
  EndPoint: "https://api.qrserver.com/v1/create-qr-code/",
};

const fireconfig = {
  apiKey: "AIzaSyCaQUJ_3_Cg8gaROLxHwnZrX1ulGHeQ-jU",
  authDomain: "my-react-apps-47c96.firebaseapp.com",
  databaseURL: "https://my-react-apps-47c96.firebaseio.com",
  projectId: "my-react-apps-47c96",
  storageBucket: "my-react-apps-47c96.appspot.com",
  messagingSenderId: "744968534805",
  appId: "1:744968534805:web:b1147b40a95bb23e84c71c",
  measurementId: "G-4DY7BGNBTX",
};

export { AppData, fireconfig, weather, unsplash, qrProvider, countryData };
