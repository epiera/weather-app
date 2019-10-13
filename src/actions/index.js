import transformForecast from './../services/transformForecast';
import transformWeather from './../services/transformWeather';

export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA';

export const GET_WEATHER_CITY = 'GET_WEATHER_CITY';
export const SET_WEATHER_CITY = 'SET_WEATHER_CITY';

const setCity = value => ({ type: SET_CITY, value });
const setForecastData = value => ({ type: SET_FORECAST_DATA, value });

const getWeatherCity = value =>({ type: GET_WEATHER_CITY, value })
const setWeatherCity = value =>({ type: SET_WEATHER_CITY, value })

/* TODO:
 - move to ./constants?
 - create service like getUrlWeatherByCity
*/

const api_key = "10cf871debf13894a012091b7fc8a238";
const url_base_forecast = "http://api.openweathermap.org/data/2.5/forecast";
const url_base_weather = "http://api.openweathermap.org/data/2.5/weather";

export const setSelectedCity = value => { 

  // middlware
  return dispatch => {
    const api_forecast = `${url_base_forecast}?q=${value}&appid=${api_key}`;

    // Activar en el estado un indicador de búsqueda
    dispatch(setCity(value));

    return fetch(api_forecast)
      .then(resolve => resolve.json())
      .then(
        (data) => {
          const forecastData = transformForecast(data)
          
          console.log(forecastData);
          // modificar estado con el resultado de la promise (Fetch)
          dispatch(setForecastData({city: value, forecastData}));
        },
        (error) => {
          console.log(error);
        }
      )
  };
};

export const setWeather = value => {

  // middlware
  return dispatch => {
    value.forEach(city => {
      dispatch(getWeatherCity(city));

      const api_weather = `${url_base_weather}?q=${city}&appid=${api_key}`;
      fetch(api_weather)
        .then(resolve => resolve.json())
        .then(
          (data) => {
            const weather = transformWeather(data);

            dispatch(setWeatherCity({city, weather}));
          },
          (error) => {
            console.log(error);
          }
        )
    });
  };
};