import Poster from "./Poster";

export default function Movie({ movie, isSelected, onSelectMovie }) {
  return (
    <li>
      <button
        className={`movie-card ${isSelected ? "movie-card--selected" : ""}`}
        aria-pressed={isSelected}
        onClick={() => onSelectMovie(movie.imdbID)}
      >
        <Poster src={movie.Poster} alt="" />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </button>
    </li>
  );
}
