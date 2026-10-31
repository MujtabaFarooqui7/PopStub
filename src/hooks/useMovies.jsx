import { useState, useEffect } from "react";

export const OMDB_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}`;
export const MIN_QUERY_LENGTH = 3;

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `${OMDB_URL}&s=${encodeURIComponent(query)}`,
            { signal: controller.signal },
          );
          if (!res.ok) throw new Error("The movie service returned an error.");
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name === "AbortError") return;
          setMovies([]);
          setError(
            err.name === "TypeError"
              ? "Can't reach the movie service. Check your connection and try again."
              : err.message,
          );
        } finally {
          if (!controller.signal.aborted) setIsLoading(false);
        }
      }
      if (query.length < MIN_QUERY_LENGTH) {
        setMovies([]);
        setError("");
        setIsLoading(false);
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query, callback],
  );
  return { movies, isLoading, error };
}
