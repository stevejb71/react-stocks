// @flow strict

import React, { Component } from 'react';

export class TextBox extends Component<{value: string, onChange: string => void}> { 
  constructor(props: {value: string, onChange: string => void}) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <input type="text" value={this.props.value} onChange={this.handleChange}/>
    )
  }

  handleChange = (event: {target: {value: string}}) => {
    this.props.onChange(event.target.value);
  }
}

