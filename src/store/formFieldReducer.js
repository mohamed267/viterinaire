// action - state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import FormFieldApi from "./api/form_field"
import { setMessage } from "./apiMessageReducer"


export const initialState = {
    error: false,
    loading: false,
    form_fields: [],
    nav : {
        name :"",
        options :[]
    },
    details : {
        error: false,
        loading: false,
        form_field : {},
        dataExtracted : []

    },
    pages: 0
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//


export const getFormField = createAsyncThunk(
    "form_field/fetchOne",
    async (query, thunkAPI) => {
        try {
            const response = await FormFieldApi.getFormField(query)
            const form_field = response.data.data

            return (form_field)

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


export const createFormField = createAsyncThunk(
    "form_field/create",
    async (query, thunkAPI) => {
        try {
            const response = await FormFieldApi.createFormField(query)
            const form_field = response.data.data
            return (form_field)

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

export const getFormFieldsNav = createAsyncThunk(
    "form_field/fetchNav",
    async (query, thunkAPI) => {
        try {
            const response = await FormFieldApi.getFormFieldsNav({
                form_field_type : ["COMPLEXSELECT" , "SELECT"]
            })
            const form_field = response.data.data

            return (form_field)

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


export const getFormFields = createAsyncThunk(
    "form_field/fetchAll",
    async (query, thunkAPI) => {
        try {
            const response = await FormFieldApi.getFormFields(query)
            console.log("response is ", response)
            const form_field = response.data.data

            return (form_field)

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
    name: 'form_field',
    reducers : {
        setNav : (state , action) =>{
            state.nav = action.payload;
        }
    },
    initialState,
    extraReducers: {
        /*get form_fields */
        [getFormFields.pending]: (state, action) => {
            state.loading = true
        },
        [getFormFields.fulfilled]: (state, action) => {
            state.form_fields = action.payload
            state.loading = false
            state.error = false
        },
        [getFormFields.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        /*get form_field  */
        [getFormField.pending]: (state, action) => {
            state.details.loading = true
        },
        [getFormField.fulfilled]: (state, action) => {
            state.details.form_field = action.payload
            state.details.loading = false
            state.details.error = false
        },
        [getFormField.rejected]: (state, action) => {
            state.details.loading = false;
            state.details.error = true;
        },
        /*create form_field */
        [createFormField.pending]: (state, action) => {
            state.details.loading = true
        },
        [createFormField.fulfilled]: (state, action) => {
            state.details.form_field = action.payload
            state.details.loading = false
            state.details.error = false
        },
        [createFormField.rejected]: (state, action) => {
            state.details.loading = false;
            state.details.error = true;
        },
        /*form field nav */
        [getFormFieldsNav.pending]: (state, action) => {
            state.loading = true
        },
        [getFormFieldsNav.fulfilled]: (state, action) => {
            state.form_fields_nav = action.payload
            state.loading = false
            state.error = false
        },
        [getFormFieldsNav.rejected]: (state, action) => {
            state.details.loading = false;
            state.details.error = true;
        },
    }
})

// Action creators are generated for each case reducer function

const { reducer, actions } = formSlice;

export const { setNav } = actions

export default reducer




