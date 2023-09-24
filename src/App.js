// src/App.js

import React from 'react';
import './App.css';
import ApiInteraction from './ApiInteraction';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React App to Interact with Flask</h1>
      </header>
      <main>
        <ApiInteraction />
      </main>
    </div>
  );
}

export default App;
