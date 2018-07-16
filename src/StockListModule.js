// @flow strict

import type { StockProps } from './Stock';
const { List } = require('immutable');

export function updatePrice(stocks: List<StockProps>, symbol: string, price: ?number): List<StockProps> {
  const indexToUpdate = stocks.findIndex(s => s.symbol === symbol);
  if(indexToUpdate !== -1) {
    const stock = stocks.get(indexToUpdate);
    if(stock != null) {
      const newStock = {symbol: stock.symbol, name: stock.name, price: price, onRemove: stock.onRemove};
      return stocks.set(indexToUpdate, newStock);
    } else {
      return stocks;  
    }
  } else {
    return stocks;
  }
}
