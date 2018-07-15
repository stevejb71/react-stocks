// @flow

import type { StockProps } from './Stock';
const { List } = require('immutable');

export function updatePrice(stocks: List<StockProps>, symbol: string, price: ?number): List<StockProps> {
  const indexToUpdate = stocks.findIndex(s => s.symbol === symbol);
  if(indexToUpdate !== -1) {
    const stock = stocks.get(indexToUpdate);
    const newStock = {symbol: stock.symbol, name: stock.name, price: price};
    return stocks.set(indexToUpdate, newStock);
  } else {
    return stocks;
  }
}
