// src/hooks/useCalculator.ts
import { useState } from 'react';
import {
  type Operator,
  type CalculatorState,
  initialState,
  calculate,
} from '../feartures/Calculator/calculator.logic';

function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const handleNumber = (num: string) => {
    setState((prev) => {
      if (prev.waitingForSecond) {
        return { ...prev, display: num, waitingForSecond: false };
      }
      return {
        ...prev,
        display: prev.display === '0' ? num : prev.display + num,
      };
    });
  };

  const handleOperator = (op: Operator) => {
    setState((prev) => ({
      ...prev,
      firstNum: parseFloat(prev.display),
      operator: op,
      waitingForSecond: true,
    }));
  };

  const handleEqual = () => {
    setState((prev) => {
      if (prev.firstNum === null || prev.operator === null) return prev;
      const result = calculate(
        prev.firstNum,
        parseFloat(prev.display),
        prev.operator
      );
      return {
        display: String(result),
        firstNum: null,
        operator: null,
        waitingForSecond: false,
      };
    });
  };

  const handleDecimal = () => {
    setState((prev) => {
      if (prev.display.includes('.')) return prev;
      return { ...prev, display: prev.display + '.' };
    });
  };

  const handleClear = () => setState(initialState);

  const handleBackspace = () => {
    setState((prev) => ({
      ...prev,
      display: prev.display.length > 1 ? prev.display.slice(0, -1) : '0',
    }));
  };

  return {
    state,
    handleNumber,
    handleOperator,
    handleEqual,
    handleDecimal,
    handleClear,
    handleBackspace,
  };
}

export default useCalculator;
