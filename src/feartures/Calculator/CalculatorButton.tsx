import type { CalculatorButtonVariant } from './calculator.config';

interface CalculatorButtonProps {
  label: string;
  value?: string;
  variant?: CalculatorButtonVariant;
  disabled?: boolean;
  span?: boolean;
  onClick: (value: string) => void;
}

function CalculatorButton({
  label,
  value = label,
  variant = 'number',
  disabled = false,
  span = false,
  onClick,
}: CalculatorButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} ${span ? 'span-two' : ''}`}
      disabled={disabled}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

export default CalculatorButton;
