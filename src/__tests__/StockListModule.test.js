// @flow

import type { StockProps } from '../Stock';
import { updatePrice } from '../StockListModule';
const { List } = require('immutable');

const stocks = List([
  {symbol: "sym1", name: "", price: 1.0},
  {symbol: "sym2", name: "", price: 2.0},
  {symbol: "sym3", name: "", price: 3.0},
  {symbol: "sym4", name: "", price: 4.0},
])

test('updates the price of the given symbol', () => {
  expect(updatePrice(stocks, "sym3", 5.0)).toEqual(List([
    {symbol: "sym1", name: "", price: 1.0},
    {symbol: "sym2", name: "", price: 2.0},
    {symbol: "sym3", name: "", price: 5.0},
    {symbol: "sym4", name: "", price: 4.0},
  ]))
});

test('does nothing if symbol not found', () => {
  expect(updatePrice(stocks, "sym5", 5.0)).toEqual(stocks)
});
