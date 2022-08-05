// action - state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import FieldGroupApi from "./api/field_group"
import { setMessage } from "./apiMessageReducer"


export const initialState = {
    error: false,
    loading: false,
    field_groups: [],
    details : {
        error: false,
        loading: false,
        field_group : {},
        dataExtracted : []

    },
    pages: 0
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//


export const getFieldGroup = createAsyncThunk(
    "field_group/fetchOne",
    async (query, thunkAPI) => {
        try {
            const response = await FieldGroupApi.getFieldGroup(query)
            const field_group = response.data.data

            return (field_group)

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

export const createFieldGroup = createAsyncThunk(
    "field_group/create",
    async (query, thunkAPI) => {
        try {
            const response = await FieldGroupApi.createFieldGroup(query)
            const field_group = response.data.data
            return (field_group)

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


export const getFieldGroups = createAsyncThunk(
    "field_group/fetchAll",
    async (query, thunkAPI) => {
        try {
            const response = await FieldGroupApi.getFieldGroups(query)
            console.log("response is ", response)
            const field_group = response.data.data

            return (field_group)

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
    name: 'field_group',
    initialState,
    extraReducers: {
        /*get field_groups */
        [getFieldGroups.pending]: (state, action) => {
            state.loading = true
        },
        [getFieldGroups.fulfilled]: (state, action) => {
            state.field_groups = action.payload
            state.loading = false
            state.error = false
        },
        [getFieldGroups.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        /*get field_group  */
        [getFieldGroup.pending]: (state, action) => {
            state.details.loading = true
        },
        [getFieldGroup.fulfilled]: (state, action) => {
            state.details.field_group = action.payload
            state.details.loading = false
            state.details.error = false
        },
        [getFieldGroup.rejected]: (state, action) => {
            state.details.loading = false;
            state.details.error = true;
        },
        /*create field_group */
        [createFieldGroup.pending]: (state, action) => {
            state.details.loading = true
        },
        [createFieldGroup.fulfilled]: (state, action) => {
            state.details.field_group = action.payload
            state.details.loading = false
            state.details.error = false
        },
        [createFieldGroup.rejected]: (state, action) => {
            state.details.loading = false;
            state.details.error = true;
        },
    }
})

// Action creators are generated for each case reducer function

const { reducer, actions } = formSlice;

// export const { } = actions

export default reducer




