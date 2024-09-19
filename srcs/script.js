function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-value");
  let city = document.querySelector("#current-city");
  let condition = document.querySelector("#weatherDescription");
  /*let conditionIcon = document.querySelector("#temperature-icon");*/
  let humidity = document.querySelector("#humidityValue");
  let wind = document.querySelector("#windValue");

  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  condition.innerHTML = response.data.condition.description;
  /*conditionIcon.innerHTML = response.data.condition.icon;*/
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let apiKey = "0be192793f55aa475o5602t2cabd6e24";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  event.stopPropagation();
  let searchInput = document.querySelector("#search-city-input");

  searchCity(searchInput.value);
}

let currentDate = new Date();

let dateChange = document.querySelector("#currentDayTime");

let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

if (hour < 10) {
  hour = `0${hour}`;
}
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[currentDate.getDay()];

dateChange.innerHTML = `${weekday} ${hour}:${minutes}`;

let searchCityElement = document.querySelector("#search-form");
searchCityElement.addEventListener("submit", searchSubmit);

searchCity("Barcelona");
