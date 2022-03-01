import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// COMPONENTS
import User from "./user/User";

// DEFAULT SETTING FOR ALERT 
// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user/:id/edit" element={<User />} />
      </Routes>
    </BrowserRouter>
  </AlertProvider>,
  document.getElementById("root")
);

reportWebVitals();
