function searchSubmit(event) {
  event.preventDefault();
  event.stopPropagation();
  let searchInput = document.querySelector("#search-city-input");
  let city = document.querySelector("#current-city");
  city.innerHTML = searchInput.value;
}

let searchCityElement = document.querySelector("#search-form");
searchCityElement.addEventListener("submit", searchSubmit);
