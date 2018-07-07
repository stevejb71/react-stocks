// @flow

import React, { Component } from 'react';
import './App.css';
import { getTimeSeries, latestClose } from  './Alphavantage';
import { TextBox } from './TextBox';
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

    const clpHandler = latestClose(closePrice => {
      this.setState({prices: this.state.prices.set("0002.HK", closePrice)})
    });
    getTimeSeries(value, "MSFT", clpHandler, (s, msg) => {this.setState({prices: this.state.prices.set("0002.HK", 0)})});

    const hsbcHandler = latestClose(closePrice => {
      this.setState({prices: this.state.prices.set("0005.HK", closePrice)})
    });
    getTimeSeries(value, "MSFT", hsbcHandler, (s, msg) => {this.setState({prices: this.state.prices.set("0005.HK", 0)})});
  }

  render() {
    return (
      <div>
        <div>
          <TextBox value={this.state.apiKey} onChange={this.onApiKeyChange}/>
        </div>
        <div className="Stocks">
          <Stock symbol="0002.HK" name="CLP" price={this.state.prices.get("0002.HK")}/>
          <Stock symbol="0005.HK" name="HSBC" price={this.state.prices.get("0005.HK")}/>
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
