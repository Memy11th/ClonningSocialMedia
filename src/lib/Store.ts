import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./UserSlice";


export const Store = configureStore({
    reducer:{
        user:userSliceReducer
    }
})



