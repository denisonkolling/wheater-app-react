import { useState, useEffect } from "react";
import {
  FaSpinner,
  FaTemperatureHigh as ThermometherIcon,
  FaWind as WindIcon,
} from "react-icons/fa";

const OpenWheater = () => {
  const [searchedCity, setSearchedCity] = useState("Campinas");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setCity(searchedCity);
    console.log(searchedCity);
  }

  useEffect(() => {
    async function getCityWeather() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://goweather.herokuapp.com/weather/${searchedCity}`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        alert("API Error!");
      } finally {
        setIsLoading(false);
      }
    }
    getCityWeather();
  }, [city]);

  return (
    <div className="App">
      <h1>{"Weather App".toUpperCase()}</h1>
      <form action="" onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Ex: Curitiba"
            value={searchedCity}
            onChange={(event) => setSearchedCity(event.target.value)}
          />
          <button type="submit">
            {isLoading ? (
              <FaSpinner className="loading" />
            ) : (
              <span>Search Location</span>
            )}
          </button>
        </div>
      </form>

      {city && weather && (
        <>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px'}}>
            <h1>{city}</h1>
            <h2>Actual Weather</h2>
            <p>{weather.temperature}</p>
            <p>{weather.description}</p>
          </div>
          <h2>Prediction</h2>
          <div>
            {weather.forecast.map((dayForecast, index) => {
              return (
                <>
                  <div key={index}>
                    <hr />
                    <div>
                      <h3>
                        {index == 0
                          ? "Tomorrow"
                          : Intl.DateTimeFormat("en", {
                              weekday: "long",
                            }).format(
                              new Date().setDate(
                                new Date().getDate() + index + 1
                              )
                            )}
                      </h3>
                    </div>
                    <div>
                      <span>
                        <ThermometherIcon />
                        <span>&nbsp;{dayForecast.temperature}</span>
                      </span>
                    </div>
                    <div>
                      <span>
                        <WindIcon />
                        <span>&nbsp;{dayForecast.wind}</span>
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
            <hr />
          </div>
        </>
      )}
    </div>
  );
};

export default OpenWheater;
