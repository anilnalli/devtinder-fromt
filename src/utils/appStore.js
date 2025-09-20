import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import feedReducer from '../slices/feedSlice'
import connectionReducer from "../slices/connectionsSlice"
import allConnectionReducer from "../slices/allConnections"
const appStore =configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
       connections: connectionReducer,
       allConnections:allConnectionReducer
    }

})

export default appStore