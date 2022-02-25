// When user inputs a city, the latitude & longitude coordinates are saved to use in OneCall call ✅ 

// OneCall call uses lat & lon to complete call to retrieve weather info ✅ 

// When the user types in a city & clicks search button, the current weather ✅  & 5-day forecast is displayed ✅ 
    // Displays temp ✅ ✅ 
    // Displays wind speed ✅ ✅ 
    // Displays humidity ✅ ✅ 
    // Displays UV index ✅ ✅ 

// When user searches for a city, the city is added to localStorage ✅ 
// When user searches for a city, the city is added to list of Previous Searches as a button ✅ 

// When user clicks button for city under Previous Searches, that city's weather & forecast is displayed ✅

// When the user refreshes the page, the Previous Searches are still there ✅

// When user clicks Clear Search History, the localStorage is cleared ✅
// When user clicks Clear Search History, the previous search buttons are cleared ✅


// Declare variables
var APIkey = "&appid=7dca179715285dbff858d4faf04c2d05";

var now = moment().format('MMMM Do YYYY, h:mm a');
// console.log(now);
var today = new Date();
// console.log(today);
// var weekDay = today.getDay();
// var options = { weekday: 'long'};
// var day = Intl.DateTimeFormat('en-US', options).format(weekDay);
// console.log(day);

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

var forecastDiv = document.querySelector(".forecast");
// var forecastDay1 = document.querySelector(".forecast1");
// var forecastDay2 = document.querySelector(".forecast2");
// var forecastDay3 = document.querySelector(".forecast3");
// var forecastDay4 = document.querySelector(".forecast4");
// var forecastDay5 = document.querySelector(".forecast5");


// Function to display Previous Search History on page load
function init() {
    for (var i=0; i<searchHistoryList.length; i++) {
        var btnEl = searchHistoryList[i];
        var newBtn = document.createElement("button");
        newBtn.setAttribute("class", "btn btn-dark btn-lg me-5 my-2 w-100");
        newBtn.setAttribute("id", "city-btn");
        newBtn.textContent = btnEl;
        searchHistory.append(newBtn);
    };
};
// Call function to render previous search history
init();


// console.log("https://api.openweathermap.org/geo/1.0/direct?q=Denver&appid=7dca179715285dbff858d4faf04c2d05") 
// console.log("https://api.openweathermap.org/data/2.5/onecall?lat=39.7392364&lon=-104.9848623&appid=7dca179715285dbff858d4faf04c2d05") 


