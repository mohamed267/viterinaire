import { combineReducers   } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import request from './requestReducer';
import  auth from  "./authReducer"
import  region from  "./regionReducer"
import  wilaya from  "./wilayaReducer"
import  commune from  "./communeReducer"
import field_group from "./fieldGroupReducer"
import form_field from "./formFieldReducer"
import apiMessage from './apiMessageReducer';
import form from './formReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage,
}
  
const persistedReducer = persistReducer(persistConfig, auth)

const reducers = combineReducers({
    auth : persistedReducer,
    apiMessage,
    form,
    region,
    wilaya,
    commune,
    request,
    field_group,
    form_field,
    apiMessage
});

export default reducers;



    // account: persistReducer(
    //     {
    //         key: 'account',
    //         storage,
    //         keyPrefix: 'datta-'
    //     },
    //     auth
    // ),