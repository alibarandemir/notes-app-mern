import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const backendUrl = 'http://localhost:5000';


export const getNotes= createAsyncThunk('getNote',async (token)=>{
    console.log(token)

        try{
            const res=  await fetch(`${backendUrl}/`, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json",
                  "Auth": `${token}`,
                  
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer",
              });
            const data = await res.json();
            console.log(data);
            return data;
        }
        catch(error){

        }
})

export const createNote=createAsyncThunk('createNote',async(noteData)=>{
    console.log('aa')
    try{
        console.log(noteData)
        
        const res= await fetch(`${backendUrl}/`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              "Auth": `${noteData.token}`,
              
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
            body: JSON.stringify(noteData),
          });
        const data= res.json();
        return data;
    }
    catch(error){
        
    }
})

export const updateNote= createAsyncThunk('updateNote',async(noteData)=>{
  
  try{
      console.log(noteData)
      console.log(noteData.id)
      
      const res= await fetch(`${backendUrl}/${noteData.id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Auth": `${noteData.token}`,
            
          },
          redirect: "follow", 
          referrerPolicy: "no-referrer",
          body: JSON.stringify(noteData),
        });
      const data= await res.json();
      console.log(data);
      return data;
  }
  catch(error){
      
  }
})

export const deleteNote= createAsyncThunk('deleteNote',async(noteData)=>{
  
  try{
      
      console.log(noteData)
      const res= await fetch(`${backendUrl}/${noteData.noteId}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Auth": `${noteData.token}`,
            
          },
          redirect: "follow", 
          referrerPolicy: "no-referrer",
          body: JSON.stringify(noteData),
        });
      const data= await res.json();
      console.log(data);
      return data;
  }
  catch(error){
      
  }
})

