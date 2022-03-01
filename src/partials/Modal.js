import "../Home.css";
import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
const axios = require("axios");

function Modal({ modalState, modalStateFalse, userData, isEditUser }) {

  const navigate = useNavigate();

  const alert = useAlert();

  const location = useLocation();

  let { id } = useParams();

  // IF REQUEST TO UPDATE 
  if (isEditUser) {
    userData = null;
  }

  const initialFormData = Object.freeze({
    name: userData ? userData.name : '',
    email: userData ? userData.email : '',
    gender: userData ? userData.gender : 'male',
    status: userData ? userData.status : 'inactive',
  });

  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  function createUser() {
    axios
      .post(
        "https://gorest.co.in/public/v2/users?access-token=23c13269ecf765176e6d40a258bb6a78fb272f42b712300641f6615e3397124e",
        {
          ...formData,
        }
      )
      .then((response) => {
        modalStateFalse();
        alert.show("User Successfully Created!", {
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

  function updateUser() {
    axios
      .put(
        `https://gorest.co.in/public/v2/users/${id}?access-token=23c13269ecf765176e6d40a258bb6a78fb272f42b712300641f6615e3397124e`,
        {
          ...formData,
        }
      )
      .then((response) => {
        modalStateFalse();
        alert.show("User Successfully Updated!", {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.name) {
      updateUser();
    }
    if (!userData.name) {
      createUser();
    }
  };

  // WATCH ROUTER
  useEffect(() => {
  }, [location]);

  return (
    <div className="w-auto ">
      {modalState ? (
        <div className="w-full h-full inset-0 fixed bg-gray-900/90 overflow-hidden flex justify-center items-center ">
          <div
            className="max-w-sm md:max-w-xl m-auto modal fade fixed inset-0 w-full outline-none overflow-x-hidden overflow-y-auto flex justify-center items-center"
            tabIndex="-1"
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-full pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5 className="text-xl font-medium leading-normal text-gray-800">
                    {userData ? (userData.name ? 'Update' : 'Add') : 'Add'}  User
                  </h5>
                </div>
                <div className="modal-body relative">
                  <div className="w-full">
                    <form
                      className="bg-white rounded px-8 pt-6 pb-4 mb-4"
                      id="addUserForm"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-left"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Name"
                          onChange={handleChange}
                          required
                          defaultValue={userData ? (userData.name ? userData.name : '') : ''}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-left"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          onChange={handleChange}
                          required
                          defaultValue={userData ? (userData.email ? userData.email : '') : ''}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-left"
                          htmlFor="gender"
                        >
                          Gender
                        </label>
                        <div className="relative">
                          <select
                            className="shadow block appearance-none w-full bg-white-500 border border-white-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:outline-none focus:shadow-outline"
                            name="gender"
                            id="gender"
                            onChange={handleChange}
                            required
                            defaultValue={userData ? (userData.gender ? (userData.gender === 'male' ? 'male' : 'female') : 'male') : 'male'}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-left"
                          htmlFor="status"
                        >
                          Status
                        </label>
                        <div className="relative">
                          <select
                            className="shadow block appearance-none w-full bg-white-500 border border-white-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:outline-none focus:shadow-outline"
                            name="status"
                            onChange={handleChange}
                            id="status"
                            required
                            defaultValue={userData ? (userData.gender ? (userData.gender === 'active' ? 'active' : 'inactive') : 'active') : ''}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-between py-4 border-0 rounded-b-md">
                        <button
                          type="submit"
                          className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                        >
                          {userData ? (userData.name ? 'Update' : 'Save') : 'Save'}
                        </button>
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                          data-bs-dismiss="modal"
                          onClick={modalStateFalse}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Modal;
