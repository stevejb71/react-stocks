// @flow

import React, { Component } from 'react';
import './App.css';
import { getTimeSeries, latestClose } from  './Alphavantage';

class App extends Component<any, any> {
  render() {
    return (
      <div className="Stocks">
        <Stock symbol="0002.HK" name="CLP" price="86.1"/>
        <Stock symbol="0005.HK" name="HSBC" price="76.8"/>
      </div>
    );
  }
}

type StockProps = {
  symbol: string,
  name: string
}

type StockState = {
  price: number,
}

class Stock extends Component<StockProps, StockState> {
  constructor(props) {
    super(props);
    this.state = {price: 0.0};
  }

  componentDidMount() {
    const handler = latestClose(closePrice => this.setState({price: closePrice}));
    getTimeSeries("DEMO", "MSFT", handler, (s, msg) => {})
  }
  
  render() {
    return (
      <div className="StockRow">
        <div className="StockCell">{this.props.symbol}</div>
        <div className="StockCell">{this.props.name}</div>
        <div className="StockCell">{this.state.price}</div>
      </div>
    );
  }
}

export default App;
