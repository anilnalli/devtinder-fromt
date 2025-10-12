import { io } from "socket.io-client";
import { BASE_URL } from "../slices/constants";

let socket; // to reuse the same socket instance

export const socketConnectionRequest = () => {
  if(location.hostname==="localhost"){
    return io(BASE_URL)
  }
  else{
    return io("/",{path:"/api/socket.io"})
  }
};
