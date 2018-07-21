// @flow strict

export const UPDATE_APIKEY = "UPDATE_APIKEY"

export function updateApiKey(apiKey: string) {
  return {
    type: UPDATE_APIKEY,
    apiKey: apiKey
  }
}