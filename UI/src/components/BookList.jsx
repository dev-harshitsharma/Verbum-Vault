import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [tokenAvailable, setTokenAvailable] = useState(null);

  const token = localStorage.getItem("token");

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:5001/api/book");

    setBooks(response.data);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
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

    axios
      .get("http://localhost:5001/api/account/getcurrentuser", { headers })
      .then((res) => {
        setCurrentUserId(res.data.id);
        setTokenAvailable(res.data.tokensAvailable);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
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

    axios
      .get("http://localhost:5001/api/account/getcurrentuser", { headers })
      .then((res) => {
        setCurrentUserId(res.data.id);
        setTokenAvailable(res.data.tokensAvailable);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBorrowButton = (id) => {
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
    const apiUrl = `http://localhost:5001/api/book/borrow/${id}`;
    axios
      .post(apiUrl, {}, { headers })
      .then((response) => {
        const updatedBooks = books.map((book) =>
          book.id === id ? { ...book, bookBorrowed: true } : book
        );
        setBooks(updatedBooks);
        alert("You have borrowed this book ");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="ml-5 mr-5 max-w-full mt-2  bg-white rounded-lg">
        <div className="flex flex-row justify-between max-w-full  bg-slate-800 ">
          <h2 className="text-2xl font-bold shadow-lg first-letter: py-2 text-white ml-10 ">
            List of Available Books
          </h2>
          <div className="bg-slate-800 text-white mt-2 mr-5 ">
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Books"
              className="px-2 border-b border-white text-black ml-5 mt-1 mb-1 rounded-sm "
            />
          </div>
        </div>

        <table className="min-w-full border border-gray-300">
          <thead className="text-xl">
            <tr>
              <th className="py-2 px-4 border-b">Book Name</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Genre</th>
              <th className="py-2 px-4 border-b">Actions</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody key={books.id}>
            {books && books.length
              ? books
                  .filter((book) => {
                    return search.toLowerCase() === ""
                      ? book
                      : book.name.includes(search) ||
                          book.author.includes(search) ||
                          book.genre.includes(search);
                  })
                  .map((book) => {
                    return (
                      <>
                        <tr>
                          <td className="font-semibold font-sans py-2 px-4 border-b">
                            {book.name}
                          </td>
                          <td className="py-2 px-4 border-b">{book.author}</td>
                          <td className="py-2 px-4 border-b">{book.genre}</td>

                          <td className="py-2 px-4 border-b">
                            {token ? (
                              book.lentByUserId === currentUserId ? (
                                <span className="text-black font-semibold italic py-2 px-6">
                                  Added by You
                                </span>
                              ) : tokenAvailable ? (
                                <button
                                  onClick={() => handleBorrowButton(book.id)}
                                  className="hover:bg-green-500 bg-slate-700 text-white font-bold py-2 px-6"
                                  disabled={!book.isBookAvailable}
                                >
                                  {!book.isBookAvailable
                                    ? "Borrowed"
                                    : "Borrow"}
                                </button>
                              ) : (
                                <p className="italic font-semibold">
                                  {" "}
                                  Not enough tokens to buy
                                </p>
                              )
                            ) : (
                              <NavLink
                                to="/loginpage"
                                className="hover:bg-green-500 bg-slate-700 text-white font-bold py-2 px-6"
                              >
                                Borrow
                              </NavLink>
                            )}
                          </td>
                          <td className=" px-3 border-b text-black font-semibold">
                            <Link to={`/details/${book.id}`}>Get Details</Link>
                          </td>
                        </tr>
                      </>
                    );
                  })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookList;
