interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state-box error">
      <p>⚠️ {message}</p>
      {onRetry && (
        <button onClick={onRetry} style={{ marginTop: '8px' }}>
          thử lại
        </button>
      )}
    </div>
  );
}

export default ErrorState;

//
