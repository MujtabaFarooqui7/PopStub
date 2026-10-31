const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="ticket">
      <p className="ticket-stub">
        <strong>{watched.length}</strong>
        <span>{watched.length === 1 ? "movie" : "movies"}</span>
      </p>
      <dl className="ticket-stats">
        <div>
          <dt>Avg IMDb</dt>
          <dd>{avgImdbRating.toFixed(1)}</dd>
        </div>
        <div>
          <dt>Your avg</dt>
          <dd>{avgUserRating.toFixed(1)}</dd>
        </div>
        <div>
          <dt>Avg length</dt>
          <dd>{Math.round(avgRuntime)}m</dd>
        </div>
      </dl>
    </div>
  );
}
