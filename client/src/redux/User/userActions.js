import { createAsyncThunk } from "@reduxjs/toolkit"

const backendUrl = 'http://localhost:5000';

export const getProfile=createAsyncThunk('getProfile',async(userData)=>{
    try{
        console.log(userData)
        
        const res=  await fetch(`${backendUrl}/profile/${userData.userId}`, {
            method: "GET", 
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json",
              "Auth": `${userData.token}`,
              
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
          });
        const data = await res.json();
        
        return data;
    }
    catch(error){

    }


})



export const editProfile=createAsyncThunk('editProfile', async(userData)=>{
    try{
      console.log(userData)
      
      const res=  await fetch(`${backendUrl}/profile/${userData.userId}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Auth": `${userData.token}`,
          
        },
        body: JSON.stringify(userData),
        redirect: "follow", 
        referrerPolicy: "no-referrer",
      });
    const data = await res.json();
    
    console.log(data);
    console.log("editdeyiz")
    return data;
    }
    catch(e){
      console.error(e.message)
    }
})



