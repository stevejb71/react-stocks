// @flow

import type { HttpCaller, ResponseHandler, Response } from './AxiosWrapper'

type DataHandler<R> = {data: any} => R
type ErrorHandler<R> = (number, string) => R

const alphaVantageUrl = (apiKey: string, symbol: string) => `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`

export const getTimeSeries = (httpCaller: HttpCaller, apiKey: string, symbol: string, responseHandler: ResponseHandler) => {
  console.log(`Making API call with key ${apiKey}`);
  httpCaller(alphaVantageUrl(apiKey, symbol), responseHandler);
}

export function defaultResponseHandler<R, E>(dataHandler: DataHandler<R>, errorHandler: ErrorHandler<E>): Response => R | E {
  return (response: Response) => {
    if(response.status !== 200) {
      return errorHandler(response.status, response.statusText)
    } else {
      if(!response.hasOwnProperty('data')) {
        return errorHandler(200, `No data`)
      } else if(!response.data.hasOwnProperty('Time Series (1min)')) {
        return errorHandler(200, `No time series`)
      } else {
        return dataHandler(response)
      }
    }
  }
}

export const latestClose = (handler: number => void) => (response: {data: {'Time Series (1min)': any}}) => {
  const timeSeries = Object.entries(response.data['Time Series (1min)']);
  const latestEntry = timeSeries[timeSeries.length - 1];
  const latestValue: any = latestEntry[1];
  handler(Number(latestValue["4. close"]));
}
