import axios from "../../utils/axios"
import params from "./paramsGenerator"



export const getWilayas = async (query) => {
    const data = 
    await axios.get(`address/wilaya`, {
        params : {
            ...params(query , "eq" , true)
        }
    })
     
    return (data)
    // return await axios.get('global/teacher', { email, password })
}





const WilayaApi = { getWilayas}

export default WilayaApi


