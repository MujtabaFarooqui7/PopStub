export default function NumResults({ movies }) {
  return (
    <p className="box-meta">
      {movies.length} {movies.length === 1 ? "result" : "results"}
    </p>
  );
}
