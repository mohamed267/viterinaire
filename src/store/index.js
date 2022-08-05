

import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore   } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from './reducers';
import AuthHeader from "./api/auth-header"




const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthHeader),
    devTools: true,
},
    composeWithDevTools()
);

// export const useSelector = useReduxSelector;


// export const useDispatch = () => useReduxDispatch();

const persister = persistStore(store);

export { store, persister };
