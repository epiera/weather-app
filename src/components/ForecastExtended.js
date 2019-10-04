import React from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import transformForecast from './../services/transformForecast';
import './styles.css';

/*
const days = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes'
]

const data ={
  temperature: 10,
  weatherState: 'normal',
  humidity: 35,
  wind: 'normal'
}
*/

/* TODO:
 - move to ./constants?
 - create service like getUrlWeatherByCity
*/

const api_key = "10cf871debf13894a012091b7fc8a238";
const url_base_forecast = "http://api.openweathermap.org/data/2.5/forecast";


class ForecastExtended extends React.Component {

  constructor() {
    super();
    this.state = { forecastData: null }
  }

  componentDidMount() {
    this.updateCity(this.props.city);
  }

  // FIXME: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.city !== this.props.city){
      this.setState({ forecastData: null });
      this.updateCity(nextProps.city);
    }
  }
  

  updateCity = city => {
    const api_forecast = `${url_base_forecast}?q=${city}&appid=${api_key}`;

    fetch(api_forecast)
      .then(resolve => resolve.json())
      .then(
        (data) => {
          const forecastData = transformForecast(data)
          this.setState({ forecastData })
        },
        (error) => {
          console.log(error);
        }
      )
  }

  renderForecastItemDays(forecastData) {
    return forecastData.map( forecast => (
      <ForecastItem 
        key={`${forecast.weekDay}${forecast.hour}`}
        weekDay={forecast.weekDay} 
        hour={forecast.hour} 
        data={forecast.data}></ForecastItem>
    ));
  }
  
  renderProgress() {
    return <h3>Cargando...</h3>;
  }

  render() {
    const { city } = this.props;
    const { forecastData} = this.state;
    return (
      <div>
        <h2 className='forecast-title'>Pronóstico extendido para {city}</h2>
        {forecastData ?
          this.renderForecastItemDays(forecastData) :
          this.renderProgress()
        }
        
      </div>
    );
  }
}

ForecastExtended.propTypes = {
  city: PropTypes.string.isRequired
}

export default ForecastExtended;