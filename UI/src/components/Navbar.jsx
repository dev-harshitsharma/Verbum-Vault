import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [localStorage]);

  const handleLogout = () => {
    localStorage.setItem("token", "");
    setToken("");
    alert("Succesfully Logged out !! ");
    window.location.reload();
  };

  return (
    <>
      <div className=" relative w-full bg-white ">
        <div className="mx-auto flex max-w-full shadow-lg items-center justify-between px-6 py-3 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <img
              src="https://t4.ftcdn.net/jpg/04/92/24/55/360_F_492245515_B06u4GqjtSox45R7iDOCLIamWIJipzFT.jpg"
              className="h-10 w-15 "
            ></img>
            <span className="font-bold text-2xl">
              <NavLink className="" to="/">
                BOOK BORROWING APP
              </NavLink>
            </span>
          </div>
          <div className="hidden grow items-start lg:flex">
            <ul className="ml-12 inline-flex space-x-8 ">
              <li>
                {token ? (
                  <NavLink to="/addnewbook">
                    <button className=" rounded-md border border-black px-4 py-1  text-xl font-semibold text-black shadow-sm focus-visible:outline hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ">
                      Add New Book
                    </button>
                  </NavLink>
                ) : (
                  <button
                    onClick={() => {
                      alert(
                        "You are not Logged in , Directing you to Login Page"
                      );
                      navigate("/loginpage");
                    }}
                    className="rounded-md border border-black px-4 py-1 text-xl font-semibold text-black shadow-sm focus-visible:outline hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Add New Book
                  </button>
                )}
              </li>
              <li className="hover:underline">
                {token ? (
                  <>
                    <NavLink to="userinfo">
                      <UserDetails />
                    </NavLink>
                  </>
                ) : (
                  <> </>
                )}
              </li>
            </ul>
          </div>

          <div className="hidden space-x-2 lg:block">
            {token != "" ? (
              <button
                onClick={handleLogout}
                type="button"
                className="rounded-md border border-black px-4 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Logout
              </button>
            ) : (
              <NavLink to="loginpage">
                <button
                  type="button"
                  className="rounded-md border border-black px-4 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
