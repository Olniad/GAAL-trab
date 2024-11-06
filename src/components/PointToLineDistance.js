import React, { useState } from 'react';

function PointToLineDistance() {
  const [point, setPoint] = useState({ x: 1, y: -1, z: 2 });
  const [linePoint, setLinePoint] = useState({ x: 1, y: 0, z: 2 });
  const [directionVector, setDirectionVector] = useState({ x: 2, y: -1, z: -3 });
  const [result, setResult] = useState(null);
  const [calculationSteps, setCalculationSteps] = useState('');

  const handleInputChange = (e, vectorType) => {
    const { name, value } = e.target;
    if (vectorType === "point") {
      setPoint({ ...point, [name]: parseFloat(value) });
    } else if (vectorType === "linePoint") {
      setLinePoint({ ...linePoint, [name]: parseFloat(value) });
    } else if (vectorType === "directionVector") {
      setDirectionVector({ ...directionVector, [name]: parseFloat(value) });
    }
  };

  const calculateDistance = () => {
    // Passo 1: Calcular o vetor do ponto P0 ao ponto P1 na reta
    const px = point.x - linePoint.x;
    const py = point.y - linePoint.y;
    const pz = point.z - linePoint.z;

    // Passo 2: Calcular o produto vetorial (P1P0 × V)
    const crossProduct = {
      x: py * directionVector.z - pz * directionVector.y,
      y: pz * directionVector.x - px * directionVector.z,
      z: px * directionVector.y - py * directionVector.x,
    };

    // Passo 3: Calcular a magnitude do produto vetorial |P1P0 × V|
    const crossMagnitude = Math.sqrt(
      crossProduct.x ** 2 + crossProduct.y ** 2 + crossProduct.z ** 2
    );

    // Passo 4: Calcular a magnitude do vetor diretor |V|
    const directionMagnitude = Math.sqrt(
      directionVector.x ** 2 + directionVector.y ** 2 + directionVector.z ** 2
    );

    // Passo 5: Calcular a distância
    const distance = crossMagnitude / directionMagnitude;
    setResult(distance);

    // Passos do cálculo para exibição
    const steps = `
      1. Vetor de direção: D(${directionVector.x}, ${directionVector.y}, ${directionVector.z})
      2. Ponto na reta: R(${linePoint.x}, ${linePoint.y}, ${linePoint.z})
      3. Vetor do ponto ao ponto na reta: P(${px}, ${py}, ${pz}) = P1P0
      4. Produto vetorial: P1P0 × D = (${crossProduct.x}, ${crossProduct.y}, ${crossProduct.z})
      5. Magnitude do produto vetorial: |P1P0 × D| = ${crossMagnitude}
      6. Magnitude do vetor diretor: |D| = ${directionMagnitude}
      7. Distância: D = |P1P0 × D| / |D| = ${crossMagnitude} / ${directionMagnitude} = ${distance}
    `;
    setCalculationSteps(steps);
  };

  return (
    <div>
      <h2>Distância de um Ponto a uma Reta</h2>
      <div>
        <h3>Insira o ponto:</h3>
        <input type="number" name="x" value={point.x} onChange={(e) => handleInputChange(e, "point")} placeholder="X" />
        <input type="number" name="y" value={point.y} onChange={(e) => handleInputChange(e, "point")} placeholder="Y" />
        <input type="number" name="z" value={point.z} onChange={(e) => handleInputChange(e, "point")} placeholder="Z" />
      </div>
      <div>
        <h3>Insira um ponto na reta:</h3>
        <input type="number" name="x" value={linePoint.x} onChange={(e) => handleInputChange(e, "linePoint")} placeholder="X" />
        <input type="number" name="y" value={linePoint.y} onChange={(e) => handleInputChange(e, "linePoint")} placeholder="Y" />
        <input type="number" name="z" value={linePoint.z} onChange={(e) => handleInputChange(e, "linePoint")} placeholder="Z" />
      </div>
      <div>
        <h3>Insira o vetor diretor da reta:</h3>
        <input type="number" name="x" value={directionVector.x} onChange={(e) => handleInputChange(e, "directionVector")} placeholder="X" />
        <input type="number" name="y" value={directionVector.y} onChange={(e) => handleInputChange(e, "directionVector")} placeholder="Y" />
        <input type="number" name="z" value={directionVector.z} onChange={(e) => handleInputChange(e, "directionVector")} placeholder="Z" />
      </div>
      <button onClick={calculateDistance}>Calcular Distância</button>
      {result !== null && (
        <div>
          <h3>Distância do Ponto à Reta:</h3>
          <p>{result}</p>
          <h4>Passos do Cálculo:</h4>
          <pre>{calculationSteps}</pre>
        </div>
      )}
    </div>
  );
}

export default PointToLineDistance;
