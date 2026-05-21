interface LoadingStateProps {
  message?: string;
}

function LoadingState({ message = 'Đang tải dữ liệu...' }: LoadingStateProps) {
  return (
    <div className="state-box">
      <div className="state-box"></div>
      <p>{message}</p>
    </div>
  );
}

export default LoadingState;
