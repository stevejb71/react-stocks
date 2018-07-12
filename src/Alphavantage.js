// @flow

import type { HttpCaller, ResponseHandler, Response } from './AxiosWrapper'

type DataHandler = {data: any} => void
type ErrorHandler = (number, string) => void

const alphaVantageUrl = (apiKey: string, symbol: string) => `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`

export const getTimeSeries = (httpCaller: HttpCaller, apiKey: string, symbol: string, responseHandler: ResponseHandler) => {
  console.log(`Making API call with key ${apiKey}`);
  httpCaller(alphaVantageUrl(apiKey, symbol), responseHandler);
}

export const defaultResponseHandler = (dataHandler: DataHandler, errorHandler: ErrorHandler) => (response: Response) => {
  const hasKey = (data: any, key: string): bool => {
    try {
      // eslint-disable-next-line
      return data[key] !== undefined;
    } catch (e) {
      return false
    }
  }
  if(response.status !== 200) {
    errorHandler(response.status, response.statusText)
  } else {
    if(!response.hasOwnProperty('data')) {
      errorHandler(200, `No data`)
    } else if(!hasKey(response.data, 'Time Series (1min)')) {
      errorHandler(200, `No time series`)
    } else {
      dataHandler(response)
    }
  }
}

export const latestClose = (handler: number => void) => (response: {data: any}) => {
  const timeSeries = Object.entries(response.data['Time Series (1min)']);
  const latestEntry = timeSeries[timeSeries.length - 1];
  const latestValue: any = latestEntry[1];
  handler(Number(latestValue["4. close"]));
}
