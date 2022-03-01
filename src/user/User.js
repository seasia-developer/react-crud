import "../Home.css";
import React, { useState, useEffect } from "react";
// PARTIALS
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useParams, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
// COMPONENTS
import Container from "../components/Container";
import Modal from "../partials/Modal";
// AXIOS
const axios = require("axios");

function User() {

  const [user, setUserData] = useState({});

  const [modalState, setIsActiveModalState] = useState(false);

  const [editUserState, isEditUserState] = useState(false);

  let { id } = useParams();

  const location = useLocation();

  const alert = useAlert();

  const navigate = useNavigate();

  const isActiveModalState = () => {
    setIsActiveModalState(true);
  };

  const modalStateFalse = () => {
    setIsActiveModalState(false);
  };

  const userEditState = () => {
    isEditUserState(false)
    setIsActiveModalState(true);
  }

  const isAddUser = () => {
    isEditUserState(true)
    setIsActiveModalState(true);
  }

  // WATCH ROUTER
  useEffect(() => {
    // GET USER
    function getUser() {
      axios
        .get(
          `https://gorest.co.in/public/v2/users/${id}?access-token=23c13269ecf765176e6d40a258bb6a78fb272f42b712300641f6615e3397124e`
        )
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          alert.show("Something went wrong!", {
            position: "top right",
            timeout: 5000,
            type: "error",
          });
          alert.show(error.message, {
            position: "top right",
            timeout: 5000,
            type: "error",
          });
          navigate("/");
        });
    }
    // GET USER
    getUser();
  }, [location]);

  return (
    <div className="App">
      <div className="relative min-h-screen md:flex" data-dev-hint="container">
        {/* TOP HEADER  */}
        <input type="checkbox" id="menu-open" className="hidden" />
        <Header />
        {/* ASIDE BAR  */}
        <Sidebar isActiveModalState={isActiveModalState} isAddUser={isAddUser} />
        {/* CONTENT CONTAINER */}
        <Container userData={user} userEditState={userEditState} />
        {/* MODAL BOX */}
        <Modal userData={user} modalState={modalState} modalStateFalse={modalStateFalse} isEditUser={editUserState} />
      </div>
    </div>
  );
}

export default User;
