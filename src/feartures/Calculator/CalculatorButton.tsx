// Interface cho props
type ButtonVariant = 'number' | 'operator' | 'action' | 'equal';

interface CalculatorButtonProps {
  label: string;
  value?: string;
  variant?: ButtonVariant;
  disbled?: boolean;
  span?: boolean; // true = chiếm 2 cột
  onClick: (Value: string) => void;
}

function CalculatorButton({
  label,
  value = label, //default value = label nếu không truyền
  variant = 'number',
  disbled = false,
  span = false,
  onClick,
}: CalculatorButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${span ? 'span-two' : ''}`}
      disabled={disbled}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

export default CalculatorButton;

//
