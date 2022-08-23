import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from './Reducer';
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage' 
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key : 'root',
    storage,
    whitelist: ['Counter']
}

const persistedReducer = persistReducer(persistConfig , rootReducer)

export const configureStore = () => {

    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store)

    return {store,persistor};
}