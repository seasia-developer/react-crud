import "../Home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
const axios = require("axios");

function Container({ userData, deleteUser, userEditState }) {
  const navigate = useNavigate();

  const alert = useAlert();

  function nameCharDp(value) {
    if (value) {
      var firstWordChar = value.charAt(0);
      var lastWordChar = "";

      if (value.split(" ").length > 1) {
        lastWordChar = value.split(" ").splice(-1).toString().charAt(0);
      }

      return firstWordChar + lastWordChar;
    }
  }

  function deleteUserFunc(value) {
    if (value) {
      axios
        .delete(
          `https://gorest.co.in/public/v2/users/${value}?access-token=23c13269ecf765176e6d40a258bb6a78fb272f42b712300641f6615e3397124e`
        )
        .then(() => {
          alert.show("User Successfully Deleted!", {
            position: "top right",
            timeout: 5000,
            type: "success",
          });
          navigate("/");
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
        });
    }
  }

  function editUser(value) {
    if (value) {
      userEditState();
      navigate(`/user/${value}/edit`);
    }
  }

  return (
    <main id="content" className="flex-1 p-6 lg:px-8">
      <div className="max-w-7xl flex-1 h-full mx-auto">
        <div className="px-4 sm:px-0 flex flex-col justify-between flex-1 h-full">
          <div className="flex-1 h-full">
            <div className="row">
              <div className="w-full">
                <div className="row flex flex-wrap md:flex-nowrap -mx-2">
                  <div className="w-24 h-24 px-2 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                    <span className="text-5xl text-white uppercase">
                      {nameCharDp(userData.name)}
                    </span>
                  </div>
                  <div className="w-auto grow px-2 flex flex-wrap justify-center flex-col items-start mb-4">
                    <p className="w-48 text-4xl font-bold text-left md:pl-4 capitalize">
                      {userData.name}
                    </p>
                    <div className="mt-10">
                      <p className="text-xl font-bold text-left md:pl-4 mb-2 capitalize break-all">
                        Email: {userData.email}
                      </p>
                      <p className="text-xl font-bold text-left md:pl-4 mb-2 capitalize">
                        Gender: {userData.gender}
                      </p>
                      <p className="text-xl font-bold text-left md:pl-4 mb-2 capitalize">
                        Status: {userData.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav className="flex justify-between">
            <button
              className="w-auto flex-shrink-0 bg-green-500 hover:bg-green-800 border-teal-500 text-sm border-1 text-white py-1 px-5 rounded transition ease-in-out delay-100 hover:-translate-y-1 duration-100"
              type="button"
              onClick={() => {
                editUser(userData.id);
              }}
            >
              Edit
            </button>
            <button
              className="w-auto flex-shrink-0 bg-red-500 hover:bg-red-800 border-teal-500 text-sm border-1 text-white py-1 px-5 rounded transition ease-in-out delay-100 hover:-translate-y-1 duration-100"
              type="button"
              onClick={() => {
                deleteUserFunc(userData.id);
              }}
            >
              Delete
            </button>
          </nav>
        </div>
      </div>
    </main>
  );
}
export default Container;
