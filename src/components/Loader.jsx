export default function Loader() {
  return (
    <ul className="movie-grid" role="status" aria-label="Loading movies">
      {Array.from({ length: 8 }, (_, i) => (
        <li key={i}>
          <div className="skeleton skeleton--poster" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line skeleton--short" />
        </li>
      ))}
    </ul>
  );
}

export function DetailsLoader() {
  return (
    <div className="details-loading" role="status" aria-label="Loading movie">
      <div className="skeleton skeleton--poster" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line skeleton--short" />
    </div>
  );
}
