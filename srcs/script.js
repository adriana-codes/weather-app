function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-value");
  let city = document.querySelector("#current-city");
  let conditionDescription = document.querySelector("#weatherDescription");
  let conditionImg = document.querySelector("#temperature-icon");
  let humidity = document.querySelector("#humidity-value");
  let windSpeed = document.querySelector("#wind-value");
  let time = document.querySelector("#currentDayTime");
  let date = new Date(response.data.time * 1000);

  city.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  conditionDescription.innerHTML = response.data.condition.description;
  conditionImg.innerHTML = response.data.condition.icon_url;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
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

let searchCityElement = document.querySelector("#search-form");
searchCityElement.addEventListener("submit", searchSubmit);

searchCity("Barcelona");
