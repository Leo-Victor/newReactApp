//import { useState } from 'react';
import './Calculator.css';
import useCalculator from '../hooks/useCalculator';
import CalculatorButton from '../feartures/Calculator/CalculatorButton';
import CalculatorDisplay from '../feartures/Calculator/CalculatorDisplay';
import type { Operator } from '../feartures/Calculator/calculator.logic';


function Calculator() {
    const {
        state,
        history,
        handleNumber,
        handleOperator,
        handleEqual,
        handleDecimal,
        handleClear,
        handleBackspace,
    } = useCalculator();

    const expression =
        state.firstNum !== null ? `${state.firstNum} ${state.operator}` : '';

    return (
        <div className="calc-page">
            <div className="calc-wrapper">

                {/* Lịch sử máy tính */}
                {history.length > 0 && (
                    <div className="calc-history">
                        <p className="calc-history-title">Lịch sử</p>
                        {history.map((item, index) => (
                            <p key={index} className="calc-history-item">
                                {item}
                            </p>
                        ))}
                    </div>
                )}

                <div className="calculator">
                    <h2 className="calc-title">Máy tính cầm tay 🧮</h2>

                    <CalculatorDisplay
                        display={state.display}
                        expression={expression}
                    />

                    <div className="calc-buttons">
                        <CalculatorButton label="AC" variant="action" span onClick={handleClear} />
                        <CalculatorButton label="⌫" variant="action" onClick={handleBackspace} />
                        <CalculatorButton
                            label="÷" value="/"
                            variant="operator"
                            onClick={(v) => handleOperator(v as Operator)}
                        />
                        <CalculatorButton label="7" variant="number" onClick={handleNumber} />
                        <CalculatorButton label="8" variant="number" onClick={handleNumber} />
                        <CalculatorButton label="9" variant="number" onClick={handleNumber} />
                        <CalculatorButton
                            label="×" value="*"
                            variant="operator"
                            onClick={(v) => handleOperator(v as Operator)}
                        />
                        <CalculatorButton label="4" variant="number" onClick={handleNumber} />
                        <CalculatorButton label="5" variant="number" onClick={handleNumber} />
                        <CalculatorButton label="6" variant="number" onClick={handleNumber} />
                        <CalculatorButton
                            label="−" value="-"
                            variant="operator"
                            onClick={(v) => handleOperator(v as Operator)}
                        />
                        <CalculatorButton label="1" variant="number" onClick={handleNumber} />
                        <CalculatorButton label="2" variant="number" onClick={handleNumber} />
                        <CalculatorButton label="3" variant="number" onClick={handleNumber} />
                        <CalculatorButton
                            label="+"
                            variant="operator"
                            onClick={(v) => handleOperator(v as Operator)}
                        />
                        <CalculatorButton label="0" variant="number" span onClick={handleNumber} />
                        <CalculatorButton label="." variant="number" onClick={handleDecimal} />
                        <CalculatorButton label="=" variant="equal" onClick={handleEqual} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculator;

//
