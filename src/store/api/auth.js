import axios from "../../utils/axios"
import AuthHeader from "./auth-header"

export const login = async (data) => {
    const response =  await axios.post('auth/login/admin', data)
    return(response)
}



const UserApi = { login }

export default UserApi


