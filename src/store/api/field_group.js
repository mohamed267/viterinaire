import axios from "../../utils/axios"
import params from "./paramsGenerator"
import AuthHeader from "./auth-header"



export const getFieldGroup = async (query) => {
    const data = 
    await axios.get(`field_group/single`, {
        params : {
            ...params(query , "eq" , true)
        }
    })
     
    return (data)
    // return await axios.get('global/teacher', { email, password })
}

export const getFieldGroups = async (query) => {
    const data = 
    await axios.get(`field_group`, {
        params : {
            ...params(query , "eq" , true)
        }
    })
     
    return (data)
    // return await axios.get('global/teacher', { email, password })
}

export const createFieldGroup = async (data) => {
    const response =  await axios.post(`field_group`,data)
    return (response)
}





const FieldGroupApi = { getFieldGroup , getFieldGroups , createFieldGroup}

export default FieldGroupApi


