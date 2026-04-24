export function Section({ title, children }) {
  return (
    <div className="pets-section">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