// Display current weather info & 5-day forecast for user-inputted city
// Event Listener & function to pull weather & add city buttons to list of Previous Searches
searchBtn.addEventListener("click",renderWeather)
function renderWeather() {
    // Clear previous search from dashboard
    forecastDiv.textContent = "";
    cityDiv.textContent = "";
    tempDiv.textContent = "";
    windDiv.textContent = "";
    humidityDiv.textContent = "";
    uvDiv.textContent = "";

    var newCity = userInput.value;
    // console.log(newCity);

    // Function with fetch to pull latitude & longitude coordinates and then plug into OneCall API call
    function getCoords() {
        
        var geoCodingURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + newCity + APIkey;
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
                        // console.log(weatherObj);


                        // Display current weather on the dashboard
                        function displayCurrent() {
                            var cityToday = document.createElement("h3");
                            cityToday.setAttribute("class", "pb-4")
                            cityToday.textContent = newCity + " - " + now;
                            cityDiv.append(cityToday);

                            var currentTemp = document.createElement("h5");
                            currentTemp.setAttribute("class", "py-2")
                            currentTemp.textContent = "Temp: " + weatherObj.temp + " °F";
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
                            currentUV.setAttribute("class", "py-2 pe-3");
                            currentUV.textContent = "UV Index: " + weatherObj.uvIndex;
                            uvDiv.append(currentUV);

                            // If statement to show user if UV is favorable, moderate, or severe
                            if (weatherObj.uvIndex <= 2) {
                                var green = document.createElement("p");
                                green.setAttribute("class", "bg-success text-white pt-1 px-3");
                                green.textContent = "LOW";
                                uvDiv.append(green)

                            } else if (weatherObj.uvIndex >= 7) {
                                var red = document.createElement("p");
                                red.setAttribute ("class", "bg-danger text-white pt-1 px-3");
                                red.textContent = "HIGH";
                                uvDiv.append(red);

                            } else {
                                var yellow = document.createElement("p");
                                yellow.setAttribute ("class", "bg-warning pt-1 px-3");
                                yellow.textContent = "MODERATE";
                                uvDiv.append(yellow);
                            };
                        };
                        // Display forecast for 5 days
                        function displayForecast() {
                            for (i=1; i<6; i++) {
                                var forecastObj1 = {
                                    tempMorn: data.daily[i].temp.morn,
                                    tempEve: data.daily[i].temp.eve,
                                    wind: data.daily[i].wind_speed,
                                    humidity: data.daily[i].humidity,
                                }
                            
                                var dayDiv = document.createElement("div");
                                dayDiv.setAttribute("class", "bg-info m-3 p-2")
                                forecastDiv.append(dayDiv);
                            
                                var displayDay = document.createElement("h3");
                                displayDay.textContent = getDate(data.daily[i].dt)
                                displayDay.setAttribute("class", "px-1 py-2 bg-light d-flex justify-content-center")
                                dayDiv.append(displayDay);

                                function getDate(date) {
                                    var fullDate = new Date(date * 1000);
                                    var year = fullDate.getFullYear();
                                    var month = fullDate.getMonth() + 1;
                                    var date = fullDate.getDate();
                                    return month + "/" + date + "/" + year;
                                  };

                                var tomMorn = document.createElement("p");
                                tomMorn.textContent = "Morning: " + forecastObj1.tempMorn + " °F";
                                tomMorn.setAttribute("class","p-1");
                                dayDiv.append(tomMorn);

                                var tomEve = document.createElement("p");
                                tomEve.textContent = "Evening: " + forecastObj1.tempEve + " °F";
                                tomEve.setAttribute("class","p-1");
                                dayDiv.append(tomEve);

                                var tomWind = document.createElement("p");
                                tomWind.textContent = "Wind Speed: " + forecastObj1.wind + " MPH";
                                tomWind.setAttribute("class","p-1");
                                dayDiv.append(tomWind);

                                var tomHumid = document.createElement("p");
                                tomHumid.textContent = "Humidity: " + forecastObj1.humidity + " %";
                                tomHumid.setAttribute("class","p-1");
                                dayDiv.append(tomHumid);

                                
                                
                            //    console.log(forecastObj1);
                            };
                            
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
    function addNewBtn() {
        if (searchHistoryList.includes(newCity) === false) {
            var newBtn = document.createElement("button");
            newBtn.setAttribute("class", "btn btn-dark btn-lg me-5 my-2 w-100");
            newBtn.setAttribute("id", "city-btn")
            newBtn.textContent = newCity;
            searchHistory.append(newBtn);
            searchHistoryList.push(newCity);
            localStorage.setItem("city", JSON.stringify(searchHistoryList));
        };
    };
    addNewBtn();

    // Clear input form for additional searches
    userInput.value = "";
};

// Event Listener to display previous searched cities' weather & froecast
document.addEventListener("click", function (event) {
    if (event.target.id === "city-btn") {
        userInput.value = event.target.textContent
        searchBtn.click();
    } else { 
        return;
    }
});

// Event Listener & function to clear search history
clearBtn.addEventListener("click",clearHistory)
function clearHistory() {
    localStorage.clear();
    searchHistoryList = [];
    searchHistory.textContent = "";
    var label = document.createElement("h5");
    label.textContent = "Previous Searches:";
    searchHistory.append(label);
};