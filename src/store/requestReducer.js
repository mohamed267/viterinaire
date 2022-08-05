// action - state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const initialState = {
    codeRequest :  "",
    
};




export const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers : {
        initResponse: (state, action) => {
            return ({
                codeRequest : action.payload.codeRequest
            })
        }
    },
    
})

// Action creators are generated for each case reducer function

const { reducer, actions } = requestSlice;

// export const { getTeachers } = actions

export const { initResponse } = actions

export default reducer




