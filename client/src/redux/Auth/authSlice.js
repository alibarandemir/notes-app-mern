import {createSlice} from '@reduxjs/toolkit'
import { registerUser,loginUser } from './authActions';

const initialState= {
    loading:false,
    userInfo:{},
    token:localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null,
    error:null
}

const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{

        logout:(state)=>{
          state.userInfo = {};
          state.loading = false;
          state.token = null;
          state.error = null;
          localStorage.removeItem('token');
        }
    },
    extraReducers:(builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.loading = true;
          })
          builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.token = action.payload.token;
            localStorage.setItem('token',state.token);
          })
          builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
          })
          builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.token = action.payload.token;
            localStorage.setItem('token',state.token);

          })
          builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
    }
})    

//export const {clearCard} = authSlice.actions; reducers da tanımladıklarını böylece dışarıya aktarabilirsin

export const {logout}= authSlice.actions;
export default authSlice.reducer;