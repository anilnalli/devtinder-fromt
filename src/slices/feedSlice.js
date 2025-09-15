import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addfeed:(state,action)=>{
            return action.payload
        },
        removeFedd:()=>{
            return null;
        }
    }
});
export const {addfeed,removeFedd}=feedSlice.actions;
export default feedSlice.reducer