import React, { useState } from "react";
import { fetchWeather } from "../../weather";
import { useQuery } from "@tanstack/react-query";

const Weather = () => {
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", submitted],
    queryFn: () => fetchWeather(submitted),
    enabled: !!submitted, // Only run the query if submitted is not empty
  });
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(city);
    setCity("");
  }
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <input
          type="text"
          className="bg-none bg-blue-300 border-2 w-full md:w-[900px] md:m-auto "
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <div>
        <div>{data?.name}</div>
        {data?.weather.map((w, i) => (
          <div key={i}>
            <h1>{w.main}</h1>
            <p>{w.description}</p>
            <img src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
