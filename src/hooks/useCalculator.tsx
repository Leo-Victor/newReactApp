// src/hooks/useCalculator.ts
import { useState } from 'react';
import {
  type Operator,
  calculate,
} from '../feartures/Calculator/calculator.logic';

// Trạng thái được đơn giản hóa để xây dựng một chuỗi biểu thức
interface ExpressionState {
  display: string;
  expression: string; // Thêm trạng thái lưu phép tính để đẩy lên dòng trên
  isResult: boolean; // Cờ để kiểm tra xem màn hình có đang hiển thị kết quả không
}

const initialState: ExpressionState = {
  display: '0',
  expression: '',
  isResult: false,
};

// Hàm để tính toán biểu thức từ trái qua phải
const evaluate = (expression: string): number => {
  // Thay thế các toán tử hiển thị (UI) bằng các toán tử logic của JavaScript
  const sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
  const tokens = sanitizedExpression.split(' ').filter(token => token !== '');

  if (tokens.length === 0) return 0;
  if (tokens.length === 1) return parseFloat(tokens[0]);

  // Xử lý trường hợp có toán tử ở cuối (ví dụ: "5 + ")
  if (['+', '-', '*', '/'].includes(tokens[tokens.length - 1])) {
    tokens.pop();
  }

  let result = parseFloat(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i] as Operator;
    const nextNum = parseFloat(tokens[i + 1]);

    if (isNaN(nextNum)) continue;

    // Sử dụng lại hàm calculate đã có
    result = calculate(result, nextNum, operator);
  }

  return result;
};

function useCalculator() {
  const [state, setState] = useState<ExpressionState>(initialState);
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    setState((prev) => {
      // Nếu đang hiển thị kết quả, bấm số mới sẽ xóa dòng trên và bắt đầu mới hoàn toàn
      if (prev.isResult) {
        return { display: num, expression: '', isResult: false };
      }
      // Nếu màn hình đang là '0' thì thay thế
      if (prev.display === '0') {
        return { ...prev, display: num, isResult: false };
      }
      // Ngược lại, nối vào biểu thức hiện tại
      return { ...prev, display: prev.display + num };
    });
  };

  const handleOperator = (op: Operator) => {
    setState((prev) => {
      if (prev.display === 'Infinity' || prev.display === 'NaN' || prev.display === 'Error') {
        return { display: '0', expression: '', isResult: false };
      }
      const trimmedDisplay = prev.display.trim();
      const lastChar = trimmedDisplay.slice(-1);

      // Sử dụng × và ÷ để hiển thị theo README, nhưng logic dùng * và /
      const displayOp = op === '*' ? '×' : op === '/' ? '÷' : op;

      // Nếu vừa tính xong, bấm phép tính sẽ nối kết quả vào để tính tiếp, đồng thời xóa dòng trên
      if (prev.isResult) {
        return { display: `${trimmedDisplay} ${displayOp} `, expression: '', isResult: false };
      }

      // Thay thế toán tử cuối cùng nếu có
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        const newDisplay = trimmedDisplay.slice(0, -1) + displayOp;
        return { ...prev, display: `${newDisplay} ` };
      }

      // Nối toán tử vào với khoảng trắng để dễ phân tích
      return { ...prev, display: `${trimmedDisplay} ${displayOp} `, isResult: false };
    });
  };

  const handleEqual = () => {
    setState((prev) => {
      if (prev.isResult) return prev;

      const expression = prev.display;
      const result = evaluate(expression);

      // Xử lý chia cho 0
      if (!isFinite(result)) {
        const expr = `${expression} = ${String(result)}`;
        setHistory((h) => [expr, ...h].slice(0, 10));
        return { display: String(result), expression: `${expression} =`, isResult: true };
      }

      // Giới hạn 9 số thập phân
      const formattedResult = parseFloat(result.toFixed(9));
      const expr = `${expression} = ${formattedResult}`;
      setHistory((h) => [expr, ...h].slice(0, 10));

      return { display: String(formattedResult), expression: `${expression} =`, isResult: true };
    });
  };

  const handleDecimal = () => {
    setState((prev) => {
      if (prev.isResult) {
        return { display: '0.', expression: '', isResult: false };
      }
      // Kiểm tra xem phần số cuối cùng đã có dấu thập phân chưa
      const parts = prev.display.split(' ');
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) {
        return prev;
      }
      return { ...prev, display: prev.display + '.' };
    });
  };

  const handleClear = () => setState(initialState);

  const handleBackspace = () => {
    setState((prev) => {
      if (prev.isResult) return initialState;
      const newDisplay = prev.display.trim().slice(0, -1).trim();
      return { ...prev, display: newDisplay.length === 0 ? '0' : newDisplay };
    });
  };

  return {
    // Đánh lừa giao diện cũ bằng cách cung cấp lại firstNum và operator
    state: {
      display: state.display,
      firstNum: state.expression || null, // Tránh lỗi "undefined undefined"
      operator: ''
    } as any,
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
