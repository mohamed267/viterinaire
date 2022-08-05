import axios from "../../utils/axios"
import params from "./paramsGenerator"



export const getCommunes = async (query) => {
    const data = 
    await axios.get(`address/commune`, {
        params : {
            ...params(query , "eq" , true)
        }
    })
     
    return (data)
    // return await axios.get('global/teacher', { email, password })
}





const CommuneApi = { getCommunes}

export default CommuneApi


