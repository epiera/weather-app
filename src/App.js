import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Col, Row} from 'react-flexbox-grid';
import ForecastExtendedContainer from './containers/ForecastExtendedContainer';
import LocationListContainer from './containers/LocationListContainer';

import './App.css';

const cities = [
  'Barcelona,es',
  'Paris,fr',
  'Mexico,mx',
  'Washington,us',
  'Moscu,rus'
]

class App extends React.Component {
  render(){
    return (
      <Grid>
        <Row>
          <AppBar position='sticky'>
            <Toolbar>
              <Typography variant='subtitle1' color='inherit'>
                Weather App
              </Typography>
            </Toolbar>
          </AppBar>
          
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <LocationListContainer cities={cities}></LocationListContainer>
          </Col>

          <Col xs={12} md={6}>
            <Paper elevation={4}>
              <div className="details">
                {
                  <ForecastExtendedContainer></ForecastExtendedContainer>
                }
              </div>
            </Paper>
          </Col>
        </Row>
        
      </Grid>
    );
  }
}

export default App;

