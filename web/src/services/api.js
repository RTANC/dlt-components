import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 600000,
  headers: {'Authorization': 'Bearer ' + Cookies.get('token')}
})