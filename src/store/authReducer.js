// action - state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AuthApi from "./api/auth"
import { setMessage } from "./apiMessageReducer"

import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from './actions';

export const initialState = {
    token: '',
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//


export const login = createAsyncThunk(
    "admin/login",
    async (data, thunkAPI) => {
        try {
            const admin = await AuthApi.login(data)
            return ({ data: admin.data.data })

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


export const userSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = ''
            state.user = null
        },
    },
    extraReducers: {
        /*getProduits  */
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            const admin = action.payload.data
            state.isLoggedIn = true
            state.isInitialized = true
            state.token = admin.token
            state.admin = admin
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.loggedIn = false;
        }

    }
})

// Action creators are generated for each case reducer function

const { reducer, actions } = userSlice;

export const { logout } = actions

export default reducer







// const accountReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ACCOUNT_INITIALIZE: {
//             const { isLoggedIn, user, token } = action.payload;
//             return {
//                 ...state,
//                 isLoggedIn,
//                 isInitialized: true,
//                 token,
//                 user
//             };
//         }
//         case LOGIN: {
//             const { user } = action.payload;
//             return {
//                 ...state,
//                 isLoggedIn: true,
//                 user
//             };
//         }
//         case LOGOUT: {
//             return {
//                 ...state,
//                 isLoggedIn: false,
//                 token: '',
//                 user: null
//             };
//         }
//         default: {
//             return { ...state };
//         }
//     }
// };

// export default accountReducer;
