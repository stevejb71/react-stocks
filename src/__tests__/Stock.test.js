import React from 'react';
import ReactDOM from 'react-dom';
import Stock from '../Stock';

test('renders a stock showing all props', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Stock symbol="0005.HK" name="HSBC" price="88.8"/>, div);
  
  expect(div.innerHTML.includes("0005.HK")).toBe(true);
  expect(div.innerHTML.includes("HSBC")).toBe(true);
  expect(div.innerHTML.includes("88.8")).toBe(true);
});
