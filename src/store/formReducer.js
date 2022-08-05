// action - state management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import FormApi from "./api/form"
import { setMessage } from "./apiMessageReducer"


export const initialState = {
    error: false,
    loading: false,
    forms: [],
    mapForms  : [],
    formPages : [],
    details : {
        error: false,
        loading: false,
        filtereddata : [],
        dataExtracted : []

    },
    pages: 0,
    page : 0
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//


export const getForm = createAsyncThunk(
    "form/fetchOne",
    async (query, thunkAPI) => {
        try {
            const response = await FormApi.getForm(query)
            const form = response.data.data

            return (form)

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


export const getForms = createAsyncThunk(
    "form/fetchAll",
    async ({page , limit , ...query}, thunkAPI) => {
        try {
            if(query.region_id == null)(
                delete query.region_id
            )
            const response = await FormApi.getForms({page , limit , ...query})
            const {forms , count} = response.data.data
            console.log("our forms grtting is ", forms , page , limit , query)
            return ({ forms,page , pages: Math.floor(count / limit) + ((count % limit) > 0 ? 1 : 0) })


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

export const getMapForms = createAsyncThunk(
    "form/fetchMapForm",
    async ({page , limit , ...query}, thunkAPI) => {
        try {
            
            if(query.region_id == null)(
                delete query.region_id
            )
            const response = await FormApi.getForms({page , limit , ...query})
            console.log("res  map form ", response)

            const {forms , count} = response.data.data
            return ({ forms,page , pages: Math.floor(count / limit) + ((count % limit) > 0 ? 1 : 0) })


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

export const createForm = createAsyncThunk(
    "form/create",
    async (query, thunkAPI) => {
        try {
            const response = await FormApi.createForm(query)
            const form = response.data.data

            return (form)

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
    name: 'form',
    initialState,
    reducers : {
        setFilteredData :  (state, action) => {
            
            console.log("data extracted is ",action.payload.filtereddata)
            state.details.filtereddata = [...action.payload.filtereddata]
        },
        setDataExtracted : (state, action) => {
            state.details.dataExtracted = action.payload.dataExtracted
        },

        initForm : (state , action)=>{
            state.page = 0;
            state.forms = []
            state.pages = 1
            state.mapForms = []
            state.loading = false;
            state.error =  false
            state.formPages = []
            state.details =   {
                error: false,
                loading: false,
                filtereddata : [],
                dataExtracted : []
        
            }
        }
    },
    extraReducers: {
        /*getform  */
        [getForm.pending]: (state, action) => {
            state.details.loading = true
        },
        [getForm.fulfilled]: (state, action) => {
            state.details.form = action.payload
            state.details.loading = false
            state.details.error = false
        },
        [getForm.rejected]: (state, action) => {
            state.details.loading = false;
            state.details.error = true;
        },
        /*createform  */
        [createForm.pending]: (state, action) => {
            state.details.loading = true
        },
        [createForm.fulfilled]: (state, action) => {
            state.details.form = action.payload
            state.details.loading = false
            state.details.error = false
        },
        [createForm.rejected]: (state, action) => {
            state.details.loading = false;
            state.details.error = true;
        },
        /*get forms */
        [getForms.pending]: (state, action) => {
            state.loading = true
        },
        [getForms.fulfilled]: (state, action) => {
            state.forms = action.payload.forms
            state.loading = false
            state.pages = action.payload.pages
            if(!state.formPages.includes(action.payload.page )) {
                state.mapForms =  [...state.mapForms , ...action.payload.forms]
                state.formPages = [...state.formPages , action.payload.page ]
            }
            state.error = false
        },
        [getForms.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },

        /*get map forms */
        [getMapForms.pending]: (state, action) => {
            state.loading = true
        },
        [getMapForms.fulfilled]: (state, action) => {
            state.page = action.payload.page
            state.loading = false
            state.pages = action.payload.pages
            if(!state.formPages.includes(action.payload.page )) {
                state.mapForms =  [...state.mapForms , ...action.payload.forms]
                state.formPages = [...state.formPages , action.payload.page ]
            }
            
            state.error = false
        },
        [getMapForms.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },



    }
})

// Action creators are generated for each case reducer function

const { reducer, actions } = formSlice;

export const { setFilteredData , setDataExtracted , initForm } = actions

export default reducer




