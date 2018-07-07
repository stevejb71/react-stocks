// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { getTimeSeries, latestClose } from  './Alphavantage';

const root = document.getElementById('root')
if(root != null)
{
  ReactDOM.render(<App />, root);
  registerServiceWorker();
}

const handler = latestClose(console.log);
getTimeSeries("DEMO", "MSFT", handler, (s, msg) => {})