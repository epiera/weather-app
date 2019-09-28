import React from 'react';
import LocationList from './components/LocationList';
import './App.css';

const cities = [
  'Barcelona,es',
  'Paris,fr',
  'Mexico,mex',
  'Washington,us',
  'Moscu,rus'
]

class App extends React.Component {
    render(){
      return (
        <div className="App">
          <LocationList cities={cities}></LocationList>
        </div>
      );
    }
}


export default App;
