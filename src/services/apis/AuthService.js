import  { getApiResponse } from './index'

export const signIn = async ({ username, password }) => {
    return await getApiResponse({
        method : 'POST',
        url : 'signin',
        data : { username, password }
    })
}