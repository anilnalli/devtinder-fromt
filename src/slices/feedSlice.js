import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addfeed:(state,action)=>{
            return action.payload
        }
    }
});
export const {addfeed,removeFedd}=feedSlice.actions;
export default feedSlice.reducer