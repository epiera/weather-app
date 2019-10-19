import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './../actions';
import { getWeatherCities, getCity } from './../reducers';
import LocationList from './../components/LocationList';

class LocationListContainer extends Component {

  componentDidMount() {
    const { setWeather, setSelectedCity, cities, city } = this.props;
    setWeather(cities);
    setSelectedCity(city);
  }

  handleSelectionLocation = city => {
    this.props.setSelectedCity(city);
  }  

  render() {
    return (
      <div>
        <LocationList 
          cities={this.props.citiesWeather}
          onSelectedLocation={this.handleSelectionLocation}>
        </LocationList>
      </div>
    );
  }
}

LocationListContainer.propTypes = {
  setSelectedCity: PropTypes.func.isRequired,
  setWeather: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  citiesWeather: PropTypes.array,
  city: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

// TODO: Without bindActionCreators
// const mapDispatchToProps = dispatch => ({
//   setSelectedCity: value => dispatch(actions.setSelectedCity(value)),
//   setWeather: cities => dispatch(actions.setWeather(cities))
// }); 



const mapStateToProps = state => ({
  citiesWeather: getWeatherCities(state),
  city: getCity(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationListContainer);