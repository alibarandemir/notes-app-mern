import { createSlice } from "@reduxjs/toolkit";
import { createNote, deleteNote, getNotes, updateNote } from "./noteActions";

const initialState= {
    loading:false,
    userId:null,
    notes:[],
    error:null,
    success:null,
    message:null,
}

const noteSlice= createSlice({
    name:'note',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getNotes.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(getNotes.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.notes= action.payload.notes;
            state.userId= action.payload.userId
            state.loading=false;
        })
        builder.addCase(getNotes.rejected,(state,action)=>{
            state.error= action.payload;
            state.loading=false;
        })
        builder.addCase(createNote.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(createNote.fulfilled,(state,action)=>{
            state.loading=false;
            
        })
        builder.addCase(createNote.rejected,(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        })
        builder.addCase(updateNote.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(updateNote.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload.success;
            state.message= action.payload.message;
        })
        builder.addCase(updateNote.rejected,(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        })
        builder.addCase(deleteNote.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(deleteNote.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload.success;
            state.message= action.payload.message
            
        })
        builder.addCase(deleteNote.rejected,(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        })
    }
})

export default noteSlice.reducer;