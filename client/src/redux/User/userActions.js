const { createAsyncThunk } = require("@reduxjs/toolkit")

const backendUrl = 'http://localhost:5000';

const getProfile=createAsyncThunk('getProfile',async(userId,token)=>{
    try{
        const res=  await fetch(`${backendUrl}/${userId}`, {
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



const editProfile=createAsyncThunk('editProfile', async()=>{

})



module.exports={getProfile,editProfile}