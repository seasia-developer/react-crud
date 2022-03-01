import "../Home.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const axios = require("axios");

function Sidebar({ isActiveModalState, isAddUser }) {
  const [users, setUsersData] = useState([]);

  const location = useLocation();

  // SORT USERS DATA RESPONSE 
  function sortUsersData(response) {

    // GET USERS LISTS
    var usersData = response.data.sort(function (a, b) {
      console.log(a, b)
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    });

    // MODIFY RESPONSE TO REQUESTED DATA
    let usersArray = [];

    for (var i in usersData) {
      // GET FIRST LETTER OF NAME
      let nameLetter = usersData[i].name.charAt(0);
      let sortLetter = {};

      // GET FIRST LETTER & CREATE ARRAY
      if (
        usersArray.filter((e) => e.sortLetter === nameLetter).length < 1
      ) {
        sortLetter["sortLetter"] = nameLetter;
        sortLetter["users"] = [];
        usersArray.push(sortLetter);
      }

      // SORT USERS TO RESPECTED ARRAY
      for (let j in usersArray) {
        // MATCH FIRST LETTER
        if (usersArray[j].sortLetter == nameLetter) {
          usersArray[j].users.push({
            id: usersData[i].id,
            name: usersData[i].name,
            email: usersData[i].email,
            gender: usersData[i].gender,
          });
        }
      }
    }
    setUsersData(usersArray);
  }

  // GET USER
  function getUsers() {
    axios
      .get(
        "https://gorest.co.in/public/v2/users?access-token=23c13269ecf765176e6d40a258bb6a78fb272f42b712300641f6615e3397124e",
        {
          headers: {
            "X-Pagination-Limit": 100,
          },
        }
      )
      .then((response) => {
        sortUsersData(response);
      })
      .then(() => { });
  }

  // SEARCH USERS
  function searchUsers(query) {
    axios
      .get(
        "https://gorest.co.in/public/v2/users?access-token=23c13269ecf765176e6d40a258bb6a78fb272f42b712300641f6615e3397124e&name=" + query
      )
      .then((response) => {
        sortUsersData(response);
      });
  }

  function addUserModel(value) {
    isActiveModalState()
    isAddUser()
  }

  useEffect(() => {
    // GET USERS
    getUsers();
  }, [location]);

  return (
    <aside
      id="sidebar"
      className="bg-gray-800 text-gray-100 md:w-64 w-3/4 space-y-6 py-6 px-4 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out md:flex md:flex-col md:justify-between overflow-y-auto"
      data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
    >
      <div
        className="flex flex-col space-y-6 flex-1 h-100"
        data-dev-hint="optional div for having an extra footer navigation"
      >
        <Link to="/">
          <span
            className="text-white flex justify-content-center items-center space-x-2 cursor-pointer"
            title="CRUD"
          >
            <span className="flex items-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="text-2xl font-extrabold whitespace-nowrap truncate">
                CRUD
              </span>
            </span>
          </span>
        </Link>

        <nav data-dev-hint="main navigation" className="flex-1 h-100">
          <form className="w-full max-w-sm mx-auto d-flex jusitfy-content-center">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-full mx-auto">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-white-500"
                  id="inline-full-name"
                  placeholder="Search"
                  type="text"
                  onChange={(e) => {
                    if (e.target.value.toLowerCase().length > 2) {
                      searchUsers(e.target.value.toLowerCase());
                    }
                    if (e.target.value.toLowerCase().length === 0) {
                      searchUsers(e.target.value.toLowerCase());
                    }
                  }}
                />
              </div>
            </div>
          </form>

          {/* USERS LIST  */}
          <div className="row max-h-72 md:max-h-440px 2xl:max-h-600px overflow-y-scroll">
            {/* LOOP  START  */}
            {users.map((usersObj, i) => (
              <div className="full mb-3" key={i}>
                {/* ALPHABET  */}
                <div className="w-full">
                  <p className="font-bold text-left px-2 uppercase">
                    {usersObj.sortLetter}
                  </p>
                </div>
                {/* USERS LOOP  */}
                {usersObj.users.map((user, j) => (
                  <div key={j}>
                    <span className="flex items-center space-x-2 py-2 px-2 rounded transition duration-200 hover:text-white-800 hover:cursor-pointer transition ease-in-out hover:ease-in-out delay-100 duration-100 hover:delay-100 hover:duration-100 align-left text-left">
                      <Link to={`/user/${user.id}`}>{user.name}</Link>
                      <span></span>
                    </span>
                  </div>
                ))}
              </div>
            ))}
            {/* LOOP END  */}
          </div>
        </nav>
      </div>

      <nav data-dev-hint="second-main-navigation or footer navigation">
        <button
          className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-400 border-teal-500 text-sm border-1 text-white py-1 px-2 rounded transition ease-in-out delay-100 hover:-translate-y-1 duration-100"
          type="button"
          onClick={() => {
            addUserModel(true);
          }}
        >
          Add User
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
