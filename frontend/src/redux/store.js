import {legacy_createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {reducer as userReducer} from './userReducer/reducer'
import {reducer as authReducer} from './authreducer/reducer'

const rootreducer=combineReducers({
    userReducer,
    authReducer

})

export const store=legacy_createStore(rootreducer,applyMiddleware(thunk))