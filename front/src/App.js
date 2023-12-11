import React from "react";
import CalculatorForm from "./CalculatorForm";

const App = () => {
  const handleSubmit = async (number1, number2) => {
    const response = await fetch("http://localhost:3001/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number1, number2 }),
    });

    const data = await response.json();
    console.log("Calculation result:", data.result);
  };

  const handlePrint = async () => {
    const response = await fetch("http://localhost:3001/print");
    const blob = await response.blob();

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "result.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <CalculatorForm onSubmit={handleSubmit} onPrint={handlePrint} />
    </div>
  );
};

export default App;
