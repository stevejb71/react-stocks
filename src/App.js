// @flow

import React, { Component } from 'react';
import './App.css';
import { getTimeSeries, latestClose, defaultResponseHandler } from  './Alphavantage';
import TextBox from './TextBox';
import { axiosGet } from './AxiosWrapper';
import type { StockProps } from './Stock';
import AddStock from './AddStock';
import type { AddStockState } from './AddStock';
import StockList from './StockList';
import { updatePrice } from './StockListModule'
const { List } = require('immutable');

type AppState = {
  apiKey: string,
  stocks: List<StockProps>,
  addStock: ?AddStockState
}

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const stocks = List([
      {
        symbol: "MSFT",
        name: "Microsoft",
      },
      {
        symbol: "GOOGL",
        name: "Google",
      },
    ]);
    this.state = {apiKey: "", stocks: stocks, addStock: null};
  }

  onApiKeyChange = (value: string) => {
    this.setState({apiKey: value});

    const fetchStock = (symbol) => {
      const updateState = (closePrice) => this.setState({stocks: updatePrice(this.state.stocks, symbol, closePrice)});
      const handler = latestClose(updateState);
      const responseHandler = defaultResponseHandler(handler, (s, msg) => updateState(null));
      getTimeSeries(axiosGet, value, symbol, responseHandler);
    }

    this.state.stocks.map(s => s.symbol).forEach(fetchStock);
  }

  onAdd = (e: any) => {
    this.setState({addStock: {symbol: "", name: "", price: null}})
  }

  findStock(symbol: string) {
    return this.state.stocks.find(x => x.symbol === symbol)
  }

  addStock = (symbol: string, name: string) => {
    this.setState({addStock: null, stocks: this.state.stocks.push({symbol: symbol, name: name, price: null})});
  }

  render() {
    return (
      <div id="App">
        <div id="Controls">
          <TextBox id="apiKey" value={this.state.apiKey} onChange={this.onApiKeyChange} selection={[]}/>
          <button type="button" onClick={this.onAdd}>Add</button>
        </div>
        <div className="StockList">
          <StockList stocks={this.state.stocks}/>
        </div>
        {this.state.addStock != null ? <AddStock onClick={this.addStock}/> : <p/>}
      </div>
    );
  }
}