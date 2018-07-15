// @flow strict

import React, { Component } from 'react';

type TextBoxProps = {
  id: string,
  value: string,
  onChange: string => void
};

export default class TextBox extends Component<TextBoxProps> { 
  constructor(props: TextBoxProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (<input id={this.props.id} type="text" value={this.props.value} onChange={this.onChange}/>);
  }

  onChange = (event: {target: {value: string}}) => {
    this.props.onChange(event.target.value);
  }
};

