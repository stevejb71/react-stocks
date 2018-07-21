// @flow

const { Map } = require('immutable');

export const apiKeyReducer = (prevState: Map<string, any>, apiKey: string) => {
  if(prevState === undefined) {
    return Map()
  } else {
    return prevState.set('apiKey', apiKey)
  }
}