// import { useSelector } from "../index"
import axios from "../../utils/axios"
const AuthHeader = store => next => action => {
    let {auth} = store.getState()
    axios.defaults.headers.common['authorization'] = `Bearer ${auth.token ?  auth.token : ""}`;
   return (next(action))
}


export default AuthHeader