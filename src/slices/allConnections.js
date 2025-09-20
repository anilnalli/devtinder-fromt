import { createSlice } from "@reduxjs/toolkit";

const allConnectionsSlice=createSlice({
    name:'allConnetions',
    initialState:null,
    reducers:{
        getAllConnections:(state,action)=>{
            return action.payload
        },
        removeConeections:()=>{
            return null;
        }
    }
});
export const {removeConeections,getAllConnections}=allConnectionsSlice.actions;
export default allConnectionsSlice.reducer