import React, { useState, useEffect } from 'react';

function LineToLineDistance() {
  const [line1Point, setLine1Point] = useState({ x: -1, y: 1, z: 0 });
  const [line1Direction, setLine1Direction] = useState({ x: 3, y: 2, z: 1 });
  const [line2Point, setLine2Point] = useState({ x: 0, y: 0, z: 1 });
  const [line2Direction, setLine2Direction] = useState({ x: 1, y: 2, z: -1 });
  const [result, setResult] = useState('');
  const [calculationSteps, setCalculationSteps] = useState('');

  // Função para calcular a distância entre as retas
  const calculateDistance = () => {
    const p1 = line1Point;
    const d1 = line1Direction;
    const p2 = line2Point;
    const d2 = line2Direction;

    // Diferença dos pontos P2 - P1
    const diffP1P2 = {
      x: p2.x - p1.x,
      y: p2.y - p1.y,
      z: p2.z - p1.z,
    };

    // Produto vetorial D1 x D2
    const crossD1D2 = {
      x: d1.y * d2.z - d1.z * d2.y,
      y: d1.z * d2.x - d1.x * d2.z,
      z: d1.x * d2.y - d1.y * d2.x,
    };

    const crossMagnitude = Math.sqrt(
      crossD1D2.x ** 2 + crossD1D2.y ** 2 + crossD1D2.z ** 2
    );

    // Produto escalar (P2 - P1) . (D1 x D2)
    const dotDiffCross = Math.abs(
      diffP1P2.x * crossD1D2.x + diffP1P2.y * crossD1D2.y + diffP1P2.z * crossD1D2.z
    );

    // Distância entre as retas
    const distance = dotDiffCross / crossMagnitude;

    // Ajuste na precisão do resultado
    const adjustedDistance = (Math.round(distance * 1000) / 1000).toFixed(3); // Arredondar para 3 casas decimais

    setResult(adjustedDistance);

    const steps = `
      1. Ponto da primeira reta: P1 = (${p1.x}, ${p1.y}, ${p1.z})
      2. Vetor diretor da primeira reta: D1 = (${d1.x}, ${d1.y}, ${d1.z})
      3. Ponto da segunda reta: P2 = (${p2.x}, ${p2.y}, ${p2.z})
      4. Vetor diretor da segunda reta: D2 = (${d2.x}, ${d2.y}, ${d2.z})
      5. Diferença dos pontos P2 - P1: (${diffP1P2.x}, ${diffP1P2.y}, ${diffP1P2.z})
      6. Produto vetorial D1 x D2: (${crossD1D2.x}, ${crossD1D2.y}, ${crossD1D2.z})
      7. Produto escalar (P2 - P1) . (D1 x D2): ${dotDiffCross}
      8. Distância entre as retas: D = |(P2 - P1) . (D1 x D2)| / |D1 x D2| = ${adjustedDistance}
    `;
    setCalculationSteps(steps);
  };

  // Efeito para recalcular a distância quando os valores de entrada mudarem
  useEffect(() => {
    calculateDistance();
  }, [line1Point, line1Direction, line2Point, line2Direction]);

  const handleInputChange = (e, line, type) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);
    if (line === "line1") {
      if (type === "point") {
        setLine1Point({ ...line1Point, [name]: parsedValue });
      } else {
        setLine1Direction({ ...line1Direction, [name]: parsedValue });
      }
    } else if (line === "line2") {
      if (type === "point") {
        setLine2Point({ ...line2Point, [name]: parsedValue });
      } else {
        setLine2Direction({ ...line2Direction, [name]: parsedValue });
      }
    }
  };

  return (
    <div>
      <h2>Distância entre Duas Retas</h2>
      <div>
        <h3>Insira um ponto da primeira reta:</h3>
        <input type="number" name="x" value={line1Point.x} onChange={(e) => handleInputChange(e, "line1", "point")} placeholder="X" />
        <input type="number" name="y" value={line1Point.y} onChange={(e) => handleInputChange(e, "line1", "point")} placeholder="Y" />
        <input type="number" name="z" value={line1Point.z} onChange={(e) => handleInputChange(e, "line1", "point")} placeholder="Z" />
      </div>
      <div>
        <h3>Insira o vetor diretor da primeira reta:</h3>
        <input type="number" name="x" value={line1Direction.x} onChange={(e) => handleInputChange(e, "line1", "direction")} placeholder="X" />
        <input type="number" name="y" value={line1Direction.y} onChange={(e) => handleInputChange(e, "line1", "direction")} placeholder="Y" />
        <input type="number" name="z" value={line1Direction.z} onChange={(e) => handleInputChange(e, "line1", "direction")} placeholder="Z" />
      </div>
      <div>
        <h3>Insira um ponto da segunda reta:</h3>
        <input type="number" name="x" value={line2Point.x} onChange={(e) => handleInputChange(e, "line2", "point")} placeholder="X" />
        <input type="number" name="y" value={line2Point.y} onChange={(e) => handleInputChange(e, "line2", "point")} placeholder="Y" />
        <input type="number" name="z" value={line2Point.z} onChange={(e) => handleInputChange(e, "line2", "point")} placeholder="Z" />
      </div>
      <div>
        <h3>Insira o vetor diretor da segunda reta:</h3>
        <input type="number" name="x" value={line2Direction.x} onChange={(e) => handleInputChange(e, "line2", "direction")} placeholder="X" />
        <input type="number" name="y" value={line2Direction.y} onChange={(e) => handleInputChange(e, "line2", "direction")} placeholder="Y" />
        <input type="number" name="z" value={line2Direction.z} onChange={(e) => handleInputChange(e, "line2", "direction")} placeholder="Z" />
      </div>
      <h3>Resultado da distância entre as retas:</h3>
      <p>{result}</p>
      <h3>Passos do Cálculo:</h3>
      <pre>{calculationSteps}</pre>
    </div>
  );
}

export default LineToLineDistance;
