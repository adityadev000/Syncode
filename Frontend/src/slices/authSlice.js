import { createSlice } from "@reduxjs/toolkit";

let storedToken = null ; 

try{
    const rawToken = localStorage.getItem("token") 
    if(rawToken || rawToken !== undefined){
        storedToken = JSON.parse(rawToken) ; 
    }
}
catch (err) {
    console.error("Failed to parse user from localStorage:", err);
}
const initialState = {
    token : storedToken , 
}

const AuthSlice = createSlice({
    name : "auth" , 
    initialState : initialState , 
    reducers : {
        setToken(state , action ){
            state.token = action.payload; 
            if(action.payload == null ){
                localStorage.removeItem("token") ; 
            }else{
                localStorage.setItem("token" , JSON.stringify(action.payload)) ;
            }
        }
    }
})

export const {setToken} = AuthSlice.actions; 
export default AuthSlice.reducer ;  