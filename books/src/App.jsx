// src/App.jsx


import React, { useState, useEffect, createContext, useContext } from "react";
import AuthProvider from './Auth';
import BooksProvider from './Books';
import { useAuth, useBooks } from './context';

// ---- Contexts ----






// ---- Providers ----



// ---- Components ----
function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="flex justify-between p-4 bg-indigo-600 text-white">
      <h1 className="font-bold text-lg">Library System</h1>
      {user ? (
        <div className="flex gap-3">
          <span>Hello, {user.name}</span>
          <button onClick={logout} className="bg-white text-indigo-600 px-2 rounded">
            Logout
          </button>
        </div>
      ) : (
        <span>Not logged in</span>
      )}
    </header>
  );
}

function Login() {
  const { login } = useAuth();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!login(u, p)) setError("Invalid credentials");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto bg-white shadow p-4 mt-6 rounded"
    >
      <h2 className="font-bold mb-2">Login</h2>
      <input
        value={u}
        onChange={(e) => setU(e.target.value)}
        placeholder="Username"
        className="border p-2 w-full mb-2"
      />
      <input
        value={p}
        type="password"
        onChange={(e) => setP(e.target.value)}
        placeholder="Password"
        className="border p-2 w-full mb-2"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </form>
  );
}

function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search books..."
      className="border p-2 rounded w-full mb-4"
    />
  );
}

function BookList() {
  const { books, borrowBook, returnBook } = useBooks();
  const { user } = useAuth();
  const [filtered, setFiltered] = useState(books);

  useEffect(() => setFiltered(books), [books]);

  const handleSearch = (q) => {
    setFiltered(
      books.filter((b) =>
        (b.title + " " + b.author).toLowerCase().includes(q.toLowerCase())
      )
    );
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <div key={b.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">{b.title}</h3>
            <p className="text-sm text-gray-600">by {b.author}</p>
            <p className="mt-2 text-sm">
              Status:{" "}
              <span className={b.borrowed ? "text-red-500" : "text-green-600"}>
                {b.borrowed ? "Borrowed" : "Available"}
              </span>
            </p>
            {user && (
              <button
                onClick={() => (b.borrowed ? returnBook(b.id) : borrowBook(b.id))}
                className="mt-3 w-full px-3 py-1 rounded bg-indigo-600 text-white"
              >
                {b.borrowed ? "Return" : "Borrow"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Main App ----
export default function App() {
  const { user } = useAuth();
  return (
    
      <BooksProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="p-6 max-w-5xl mx-auto">
            {user ? <BookList /> : <Login />}
          </main>
        </div>
      </BooksProvider>
    
  );
}
