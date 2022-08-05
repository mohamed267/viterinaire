// action - state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import TacherApi from "./api/teacher"
import { setMessage } from "./apiMessageReducer"

import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from './actions';

export const initialState = {
    dropDownElements: [],
    search: ""
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//





export const navRightSlice = createSlice({
    name: 'navRight',
    reducers: {
        setDropDown: (state, action) => {
            state.dropDownElements = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        }
    },
    initialState,
})

// Action creators are generated for each case reducer function

const { reducer, actions } = navRightSlice;

export const { setDropDown, setSearch } = actions

export default reducer




