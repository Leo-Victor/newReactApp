interface CalculatorDisplayProps {
  display: string;
  expression: string;
}

function CalculatorDisplay({ display, expression }: CalculatorDisplayProps) {
  return (
    <div className="calc-display">
      <div className="calc-expression">{expression}</div>
      <div className="calc-number">{display}</div>
    </div>
  );
}

export default CalculatorDisplay;

//
