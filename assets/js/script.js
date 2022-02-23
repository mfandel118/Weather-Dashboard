// When the user types in a city & clicks search button, the current weather & 5-day forecast is displayed
    // Displays temp
    // Displays wind speed
    // Displays humidity
    // Displays UV index

// When user searches for a city, the city is added to localStorage
// When user searches for a city, the city is added to list of Previous Searches as a button

// When user clicks Clear Search History, the localStorage is cleared
// When user clicks Clear Search History, the list of Previous Searches is cleared of all city buttons

// When user clicks button for city under Previous Searches, that city's weather & forecast is displayed


// Declare variables
var APIkey = "7dca179715285dbff858d4faf04c2d05";
var now = moment().format('MMMM Do YYYY, h:mm:ss a');
// console.log(now);

var userInput = document.querySelector(".user-input");
var searchBtn = document.querySelector(".search-button");
var searchHistory = document.querySelector(".search-history");
// Populate search history from localStorage or empty array
var searchHistoryList = localStorage.getItem("searchHistory") || "[]";
var clearBtn = document.querySelector(".clear-history");

var city = document.querySelector(".city-name");
var temp = document.querySelector(".current-temp");
var wind = document.querySelector(".wind-speed");
var humidity = document.querySelector(".humidity");
var uvIndex = document.querySelector(".uv-index");

var forcast = document.querySelector("forecast");

