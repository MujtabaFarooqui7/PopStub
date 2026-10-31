import EmptyState from "./EmptyState";
import { FilmIcon } from "./Icons";
import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched, onDeleteWatched }) {
  if (!watched.length) {
    return (
      <EmptyState icon={<FilmIcon />} title="No movies yet">
        Open a movie from your search, rate it, and add it to see it here.
      </EmptyState>
    );
  }

  return (
    <ul className="watched-list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
