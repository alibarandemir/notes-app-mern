import { createSlice} from "@reduxjs/toolkit";
import { editProfile, getProfile } from "./userActions";



const initialState= {
    userId:null,
    userName:null,
    email:null,
    avatar:null,
    loading:false,
    message:null,
}

const userSlice= createSlice({
    name:'user',
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getProfile.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getProfile.fulfilled,(state,action)=>{
            state.loading= false;
            state.userId= action.payload.userId;
            state.userName= action.payload.userName;
            state.email= action.payload.email;
            state.avatar= action.payload.avatar;
        })
        builder.addCase(getProfile.rejected,(state,action)=>{
            state.loading=false;
        })
        builder.addCase(editProfile.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(editProfile.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.loading= false;
            state.userId= action.payload.userId;
            state.userName= action.payload.userName;
            state.email= action.payload.email;
            state.avatar= action.payload.avatar;
            state.message= action.payload.message;
            console.log(state);
        })
        builder.addCase(editProfile.rejected,(state,action)=>{
            state.loading=false;
        })
    }

    
})
export default userSlice.reducer;