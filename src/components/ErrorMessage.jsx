import { AlertIcon } from "./Icons";

export default function ErrorMessage({
  title = "No results to show",
  message,
}) {
  return (
    <div className="empty empty--error" role="alert">
      <AlertIcon />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
