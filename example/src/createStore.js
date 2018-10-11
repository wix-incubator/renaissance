import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import renaissance from 'renaissance';
import reducer, { INITIAL_STATE } from './reducer';
import middleware from './middleware';

const params = {
  axios: axios.create({
    baseURL: 'http://www.omdbapi.com/',
    timeout: 1000,
  }),
};

export default createStore(
  reducer,
  INITIAL_STATE,
  applyMiddleware(renaissance(middleware, params)),
);
