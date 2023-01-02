import React from 'react';
import {createWrapper} from 'next-redux-wrapper';
import {applyMiddleware, createStore, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers/index';
import rootSaga from '../sagas';

const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
  return next(action);
}
const configureStore = () => {
  const sagaMiddlewares = createSagaMiddleware();
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(sagaMiddlewares))
    : composeWithDevTools(applyMiddleware(sagaMiddlewares, loggerMiddleware))
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddlewares.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development'
});

export default wrapper;