import React from "react";

// react-router-dom
import { useNavigate } from "react-router-dom";

// context
import { useMovieContext } from "../../context/context";

// data
import { iconsData } from "../../data/icons";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getMovieResults } from "../../redux/services/movies/getMovieResults";
import { getTvResults } from "../../redux/services/shows/getTvResults";

// components
import Options from "../../other/Options/Options";
import SearchResults from "../SearchResults/SearchResults";

const Search = () => {
  const movieResults = useSelector((state) => state.movieResults.movieResults);
  const tvResults = useSelector((state) => state.tvResults.tvResults);

  const {
    mode,
    setIndex,
    searchQuery,
    setSearchQuery,
    optionState,
    searchOptionState,
    searchInputRef,
    movieState,
    setMovieState,
    clearMovieInputRef,
    clearTvInputRef,
  } = useMovieContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("searchQuery", searchQuery);
    setIndex(0);
    sessionStorage.setItem("searchPage", 1);

    setSearchQuery("");
    setMovieState(!movieState);

    navigate("/search");
  };

  return (
    <div
      className={
        "search__component "
        //+ (mode === true ? "lightAlpha5" : "darkAlpha5")
      }
    >
      {/* Options */}
      <div className="search__component__switch">
        <Options />
      </div>

      {/* Search bar */}
      <div className="search__component__search-bar">
        <form onSubmit={(e) => handleSubmit(e)} ref={searchInputRef}>
          <input
            //ref={searchInputRef}
            type="text"
            //placeholder={optionState === "movie" ? "Search Movie" : "Search Tv"}
            placeholder={
              searchOptionState === "movie" ? "Search Movie" : "Search Tv"
            }
            onChange={(e) => {
              setSearchQuery(e.target.value);
              //sessionStorage.setItem('searchQuery', searchQuery)
              // if (sessionStorage.getItem("movieState") === "movie") {
              //   dispatch(getMovieResults(searchQuery));
              // }

              // if (sessionStorage.getItem("movieState") === "tv") {
              //   dispatch(getTvResults(searchQuery));
              // }

              if (searchOptionState === "movie") {
                dispatch(getMovieResults(searchQuery));
              }

              if (searchOptionState === "tv") {
                dispatch(getTvResults(searchQuery));
              }
            }}
            value={searchQuery}
          />
          {searchOptionState === "movie" && searchQuery && (
            <span
              //ref={clearMovieInputRef}
              onClick={() => {
                setSearchQuery("");
                //sessionStorage.removeItem('searchQuery')
              }}
              style={{ cursor: "pointer", color: "red" }}
            >
              {iconsData.close2}
            </span>
          )}

          {searchOptionState === "tv" && searchQuery && (
            <span
              //ref={clearTvInputRef}
              onClick={() => {
                setSearchQuery("");
                //sessionStorage.removeItem('searchQuery')
              }}
              style={{ cursor: "pointer", color: "red" }}
            >
              {iconsData.close2}
            </span>
          )}

          {!searchQuery && <span>{iconsData.searchIcon}</span>}
        </form>
      </div>

      {searchOptionState === "movie" &&
        searchQuery &&
        movieResults &&
        movieResults.length > 0 && <SearchResults results={movieResults} />}

      {searchOptionState === "tv" &&
        searchQuery &&
        tvResults &&
        tvResults.length > 0 && <SearchResults results={tvResults} />}
    </div>
  );
};

export default Search;
