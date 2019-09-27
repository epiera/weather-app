const location = "Buenos Aires,ar";
const api_key = "10cf871debf13894a012091b7fc8a238";
const url_base_weather = "http://api.openweathermap.org/data/2.5/weather";

export const api_weather = `${url_base_weather}?q=${location}&appid=${api_key}`;