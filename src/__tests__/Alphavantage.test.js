// @flow

import React from 'react';
import { latestClose, defaultResponseHandler, getTimeSeries } from '../Alphavantage';
const { Map } = require('immutable');

const ignore: any = undefined

test('latestClose gets the latest close value as a number from the respoonse', () => {
  var result = 0
  const handler = x => {result = x;};
  const response: any = {data: {"Time Series (1min)": {
    "first": undefined,
    "second": {"4. close": "100.3"},
  }}};
  
  latestClose(handler) (response);
  
  expect(result).toEqual(100.3);
});

test('defaultResponseHandler calls errorHandler with status and text if response status is not 200', () => {
  let status = undefined;
  let text = undefined;
  const response: any = {status: 300, statusText: "error!"};
  
  defaultResponseHandler(ignore, (s, t) => {status = s; text = t;}) (response);

  expect(status).toEqual(300);
  expect(text).toEqual("error!");
});

test('defaultResponseHandler calls errorHandler with corrupt warning if response is missing a data attribute', () => {
  let status = undefined;
  let text = undefined;
  const response: any = {status: 200};
  
  defaultResponseHandler(ignore, (s, t) => {status = s; text = t;}) (response);

  expect(status).toEqual(200);
  expect(text).toEqual("No data");
});

test('defaultResponseHandler calls errorHandler with corrupt warning if response data is missing the time series', () => {
  let status = undefined;
  let text = undefined;
  const response: any = {status: 200, data: {}};
  
  defaultResponseHandler(ignore, (s, t) => {status = s; text = t;}) (response);

  expect(status).toEqual(200);
  expect(text).toEqual("No time series");
});

test('defaultResponseHandler calls dataHandler if response is ok', () => {
  let dataHandlerInput = undefined;
  const response: any = {status: 200, data: {"Time Series (1min)": []}};
  
  defaultResponseHandler(r => {dataHandlerInput = r;}, ignore) (response);

  expect(dataHandlerInput).toEqual(response);
});

test('getTimeSeries calls the http caller with a correct alpha vantage URL', () => {
  let url: string = ""
  let httpCaller: any = (s, r) => {url = s}
  
  getTimeSeries(httpCaller, "apiKey", "symbol", ignore)

  expect(url).toEqual("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=symbol&interval=1min&apikey=apiKey");
})
