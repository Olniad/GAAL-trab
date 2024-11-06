import React, { useState } from 'react';

function LineEquation() {
  const [point, setPoint] = useState({ x: 0, y: 0, z: 0 });
  const [directionVector, setDirectionVector] = useState({ x: 0, y: 0, z: 0 });
  const [result, setResult] = useState(null);
  const [calculationSteps, setCalculationSteps] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e, vectorType) => {
    const { name, value } = e.target;
    if (vectorType === "point") {
      setPoint({ ...point, [name]: parseFloat(value) });
    } else if (vectorType === "directionVector") {
      setDirectionVector({ ...directionVector, [name]: parseFloat(value) });
    }
  };

  const calculateEquation = () => {
    const equation = `
      x = ${point.x} + ${directionVector.x}t, 
      y = ${point.y} + ${directionVector.y}t, 
      z = ${point.z} + ${directionVector.z}t
    `;
    setResult(equation);

    const steps = `
      1. Usando o ponto P(${point.x}, ${point.y}, ${point.z}) e o vetor diretor D(${directionVector.x}, ${directionVector.y}, ${directionVector.z}):
      2. A equação da reta é dada por:
      x = ${point.x} + ${directionVector.x}t
      y = ${point.y} + ${directionVector.y}t
      z = ${point.z} + ${directionVector.z}t
    `;
    setCalculationSteps(steps);

    // Verificando se o ponto está na reta
    const distanceCheck = (point.x - point.x) * directionVector.x + (point.y - point.y) * directionVector.y + (point.z - point.z) * directionVector.z;
    if (distanceCheck === 0) {
      setError("O ponto está na reta, a distância é zero.");
    } else {
      setError(null);
    }
  };

  return (
    <div>
      <h2>Equação Paramétrica da Reta</h2>
      <div>
        <h3>Insira o ponto na reta:</h3>
        <input type="number" name="x" value={point.x} onChange={(e) => handleInputChange(e, "point")} placeholder="X" />
        <input type="number" name="y" value={point.y} onChange={(e) => handleInputChange(e, "point")} placeholder="Y" />
        <input type="number" name="z" value={point.z} onChange={(e) => handleInputChange(e, "point")} placeholder="Z" />
      </div>
      <div>
        <h3>Insira o vetor diretor:</h3>
        <input type="number" name="x" value={directionVector.x} onChange={(e) => handleInputChange(e, "directionVector")} placeholder="X" />
        <input type="number" name="y" value={directionVector.y} onChange={(e) => handleInputChange(e, "directionVector")} placeholder="Y" />
        <input type="number" name="z" value={directionVector.z} onChange={(e) => handleInputChange(e, "directionVector")} placeholder="Z" />
      </div>
      <button onClick={calculateEquation}>Calcular Equação</button>
      {result && (
        <div>
          <h3>Equação da Reta:</h3>
          <p>{result}</p>
        </div>
      )}
      {calculationSteps && (
        <div>
          <h3>Passos:</h3>
          <pre>{calculationSteps}</pre>
        </div>
      )}
      {error && (
        <div style={{ color: "red" }}>
          <h3>{error}</h3>
        </div>
      )}
    </div>
  );
}

export default LineEquation;
