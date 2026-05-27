export type CalculatorButtonVariant = 'number' | 'operator' | 'action' | 'equal';

export type CalculatorAction =
  | 'number'
  | 'operator'
  | 'decimal'
  | 'equal'
  | 'clear'
  | 'backspace'
  | 'percent'
  | 'toggleSign'
  | 'square'
  | 'sqrt'
  | 'inverse';

export interface CalculatorButtonConfig {
  label: string;
  value?: string;
  action: CalculatorAction;
  variant: CalculatorButtonVariant;
  span?: boolean;
}

export const BASIC_CALCULATOR_BUTTONS: CalculatorButtonConfig[] = [
  { label: 'AC', action: 'clear', variant: 'action' },
  { label: '⌫', action: 'backspace', variant: 'action' },
  { label: '÷', value: '÷', action: 'operator', variant: 'operator' },
  { label: '×', value: '×', action: 'operator', variant: 'operator' },
  { label: '7', action: 'number', variant: 'number' },
  { label: '8', action: 'number', variant: 'number' },
  { label: '9', action: 'number', variant: 'number' },
  { label: '−', value: '-', action: 'operator', variant: 'operator' },
  { label: '4', action: 'number', variant: 'number' },
  { label: '5', action: 'number', variant: 'number' },
  { label: '6', action: 'number', variant: 'number' },
  { label: '+', action: 'operator', variant: 'operator' },
  { label: '1', action: 'number', variant: 'number' },
  { label: '2', action: 'number', variant: 'number' },
  { label: '3', action: 'number', variant: 'number' },
  { label: '=', action: 'equal', variant: 'equal' },
  { label: '0', action: 'number', variant: 'number', span: true },
  { label: '.', action: 'decimal', variant: 'number' },
  { label: '00', value: '00', action: 'number', variant: 'number' },
];

export const ADVANCED_CALCULATOR_BUTTONS: CalculatorButtonConfig[] = [
  { label: '%', action: 'percent', variant: 'action' },
  { label: '±', action: 'toggleSign', variant: 'action' },
  { label: 'x²', action: 'square', variant: 'action' },
  { label: '√', action: 'sqrt', variant: 'action' },
  { label: '1/x', action: 'inverse', variant: 'action', span: true },
];
