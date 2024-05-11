import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/authSlice";
import noteSlice from "./Note/noteSlice";


 export const store= configureStore({
    reducer:{
        auth:authSlice,
        note:noteSlice,
    },
})
