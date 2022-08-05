import axios from "../../utils/axios"
import params from "./specparamsgenerator"
import AuthHeader from "./auth-header"



export const teacherStats = async (begin, end, diff) => {
    const data = await axios.get(
        `admin/stats/teacher`,
        {
            params: {
                intervaltime: {
                    begin, end, diff
                }
            }
        }

    )
    return (data)
    // return await axios.get('global/teacher', { email, password })
}


export const studentStats = async (begin, end, diff) => {
    const data = await axios.get(
        `admin/stats/student`,
        {
            params: {
                intervaltime: {
                    begin, end, diff
                }
            }
        }

    )
    return (data)
    // return await axios.get('global/teacher', { email, password })
}

export const studentGrouped = async (grade_id) => {
    const data = await axios.get(
        `admin/stats/student/grouped`,
        {
            params: {
                grade_id
            }
        }

    )
    return (data)
    // return await axios.get('global/teacher', { email, password })
}


export const earningsTime = async (begin, end, diff) => {
    const data = await axios.get(
        `admin/stats/earnings/time`,
        {
            params: {
                intervaltime: {
                    begin, end, diff
                }
            }
        }

    )
    return (data)
    // return await axios.get('global/teacher', { email, password })
}


export const userGrouped = async () => {
    const data = await axios.get(
        `admin/stats/teacher/grouped`

    )
    return (data)
    // return await axios.get('global/teacher', { email, password })
}


export const countTeachers = async (activated) => {
    const data = await axios.get(
        `admin/stats/teacher/count?${params({ activated })}`

    )
    return (data)
}


export const teachersMaterials = async () => {
    const data = await axios.get(
        "admin/stats/teacher/material"
    )
    return data
}


export const caisse = async () =>{
    const data = await axios.get(
        "admin/stats/caisse"
    )
    return data
}



const SessionApi = { caisse , userGrouped, teachersMaterials, teacherStats, countTeachers, studentStats, studentGrouped, earningsTime }

export default SessionApi


