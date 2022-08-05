import axios from "../../utils/axios"
import params from "./specparamsgenerator"
import AuthHeader from "./auth-header"



export const sessions = async (page, limit, course_id) => {
    const data = await axios.get(`global/session?page=${page}&limit=${limit}&${params({ course_id })}`)

    return (data)
    // return await axios.get('global/teacher', { email, password })
}


export const countMeetings = async (query) => {
    const data = await axios.get(`admin/meeting?${query}`)
    return data
}
export const countSessions = async (query, is_private) => {
    // alert(`admin/session?${query}&${params({ is_private })}`)
    const data = await axios.get(`admin/session?${query}&${params({ is_private })}`)
    return data
}


export const session = async (id) => {
    const data = await axios.get(`admin/session/selected?id=${id}`)

    return data
}





const SessionApi = { sessions, session, countSessions, countMeetings }

export default SessionApi


