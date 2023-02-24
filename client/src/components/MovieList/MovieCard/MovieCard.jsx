import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

// data
import { iconsData } from "../../../data/icons";

// Hooks
import { useWatchlistOperations } from "../../../hooks/useWatchlistOperations";
import { useGetClassByVote } from "../../../hooks/useGetClassByVote";

// Redux
import { useSelector } from "react-redux";

// Recat Router
import { Link, useNavigate } from "react-router-dom";

// Context
import { useMovieContext } from "../../../context/context";

const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const MovieCard = ({ movie }) => {
  const { mode } = useMovieContext();
  const { addMovie, deleteMovie } = useWatchlistOperations();
  const { getClassBg } = useGetClassByVote();

  const user = useSelector((state) => state.savedMovies.user);
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);

  const ratingTitleDateRef = useRef(null);

  const navigate = useNavigate();

  const {
    title,
    vote_average,
    release_date,
    poster_path,
    backdrop_path,
    id,
    genre_ids,
    overview,
  } = movie;

  const show = () => {
    ratingTitleDateRef.current.style.opacity = "1";
  };

  const hide = () => {
    ratingTitleDateRef.current.style.opacity = "0";
  };

  return (
    <div className="card">
      <Link to={`/movie/${id}`} className="card--image">
        <img
          src={poster_path === null ? url : IMG_PATH + poster_path}
          alt={title}
        />
      </Link>

      {user && savedMovies && savedMovies.length === 0 && (
        <p
          className="card__add__btn"
          onClick={() =>
            addMovie(
              id,
              title,
              poster_path,
              backdrop_path,
              release_date,
              vote_average,
              genre_ids,
              overview
            )
          }
        >
          <span className="card__btn--icon">{iconsData.star}</span>
        </p>
      )}

      {/* ADD-BUTTON */}
      {user &&
        savedMovies &&
        savedMovies.length > 0 &&
        savedMovies.every((item, index) => item.id !== id) && (
          <p
            key={id}
            className="card__add__btn"
            onClick={() =>
              addMovie(
                id,
                title,
                poster_path,
                backdrop_path,
                release_date,
                vote_average,
                genre_ids,
                overview
              )
            }
          >
            <span className="card__btn--icon">{iconsData.star}</span>
          </p>
        )}

      {/* DELETE-BUTTON */}
      {user &&
        savedMovies &&
        savedMovies.length > 0 &&
        savedMovies.map((item, index) => {
          if (item.id === id) {
            return (
              <p
                key={index}
                className="card__delete__btn"
                onClick={() => deleteMovie(id)}
                style={{ background: "gold" }}
              >
                <span className="card__btn--icon" style={{ color: "#000" }}>
                  {iconsData.star}
                </span>
              </p>
            );
          }
        })}

      {/* ADD-BUTTON (without user) */}
      {!user && (
        <p className="card__btn " onClick={() => navigate("/login")}>
          <span className="card__btn--icon">{iconsData.star}</span>
        </p>
      )}

      {/* CARD-INFO */}
      <Link
        to={`/movie/${id}`}
        className={
          "card__info " +
          (mode === true ? "lightBg2 darkColor1" : "darkBg1 lightColor1")
        }
      >
        <p className="card__info--title">
          {title && title.length <= 35 ? title : title.substring(0, 32) + "..."}
        </p>

        <div
          className={
            "card__info__date-rating " +
            (mode === true ? "lightBg1" : "darkBg2")
          }
        >
          <span className="card__info__date-rating--date">
            {release_date && moment(release_date).format("Do MMM, YYYY")}
          </span>
          <p
            className={
              "card__info__date-rating--rating " +
              getClassBg(Number(String(vote_average).substring(0, 3)))
            }
          >
            <span>{Number(String(vote_average).substring(0, 3))}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
