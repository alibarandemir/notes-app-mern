import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const backendUrl = 'http://localhost:5000';

export const registerUser = createAsyncThunk('register', async(userData,{rejectWithValue})=>{
    
    try{
          console.log(userData);
         
          
          const response = await fetch(`${backendUrl}/register`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
           
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", 
            body: userData, 
          });
          const data= await response.json();
          console.log(data);
          return data; // parses JSON response into native JavaScript objects
        }
    

    catch(error){
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
          } else {
            return rejectWithValue(error.message)
          }
    }
})

export const loginUser= createAsyncThunk('login', async(userData)=>{

    try{
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(userData), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
    catch(error){

    }
})
