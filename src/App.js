import React, { useState } from 'react';
import './App.css';
import LineEquation from './components/LineEquation';
import PlaneEquation from './components/PlaneEquation';
import PointToPlaneDistance from './components/PointToPlaneDistance';
import PointToLineDistance from './components/PointToLineDistance';
import PlaneToPlaneDistance from './components/PlaneToPlaneDistance';
import LineToLineDistance from './components/LineToLineDistance';

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Geometria Analítica e Algebra Linear.</h1>
        <nav>
          <button onClick={() => setSelectedOption("line")}>Equação da Reta</button>
          <button onClick={() => setSelectedOption("plane")}>Equação do Plano</button>
          <button onClick={() => setSelectedOption("pointToPlane")}>Distância Ponto-Plano</button>
          <button onClick={() => setSelectedOption("pointToLine")}>Distância Ponto-Reta</button>
          <button onClick={() => setSelectedOption("planeToPlane")}>Distância Plano-Plano</button>
          <button onClick={() => setSelectedOption("lineToLine")}>Distância Reta-Reta</button>
        </nav>
        <div className="content">
          {selectedOption === "line" && <LineEquation />}
          {selectedOption === "plane" && <PlaneEquation />}
          {selectedOption === "pointToPlane" && <PointToPlaneDistance />}
          {selectedOption === "pointToLine" && <PointToLineDistance />}
          {selectedOption === "planeToPlane" && <PlaneToPlaneDistance />}
          {selectedOption === "lineToLine" && <LineToLineDistance />}
        </div>
      </header>
    </div>
  );
}

export default App;
