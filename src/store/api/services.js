import axios from "../../utils/axios"
import params from "./paramsGenerator"
import AuthHeader from "./auth-header"



export const getServices = async ({page , limit , super_service_id}) => {
   const data = await axios.get('service' , {
        params : {
            ...params({super_service_id  : null} , "eq" , true)
        }
   })
    return (data)
}
export const getService = async ({service_id}) => {
    const data = await axios.get('service/single',
    {
        params : {
            ...params({service_id} , "eq" , true)
        }
    })
     return (data)
 }





const ServiceApi = {
    getServices , getService
}

export default ServiceApi


