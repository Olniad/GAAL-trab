import React, { useState } from 'react';

function PointToPlaneDistance() {
  const [point, setPoint] = useState({ x: 0, y: 0, z: 0 });
  const [normalVector, setNormalVector] = useState({ x: 0, y: 0, z: 0 });
  const [constant, setConstant] = useState(0);
  const [result, setResult] = useState(null);
  const [calculationSteps, setCalculationSteps] = useState('');

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "point") {
      setPoint({ ...point, [name]: parseFloat(value) });
    } else if (type === "normalVector") {
      setNormalVector({ ...normalVector, [name]: parseFloat(value) });
    } else if (type === "constant") {
      setConstant(parseFloat(value));
    }
  };

  const calculateDistance = () => {
    const A = normalVector.x;
    const B = normalVector.y;
    const C = normalVector.z;
    const D = constant;

    // Passo 1: Encontrar um ponto P1 no plano
    // Vamos escolher x1 = 0 e y1 = 0, e resolver para z1
    const x1 = 0;
    const y1 = 0;
    const z1 = -D / C;  // Resolvendo a equação do plano ax + by + cz + d = 0

    // Passo 2: Calcular o vetor P1P0
    const P1P0 = { x: point.x - x1, y: point.y - y1, z: point.z - z1 };

    // Passo 3: Calcular o produto escalar P1P0 · N
    const dotProduct = P1P0.x * A + P1P0.y * B + P1P0.z * C;

    // Passo 4: Calcular a magnitude do vetor N
    const normalMagnitude = Math.sqrt(A ** 2 + B ** 2 + C ** 2);

    // Passo 5: Calcular a distância
    const distance = Math.abs(dotProduct) / normalMagnitude;

    // Detalhes do cálculo
    const steps = `
      Passo 1: Encontrar um ponto P1 no plano (Escolhemos x1 = 0, y1 = 0, e resolvemos para z1)
      P1 = (0, 0, ${z1})

      Passo 2: Calcular o vetor P1P0
      P1P0 = (${point.x} - ${x1}, ${point.y} - ${y1}, ${point.z} - ${z1}) = (${P1P0.x}, ${P1P0.y}, ${P1P0.z})

      Passo 3: Calcular o produto escalar P1P0 · N
      P1P0 · N = ${P1P0.x} * ${A} + ${P1P0.y} * ${B} + ${P1P0.z} * ${C} = ${dotProduct}

      Passo 4: Calcular a magnitude de N
      ||N|| = √(${A}^2 + ${B}^2 + ${C}^2) = ${normalMagnitude}

      Passo 5: Calcular a distância
      dist(P0, π) = |P1P0 · N| / ||N|| = |${dotProduct}| / ${normalMagnitude} = ${distance}
    `;

    setResult(distance);
    setCalculationSteps(steps);
  };

  return (
    <div>
      <h2>Distância de um Ponto a um Plano</h2>
      <div>
        <h3>Insira o ponto:</h3>
        <input type="number" name="x" value={point.x} onChange={(e) => handleInputChange(e, "point")} placeholder="X" />
        <input type="number" name="y" value={point.y} onChange={(e) => handleInputChange(e, "point")} placeholder="Y" />
        <input type="number" name="z" value={point.z} onChange={(e) => handleInputChange(e, "point")} placeholder="Z" />
      </div>
      <div>
        <h3>Insira o vetor normal do plano:</h3>
        <input type="number" name="x" value={normalVector.x} onChange={(e) => handleInputChange(e, "normalVector")} placeholder="X" />
        <input type="number" name="y" value={normalVector.y} onChange={(e) => handleInputChange(e, "normalVector")} placeholder="Y" />
        <input type="number" name="z" value={normalVector.z} onChange={(e) => handleInputChange(e, "normalVector")} placeholder="Z" />
      </div>
      <div>
        <h3>Insira o valor constante (equação do plano):</h3>
        <input type="number" value={constant} onChange={(e) => handleInputChange(e, "constant")} placeholder="C" />
      </div>
      <button onClick={calculateDistance}>Calcular Distância</button>
      {result !== null && (
        <div>
          <h3>Distância:</h3>
          <p>{result}</p>
          <h4>Passos do Cálculo:</h4>
          <pre>{calculationSteps}</pre>
        </div>
      )}
    </div>
  );
}

export default PointToPlaneDistance;
