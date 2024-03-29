import{ api } from './api'
import { createQueryStr } from './utils'

function getObjectURL (resp) {
    const myBlob = new Blob([(resp.data)], {type: 'application/pdf'})
    return URL.createObjectURL(myBlob)
}

export async function getReports(reportId, query) {
    const myInterceptor = api.interceptors.request.use((config) => {
        config.responseType = 'arraybuffer'
        config.dataType = 'blob'
        return config
    }, error => Promise.reject(error))
    try {
        const fileURL =  getObjectURL(await api.get('/reports/GCS/' + reportId + createQueryStr(query)))
        return fileURL
    } catch (error) {
        
    } finally {
        api.interceptors.request.eject(myInterceptor)
    }
}