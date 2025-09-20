import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice=createSlice({
    name:'connetions',
    initialState:null,
    reducers:{
        getConnections:(state,action)=>{
            return action.payload
        },
        removeConeections:()=>{
            return null;
        }
    }
});
export const {removeConeections,getConnections}=connectionsSlice.actions;
export default connectionsSlice.reducer