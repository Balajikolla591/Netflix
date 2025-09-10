import React, { useState, useEffect, createContext, useContext } from "react";
import { BooksContext } from './context';

export default function BooksProvider({ children }) {
  const [books, setBooks] = useState([
    { id: 1, title: "Clean Code", author: "Robert C. Martin", borrowed: false },
    { id: 2, title: "You Don’t Know JS", author: "Kyle Simpson", borrowed: false },
  ]);

  const borrowBook = (id) =>
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, borrowed: true } : b))
    );

  const returnBook = (id) =>
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, borrowed: false } : b))
    );

  return (
    <BooksContext.Provider value={{ books, borrowBook, returnBook }}>
      {children}
    </BooksContext.Provider>
  );
}
