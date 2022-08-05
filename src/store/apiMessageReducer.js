import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            if(action.payload.type){
                return action.payload
            }else{
                return { 
                    message: action.payload,
                    type : "error"
                };
            } 
        },
        clearMessage: () => {
            return { message: "" };
        },
    },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions
export default reducer