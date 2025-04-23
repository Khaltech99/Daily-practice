import axios from "axios";

// const weatherApi = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchWeather(city) {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e4d60b093d0584c2429bf418ff7f583`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

fetchWeather("London");
