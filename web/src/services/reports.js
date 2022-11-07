import{ api } from './api'
import axios from 'axios'

function getObjectURL (resp) {
    const myBlob = new Blob([(resp.data)], {type: 'application/pdf'})
    return URL.createObjectURL(myBlob)
}

export async function getReports(reportId) {
    const myInterceptor = api.interceptors.request.use((config) => {
        config.responseType = 'arraybuffer'
        config.dataType = 'blob'
        return config
    }, error => Promise.reject(error))
    const fileURL =  getObjectURL(await api.get('/reports/GCS/' + reportId))
    api.interceptors.request.eject(myInterceptor)
    return fileURL
}