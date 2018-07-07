// @flow

import axios from 'axios'

const hasKey = (data: any, key: string): bool => {
  try {
    // eslint-disable-next-line
    return data[key] !== undefined;
  } catch (e) {
    return false
  }
}

export const getTimeSeries = (apiKey: string, symbol: string, dataHandler: number => void, onError: (number, string) => void) => {
  const handler = (response) => {
    if(response.status !== 200) {
      onError(response.status, response.statusText)
    } else {
      if(typeof response !== "object" || !response.hasOwnProperty('data') || !hasKey(response.data, 'Time Series (1min)')) {
        onError(response.status, `Corrupt response for ${symbol}`)
      } else {
        dataHandler(response)
      }
    }
  }
  axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`).then(handler)
}

export const latestClose = (handler: number => void) => (response: any) => {  
  const timeSeries = Object.entries(response.data['Time Series (1min)']);
  const latestEntry = timeSeries[timeSeries.length - 1];
  const latestValue: any = latestEntry[1];
  handler(Number(latestValue["4. close"]));
}
