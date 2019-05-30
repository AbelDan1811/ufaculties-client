import axios from 'axios'

const serverUrl = process.env.BACKEND_URL || 'http://localhost:3000/'

export const getApiResponse = async ({ url, method, data, params, headers}) => {
    try {
        const response = await axios({
            url: `${serverUrl}${url}`,
            method,
            data,
            params,
            headers
        })

        return response['data']
        
    } catch (e) {
        return {
            success: false,
            message: e.message || e
        }
    }


}