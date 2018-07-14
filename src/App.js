// @flow

import React, { Component } from 'react';
import './App.css';
import { getTimeSeries, latestClose, defaultResponseHandler } from  './Alphavantage';
import { TextBox } from './TextBox';
import { axiosGet } from './AxiosWrapper';
import type { StockProps } from './Stock';
import StockList from './StockList';
import { updatePrice } from './StockListModule'
const { List } = require('immutable');

type AppState = {
  apiKey: string,
  stocks: List<StockProps>,
}

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const stocks = List([
      {
        symbol: "MSFT",
        name: "Microsoft",
        price: 0.0,
      },
      {
        symbol: "GOOGL",
        name: "Google",
        price: 0.0,
      },
    ]);
    this.state = {apiKey: "", stocks: stocks};
  }

  onApiKeyChange = (value: string) => {
    this.setState({apiKey: value});

    const fetchStock = (symbol) => {
      const updateState = (closePrice) => this.setState({stocks: updatePrice(this.state.stocks, symbol, closePrice)});
      const handler = latestClose(updateState);
      const responseHandler = defaultResponseHandler(handler, (s, msg) => updateState(0.0));
      getTimeSeries(axiosGet, value, symbol, responseHandler);
    }

    this.state.stocks.map(s => s.symbol).forEach(fetchStock);
  }

  findStock(symbol: string) {
    return this.state.stocks.find(x => x.symbol === symbol)
  }

  render() {
    return (
      <div>
        <div>
          <TextBox value={this.state.apiKey} onChange={this.onApiKeyChange}/>
        </div>
        <div className="StockList">
          <StockList stocks={this.state.stocks}/>
        </div>
      </div>
    );
  }
}