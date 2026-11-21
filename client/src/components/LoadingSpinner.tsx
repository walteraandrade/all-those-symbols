export function LoadingSpinner() {
  return (
    <div className="esc-spinner" role="status" aria-label="Loading">
      <div className="esc-spinner-dots" aria-hidden="true">
        <span className="esc-spinner-dot" />
        <span className="esc-spinner-dot" />
        <span className="esc-spinner-dot" />
      </div>
    </div>
  );
}
