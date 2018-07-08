import React from 'react';
import { latestClose } from '../Alphavantage';
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
