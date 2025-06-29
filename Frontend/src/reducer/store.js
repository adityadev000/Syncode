import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./index"

const store  =configureStore({
    reducer : rootReducer , 
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware({
            thunk : true , 
            serializableCheck : false ,
        })
})

export default store ; 