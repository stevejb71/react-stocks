import React from 'react';
import { latestClose, defaultResponseHandler } from '../Alphavantage';
const { Map } = require('immutable');

test('latestClose gets the latest close value as a number from the respoonse', () => {
  var result = 0
  const handler = x => {result = x;};
  const response = {data: {"Time Series (1min)": {
    "first": undefined,
    "second": {"4. close": "100.3"},
  }}};
  
  latestClose(handler) (response);
  
  expect(result).toEqual(100.3);
});

test('defaultResponseHandler calls errorHandler with status and text if response status is not 200', () => {
  let status = undefined;
  let text = undefined;
  const response = {status: 300, statusText: "error!"};
  
  defaultResponseHandler(undefined, (s, t) => {status = s; text = t;}) (response);

  expect(status).toEqual(300);
  expect(text).toEqual("error!");
});

test('defaultResponseHandler calls errorHandler with corrupt warning if response is missing a data attribute', () => {
  let status = undefined;
  let text = undefined;
  const response = {status: 200};
  
  defaultResponseHandler(undefined, (s, t) => {status = s; text = t;}) (response);

  expect(status).toEqual(200);
  expect(text).toEqual("Corrupt response");
});

test('defaultResponseHandler calls errorHandler with corrupt warning if response data is missing the time series', () => {
  let status = undefined;
  let text = undefined;
  const response = {status: 200, data: {}};
  
  defaultResponseHandler(undefined, (s, t) => {status = s; text = t;}) (response);

  expect(status).toEqual(200);
  expect(text).toEqual("Corrupt response");
});

test('defaultResponseHandler calls dataHandler if response is ok', () => {
  let dataHandlerInput = undefined;
  const response = {status: 200, data: {"Time Series (1min)": []}};
  
  defaultResponseHandler(r => {dataHandlerInput = r;}, undefined) (response);

  expect(dataHandlerInput).toEqual(response);
});
