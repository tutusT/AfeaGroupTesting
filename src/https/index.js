import axios from 'axios'

const baseURL = 'https://dummyjson.com'

export const $fakeJson = axios.create({
  baseURL,
})
