export default function EmptyState({ icon, title, children }) {
  return (
    <div className="empty">
      {icon}
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
