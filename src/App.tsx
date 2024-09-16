// src/App.js
import React, { useState } from 'react';
import BarChart from './components/BarChart';

function App() {
  const [data, setData] : any = useState([12, 36, 52, 25, 30, 43]);

  return (
    <div className="App">
      <h1>Simple Bar Chart with React and D3</h1>
      <BarChart data={data} />
    </div>
  );
}

export default App;
