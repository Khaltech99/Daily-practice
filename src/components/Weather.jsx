import React, { useState } from "react";
import { fetchWeather } from "../../weather";
import { useQuery } from "@tanstack/react-query";
import Toggle from "./Toggle";
import { uiStore } from "../../uistore";

const Weather = () => {
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState("");
  const toggleMode = uiStore((state) => state.toggleMode);
  console.log(toggleMode);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather", submitted],
    queryFn: () => fetchWeather(submitted),
    enabled: !!submitted,
  });

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(city);
    setCity("");
  }

  return (
    <div
      className={`w-full gap-2 shadow-xl  p-4 md:w-[500px] m-auto ${
        toggleMode !== "light" ? "bg-white" : "bg-black"
      } rounded-lg`}
    >
      <Toggle />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          value={city}
          className="bg-none outline-none h-10 bg-blue-300 w-full p-2"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className={`${toggleMode !== "light" ? "text-black" : "text-white"}`}
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className="mt-4">
        {isLoading && (
          <h1
            className={`${
              toggleMode !== "light" ? "text-black" : "text-white"
            }`}
          >
            Loading...
          </h1>
        )}
        {isError && (
          <h1
            className={`${
              toggleMode !== "light" ? "text-black" : "text-white"
            }`}
          >
            wrong city or check your internet{" "}
          </h1>
        )}

        {data && (
          <div>
            <h2
              className={`${
                toggleMode !== "light" ? "text-black" : "text-white"
              }`}
            >
              {data.name}
            </h2>
            {data.weather.map((w, i) => (
              <div key={i}>
                <h1
                  className={`${
                    toggleMode !== "light" ? "text-black" : "text-white"
                  }`}
                >
                  {w.main}
                </h1>
                <p
                  className={`${
                    toggleMode !== "light" ? "text-black" : "text-white"
                  }`}
                >
                  {w.description}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                  alt={w.description}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
