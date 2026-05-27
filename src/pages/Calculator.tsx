import { useEffect, useMemo, useState } from 'react';
import './Calculator.css';
import useCalculator from '../hooks/useCalculator';
import CalculatorButton from '../feartures/Calculator/CalculatorButton';
import {
  ADVANCED_CALCULATOR_BUTTONS,
  BASIC_CALCULATOR_BUTTONS,
  type CalculatorAction,
  type CalculatorButtonConfig,
} from '../feartures/Calculator/calculator.config';

function Calculator() {
  const {
    state,
    history,
    copied,
    handleNumber,
    handleOperator,
    handleEqual,
    handleDecimal,
    handleClear,
    handleBackspace,
    handlePercent,
    handleToggleSign,
    handleSquare,
    handleSqrt,
    handleInverse,
    deleteHistory,
    clearAllHistory,
    exportHistory,
    copyResult,
  } = useCalculator();
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);

  const actionHandlers = useMemo<
    Record<CalculatorAction, (value: string) => void>
  >(
    () => ({
      number: handleNumber,
      operator: handleOperator,
      decimal: handleDecimal,
      equal: handleEqual,
      clear: handleClear,
      backspace: handleBackspace,
      percent: handlePercent,
      toggleSign: handleToggleSign,
      square: handleSquare,
      sqrt: handleSqrt,
      inverse: handleInverse,
    }),
    [
      handleNumber,
      handleOperator,
      handleDecimal,
      handleEqual,
      handleClear,
      handleBackspace,
      handlePercent,
      handleToggleSign,
      handleSquare,
      handleSqrt,
      handleInverse,
    ]
  );

  const renderButton = (button: CalculatorButtonConfig) => (
    <CalculatorButton
      key={`${button.action}-${button.label}`}
      label={button.label}
      value={button.value}
      variant={button.variant}
      span={button.span}
      onClick={actionHandlers[button.action]}
    />
  );

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key >= '0' && event.key <= '9') handleNumber(event.key);
      else if (event.key === '+') handleOperator('+');
      else if (event.key === '-') handleOperator('-');
      else if (event.key === '*') handleOperator('×');
      else if (event.key === '/') {
        event.preventDefault();
        handleOperator('÷');
      } else if (event.key === 'Enter' || event.key === '=') handleEqual();
      else if (event.key === 'Backspace') handleBackspace();
      else if (event.key === 'Escape') handleClear();
      else if (event.key === '.') handleDecimal();
      else if (event.key === '%') handlePercent();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [
    handleNumber,
    handleOperator,
    handleEqual,
    handleBackspace,
    handleClear,
    handleDecimal,
    handlePercent,
  ]);

  return (
    <div className="calc-page">
      <div className="calc-wrapper">
        {history.length > 0 && (
          <aside className="calc-history" aria-label="Lịch sử phép tính">
            <div className="calc-history-header">
              <p className="calc-history-title">Lịch sử</p>
              <div className="calc-history-actions">
                <button
                  type="button"
                  className="calc-history-export"
                  onClick={exportHistory}
                >
                  Xuất lịch sử
                </button>
                <button
                  type="button"
                  className="calc-history-clear"
                  onClick={clearAllHistory}
                >
                  Xóa tất cả
                </button>
              </div>
            </div>

            <div className="calc-history-list">
              {history.map((item) => (
                <div key={item.id} className="calc-history-item">
                  <div className="calc-history-content">
                    <span className="calc-history-expr">{item.expression}</span>
                    <span className="calc-history-result">= {item.result}</span>
                  </div>
                  <button
                    type="button"
                    className="calc-history-delete"
                    onClick={() => deleteHistory(item.id)}
                    title="Xóa"
                    aria-label={`Xóa phép tính ${item.expression}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </aside>
        )}

        <div className="calculator">
          <div className="calc-topbar">
            <h2 className="calc-title">Máy tính cầm tay</h2>
            <button
              type="button"
              className={`calc-mode-toggle ${isAdvancedMode ? 'active' : ''}`}
              aria-pressed={isAdvancedMode}
              aria-expanded={isAdvancedMode}
              onClick={() => setIsAdvancedMode((current) => !current)}
            >
              {isAdvancedMode ? 'Tắt nâng cao' : 'Bật nâng cao'}
            </button>
          </div>

          <div
            className={`calc-display ${copied ? 'copied' : ''}`}
            onClick={copyResult}
            title="Click để copy kết quả"
          >
            <div className="calc-expression">{state.display}</div>
            {copied && <div className="calc-copied-toast">Đã copy</div>}
          </div>

          <div
            className={`calc-advanced-panel ${
              isAdvancedMode ? 'expanded' : ''
            }`}
            aria-hidden={!isAdvancedMode}
          >
            <div className="calc-buttons calc-buttons-advanced">
              {ADVANCED_CALCULATOR_BUTTONS.map(renderButton)}
            </div>
          </div>

          <div className="calc-buttons">
            {BASIC_CALCULATOR_BUTTONS.map(renderButton)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
