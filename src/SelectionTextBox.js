// @flow strict

import React, { Component } from 'react';

export type SelectionTextBoxProps = {
  id: string,
  value: string,
  onChange: string => void,
  selection: Array<string>
}

export default class SelectionTextBox extends Component<SelectionTextBoxProps> { 
  constructor(props: SelectionTextBoxProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    const dataListId = this.props.id + "-datalist";
    return (
      <div>
        <datalist id={dataListId}>{this.props.selection.map(x => <option value={x}/>)}</datalist>
        <input id={this.props.id} type="text" value={this.props.value} onChange={this.onChange} list={dataListId}/>
      </div>);
  }

  onChange = (event: {target: {value: string}}) => {
    this.props.onChange(event.target.value);
  }
}