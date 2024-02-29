import { configureStore } from "@reduxjs/toolkit/react";
import userReducer from "./userSlice";

const store = configureStore({
    reducer:{
        user:userReducer
    }
})

export default store;