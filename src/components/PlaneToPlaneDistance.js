// components/PlaneToPlaneDistance.js
import React, { useState } from 'react';

function PlaneToPlaneDistance() {
  const [plane1, setPlane1] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const [plane2, setPlane2] = useState({ a: 0, b: 0, c: 0, d: 0 });
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState('');

  const handleInputChange = (e, planeType) => {
    const { name, value } = e.target;
    if (planeType === "plane1") {
      setPlane1({ ...plane1, [name]: parseFloat(value) });
    } else if (planeType === "plane2") {
      setPlane2({ ...plane2, [name]: parseFloat(value) });
    }
  };

  const calculateDistance = () => {
    const { a: a1, b: b1, c: c1, d: d1 } = plane1;
    const { a: a2, b: b2, c: c2, d: d2 } = plane2;

    // Vetores normais dos planos
    const normal1 = [a1, b1, c1];
    const normal2 = [a2, b2, c2];

    // Verificar se os planos são paralelos
    const areParallel = (a1 * b2 === a2 * b1) && (a1 * c2 === a2 * c1) && (b1 * c2 === b2 * c1);

    if (areParallel) {
      // Encontrar ponto no plano 1 (exemplo: (3, 0, 0))
      const p1 = { x: 3, y: 0, z: 0 };

      // Encontrar ponto no plano 2 substituindo (exemplo: (7/2, 0, 0))
      const p2 = { x: 7 / 2, y: 0, z: 0 };

      // Diferenca P1P2
      const diffP1P2 = {
        x: p2.x - p1.x,
        y: p2.y - p1.y,
        z: p2.z - p1.z,
      };

      // Produto escalar P1P2 * normal1
      const numerator = Math.abs(diffP1P2.x * a1 + diffP1P2.y * b1 + diffP1P2.z * c1);

      // ||N|| magnitude do vetor normal
      const denominator = Math.sqrt(a1 ** 2 + b1 ** 2 + c1 ** 2);

      // Distância
      const distance = numerator / denominator;

      setResult(distance);
      setExplanation(`1. Vetor normal do plano 1: (${a1}, ${b1}, ${c1})
2. Vetor normal do plano 2: (${a2}, ${b2}, ${c2})
3. Diferença entre pontos: P1P2 = (${diffP1P2.x}, ${diffP1P2.y}, ${diffP1P2.z})
4. Produto escalar P1P2 * N: |${numerator}|
5. Magnitude de N: √(${a1}² + ${b1}² + ${c1}²) = ${denominator}
6. Distância entre os planos: ${numerator} / ${denominator} = ${distance}`);
    } else {
      setResult("Os planos não são paralelos.");
      setExplanation(`Os vetores normais não são proporcionais:
      Normal 1: (${a1}, ${b1}, ${c1})
      Normal 2: (${a2}, ${b2}, ${c2})`);
    }
  };

  return (
    <div>
      <h2>Distância entre Planos Paralelos</h2>
      <div>
        <h3>Insira os coeficientes do primeiro plano:</h3>
        <input type="number" name="a" value={plane1.a} onChange={(e) => handleInputChange(e, "plane1")} placeholder="A" />
        <input type="number" name="b" value={plane1.b} onChange={(e) => handleInputChange(e, "plane1")} placeholder="B" />
        <input type="number" name="c" value={plane1.c} onChange={(e) => handleInputChange(e, "plane1")} placeholder="C" />
        <input type="number" name="d" value={plane1.d} onChange={(e) => handleInputChange(e, "plane1")} placeholder="D" />
      </div>
      <div>
        <h3>Insira os coeficientes do segundo plano:</h3>
        <input type="number" name="a" value={plane2.a} onChange={(e) => handleInputChange(e, "plane2")} placeholder="A" />
        <input type="number" name="b" value={plane2.b} onChange={(e) => handleInputChange(e, "plane2")} placeholder="B" />
        <input type="number" name="c" value={plane2.c} onChange={(e) => handleInputChange(e, "plane2")} placeholder="C" />
        <input type="number" name="d" value={plane2.d} onChange={(e) => handleInputChange(e, "plane2")} placeholder="D" />
      </div>
      <button onClick={calculateDistance}>Calcular Distância</button>
      {result && (
        <div>
          <h3>Resultado:</h3>
          <p>{result}</p>
          <h4>Passos do Cálculo:</h4>
          <pre>{explanation}</pre>
        </div>
      )}
    </div>
  );
}

export default PlaneToPlaneDistance;
