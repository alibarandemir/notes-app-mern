import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/authSlice";
import noteSlice from "./Note/noteSlice";
import userSlice from "./User/userSlice";


 export const store= configureStore({
    reducer:{
        auth:authSlice,
        note:noteSlice,
        user:userSlice,
    },
})
