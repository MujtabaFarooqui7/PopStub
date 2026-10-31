import Movie from "./Movie";

export default function MovieList({ movies, selectedId, onSelectMovie }) {
  return (
    <ul className="movie-grid">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          isSelected={movie.imdbID === selectedId}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
