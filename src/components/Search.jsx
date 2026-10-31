import { useRef } from "react";
import { useKey } from "../hooks/useKey";
import { CloseIcon, SearchIcon } from "./Icons";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  function handleClear() {
    setQuery("");
    inputEl.current.focus();
  }

  return (
    <div className="search">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search movies"
        aria-label="Search movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      {query && (
        <button
          className="search-clear"
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
        >
          <CloseIcon size={18} />
        </button>
      )}
    </div>
  );
}
