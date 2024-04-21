import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const ALPHA_NUMERIC_REGEX = /^[0-9A-Za-z\s]+$/;

const Login = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [usernamedError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isValidUserName = () => {
    if (username.trim() === "") {
      setUserNameError("This is a Required Field! ");
      return false;
    } else if (!ALPHA_NUMERIC_REGEX.test(username)) {
      setUserNameError("Please enter valid User Name");
      return false;
    } else {
      setUserNameError("");
      return true;
    }
  };

  const isValidPassword = () => {
    if (password.trim() === "") {
      setPasswordError("This is a Required Field! ");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  const validate = () => {
    if (isValidUserName() && isValidPassword()) {
      return true;
    } else {
      isValidUserName();

      isValidPassword();
    }
    return false;
  };

  const handleSubmit = () => {
    if (validate()) {
      axios
        .post("http://localhost:5001/api/account/login", {
          username,
          password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          alert("User has been succesfully Logged In");
          navigate("/", { replace: true });
          window.location.reload();
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            setPasswordError(
              "Incorrect Username or password. Please try again."
            );
          }
        });
    } else {
      return;
    }
  };

  return (
    <>
      <div className="bg-slate-100 border-b flex h-full justify-center">
        <div className="mt-5 w-full md:w-1/3 mb-10 p-3  border-slate-700 rounded-lg border-2">
          <div className="">
            <label
              className="text-2xl mt-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="username"
            >
              Username
            </label>
            <div className="row ">
              <div className="text-sm font-xs text-red-500">
                {usernamedError}
              </div>
            </div>
            <input
              className={`flex  h-10 w-full mt-2 rounded-md border-2 border-slate-400 ${
                usernamedError ? "border-red-500" : "border-black-30"
              } bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
              type="text"
              placeholder="Enter your Username"
              id="username"
              onChange={(e) => setUserName(e.target.value)}
              defaultValue={username}
              onBlur={isValidUserName}
              required
            />
            <div className="mt-5"></div>

            <label
              className="text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="username"
            >
              Password
            </label>
            <div className="row">
              <div className="text-sm font-xs text-red-500">
                {passwordError}
              </div>
            </div>
            <input
              className={`flex h-10 w-full mt-2 rounded-md border-2 border-slate-400 ${
                passwordError ? "border-red-500" : "border-black-30"
              } bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
              type="password"
              placeholder="Enter your Password"
              id="username"
              onChange={(e) => setPassword(e.target.value)}
              defaultValue={password}
              onBlur={isValidPassword}
            />

            <button
              onClick={handleSubmit}
              className="mt-8 hover:bg-green-500 bg-slate-700 text-white font-bold py-2 px-10 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
