import React from 'react';
import tranformWeather from './../../services/transformWeather';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';
import {
  SUN,
} from './../../constants/weathers';

import { api_weather } from './../../constants/api_urls';



// const api_weather = `${url_base_weather}?q=${location}&appid=${api_key}&units=metric`;

const data = {
  temperature: 31,
  weatherState: SUN,
  humidity: 10,
  wind: "10 ms/s",
}


class WeatherLocation extends React.Component {

  constructor() {
    super();
    console.log("constructor");
    this.state = {
      city: "Buenos Aires",
      data: data
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }

  componentWillMount(){
    console.log("UNSAFE componentWillMount");
  }

  componentWillUpdate(){
    console.log("UNSAFE componentWillUpdate");
  }

  
  
  

  handleUpdateClick = () => {
    fetch(api_weather)
      .then(resolve => resolve.json())
      .then(
        (data) => {
          const newWeather = tranformWeather(data);
          console.log(newWeather);
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
    console.log("render");
    const { city, data } = this.state;

    return (
      <div className="weatherLocationCont">
        <Location city={city}></Location>
        <WeatherData data={data}></WeatherData>
        <button onClick={this.handleUpdateClick}>Actualizar</button>
      </div>
    )
  }
}

export default WeatherLocation;
