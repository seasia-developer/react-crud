import "./Home.css";
import React, { useState } from "react";
// PARTIALS
import Header from "./partials/Header";
import Sidebar from "./partials/Sidebar";
import Modal from "./partials/Modal";

function App() {
  const [modalState, setIsActiveModalState] = useState(false);

  const isActiveModalState = () => {
    setIsActiveModalState(true);
  };

  const modalStateFalse = () => {
    setIsActiveModalState(false);
  };

  const isAddUser = () => {
    setIsActiveModalState(true);
  }

  return (
    <div className="App">
      <div className="relative min-h-screen md:flex" data-dev-hint="container">
        {/* TOP HEADER  */}
        <input type="checkbox" id="menu-open" className="hidden" />
        <Header />
        {/* ASIDE BAR  */}
        <Sidebar isActiveModalState={isActiveModalState} isAddUser={isAddUser} />
        {/* CONTENT CONTAINER */}
        <div className="w-auto content-container h-full flex-1 flex justify-center items-center m-auto">
          <h1 className="text-gray-800 text-8xl font-bold">CRUD</h1>
        </div>
      </div>
      {/* MODAL BOX */}
      <Modal modalState={modalState} modalStateFalse={modalStateFalse} />
    </div>
  );
}

export default App;
