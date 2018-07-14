// @flow

import React, { Component } from 'react';
import { Stock } from './Stock';
import type { StockProps } from './Stock';
const { List } = require('immutable');

export type StockListProps = {
  stocks: List<StockProps>
}

export default class StockList extends Component<StockListProps> {
  render() {
    return (
      <div className="Stocks">
        {this.props.stocks.map(this.renderStock)}
      </div>
    );
  }

  renderStock = (s: StockProps) => (<Stock key={s.symbol} symbol={s.symbol} name={s.name} price={s.price}/>);
}
