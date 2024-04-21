import React from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import BookDetailsModal from "./components/BookDetailsModal.jsx";
import AddBook from "./components/AddBook.jsx";
import BooksOfUser from "./components/BooksOfUser.jsx";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/details/:id" element={<BookDetailsModal />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/addnewbook" element={<AddBook />} />
          <Route path="/userinfo" element={<BooksOfUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
