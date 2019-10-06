import { createStore } from 'redux';
import { city } from './../reducers/city';

const initalState = {
    city: 'Buenos Aires,ar'
};

export const store = createStore(city, initalState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());