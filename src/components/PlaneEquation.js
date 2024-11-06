import React, { useState } from 'react';

function PlaneEquation() {
  const [point, setPoint] = useState({ x: 0, y: 0, z: 0 });
  const [normalVector, setNormalVector] = useState({ x: 0, y: 0, z: 0 });
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e, vectorType) => {
    const { name, value } = e.target;
    if (vectorType === "point") {
      setPoint({ ...point, [name]: parseFloat(value) });
    } else if (vectorType === "normalVector") {
      setNormalVector({ ...normalVector, [name]: parseFloat(value) });
    }
  };

  const calculateEquation = () => {
    const d = normalVector.x * point.x + normalVector.y * point.y + normalVector.z * point.z;

    // Passos do cálculo
    const newSteps = [
      `Equação do plano: ax + by + cz = d`,
      `Substituindo valores: ${normalVector.x}x + ${normalVector.y}y + ${normalVector.z}z = ${d}`,
      `Resultado: ${normalVector.x}x + ${normalVector.y}y + ${normalVector.z}z = ${d}`
    ];

    setSteps(newSteps);
    setResult(`${normalVector.x}x + ${normalVector.y}y + ${normalVector.z}z = ${d}`);

    // Verificando se o ponto está no plano
    const distanceCheck = normalVector.x * point.x + normalVector.y * point.y + normalVector.z * point.z;
    if (distanceCheck === d) {
      setError("O ponto está no plano, a distância é zero.");
    } else {
      setError(null);
    }
  };

  return (
    <div>
      <h2>Equação Geral do Plano</h2>
      <div>
        <h3>Insira o ponto no plano:</h3>
        <input type="number" name="x" value={point.x} onChange={(e) => handleInputChange(e, "point")} placeholder="X" />
        <input type="number" name="y" value={point.y} onChange={(e) => handleInputChange(e, "point")} placeholder="Y" />
        <input type="number" name="z" value={point.z} onChange={(e) => handleInputChange(e, "point")} placeholder="Z" />
      </div>
      <div>
        <h3>Insira o vetor normal:</h3>
        <input type="number" name="x" value={normalVector.x} onChange={(e) => handleInputChange(e, "normalVector")} placeholder="X" />
        <input type="number" name="y" value={normalVector.y} onChange={(e) => handleInputChange(e, "normalVector")} placeholder="Y" />
        <input type="number" name="z" value={normalVector.z} onChange={(e) => handleInputChange(e, "normalVector")} placeholder="Z" />
      </div>
      <button onClick={calculateEquation}>Calcular Equação</button>
      
      {steps.length > 0 && (
        <div>
          <h3>Passos:</h3>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      
      {result && (
        <div>
          <h3>Equação do Plano:</h3>
          <p>{result}</p>
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

export default PlaneEquation;
