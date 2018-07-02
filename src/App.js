import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="Stocks">
        <Stock symbol="0002.HK" name="CLP" price="86.1"/>
        <Stock symbol="0005.HK" name="HSBC" price="76.8"/>
      </div>
    );
  }
}

class Stock extends Component {
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
