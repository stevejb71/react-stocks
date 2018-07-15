// @flow

import React, { Component } from 'react';
import SelectionTextBox from './SelectionTextBox';
import { FTSE100Names, FTSE100Symbols,FTSE100 } from './FTSE100';

export type AddStockProps = {
  onClick: (symbol: string, name: string) => void
}

export type AddStockState = {
  symbol: string, 
  name: string
}

export class AddStock extends Component<AddStockProps, AddStockState> {
  constructor(props: AddStockProps) {  
    super(props)
    this.state = {symbol: "", name: ""}
  }

  onSymbolChange = (sym: string) => {
    const entry = FTSE100.find(x => x.symbol === sym);
    if(entry !== undefined) {
      this.setState({symbol: sym, name: entry.name});
    } else {
      this.setState({symbol: sym});
    }
  }

  onNameChange = (name: string) => {
    const entry = FTSE100.find(x => x.name === name);
    if(entry !== undefined) {
      this.setState({symbol: entry.symbol, name: entry.name});
    } else {
      this.setState({name: name});
    }
  }

  render() {
    return (
      <div className="AddStockRow">
        <SelectionTextBox id="addSymbol" value={this.state.symbol} onChange={this.onSymbolChange} selection={FTSE100Symbols}/>
        <SelectionTextBox id="addName" value={this.state.name} onChange={this.onNameChange} selection={FTSE100Names}/>
        <button type="button" onClick={(e: any) => this.props.onClick(this.state.symbol, this.state.name)}>Done</button>
      </div>
    );
  }
}

export default AddStock;
