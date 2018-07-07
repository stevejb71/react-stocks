// @flow

import React, { Component } from 'react';
import './App.css';
import { getTimeSeries, latestClose } from  './Alphavantage';

type AppState = {
  apiKey: string
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {apiKey: ""};
  }

  render() {
    return (
      <div>
        <div>
          <ApiKey value=""/>
        </div>
        <div className="Stocks">
          <Stock symbol="0002.HK" name="CLP"/>
          <Stock symbol="0005.HK" name="HSBC"/>
        </div>
      </div>
    );
  }
}

type StockProps = {
  symbol: string,
  name: string,
}

type StockState = {
  price: number,
}

class ApiKey extends Component<{value: string}, {value: string}> { 
  constructor(props) {
    super(props);
    this.state = {value: props.value};
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <input type="text" value={this.state.value} onChange={this.handleChange}/>
    )
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
    event.preventDefault();
  }
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
