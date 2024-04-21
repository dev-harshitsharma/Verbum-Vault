import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetailsModal = () => {
  const { id } = useParams();

  const [bookDetail, setBookDetail] = useState([]);

  const fetchBookDetail = async () => {
    const response = await axios.get(`http://localhost:5001/api/book/${id}`);

    setBookDetail(response.data);
  };
  useEffect(() => {
    fetchBookDetail();
  }, []);


  return (
    <div className="container mx-auto p-4 max-w-full h-full">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 ">
          {bookDetail && bookDetail.name}
        </h2>
        <p className="text-gray-600 mb-2 text-lg">
          <span className="font-bold">Author:</span>{" "}
          {bookDetail && bookDetail.author}
        </p>
        <p className="text-gray-600 mb-2 text-lg ">
          <span className="font-bold">Genre:</span>{" "}
          {bookDetail && bookDetail.genre}
        </p>
        <p className="text-gray-600 mb-4 text-lg">
          <span className="font-bold">Details:</span>{" "}
          {bookDetail && bookDetail.description}
        </p>
        {/* <p className="text-gray-600 mb-4 text-lg">
          <span className="font-xs">Lent By User Id:</span>{" "}
          {bookDetail && bookDetail.lentByUserId}
          <br></br>
          <span className="font-xs">Currently borrowed By User Id:</span>{" "}
          {bookDetail && bookDetail.currentlyBorrowedByUserId}
        </p> */}

        <div>
          <Link
            to="/"
            className=" mt-5 rounded-md border border-black px-4 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
