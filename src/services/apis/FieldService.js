import {getApiResponse} from './index'
import {getCookie, setCookie} from '../../helpers/cookies'

export const findRootNodes = async () => {
    return await getApiResponse({
        method : 'GET',
        url : 'fields/roots'
    })
}

export const findChildrenNodes = async (parentId) => {
    return await getApiResponse({
        method : 'GET',
        url : `fields/${parentId}/children`
    })
}

export const findAllFields = async () => {
    return await getApiResponse({
        method : 'GET',
        url : 'fields'
    })
}

export const findUsersByField = async (fieldId) => {
    return await getApiResponse({
        method : 'GET',
        url : `fields/${fieldId}/officers`
    })
}

export const findFieldDetail = async (fieldId) => {
    return await getApiResponse({
        method : 'GET',
        url : `fields/${fieldId}`
    })
}


export const updateField = async ({ fieldId , payload}) => {
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token
    }

    return await getApiResponse({
        method : 'PUT',
        url : `fields/${fieldId}`,
        data : { payload },
        headers
    })
}

export const deleteField = async (fieldId) => {
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token
    }

    return await getApiResponse({
        method : 'DELETE',
        url : `fields/${fieldId}`,
        headers
    })
}

export const createField = async({ payload }) => {
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token
    }

    return await getApiResponse({
        method : 'POST',
        url : 'fields',
        data : { payload },
        headers
    })
}