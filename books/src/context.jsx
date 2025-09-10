import React, { useState, useEffect, createContext, useContext } from "react";

export const BooksContext = createContext();
export const useBooks = () => useContext(BooksContext);
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);