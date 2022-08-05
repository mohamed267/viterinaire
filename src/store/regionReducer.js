// action - state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import RegionApi from "./api/region"
import { setMessage } from "./apiMessageReducer"


export const initialState = {
    error: false,
    loading: false,
    regions: [],
    details : {
        error: false,
        loading: false,
        region : {},
        dataExtracted : []

    },
    pages: 0
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//


export const getRegion = createAsyncThunk(
    "region/fetchOne",
    async (query, thunkAPI) => {
        try {
            const response = await RegionApi.getRegion(query)
            const region = response.data.data

            return (region)

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

export const createRegion = createAsyncThunk(
    "region/create",
    async (query, thunkAPI) => {
        try {
            const response = await RegionApi.createRegion(query)
            const region = response.data.data
            return (region)

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


export const getRegions = createAsyncThunk(
    "region/fetchAll",
    async (query, thunkAPI) => {
        try {
            const response = await RegionApi.getRegions(query)
            console.log("response is ", response)
            const region = response.data.data

            return (region)

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
    name: 'region',
    initialState,
    reducers : {
        setRegion : (state,  action) =>{
            state.region_id = action.payload.region_id
            state.position = {lat : action.payload.lat ,
                lng : action.payload.lng}
            
            state.radius =  action.payload.radius

        }
    },
    extraReducers: {
        /*get regions */
        [getRegions.pending]: (state, action) => {
            state.loading = true
        },
        [getRegions.fulfilled]: (state, action) => {
            state.regions = action.payload
            state.loading = false
            state.error = false
        },
        [getRegions.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        /*get region  */
        [getRegion.pending]: (state, action) => {
            state.details.loading = true
        },
        [getRegion.fulfilled]: (state, action) => {
            state.details.region = action.payload
            state.details.loading = false
            state.details.error = false
        },
        [getRegion.rejected]: (state, action) => {
            state.details.loading = false;
            state.details.error = true;
        },
        /*create region */
        [createRegion.pending]: (state, action) => {
            state.details.loading = true
        },
        [createRegion.fulfilled]: (state, action) => {
            state.details.region = action.payload
            state.details.loading = false
            state.details.error = false
        },
        [createRegion.rejected]: (state, action) => {
            state.details.loading = false;
            state.details.error = true;
        },




    }
})

// Action creators are generated for each case reducer function

const { reducer, actions } = formSlice;

export const {setRegion } = actions

export default reducer




