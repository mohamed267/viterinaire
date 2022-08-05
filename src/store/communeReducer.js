// action - state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CommuneApi from "./api/commune"
import { setMessage } from "./apiMessageReducer"


export const initialState = {
    error: false,
    loading: false,
    communes: [],
    details : {
        error: false,
        loading: false,
        commune : {},

    },
    pages: 0
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//


export const getCommune = createAsyncThunk(
    "commune/fetchOne",
    async (query, thunkAPI) => {
        try {
            const response = await CommuneApi.getCommune(query)
            const commune = response.data.data

            return (commune)

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

export const getCommunes = createAsyncThunk(
    "commune/fetchAll",
    async (query, thunkAPI) => {
        try {
            const response = await CommuneApi.getCommunes(query)
            const commune = response.data.data

            return (commune)

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

export const formSlice = createSlice({
    name: 'commune',
    initialState,
    extraReducers: {
        /*get communes */
        [getCommunes.pending]: (state, action) => {
            state.loading = true
        },
        [getCommunes.fulfilled]: (state, action) => {
            state.communes = action.payload
            state.loading = false
            state.error = false
        },
        [getCommunes.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        /*get commune  */
        [getCommune.pending]: (state, action) => {
            state.details.loading = true
        },
        [getCommune.fulfilled]: (state, action) => {
            state.details.commune = action.payload
            state.details.loading = false
            state.details.error = false
        },
        [getCommune.rejected]: (state, action) => {
            state.details.loading = false;
            state.details.error = true;
        },



    }
})

// Action creators are generated for each case reducer function

const { reducer, actions } = formSlice;

// export const { } = actions

export default reducer




