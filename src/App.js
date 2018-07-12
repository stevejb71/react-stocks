// @flow

import React, { Component } from 'react';
import './App.css';
import { getTimeSeries, latestClose, defaultResponseHandler } from  './Alphavantage';
import { TextBox } from './TextBox';
import { axiosGet } from './AxiosWrapper';
const { Map } = require('immutable');

type AppState = {
  apiKey: string,
  prices: Map<string, number>,
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {apiKey: "", prices: Map([["0002.HK", 0.0], ["0005.HK", 0.0]])};
  }

  onApiKeyChange = (value: string) => {
    this.setState({apiKey: value});

    const fetchStock = (symbol) => {
      const handler = latestClose(closePrice => {
        this.setState({prices: this.state.prices.set(symbol, closePrice)})
      });
      const responseHandler = defaultResponseHandler(handler, (s, msg) => {this.setState({prices: this.state.prices.set(symbol, 0)})});
      getTimeSeries(axiosGet, value, symbol, responseHandler);
    }

    fetchStock("MSFT");
    fetchStock("GOOGL");
  }

  render() {
    return (
      <div>
        <div>
          <TextBox value={this.state.apiKey} onChange={this.onApiKeyChange}/>
        </div>
        <div className="Stocks">
          <Stock symbol="MSFT" name="MSFT" price={this.state.prices.get("MSFT")}/>
          <Stock symbol="GOOGL" name="GOOGLE" price={this.state.prices.get("GOOGL")}/>
        </div>
      </div>
    );
  }
}

type StockProps = {
  symbol: string,
  name: string,
  price: number,
}

class Stock extends Component<StockProps> {
  render() {
    return (
      <div className="StockRow">
        <div className="StockCell">{this.props.symbol}</div>
        <div className="StockCell">{this.props.name}</div>
        <div className="StockCell">{this.props.price}</div>
      </div>
    );
  }
}

export default App;
