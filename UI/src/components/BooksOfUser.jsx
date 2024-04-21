import axios from "axios";
import React, { useEffect, useState } from "react";

const BooksOfUser = () => {
  const [books, setBooks] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [jwtToken, setJwtToken] = useState("");

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

  //Get the Logged in user
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/account/getcurrentuser", { headers })
      .then((res) => {
        setCurrentUserId(res.data.id);
        setJwtToken(res.data.token);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/book/getmybooksinfo", { headers })
      .then((res) => {
        setBooks(res.data);
      });
  }, []);

  return (
    <div className="flex flex-col m-5  ">
      <div className=" font-medium text-xl flex max-w-full items-center bg-white justify-center border-2 border-black ">
        <div>
          <p className="bg-white text-3xl font-semibold underline mt-2 ">
            BORROWED BOOKS
          </p>

          <div className="bg-white px-24 flex flex-col space-y-4 mt-2 mb-2 ">
            {books && books.length
              ? books.map((book) => {
                  return book.currentlyBorrowedByUserId === currentUserId ? (
                    <p className=" text-gray-600 text-lg" key={book.id}>
                      {book.name}
                    </p>
                  ) : null;
                })
              : null}
          </div>
        </div>
      </div>

      <div className="mt-2 font-medium text-xl flex max-w-full items-center bg-white justify-center border-2 border-black">
        <div>
          <p className="bg-white text-3xl font-semibold underline mt-2">
            LENT BOOKS
          </p>

          <div className="mt-2 px-24 flex flex-col space-y-4">
            {books && books.length
              ? books.map((book) => {
                  return book.lentByUserId === currentUserId ? (
                    <p className="  text-gray-600 text-lg " key={book.id}>
                      {book.name}
                    </p>
                  ) : null;
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksOfUser;
