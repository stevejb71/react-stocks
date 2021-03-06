// @flow strict

import React, { Component } from 'react';

export type StockProps = {
  +symbol: string,
  +name: string,
  +price: ?number,
  +onRemove: string => void
}

export class Stock extends Component<StockProps> {
  render() {
    return (
      <div className="StockRow">
        <div className="StockCell">{this.props.symbol}</div>
        <div className="StockCell">{this.props.name}</div>
        <div className="StockCell">{this.props.price}</div>
        <div className="StockCell"><button id={"remove-" + this.props.symbol} onClick={() => this.props.onRemove(this.props.symbol)}>Remove</button></div>
      </div>
    );
  }
}

export default Stock;
