import { useState } from 'react';
import './Calculator.css';

//TypeSript type cho operator
type Operator = '+' | '-' | '*' | '/';

function Calculator() {
    const [display, setDisplay] = useState<string>('0');
    const [firstNum, setFirstNum] = useState<number | null>(null);
    const [operator, setOperator] = useState<Operator | null>(null);
    const [waitingForSecond, setWaitingForSecond] = useState<boolean>(false);

    // Bấm số
    const handleNumber = (num: string) => {
        //setWaitingForSecond((currentWaiting) => {
        // currentWaiting = giá trị THẬT của waitingForSecond lúc này
        if (waitingForSecond) {
            // Đang chờ số 2 → ghi đè display bằng số mới
            setDisplay(num);
            setWaitingForSecond(false);
        } else {
            // Chưa bấm phép tính → nối số vào display
            setDisplay((currentDisplay) =>
                currentDisplay === '0' ? num : currentDisplay + num
            );
            //return false;
        }
        //};
    };

    //Bấm dấu thập phân
    const handleDecimal = () => {
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    //Bấm operator(+, -, *, /)
    const handleOperator = (op: Operator) => {
        setFirstNum(parseFloat(display));
        setOperator(op);
        setWaitingForSecond(true);
    };

    // tính toán ra kết quả.
    const handleEqual = () => {
        if (firstNum === null || operator === null) return;

        //setDisplay((currentDisplay) => {
        // currentDisplay = số thứ 2 THẬT SỰ đang hiển thị
        const second = parseFloat(display);
        let result = 0;

        if (operator === '+') result = firstNum + second;
        if (operator === '-') result = firstNum - second;
        if (operator === '*') result = firstNum * second;
        if (operator === '/') result = second !== 0 ? firstNum / second : 0;

        //return String(result); // cập nhật display = kết quả
        //});

        setDisplay(String(result));
        setFirstNum(null);
        setOperator(null);
        setWaitingForSecond(false);
    };

    //xóa tất cả
    const handleClear = () => {
        setDisplay('0');
        setFirstNum(null);
        setOperator(null);
        setWaitingForSecond(false);
    };
    //xóa 1 ký tự
    const handleBackspace = () => {
        setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    };

    return (
        <div className="calc-page">
            <div className="calculator">
                <h2 className='calc-title'>Máy tính cầm tay</h2>

                {/*màn hình hiển thị */}
                <div className='calc-display'>
                    <div className='calc-expression'>
                        {firstNum !== null ? `${firstNum} ${operator}` : ''}
                    </div>
                    <div className='calc-number'>{display}</div>
                </div>

                {/* Các nút bấm */}
                <div className='calc-buttons'>
                    {/* Hàng 1*/}
                    <button onClick={handleClear} className="btn btn-clear span-two">AC</button>
                    <button onClick={handleBackspace} className='btn btn-clear'>⌫</button>
                    <button onClick={() => handleOperator('/')} className="btn btn-operator">÷</button>

                    {/* Hàng 2 */}
                    <button onClick={() => handleNumber('7')} className='btn btn-number'>7</button>
                    <button onClick={() => handleNumber('8')} className='btn btn-number'>8</button>
                    <button onClick={() => handleNumber('9')} className='btn btn-number'>9</button>
                    <button onClick={() => handleOperator('*')} className="btn btn-operator">x</button>

                    {/* Hàng 3 */}
                    <button onClick={() => handleNumber('4')} className='btn btn-number'>4</button>
                    <button onClick={() => handleNumber('5')} className='btn btn-number'>5</button>
                    <button onClick={() => handleNumber('6')} className='btn btn-number'>6</button>
                    <button onClick={() => handleOperator('-')} className="btn btn-operator">-</button>


                    {/* Hàng 4 */}
                    <button onClick={() => handleNumber('1')} className="btn btn-number">1</button>
                    <button onClick={() => handleNumber('2')} className="btn btn-number">2</button>
                    <button onClick={() => handleNumber('3')} className="btn btn-number">3</button>
                    <button onClick={() => handleOperator('+')} className="btn btn-operator">+</button>

                    {/* Hàng 5 */}
                    <button onClick={() => handleNumber('0')} className='btn btn-number span-two'>0</button>
                    <button onClick={handleDecimal} className='btn btn-number'>.</button>
                    <button onClick={handleEqual} className='btn btn-equal'>=</button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;

//