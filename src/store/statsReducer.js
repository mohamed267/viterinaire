// action - state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import StatsApi from "./api/stats"
import GradeApi from "./api/material"
import { setMessage } from "./apiMessageReducer"

import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from './actions';

export const initialState = {
    error: false,
    loading: false,
    userGrouped : {},
    grades: [],
    statsTeacher: [],
    caisse: {}
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//


export const getTeachersStats = createAsyncThunk(
    "stats/teachers",
    async ({ begin, end, diff }, thunkAPI) => {
        try {
            const res = await StatsApi.teacherStats(begin, end, diff)
            return ({ stats: res.data.data })

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }

    }
)

/*students stats */
export const getStudentsStats = createAsyncThunk(
    "stats/students",
    async ({ begin, end, diff }, thunkAPI) => {
        try {
            const res = await StatsApi.studentStats(begin, end, diff)

            return ({ stats: res.data.data })

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }

    }
)

/*exports */

export const countTeachers = createAsyncThunk(
    "stats/teacher/count",
    async ({ activated, store }, thunkAPI) => {
        try {
            const res = await StatsApi.countTeachers(activated)
            return ({ id: store, value: res.data.data })

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }

    }
)


/*studentGrouped -*/
export const studentGrouped = createAsyncThunk(
    "stats/students/grouped",
    async ({ grade_id }, thunkAPI) => {
        try {
            const res = await StatsApi.studentGrouped(grade_id)

            return ({ stats: res.data.data })

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }

    }
)
/*earnings time */

export const getEarningsTime = createAsyncThunk(
    "stats/earnings/time",
    async ({ begin, end, diff }, thunkAPI) => {
        try {
            const res = await StatsApi.earningsTime(begin, end, diff)

            return ({ earningsTime: res.data.data })

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }

    }
)

/* userGrouped */



export const getUserGouped = createAsyncThunk(
    "stats/teacher/grouped",
    async (thunkAPI) => {
        try {
            const res = await StatsApi.userGrouped()
            console.log("our res gere is " , res.data.data)
            return ({ userGrouped: res.data.data })

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }

    }
)

/*get Grades */


export const getGrades = createAsyncThunk(
    "stats/grades",
    async (thunkAPI) => {
        try {
            const res = await GradeApi.grades()
            return ({ grades: res.data.data.grades })

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }

    }
)

/*techersMaterials */

export const getTeachersMaterials = createAsyncThunk(
    "stats/teacher/materials",
    async (thunkAPI) => {
        try {
            const res = await StatsApi.teachersMaterials()
            return ({ teachersMaterials: res.data.data })

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }

    }
)

export const getCaisse = createAsyncThunk(
    "stats/caisse",
    async (thunkAPI) => {
        try {
            const res = await StatsApi.caisse()
            return ({ caisse: res.data.data })

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }

    }
)





export const sessionSlice = createSlice({
    name: 'stats',
    initialState,
    extraReducers: {
        /*teacher stats  */
        [getTeachersStats.pending]: (state, action) => {
            state.loading = true
        },
        [getTeachersStats.fulfilled]: (state, action) => {
            state.statsTeacher = action.payload.stats
            state.loading = false
            state.error = false
        },
        [getTeachersStats.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        /*student stats  */
        [getStudentsStats.pending]: (state, action) => {
            state.loading = true
        },
        [getStudentsStats.fulfilled]: (state, action) => {
            state.statsStudent = action.payload.stats
            state.loading = false
            state.error = false
        },
        [getStudentsStats.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        /*studentGrouped */

        [studentGrouped.pending]: (state, action) => {
            state.loading = true
        },
        [studentGrouped.fulfilled]: (state, action) => {
            state.studentsGrouped = action.payload.stats
            state.loading = false
            state.error = false
        },
        [studentGrouped.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },


        /*earningsTime */
        [getEarningsTime.pending]: (state, action) => {
            state.loading = true
        },
        [getEarningsTime.fulfilled]: (state, action) => {
            state.earningsTime = action.payload.earningsTime
            state.loading = false
            state.error = false
        },
        [getEarningsTime.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        /* userGrouped */
        [getUserGouped.pending]: (state, action) => {
            state.loading = true
        },
        [getUserGouped.fulfilled]: (state, action) => {
            state.userGrouped = action.payload.userGrouped
            state.loading = false
            state.error = false
        },
        [getUserGouped.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        /*get grades */

        [getGrades.pending]: (state, action) => {
            state.loading = true
        },
        [getGrades.fulfilled]: (state, action) => {
            state.grades = action.payload.grades
            state.loading = false
            state.error = false
        },
        [getGrades.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        /*countTeachers*/

        [countTeachers.pending]: (state, action) => {
            state.loading = true
        },
        [countTeachers.fulfilled]: (state, action) => {
            state[action.payload.id] = action.payload.value
            state.loading = false
            state.error = false
        },
        [countTeachers.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        /*teachers materials */

        [getTeachersMaterials.pending]: (state, action) => {
            state.loading = true
        },
        [getTeachersMaterials.fulfilled]: (state, action) => {
            state.teachersMaterials = action.payload.teachersMaterials
            state.loading = false
            state.error = false
        },
        [getTeachersMaterials.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        /*casse */

        [getCaisse.pending]: (state, action) => {
            state.loading = true
        },
        [getCaisse.fulfilled]: (state, action) => {
            state.caisse = action.payload.caisse
            state.loading = false
            state.error = false
        },
        [getCaisse.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
    }
})

// Action creators are generated for each case reducer function

const { reducer, actions } = sessionSlice;

// export const { getTeachers } = actions

export default reducer




