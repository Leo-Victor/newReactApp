export type Operator = '+' | '-' | '*' | '/';

export interface CalculatorState {
  display: string;
  firstNum: number | null;
  operator: Operator | null;
  waitingForSecond: boolean;
}

export const initialState: CalculatorState = {
  display: '0',
  firstNum: null,
  operator: null,
  waitingForSecond: false,
};

export function calculate(
  firstNum: number,
  secondNum: number,
  operator: Operator
): number {
  switch (operator) {
    case '+':
      return firstNum + secondNum;
    case '-':
      return firstNum - secondNum;
    case '*':
      return firstNum * secondNum;
    case '/':
      return secondNum !== 0 ? firstNum / secondNum : 0;
    default:
      return 0;
  }
}
