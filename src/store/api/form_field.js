import axios from "../../utils/axios"
import params from "./paramsGenerator"
import AuthHeader from "./auth-header"



export const getFormField = async (query) => {
    const data = 
    await axios.get(`form_field/single`, {
        params : {
            ...params(query , "eq" , true)
        }
    })
     
    return (data)
    // return await axios.get('global/teacher', { email, password })
}

export const getFormFields = async (query) => {
    const data = 
    await axios.get(`form_field`, {
        params : {
            ...params(query , "eq" , true)
        }
    })
     
    return (data)
    // return await axios.get('global/teacher', { email, password })
}


export const getFormFieldsNav = async (query) => {
    const data = 
    await axios.get(`form_field`, {
        params : {
            ...params(query , "or" , true)
        }
    })
     
    return (data)
    // return await axios.get('global/teacher', { email, password })
}

export const createFormField = async (data) => {
    const response =  await axios.post(`form_field`,data)
    return (response)
}





const FormFieldApi = { getFormField , getFormFields ,getFormFieldsNav,  createFormField}

export default FormFieldApi


