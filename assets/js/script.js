// When user inputs a city, the latitude & longitude coordinates are saved to use in OneCall call ✅ 

// OneCall call uses lat & lon to complete call to retrieve weather info

// When the user types in a city & clicks search button, the current weather & 5-day forecast is displayed
    // Displays temp
    // Displays wind speed
    // Displays humidity
    // Displays UV index

// When user searches for a city, the city is added to localStorage ✅ 
// When user searches for a city, the city is added to list of Previous Searches as a button ✅ 

// When user clicks button for city under Previous Searches, that city's weather & forecast is displayed

// When the user refreshes the page, the Previous Searches are still there ✅

// When user clicks Clear Search History, the localStorage is cleared ✅
// When user clicks Clear Search History, the previous search buttons are cleared


// Declare variables
var APIkey = "&appid=7dca179715285dbff858d4faf04c2d05";

var now = moment().format('MMMM Do YYYY, h:mm:ss a');
// console.log(now);

var userInput = document.querySelector(".user-input");

var searchBtn = document.querySelector(".search-button");
var searchHistory = document.querySelector(".search-history");
// Populate search history from localStorage or empty array
var searchHistoryList = JSON.parse(localStorage.getItem("city")) || [];
var clearBtn = document.querySelector(".clear-history");

var cityDiv = document.querySelector(".city-name");
var tempDiv = document.querySelector(".current-temp");
var windDiv = document.querySelector(".wind-speed");
var humidityDiv = document.querySelector(".humidity");
var uvDiv = document.querySelector(".uv-index");

var forcastDiv = document.querySelector("forecast");


// Function to display Previous Search History on page load
function init() {
    for (var i=0; i<searchHistoryList.length; i++) {
        var btnEl = searchHistoryList[i];
        var newBtn = document.createElement("button");
        newBtn.setAttribute("class", "btn btn-dark btn-lg m-3");
        newBtn.textContent = btnEl;
        searchHistory.append(newBtn);
    };
};
// Call function to render previous search history
init();


// console.log("http://api.openweathermap.org/geo/1.0/direct?q=Denver&appid=7dca179715285dbff858d4faf04c2d05") 
// console.log("https://api.openweathermap.org/data/2.5/onecall?lat=39.7392364&lon=-104.9848623&appid=7dca179715285dbff858d4faf04c2d05") 


// Display current weather info & 5-day forecast for user-inputted city
// Event Listener & function to pull weather & add city buttons to list of Previous Searches
searchBtn.addEventListener("click",renderWeather)
function renderWeather() {
    // Clear previous search from dashboard
    
    
    var newCity = userInput.value;
    // console.log(newCity); 

    // Function with fetch to pull latitude & longitude coordinates and then plug into OneCall API call
    function getCoords() {
        var geoCodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + newCity + APIkey;
        // console.log(geoCodingURL); 

        fetch(geoCodingURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data); 
                var coordsObj = {
                    lat: data[0].lat,
                    long: data[0].lon,
                }
                // console.log(coordsObj); 
                // console.log(coordsObj.lat); 

                function getWeather() {
                    var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordsObj.lat + "&lon=" + coordsObj.long + "&units=imperial" + APIkey;
                    // console.log(oneCallURL);
                    
                    fetch(oneCallURL)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        console.log(data);
                        var weatherObj = {
                            temp: data.current.temp,
                            wind: data.current.wind_speed,
                            humidity: data.current.humidity,
                            uvIndex: data.current.uvi,
                        };
                        console.log(weatherObj);

                        // Display current weather on the dashboard
                        function displayCurrent() {
                            var cityToday = document.createElement("h3");
                            cityToday.setAttribute("class", "pb-4")
                            cityToday.textContent = newCity + " - " + now;
                            cityDiv.append(cityToday);

                            var currentTemp = document.createElement("h5");
                            currentTemp.setAttribute("class", "py-2")
                            currentTemp.textContent = "Temp: " + weatherObj.temp + "°F";
                            tempDiv.append(currentTemp);

                            var currentWind = document.createElement("h5");
                            currentWind.setAttribute("class", "py-2");
                            currentWind.textContent = "Wind Speed: " + weatherObj.wind + " MPH";
                            windDiv.append(currentWind);
                            
                            var currentHumidity = document.createElement("h5");
                            currentHumidity.setAttribute("class", "py-2");
                            currentHumidity.textContent = "Humidity: " + weatherObj.humidity + " %";
                            humidityDiv.append(currentHumidity);

                            var currentUV = document.createElement("h5");
                            currentUV.setAttribute("class", "py-2");
                            currentUV.textContent = "UV Index: " + weatherObj.uvIndex
                            uvDiv.append(currentUV);

                            // If statement to show user if UV is favorable, moderate, or severe
                            
                        };
                        function displayForecast() {

                        };
                        displayCurrent();
                        displayForecast();
                    });
                };
                getWeather();
                
            });
    };
    getCoords();
    
    // Add new city button to search history
    searchHistoryList.push(newCity);
    localStorage.setItem("city", JSON.stringify(searchHistoryList));

    function addNewBtn() {
        var newBtn = document.createElement("button");
        newBtn.setAttribute("class", "btn btn-dark btn-lg m-3");
        newBtn.textContent = newCity;
        searchHistory.append(newBtn);
    };
    addNewBtn();
    // Clear input form for additional searches
    userInput.value = "";
};


// Event Listener & function to clear search history
clearBtn.addEventListener("click",clearHistory)
function clearHistory() {
    localStorage.clear();

};