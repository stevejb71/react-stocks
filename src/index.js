// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './store/Reducers.js'
const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

const root = document.getElementById('root')
if(root != null)
{
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    root
    );
  registerServiceWorker();
}