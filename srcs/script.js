function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-value");
  let city = document.querySelector("#current-city");

  city.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  console.log(response.data.temperature.current);
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
