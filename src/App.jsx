import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
function App() {
  return (
    <>
      <Provider store={appStore}>
      
        <BrowserRouter basename="/">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
            <Footer />
        </BrowserRouter>
      
      </Provider>
    </>
  );
}

export default App;
