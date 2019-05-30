import {getApiResponse} from './index'
import {getCookie, setCookie} from '../../helpers/cookies'
export const searchAllUsers = async ({query , params})  => {
    return await getApiResponse({
        method : 'POST',
        url : 'users',
        data : {query},
        params : params
    })
}

export const findDistinctUserTypes = async () => {
    return await getApiResponse({
        method : 'GET',
        url : 'users/types',
    })
}

export const findDistinctUserDegrees = async () => {
    return await getApiResponse({
        method : 'GET',
        url : 'users/degrees',
    })
}

export const findUser = async (userId) => {
    return await getApiResponse({
        method : 'GET',
        url : `users/${userId}`
    })
}

export const selectFields = async({ userId, fields }) => {
    return await getApiResponse({
        method : 'GET',
        url : `users/${userId}/select?fields=${fields}`
    })
}

export const createUser = async ( payload ) => {
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token
    }
    return await getApiResponse({
        method : 'POST',
        url : 'users/new',
        data : { payload },
        headers
    })
}

export const updateUser = async ({ userId, payload }) => {
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token
    }
    return await getApiResponse({
        method : 'PUT',
        url : `users/${userId}`,
        data : { payload },
        headers
    })
}

export const deleteUser = async (userId) =>{
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token
    }
    return await getApiResponse({
        method : 'DELETE',
        url : `users/${userId}`,
        headers
    })
}

export const updateResearchFields = async ({ userId, fieldIds }) => {
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token
    }
    return await getApiResponse({
        method : 'POST',
        url : `users/${userId}/research`,
        data : { fields : fieldIds },
        headers
    })
}

export const bulkSave = async (formData) => {
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token,
    }
    console.log(formData)
    return await getApiResponse({
        method : 'POST',
        url : 'users/bulk',
        data : formData,
        headers 
    }) 
}