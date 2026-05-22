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
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    setState((prev) => {
      // Fix : Sau khi bấm = xong, bấm số mới → bắt đầu phép tính mới
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
    setState((prev) => {
      // Fix 3: Nếu đang có phép tính dở (có firstNum + operator)
      // thì tính kết quả trước rồi mới gán operator mới
      if (prev.firstNum !== null && prev.operator !== null && !prev.waitingForSecond) {
        const result = calculate(prev.firstNum, parseFloat(prev.display), prev.operator);
        return {
          display: String(result),
          firstNum: result,
          operator: op,
          waitingForSecond: true,
        };
      } else {
        return {
          ...prev,
          firstNum: parseFloat(prev.display),
          operator: op,
          waitingForSecond: true,
        }
      }
    })
  };

  const handleEqual = () => {
    setState((prev) => {
      if (prev.firstNum === null || prev.operator === null) return prev;

      const second = parseFloat(prev.display);
      let result = calculate(
        prev.firstNum,
        parseFloat(prev.display),
        prev.operator
      );
      //Fix 2: Giới hạn 9 số thập phân
      const formatted = parseFloat(result.toFixed(9));
      //Fix 4: Chia cho 0 → Infinity
      if (prev.operator === '/' && second === 0) {
        const expr = `${prev.firstNum} ${prev.operator} ${second}= infinity`;
        setHistory((h) => [expr, ...h].slice(0, 10));
        return {
          display: String(result),
          firstNum: null,
          operator: null,
          waitingForSecond: false,
        };
      }

      const expr = `${prev.firstNum} ${prev.operator} ${second}= ${formatted}`;
      setHistory((h) => [expr, ...h].slice(0, 10));

      return {
        display: String(formatted),
        firstNum: null,
        operator: null,
        waitingForSecond: true //Fix 1: bấm số tiếp → bắt đầu phép mới
      }
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
    history,
    handleNumber,
    handleOperator,
    handleEqual,
    handleDecimal,
    handleClear,
    handleBackspace,
  };
}

export default useCalculator;
