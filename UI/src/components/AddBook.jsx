import axios from "axios";
import React, { useReducer, useState } from "react";

const AddBook = () => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const apiUrl = "http://localhost:5001/api/book";
  const token = localStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers = {
      ...headers,
      Authorization: "Bearer " + token,
    };
  }

  const handleSubmitButton = (e) => {
    e.preventDefault();
    axios
      .post(
        apiUrl,
        {
          name: name,
          rating: rating,
          author: author,
          genre: genre,
          description: description,
        },
        { headers }
      )
      .then((res) => {
        setName("");
        setRating(0);
        setAuthor("");
        setGenre("");
        setDescription("");
        alert("Your book has been added");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onSelectRating = (rating) => {
    setRating(rating);
  };
  return (
    <>
      <div className=" shadow-md bg-slate-700  m-10 mb-20 mt-1 max-w-full h-full  ">
        <form onSubmit={handleSubmitButton} className="max-w-sm mx-auto">
          {/*---------------------NAME------------------------------------- */}
          <div className="mb-5">
            <label
              for="name"
              className="mt-2 block mb-2 text-lg font-semibold text-white"
            >
              Book Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add Book Name"
              required
            />
          </div>
          {/* ------------------------RATING----------------------------------- */}
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-lg font-semibold text-white dark:text-white"
            >
              Rating
              <span> :{rating}</span>
            </label>

            <details className="dropdown rounded-md hover:cursor-pointer bg-white py-1">
              <summary className="text-lg ">Select Rating</summary>
              <div className="flex justify-center mt-2  ">
                <ul className="p-2 shadow menu dropdown-content rounded-box w-52">
                  <li
                    onClick={() => onSelectRating(3)}
                    className="flex font-semibold border-4 justify-center hover:cursor-pointer hover:bg-slate-400"
                  >
                    <a>3</a>
                  </li>
                  <li
                    onClick={() => onSelectRating(4)}
                    className="flex font-semibold border-4 justify-center hover:cursor-pointer  hover:bg-slate-400 "
                  >
                    <a>4</a>
                  </li>
                  <li
                    onClick={() => onSelectRating(5)}
                    className="flex font-semibold border-4 justify-center hover:cursor-pointer hover:bg-slate-400"
                  >
                    <a>5</a>
                  </li>
                </ul>
              </div>
            </details>
          </div>
          {/*------------------- AUTHOR NAME-----------------------------------  */}
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-lg font-semibold text-white dark:text-white"
            >
              Author Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name of Author"
              required
            />
          </div>
          {/* ----------------------GENRE------------------------------------------- */}
          <div className="mb-5">
            <label
              for="text"
              className="block mb-2 text-lg font-semibold text-white dark:text-white"
            >
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              onChange={(e) => setGenre(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Action,Adventure,Sci-fi or horror?"
            />
          </div>
          {/* //-------------DESCRIPTION----------------------- */}
          <div className="mb-5">
            <label
              for="text"
              className="block mb-2 text-lg font-semibold text-white dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="Breief Overview of Book"
            />
          </div>
          {/*----------------- Submit Button--------------------- */}
          <button
            type="submit"
            className="text-white mb-2 bg-blue-700 hover:bg-green-600 border-black border-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-8 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
