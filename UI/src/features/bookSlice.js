import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
  },
  reducers: {
    getAllBooks: (state, action) => {
      state.books = action.payload;
    },

    addBooks: (state, action) => {
      state.books.push(action.payload);
    },

    getSingleBook: (state, action) => {
      state.books = state.books.find((book) => book.id === action.payload);
    },
  },
});

export const { getAllBooks, addBooks, getSingleBook } = bookSlice.actions;

export default bookSlice.reducer;
