import { createSlice } from "@reduxjs/toolkit" ;

let storedUser = null ; 

try{
    const rawUser = localStorage.getItem("user") 
    if(rawUser || rawUser !== undefined){
        storedUser = JSON.parse(rawUser) ; 
    }
}
catch (err) {
    console.error("Failed to parse user from localStorage:", err);
}

const initialState = {
    user : storedUser , 
    userLoading : false , 
    signupData : null , 
};

const UserSlice = createSlice({
    name : 'user',
    initialState : initialState , 
    reducers: {
        setUser (state , action ) {
            state.user = action.payload 
            if(action.payload == null ){
                localStorage.removeItem("user") ;
            }
            else{
                localStorage.setItem("user" , JSON.stringify(action.payload)) ; 
            }
        },
        setSignupData(state , action){
            state.signupData = action.payload
        },
        setUserLoading (state , action){
            state.userLoading = action.payload ; 
        }
    }
})

export const {setUser , setUserLoading , setSignupData} = UserSlice.actions ; 
export default UserSlice.reducer ;
