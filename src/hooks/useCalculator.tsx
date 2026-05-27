// src/hooks/useCalculator.ts
import { useState, useCallback } from 'react';
import {
  type Operator,
  calculate,
} from '../feartures/Calculator/calculator.logic';

// ===== TYPES =====
interface ExpressionState {
  display: string;
  expression: string;
  isResult: boolean;
}

export interface HistoryItem {
  id: number;
  expression: string;
  result: string;
}

const initialState: ExpressionState = {
  display: '0',
  expression: '',
  isResult: false,
};

// ===== HELPER: Tính biểu thức từ trái qua phải =====
const evaluate = (expression: string): number => {
  const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
  const tokens = sanitized.split(' ').filter((t) => t !== '');

  if (tokens.length === 0) return 0;
  if (tokens.length === 1) return parseFloat(tokens[0]);

  // Bỏ toán tử ở cuối nếu có
  if (['+', '-', '*', '/'].includes(tokens[tokens.length - 1])) {
    tokens.pop();
  }

  let result = parseFloat(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i] as Operator;
    const next = parseFloat(tokens[i + 1]);
    if (isNaN(next)) continue;
    result = calculate(result, next, op);
  }
  return result;
};

// ===== HELPER: Format kết quả =====
const formatResult = (num: number): string => {
  if (!isFinite(num)) return 'Infinity';
  if (isNaN(num)) return 'Lỗi';
  return String(parseFloat(num.toFixed(9)));
};

// ===== HELPER: Lấy số cuối cùng trong chuỗi =====
const getLastNumber = (display: string): number => {
  const parts = display.trim().split(' ');
  return parseFloat(parts[parts.length - 1]) || 0;
};

// ===== MAIN HOOK =====
function useCalculator() {
  const [state, setState] = useState<ExpressionState>(initialState);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  // ===== HISTORY HELPERS =====
  const addHistory = useCallback((expression: string, result: string) => {
    setHistory((prev) =>
      [{ id: Date.now(), expression, result }, ...prev].slice(0, 20)
    );
  }, []);

  const deleteHistory = useCallback((id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearAllHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const exportHistory = useCallback(() => {
    if (history.length === 0) return;

    const content = history
      .slice()
      .reverse()
      .map((item, index) => `${index + 1}. ${item.expression} ${item.result}`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `calculator-history-${new Date()
      .toISOString()
      .slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [history]);

  // ===== COPY KẾT QUẢ =====
  const copyResult = useCallback(() => {
    const value = state.isResult ? state.display : getLastNumber(state.display).toString();
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {
      // Fallback nếu clipboard API không hoạt động
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [state]);

  // ===== SỐ =====
  const handleNumber = useCallback((num: string) => {
    setState((prev) => {
      if (prev.isResult) {
        return { display: num, expression: '', isResult: false };
      }
      if (prev.display === '0') {
        return { ...prev, display: num };
      }
      return { ...prev, display: prev.display + num };
    });
  }, []);

  // ===== PHÉP TÍNH =====
  const handleOperator = useCallback((op: string) => {
    setState((prev) => {
      if (['Infinity', 'NaN', 'Lỗi'].includes(prev.display)) {
        return initialState;
      }

      const trimmed = prev.display.trim();
      const lastChar = trimmed.slice(-1);
      const displayOp = op === '*' ? '×' : op === '/' ? '÷' : op;

      // Sau khi bấm = → tiếp tục tính với kết quả
      if (prev.isResult) {
        return {
          display: `${trimmed} ${displayOp} `,
          expression: '',
          isResult: false,
        };
      }

      // Thay thế toán tử cuối nếu bấm nhầm
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        return {
          ...prev,
          display: `${trimmed.slice(0, -1)}${displayOp} `,
        };
      }

      return {
        ...prev,
        display: `${trimmed} ${displayOp} `,
        isResult: false,
      };
    });
  }, []);

  // ===== DẤU BẰNG =====
  const handleEqual = useCallback(() => {
    setState((prev) => {
      if (prev.isResult) return prev;

      const expr = prev.display;
      const result = evaluate(expr);
      const formatted = formatResult(result);
      const histExpr = `${expr.trim()} =`;

      addHistory(histExpr, formatted);

      return {
        display: formatted,
        expression: histExpr,
        isResult: true,
      };
    });
  }, [addHistory]);

  // ===== DẤU THẬP PHÂN =====
  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.isResult) {
        return { display: '0.', expression: '', isResult: false };
      }
      const parts = prev.display.split(' ');
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) return prev;
      return { ...prev, display: prev.display + '.' };
    });
  }, []);

  // ===== XÓA HẾT =====
  const handleClear = useCallback(() => {
    setState(initialState);
  }, []);

  // ===== XÓA 1 KÝ TỰ =====
  const handleBackspace = useCallback(() => {
    setState((prev) => {
      if (prev.isResult) return initialState;
      const newDisplay = prev.display.trim().slice(0, -1).trim();
      return {
        ...prev,
        display: newDisplay.length === 0 ? '0' : newDisplay,
      };
    });
  }, []);

  // ===== % PHẦN TRĂM =====
  const handlePercent = useCallback(() => {
    setState((prev) => {
      const current = getLastNumber(prev.display);
      const result = formatResult(current / 100);
      const expr = `${current}%`;
      addHistory(expr, result);
      return { display: result, expression: `${expr} =`, isResult: true };
    });
  }, [addHistory]);

  // ===== ± ĐỔI DẤU =====
  const handleToggleSign = useCallback(() => {
    setState((prev) => {
      const current = getLastNumber(prev.display);
      const result = formatResult(current * -1);
      // Không lưu vào history vì đây chỉ là thao tác nhỏ
      return { ...prev, display: result, isResult: false };
    });
  }, []);

  // ===== x² BÌNH PHƯƠNG =====
  const handleSquare = useCallback(() => {
    setState((prev) => {
      const current = getLastNumber(prev.display);
      const result = formatResult(current * current);
      const expr = `${current}²`;
      addHistory(expr, result);
      return { display: result, expression: `${expr} =`, isResult: true };
    });
  }, [addHistory]);

  // ===== √ CĂN BẬC HAI =====
  const handleSqrt = useCallback(() => {
    setState((prev) => {
      const current = getLastNumber(prev.display);
      const result = current < 0 ? 'Lỗi' : formatResult(Math.sqrt(current));
      const expr = `√${current}`;
      addHistory(expr, result);
      return { display: result, expression: `${expr} =`, isResult: true };
    });
  }, [addHistory]);

  // ===== 1/x NGHỊCH ĐẢO =====
  const handleInverse = useCallback(() => {
    setState((prev) => {
      const current = getLastNumber(prev.display);
      const result = current === 0 ? 'Infinity' : formatResult(1 / current);
      const expr = `1/${current}`;
      addHistory(expr, result);
      return { display: result, expression: `${expr} =`, isResult: true };
    });
  }, [addHistory]);

  return {
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
  };
}

export default useCalculator;
