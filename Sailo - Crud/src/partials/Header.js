import "../Home.css";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-auto">
      <header
        className="bg-gray-600 text-gray-100 flex justify-between md:hidden"
        data-dev-hint="mobile menu bar"
      >
        <Link to="/">
          <span className="block p-4 text-white font-bold whitespace-nowrap truncate cursor-pointer">
            SAILO
          </span>
        </Link>

        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md"
        >
          <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </header>
    </div>
  );
}

export default Header;
