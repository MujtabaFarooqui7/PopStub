import { useEffect, useRef, useState } from "react";
import { DetailsLoader } from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { BackIcon, StarIcon } from "./Icons";
import Poster from "./Poster";
import StarRating from "./StarRating";
import { useKey } from "../hooks/useKey";
import { OMDB_URL } from "../hooks/useMovies";

const hasValue = (value) => value && value !== "N/A";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(`${OMDB_URL}&i=${selectedId}`, {
            signal: controller.signal,
          });
          if (!res.ok) throw new Error("The movie service returned an error.");
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovie(data);
        } catch (err) {
          if (err.name === "AbortError") return;
          setError(
            err.name === "TypeError"
              ? "Can't reach the movie service. Check your connection and try again."
              : err.message,
          );
        } finally {
          if (!controller.signal.aborted) setIsLoading(false);
        }
      }
      getMovieDetails();
      return function () {
        controller.abort();
      };
    },
    [selectedId],
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "PopStub";
      };
    },
    [title],
  );

  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current + 1;
    },
    [userRating],
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating) || 0,
      runtime: Number(runtime.split(" ").at(0)) || 0,
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  const backButton = (
    <button className="btn-back" onClick={onCloseMovie}>
      <BackIcon size={18} />
      Back
    </button>
  );

  if (isLoading || error) {
    return (
      <div className="details">
        {backButton}
        <div className="details-message">
          {isLoading ? (
            <DetailsLoader />
          ) : (
            <ErrorMessage title="This movie didn't load" message={error} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="details">
      {backButton}
      <header className="details-hero">
        {hasValue(poster) && (
          <div
            className="details-backdrop"
            style={{ backgroundImage: `url("${poster}")` }}
          />
        )}
        <Poster src={poster} alt={`Poster of ${title}`} />
        <div>
          <h2>{title}</h2>
          <div className="details-facts">
            {hasValue(released) && <span>{released}</span>}
            {hasValue(runtime) && <span>{runtime}</span>}
          </div>
          {hasValue(genre) && <p className="details-genre">{genre}</p>}
          {hasValue(imdbRating) && (
            <p className="details-imdb">
              <StarIcon />
              <strong>{imdbRating}</strong> on IMDb
            </p>
          )}
        </div>
      </header>
      <div className="details-body">
        <div className="rating">
          {!isWatched ? (
            <>
              <h3>Rate this movie to add it to your list</h3>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              <button
                className="btn-add"
                disabled={!userRating}
                onClick={handleAdd}
              >
                Add to watched
              </button>
            </>
          ) : (
            <p className="rating-done">
              <StarIcon />
              You rated this movie {watchedUserRating} out of 10
            </p>
          )}
        </div>
        {hasValue(plot) && <p className="details-plot">{plot}</p>}
        <dl className="details-credits">
          {hasValue(actors) && (
            <>
              <dt>Starring</dt>
              <dd>{actors}</dd>
            </>
          )}
          {hasValue(director) && (
            <>
              <dt>Directed by</dt>
              <dd>{director}</dd>
            </>
          )}
        </dl>
      </div>
    </div>
  );
}
