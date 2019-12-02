import React from 'react';
import './App.css';
import Peliculas from './Components/Peliculas.js';
import Header from './Components/Header.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Header />
        </div>
        <Peliculas />
      </header>
    </div>
  );
}

export default App;
