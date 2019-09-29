import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import getUrlWeatherByCity from './../../services/getUrlWeatherByCity';
import tranformWeather from './../../services/transformWeather';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';



// const api_weather = `${url_base_weather}?q=${location}&appid=${api_key}&units=metric`;

class WeatherLocation extends React.Component {

  constructor(props) {
    super(props);
    const { city } = props;

    this.state = {
      city,
      data: null
    }
  }

  componentDidMount() {
    this.handleUpdateClick();
  }

  handleUpdateClick = () => {
    const api_weather = getUrlWeatherByCity(this.state.city);
    fetch(api_weather)
      .then(resolve => resolve.json())
      .then(
        (data) => {
          const newWeather = tranformWeather(data);
          this.setState({
            data: newWeather
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  render() {
    const  { onWeatherLocationClick } = this.props;
    const { city, data } = this.state;

    return (
      <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
        <Location city={city}></Location>
        {data ? 
          <WeatherData data={data}></WeatherData>  : 
          <CircularProgress size={50}></CircularProgress>
        }
      </div>
    )
  }
}

WeatherLocation.propTypes = {
  city: PropTypes.string.isRequired,
  onWeatherLocationClick: PropTypes.func,
}

export default WeatherLocation;
