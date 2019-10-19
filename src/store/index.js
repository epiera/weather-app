import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './../reducers';

/* TODO: Remove initial city. Check required on localistonctainer and inside of component.... */
const initalState = {
    city: 'Buenos Aires,ar'
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, initalState, composeEnhancers(applyMiddleware(thunk)));