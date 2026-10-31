import { useState } from "react";
import { StarIcon } from "./Icons";

export default function StarRating({
  maxRating = 5,
  size = 32,
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div className="star-rating">
      <div className="stars" onMouseLeave={() => setTempRating(0)}>
        {Array.from({ length: maxRating }, (_, i) => (
          <button
            className="star"
            key={i}
            type="button"
            aria-label={`Rate ${i + 1} out of ${maxRating}`}
            aria-pressed={rating === i + 1}
            onClick={() => handleRating(i + 1)}
            onMouseEnter={() => setTempRating(i + 1)}
          >
            <StarIcon
              size={size}
              filled={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            />
          </button>
        ))}
      </div>
      <p className="star-value">
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}
