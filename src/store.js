import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import axiosMiddleware from './data/middleware';
import { reducer, initialState } from './reducer';

const configureMiddleware = () => {
  return [
    thunk,
    axiosMiddleware,
    createLogger({ collapsed: true })
  ];
};

export default () => createStore(
  reducer,
  initialState,
  applyMiddleware(...configureMiddleware()),
);
