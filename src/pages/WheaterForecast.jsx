import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";

const GoWheater = () => {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: lat,
          lon: long,
          appid: "7dd54ad21b3018cdf10375ba72342035",
          lang: "pt",
          units: "metric",
        },
      }
    );
    setWeather(res.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (location == false) {
    return <div>Você precisa habilitar a localização no browser o/</div>;
  } else if (weather == false) {
    return <div>Carregando o clima..</div>;
  } else {
    console.log(weather);
    return (
      <WeatherCard
        name={weather.city.name}
        description={weather.list[0].weather[0].description}
        icon={weather.list[0].weather[0].icon}
        temp={String(Math.trunc(weather.list[0].main.temp)) + "°"}
        wind={weather.list[0].wind.speed}
        humidity={weather.list[0].main.humidity}
        max={String(Math.trunc(weather.list[0].main.temp_max)) + "°"}
      />
    );
  }
};

export default GoWheater;
