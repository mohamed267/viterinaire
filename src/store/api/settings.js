import axios from "../../utils/axios"
import params from "./specparamsgenerator"
import AuthHeader from "./auth-header"




export const days = async () => {
    const data = await axios.get(
        `global/day`
    )
    return (data)
    // return await axios.get('global/teacher', { email, password })
}

export const getSettings = async () => {
    const data = await axios.get(
        `admin/settings`
    )
    return (data)
    // return await axios.get('global/teacher', { email, password })
}


export const updateSettings = async (data) => {
    const res = await axios.put(
        `admin/settings`,
        data
    )
    return (res)
    // return await axios.get('global/teacher', { email, password })
}

export const updateDay = async (id, working) => {
    const data = await axios.patch(
        `admin/day?id=${id}`,
        { working }
    )
    return (data)
}

/*addresses */
export const address = async (id, working) => {
    const data = await axios.get(
        `global/address/local`
    )
    return (data)
}
export const updateAddress = async (data) => {
   
    const res = await axios.put(
        `admin/settings/address`,
        data
    )
    return (res)
}




const SettingsApi = { days, updateDay, getSettings, updateSettings, address, updateAddress }

export default SettingsApi


