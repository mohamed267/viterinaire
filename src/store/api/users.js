import axios from "../../utils/axios"
import params from "./paramsGenerator"
import AuthHeader from "./auth-header"



export const getUsers = async () => {
   const data = await axios.get('user')
    return (data)
}


export const getUser = async () => {
   const data = await axios.get('user/single')
    return (data)
}





const UserApi = {
   getUsers , getUser
}

export default UserApi


