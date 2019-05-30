import {getApiResponse} from './index'
import {getCookie, setCookie} from '../../helpers/cookies'

export const findAllDepartments = async () => {
    
    return await getApiResponse({
        method : 'GET',
        url : 'departments'
    })
}

export const createDepartment = async ({ payload }) => {
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token
    }
    return await getApiResponse({
        method : 'POST',
        url : 'departments',
        data : { payload },
        headers
    })
}

export const findUsersByDepartment = async (departmentId) => {
    return await getApiResponse({
        method : 'GET',
        url : `departments/${departmentId}/officers`
    })
}

export const findDepartment = async (departmentId) => {
    return await getApiResponse({
        method : 'GET',
        url : `departments/${departmentId}`
    })
}

export const updateDepartment = async ({ departmentId , payload }) => {
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token
    }
    return await getApiResponse({
        method : 'PUT',
        url : `departments/${departmentId}`,
        data : { payload },
        headers
    })
}

export const deleteDepartment = async (departmentId) =>{
    const token = getCookie('token')
    const headers = {
        'Authorization' : 'Bearer '+token
    }
    return await getApiResponse({
        method : 'DELETE',
        url : `departments/${departmentId}`,
        headers
    })
}