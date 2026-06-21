import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={"sss"} />
    <StarRating
      maxRating={5}
      messages={["Very bad", "Bad", "Okay", "Good", "Excellent"]}
    />
    <StarRating maxRating={10} /> */}
  </React.StrictMode>,
);
