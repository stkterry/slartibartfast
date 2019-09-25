import React from 'react';
import ViewAnim from "./components/animations/view/ViewAnim";
import ViewScene from "./components/babylon/ViewScene";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Header Bit</h1>
      </header>
        <ViewAnim />
        <ViewScene />
    </div>
  );
}

export default App;
