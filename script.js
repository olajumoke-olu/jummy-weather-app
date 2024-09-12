const apiKey = "82172d31a35295d1b6de049fb87cb75d";

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Update Weather Info
    document.getElementById(
      "location"
    ).innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").innerText = `${Math.round(
      data.main.temp
    )}°C`;
    document.getElementById("description").innerText =
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1);
    document.getElementById(
      "humidity"
    ).innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById(
      "wind"
    ).innerText = `Wind Speed: ${data.wind.speed} m/s`;

    const icon = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById(
      "weather-icon"
    ).innerHTML = `<img src="${iconUrl}" alt="Weather Icon" />`;

    document.getElementById("weather-info").classList.remove("hidden");
    document.getElementById("weather-info").classList.add("visible");
  } catch (error) {
    alert(error.message);
  }
}
