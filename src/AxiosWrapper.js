// @flow

import axios from 'axios'

type Response = {status: number, statusText: string, data: any}
type ResponseHandler = Response => void

export type HttpCaller = (string, ResponseHandler) => void
export const axiosGet = (url: string, responseHandler: ResponseHandler): any => axios.get(url).then(responseHandler)
