import { createSlice } from "@reduxjs/toolkit";

const allConnectionsSlice = createSlice({
  name: "allConnetions",
  initialState: { allConnection: [], selectedConnection: {} },
  reducers: {
    getAllConnections: (state, action) => {
      return (state = {
        ...state,
        allConnection: action.payload,
      });
    },
    setSelectedConnection: (state, action) => {
      return (state = {
        ...state,
        selectedConnection: action.payload,
      });
    },
    removeConeections: () => {
      return null;
    },
  },
});
export const { removeConeections, getAllConnections,setSelectedConnection } =
  allConnectionsSlice.actions;
export default allConnectionsSlice.reducer;
