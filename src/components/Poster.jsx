import { useState } from "react";
import { FilmIcon } from "./Icons";

export default function Poster({ src, alt }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (!src || src === "N/A" || hasFailed) {
    return (
      <div className="poster poster--missing" role="img" aria-label={alt}>
        <FilmIcon />
      </div>
    );
  }

  return (
    <img
      className="poster"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasFailed(true)}
    />
  );
}
