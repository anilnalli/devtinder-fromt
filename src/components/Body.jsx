import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../slices/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slices/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const fetchUserData = async () => {

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };
  useEffect(() => {
      fetchUserData();
  }, [!user]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Body;
