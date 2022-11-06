import{ api } from './api'
import axios from 'axios'

export function getReports(reportId) {
    return axios({baseURL: import.meta.env.VITE_API_URL + '/reports/GCS/01', responseType: 'arraybuffer', dataType:'blob', headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjMzNywiUm9sZUlEIjozLCJMb2dpbk5hbWUiOiJhZG1pbl9kZXYiLCJpYXQiOjE2Njc3NDYzMDksImV4cCI6MTY2ODQzNzUwOX0.2FfNJJZU0YpHXlYbzXsX2UP0JRJPJdH5Xr40mq_wTNg'}})
}