import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// context
import { useMovieContext } from "./context/context";

// components
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Watchlist from "./pages/Watchlist/Watchlist";
import MovieDetail from "./pages/MovieDetail/MovieDetail";

const App = () => {
  const { mode } = useMovieContext();

  return (
    <div className={"app " + (mode === true ? "lightBg1" : "darkBg2")}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
