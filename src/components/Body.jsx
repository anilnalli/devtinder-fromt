import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";


const Body = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Body;
