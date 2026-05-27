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

//Các hàm tính toán đơn
export function calcPercent(num: number): number {
  return num / 100;
}

export function calcSqare(num: number): number {
  return num * num;
}

export function calcSqrt(num: number): number {
  return num < 0 ? NaN : Math.sqrt(num);
}

export function calcInverse(num: number): number{
  return num === 0 ? Infinity : 1 / num;
}

export function calcToggleSing(num: number): number{
  return num  * -1;
}

export function formatResult(num: number): string{
  if (!isFinite(num)) return '∞';
  if (isNaN(num)) return 'Lỗi';
  return String(parseFloat(num.toFixed(9)));
}