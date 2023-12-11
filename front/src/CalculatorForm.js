// CalculatorForm.js
import React, { useState } from "react";

const CalculatorForm = ({ onSubmit, onPrint }) => {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");

  const handleCalculate = () => {
    onSubmit(Number(number1), Number(number2));
  };

  const handlePrint = () => {
    onPrint();
  };

  return (
    <div>
      <label>
        Number 1:
        <input
          type="text"
          value={number1}
          onChange={(e) => setNumber1(e.target.value)}
        />
      </label>
      <br />
      <label>
        Number 2:
        <input
          type="text"
          value={number2}
          onChange={(e) => setNumber2(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleCalculate}>Calculate</button>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default CalculatorForm;
