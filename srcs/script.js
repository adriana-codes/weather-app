function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-value");
  let city = document.querySelector("#current-city");
  let conditionDescription = document.querySelector("#weatherDescription");
  let iconImg = document.querySelector("#icon");
  let humidity = document.querySelector("#humidity-value");
  let windSpeed = document.querySelector("#wind-value");
  let time = document.querySelector("#currentDayTime");
  let date = new Date(response.data.time * 1000);

  city.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  conditionDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
  iconImg.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                alt=""
                class="temperature-icon"
              />`;

  let longitude = response.data.coordinates.longitude;
  let latitude = response.data.coordinates.latitude;
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}`;

  axios.get(apiForecastUrl).then(updateForecast);
}

function updateForecast(response) {
  let forecast = document.querySelector("#weather-forecast");
  let content = "";

  for (let i = 0; i < 5; i++) {
    let date = new Date(response.data.daily[i].time * 1000);

    content += `
      <div class="weather-forecast-weekday">
        <div class="weather-forecast-date">${forecastDay(date)}</div>
        <div class="weather-forecast-icon id="forecast-icon">
          <img
              src="${response.data.daily[i].condition.icon_url}"
              alt=""
              class="temperature-icon"
            />
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(
              response.data.daily[i].temperature.maximum
            )}°</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            response.data.daily[i].temperature.minimum
          )}°</div>
        </div>
      </div>`;
  }

  forecast.innerHTML = content;
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

function forecastDay(date) {
  let dayofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekdays = dayofweek[date.getDay()];

  return `${weekdays}`;
}

let apiKey = "0be192793f55aa475o5602t2cabd6e24";

function searchCity(city) {
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
