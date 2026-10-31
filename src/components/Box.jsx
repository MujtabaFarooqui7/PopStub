import { useState } from "react";
import { ChevronIcon } from "./Icons";

export default function Box({ title, meta, className = "", children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className={`box ${isOpen ? "" : "box--closed"} ${className}`}>
      <header className="box-header">
        <h2>{title}</h2>
        {meta}
        <button
          className="btn-toggle"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${title}`}
          onClick={() => setIsOpen((open) => !open)}
        >
          <ChevronIcon />
        </button>
      </header>
      {isOpen && <div className="box-body">{children}</div>}
    </section>
  );
}
