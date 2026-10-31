import { ClockIcon, StarIcon, TrashIcon } from "./Icons";
import Poster from "./Poster";

export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li className="watched-item">
      <Poster src={movie.poster} alt="" />
      <div>
        <h3>{movie.title}</h3>
        <div className="watched-stats">
          <p className="your-rating">
            <StarIcon />
            You {movie.userRating}
          </p>
          <p>IMDb {movie.imdbRating}</p>
          <p>
            <ClockIcon />
            {movie.runtime} min
          </p>
        </div>
      </div>
      <button
        className="btn-delete"
        aria-label={`Remove ${movie.title} from watched`}
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        <TrashIcon size={18} />
      </button>
    </li>
  );
}
