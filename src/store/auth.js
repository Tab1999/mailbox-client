import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoggedIn: false,
        userId:null,
        email: null
    },
    reducers:{
        login(state, action){
            state.isLoggedIn = true;
            state.userId=action.payload.userId
            state.email= action.payload.email
        },
        logout(state){
            state.isLoggedIn = false;
            state.userId=null;
        }
    }
})

export const authAction = authSlice.actions;
export default authSlice.reducer;