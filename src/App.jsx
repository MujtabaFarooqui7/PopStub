import { useCallback, useState } from "react";
import Box from "./components/Box";
import EmptyState from "./components/EmptyState";
import ErrorMessage from "./components/ErrorMessage";
import { SearchIcon } from "./components/Icons";
import Loader from "./components/Loader";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import NumResults from "./components/NumResults";
import Search from "./components/Search";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedSummary from "./components/WatchedSummary";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { MIN_QUERY_LENGTH, useMovies } from "./hooks/useMovies";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorage([], "watched", "undefined");

  const handleCloseMovie = useCallback(() => setSelectedId(null), []);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  function renderResults() {
    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (query.length < MIN_QUERY_LENGTH) {
      return (
        <EmptyState icon={<SearchIcon />} title="Find a movie">
          Type at least {MIN_QUERY_LENGTH} letters of a title to see matching
          movies.
        </EmptyState>
      );
    }
    return (
      <MovieList
        movies={movies}
        selectedId={selectedId}
        onSelectMovie={handleSelectedMovie}
      />
    );
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
      </Navbar>
      <Main>
        <Box
          title="Results"
          meta={movies.length > 0 && !isLoading && <NumResults movies={movies} />}
        >
          {renderResults()}
        </Box>
        <Box
          title={selectedId ? "Movie details" : "Watched"}
          className={selectedId ? "box--details" : ""}
        >
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              {watched.length > 0 && <WatchedSummary watched={watched} />}
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
