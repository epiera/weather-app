import transformForecast from './../services/transformForecast';

export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA';

const setCity = value => ({ type: SET_CITY, value});
const setForecastData = value => ({ type: SET_FORECAST_DATA, value});

/* TODO:
 - move to ./constants?
 - create service like getUrlWeatherByCity
*/

const api_key = "10cf871debf13894a012091b7fc8a238";
const url_base_forecast = "http://api.openweathermap.org/data/2.5/forecast";

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